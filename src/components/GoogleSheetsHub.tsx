import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  ExternalLink, 
  Plus, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Table, 
  Database, 
  Award, 
  Mic2, 
  LogOut, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  getCurrentUser, 
  getAccessToken 
} from '../services/googleAuth';
import { 
  listUserSpreadsheets, 
  getSpreadsheetDetails, 
  getSpreadsheetValues, 
  createOratoriaSpreadsheet, 
  appendSpeechLog, 
  appendProgressSnapshot,
  DriveSpreadsheetFile, 
  SpreadsheetDetails 
} from '../services/googleSheetsService';
import { UserProgress } from '../types/oratory';
import { User } from 'firebase/auth';

interface GoogleSheetsHubProps {
  userProgress: UserProgress;
}

export const GoogleSheetsHub: React.FC<GoogleSheetsHubProps> = ({ userProgress }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hasToken, setHasToken] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Spreadsheets list & active sheet
  const [spreadsheets, setSpreadsheets] = useState<DriveSpreadsheetFile[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [selectedSpreadsheetId, setSelectedSpreadsheetId] = useState<string | null>(null);
  const [activeDetails, setActiveDetails] = useState<SpreadsheetDetails | null>(null);
  const [activeTabName, setActiveTabName] = useState<string>("Journal d'Éloquence");
  const [sheetRows, setSheetRows] = useState<string[][]>([]);
  const [isLoadingRows, setIsLoadingRows] = useState(false);

  // Status message
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Confirmation Modal state for mutating Google Sheets data
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    details: string[];
    onConfirm: () => Promise<void>;
  } | null>(null);
  const [isExecutingMutation, setIsExecutingMutation] = useState(false);

  // Manual Quick Log Form
  const [quickLogTitle, setQuickLogTitle] = useState("Discours d'inauguration et plaidoyer");
  const [quickLogType, setQuickLogType] = useState("Discours préparé");
  const [quickLogWpm, setQuickLogWpm] = useState(132);
  const [quickLogScore, setQuickLogScore] = useState(88);
  const [quickLogDiagnostic, setQuickLogDiagnostic] = useState("Excellente stabilité de pitch, débit maîtrisé, silences respectés.");

  // Check initial auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setHasToken(Boolean(token));
        setIsLoadingAuth(false);
      },
      () => {
        setCurrentUser(null);
        setHasToken(false);
        setIsLoadingAuth(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // When token is available, automatically list user spreadsheets
  useEffect(() => {
    if (hasToken) {
      loadSpreadsheets();
    }
  }, [hasToken]);

  // When active spreadsheet or tab changes, load rows
  useEffect(() => {
    if (selectedSpreadsheetId && hasToken) {
      loadSpreadsheetContent(selectedSpreadsheetId);
    }
  }, [selectedSpreadsheetId, activeTabName]);

  const loadSpreadsheets = async () => {
    setIsLoadingList(true);
    setStatusMessage(null);
    try {
      const files = await listUserSpreadsheets();
      setSpreadsheets(files);
      if (files.length > 0 && !selectedSpreadsheetId) {
        // Auto-select first spreadsheet or one that has Oratoria in its title
        const oratoriaFile = files.find(f => f.name.toLowerCase().includes('oratoria')) || files[0];
        setSelectedSpreadsheetId(oratoriaFile.id);
      }
    } catch (err: any) {
      console.error("Error loading spreadsheets:", err);
      setStatusMessage({ type: 'error', text: err.message || "Erreur de chargement des classeurs Google Drive." });
    } finally {
      setIsLoadingList(false);
    }
  };

  const loadSpreadsheetContent = async (sheetId: string) => {
    setIsLoadingRows(true);
    try {
      const details = await getSpreadsheetDetails(sheetId);
      setActiveDetails(details);

      // Verify if activeTabName exists in the sheet
      const tabExists = details.sheets.some(s => s.title === activeTabName);
      const effectiveTab = tabExists ? activeTabName : (details.sheets[0]?.title || "Feuille 1");
      if (!tabExists && details.sheets[0]) {
        setActiveTabName(details.sheets[0].title);
      }

      const rows = await getSpreadsheetValues(sheetId, `${effectiveTab}!A1:Z100`);
      setSheetRows(rows);
    } catch (err: any) {
      console.error("Error loading sheet rows:", err);
      setStatusMessage({ type: 'error', text: err.message || "Impossible de lire le contenu de la feuille." });
    } finally {
      setIsLoadingRows(false);
    }
  };

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setHasToken(true);
        setStatusMessage({ type: 'success', text: `Connecté avec succès en tant que ${res.user.email}` });
      }
    } catch (err: any) {
      console.error("Sign-in failed:", err);
      setStatusMessage({ type: 'error', text: err.message || "Connexion Google annulée ou échouée." });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setHasToken(false);
    setSpreadsheets([]);
    setSelectedSpreadsheetId(null);
    setActiveDetails(null);
    setSheetRows([]);
    setStatusMessage({ type: 'info', text: "Déconnexion de Google Workspace effectuée." });
  };

  // --- MUTATING ACTIONS WITH MANDATORY USER CONFIRMATION DIALOG ---

  // 1. Create a new Oratoria Google Sheet
  const promptCreateSpreadsheet = () => {
    setConfirmationModal({
      isOpen: true,
      title: "Créer un nouveau classeur Google Sheets",
      description: "Vous êtes sur le point de créer un nouveau classeur dédié sur votre Google Drive avec la structure oratoire standard.",
      details: [
        "Nom : Oratoria - Journal d'Éloquence & Suivi",
        "Onglet 1 : « Journal d'Éloquence » (horodatage, débit WPM, pitch, clarté, score, verdict)",
        "Onglet 2 : « Bilan Pédagogique » (niveau, XP, modules validés, distinctions)"
      ],
      onConfirm: async () => {
        setIsExecutingMutation(true);
        try {
          const newSheet = await createOratoriaSpreadsheet();
          setStatusMessage({ 
            type: 'success', 
            text: `Classeur « ${newSheet.title} » créé avec succès dans votre Google Drive !` 
          });
          await loadSpreadsheets();
          setSelectedSpreadsheetId(newSheet.spreadsheetId);
        } catch (err: any) {
          setStatusMessage({ type: 'error', text: err.message || "Échec de création du classeur." });
        } finally {
          setIsExecutingMutation(false);
          setConfirmationModal(null);
        }
      }
    });
  };

  // 2. Append Speech Practice Entry
  const promptAppendSpeechLog = () => {
    if (!selectedSpreadsheetId || !activeDetails) {
      setStatusMessage({ type: 'error', text: "Veuillez sélectionner un classeur cible d'abord." });
      return;
    }

    setConfirmationModal({
      isOpen: true,
      title: "Enregistrer une prestation dans Google Sheets",
      description: `Une nouvelle ligne d'évaluation va être insérée dans le classeur « ${activeDetails.title} ».`,
      details: [
        `Classeur cible : ${activeDetails.title}`,
        `Onglet cible : Journal d'Éloquence`,
        `Prestation : ${quickLogTitle} (${quickLogType})`,
        `Mesures : ${quickLogWpm} WPM · Score ${quickLogScore}/100`,
        `Diagnostic : ${quickLogDiagnostic}`
      ],
      onConfirm: async () => {
        setIsExecutingMutation(true);
        try {
          await appendSpeechLog(selectedSpreadsheetId, {
            type: quickLogType,
            title: quickLogTitle,
            wpm: quickLogWpm,
            pitchHz: "142 Hz",
            volumeConsistency: "86%",
            clarityDb: "+18.4 dB",
            overallScore: quickLogScore,
            diagnostic: quickLogDiagnostic,
          });
          setStatusMessage({ 
            type: 'success', 
            text: `Prestation enregistrée avec succès dans « ${activeDetails.title} » !` 
          });
          await loadSpreadsheetContent(selectedSpreadsheetId);
        } catch (err: any) {
          setStatusMessage({ type: 'error', text: err.message || "Erreur lors de l'enregistrement de la ligne." });
        } finally {
          setIsExecutingMutation(false);
          setConfirmationModal(null);
        }
      }
    });
  };

  // 3. Export Curriculum Progress Snapshot
  const promptExportProgress = () => {
    if (!selectedSpreadsheetId || !activeDetails) {
      setStatusMessage({ type: 'error', text: "Veuillez sélectionner un classeur cible d'abord." });
      return;
    }

    setConfirmationModal({
      isOpen: true,
      title: "Exporter le bilan de progression dans Google Sheets",
      description: `Un instantané de votre cursus va être ajouté dans l'onglet « Bilan Pédagogique » de « ${activeDetails.title} ».`,
      details: [
        `Niveau actuel : ${userProgress.userLevel.toUpperCase()}`,
        `Points XP cumulés : ${userProgress.xp} XP`,
        `Modules complétés : ${userProgress.completedLessons.length}`,
        `Badges débloqués : ${userProgress.unlockedBadges.length} (${userProgress.unlockedBadges.join(', ')})`
      ],
      onConfirm: async () => {
        setIsExecutingMutation(true);
        try {
          await appendProgressSnapshot(selectedSpreadsheetId, {
            userLevel: userProgress.userLevel,
            xp: userProgress.xp,
            completedCount: userProgress.completedLessons.length,
            badgesCount: userProgress.unlockedBadges.length,
            badgesList: userProgress.unlockedBadges.join(', '),
          });
          setStatusMessage({ 
            type: 'success', 
            text: `Bilan de progression exporté avec succès dans Google Sheets !` 
          });
          setActiveTabName("Bilan Pédagogique");
          await loadSpreadsheetContent(selectedSpreadsheetId);
        } catch (err: any) {
          setStatusMessage({ type: 'error', text: err.message || "Erreur lors de l'export de progression." });
        } finally {
          setIsExecutingMutation(false);
          setConfirmationModal(null);
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Intégration Google Workspace
            </span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
            Hub Google Sheets & Journal d'Éloquence
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Synchronisez vos prestations oratoires, exportez vos analyses bio-acoustiques et suivez l'évolution de vos scores directement dans vos tableurs Google Drive.
          </p>
        </div>

        {/* User status card / Login button */}
        <div className="shrink-0">
          {hasToken && currentUser ? (
            <div className="flex items-center gap-3 bg-slate-900 border border-emerald-500/30 rounded-xl px-4 py-2.5">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || "Google User"} 
                  className="w-8 h-8 rounded-full border border-emerald-400/50" 
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                  {currentUser.displayName ? currentUser.displayName.charAt(0) : 'G'}
                </div>
              )}
              <div className="text-left">
                <p className="text-xs font-semibold text-white leading-tight">
                  {currentUser.displayName || "Compte Google"}
                </p>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {currentUser.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                title="Se déconnecter de Google"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Official Google Sign-In Button format */
            <button
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="flex items-center gap-3 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <span>{isSigningIn ? "Connexion en cours..." : "Se connecter avec Google"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Status banner */}
      {statusMessage && (
        <div className={`mb-6 p-4 rounded-xl border flex items-center justify-between text-xs ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
            : statusMessage.type === 'error'
            ? 'bg-red-950/40 border-red-500/40 text-red-300'
            : 'bg-slate-900 border-slate-700 text-slate-300'
        }`}>
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {statusMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            <span>{statusMessage.text}</span>
          </div>
          <button 
            onClick={() => setStatusMessage(null)}
            className="text-slate-400 hover:text-white ml-4 text-xs font-semibold"
          >
            Fermer
          </button>
        </div>
      )}

      {!hasToken ? (
        /* Not logged in landing prompt */
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center max-w-2xl mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <h3 className="font-serif-title text-xl font-bold text-white mb-2">
            Associez votre Google Drive & Google Sheets
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
            Pour sauvegarder automatiquement vos enregistrements d'élocution, vos statistiques acoustiques et vos rapports de progression dans votre espace Google Drive personnel, veuillez autoriser l'accès avec permission.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left text-xs text-slate-300">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="font-semibold text-emerald-400 block mb-1">Journal Vocal</span>
              Débit WPM, scores de pitch et constance enregistrés après chaque répétition.
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="font-semibold text-amber-400 block mb-1">Bilan Cursus</span>
              Sauvegarde de vos points XP, niveau et badges débloqués sur 14 modules.
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="font-semibold text-cyan-400 block mb-1">Sécurisé & Privé</span>
              Vos classeurs restent sous votre contrôle exclusif dans votre Drive.
            </div>
          </div>
          <button
            onClick={handleSignIn}
            disabled={isSigningIn}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 text-sm font-semibold rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span>Connexion Google Workspace</span>
          </button>
        </div>
      ) : (
        /* Authenticated Workspace dashboard */
        <div className="space-y-8">
          
          {/* Top Control Bar: Spreadsheets selector & Creation button */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Left: Spreadsheet Picker */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
              <label htmlFor="spreadsheet-select" className="text-xs font-semibold text-slate-300 whitespace-nowrap flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-400" />
                Classeur Google Sheets actif :
              </label>
              
              <div className="relative flex-1 max-w-md">
                <select
                  id="spreadsheet-select"
                  value={selectedSpreadsheetId || ''}
                  onChange={(e) => setSelectedSpreadsheetId(e.target.value)}
                  disabled={isLoadingList}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {spreadsheets.length === 0 ? (
                    <option value="">Aucun classeur trouvé</option>
                  ) : (
                    spreadsheets.map((file) => (
                      <option key={file.id} value={file.id}>
                        {file.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <button
                onClick={loadSpreadsheets}
                disabled={isLoadingList}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
                title="Actualiser la liste Google Drive"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingList ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Right: Quick actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={promptCreateSpreadsheet}
                className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nouveau Carnet Oratoria</span>
              </button>

              {activeDetails && (
                <a
                  href={activeDetails.spreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
                >
                  <span>Ouvrir dans Google Sheets</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}
            </div>
          </div>

          {/* Action Row: Export Progression & Manual Log */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left card: Append speech log entry (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Mic2 className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-semibold text-white">
                    Enregistrer une Prestation dans le Journal
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  Onglet : Journal d'Éloquence
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    Titre ou Sujet du discours
                  </label>
                  <input
                    type="text"
                    value={quickLogTitle}
                    onChange={(e) => setQuickLogTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    Format de prise de parole
                  </label>
                  <select
                    value={quickLogType}
                    onChange={(e) => setQuickLogType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Discours préparé">Discours préparé</option>
                    <option value="Improvisation">Improvisation libre</option>
                    <option value="Débat contradictoire">Débat contradictoire</option>
                    <option value="Pitch de projet">Pitch de projet</option>
                    <option value="Lecture au téléprompteur">Lecture au téléprompteur</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    Débit moyen mesuré (WPM)
                  </label>
                  <input
                    type="number"
                    value={quickLogWpm}
                    onChange={(e) => setQuickLogWpm(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono-data"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    Score Global (/100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={quickLogScore}
                    onChange={(e) => setQuickLogScore(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono-data"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    Diagnostic et axes d'amélioration notés
                  </label>
                  <input
                    type="text"
                    value={quickLogDiagnostic}
                    onChange={(e) => setQuickLogDiagnostic(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400">
                  Insertion sécurisée avec confirmation obligatoire
                </span>
                <button
                  onClick={promptAppendSpeechLog}
                  disabled={!selectedSpreadsheetId}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Ajouter au classeur</span>
                </button>
              </div>
            </div>

            {/* Right card: Snapshot Cursus Progress (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-semibold text-white">
                    Instantané du Cursus Oratoria
                  </h4>
                </div>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Exportez l'état actuel de votre apprentissage dans l'onglet « Bilan Pédagogique » pour archiver vos paliers franchis.
                </p>

                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Niveau actuel :</span>
                    <span className="font-semibold text-amber-400 uppercase">{userProgress.userLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Points XP :</span>
                    <span className="font-mono-data font-bold text-white">{userProgress.xp} XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Leçons validées :</span>
                    <span className="font-mono-data font-semibold text-emerald-400">{userProgress.completedLessons.length} leçons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Distinctions débloquées :</span>
                    <span className="font-mono-data font-semibold text-purple-400">{userProgress.unlockedBadges.length} badges</span>
                  </div>
                </div>
              </div>

              <button
                onClick={promptExportProgress}
                disabled={!selectedSpreadsheetId}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Exporter le Bilan Pédagogique</span>
              </button>
            </div>

          </div>

          {/* Spreadsheet Live Content Viewer */}
          {activeDetails && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              
              {/* Tab navigation headers */}
              <div className="bg-slate-950 px-6 py-3.5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1.5 shrink-0">
                    <Table className="w-3.5 h-3.5 text-emerald-400" />
                    Onglets du classeur :
                  </span>
                  {activeDetails.sheets.map((sheet) => (
                    <button
                      key={sheet.sheetId}
                      onClick={() => setActiveTabName(sheet.title)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        activeTabName === sheet.title
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {sheet.title}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{sheetRows.length} ligne(s) chargée(s)</span>
                  <button
                    onClick={() => selectedSpreadsheetId && loadSpreadsheetContent(selectedSpreadsheetId)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Recharger la table"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRows ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto max-h-96">
                {isLoadingRows ? (
                  <div className="p-12 text-center text-xs text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
                    Lecture des données Google Sheets en cours...
                  </div>
                ) : sheetRows.length === 0 ? (
                  <div className="p-12 text-center text-xs text-slate-400">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                    Cet onglet est actuellement vide. Utilisez les boutons ci-dessus pour insérer des données.
                  </div>
                ) : (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-300 sticky top-0 font-semibold">
                        {sheetRows[0]?.map((colHeader, idx) => (
                          <th key={idx} className="py-2.5 px-4 whitespace-nowrap border-r border-slate-800/60 last:border-r-0">
                            {colHeader}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                      {sheetRows.slice(1).map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                          {sheetRows[0]?.map((_, cIdx) => (
                            <td key={cIdx} className="py-2 px-4 whitespace-nowrap border-r border-slate-800/40 last:border-r-0">
                              {row[cIdx] !== undefined ? row[cIdx] : '—'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

            </div>
          )}

        </div>
      )}

      {/* MANDATORY USER CONFIRMATION DIALOG FOR DATA MUTATIONS */}
      {confirmationModal && confirmationModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-100">{confirmationModal.title}</h3>
                <p className="text-xs text-slate-400">Confirmation d'écriture Google Sheets</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {confirmationModal.description}
            </p>

            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 mb-6 space-y-1.5 text-xs text-slate-300 font-mono-data">
              {confirmationModal.details.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmationModal(null)}
                disabled={isExecutingMutation}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                Annuler
              </button>
              <button
                onClick={confirmationModal.onConfirm}
                disabled={isExecutingMutation}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition cursor-pointer disabled:opacity-50"
              >
                {isExecutingMutation ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Synchronisation...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirmer l'opération</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
