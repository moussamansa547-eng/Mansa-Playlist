import { getAccessToken } from './googleAuth';

export interface DriveSpreadsheetFile {
  id: string;
  name: string;
  modifiedTime: string;
  webViewLink?: string;
}

export interface SheetTabInfo {
  sheetId: number;
  title: string;
  rowCount?: number;
  columnCount?: number;
}

export interface SpreadsheetDetails {
  spreadsheetId: string;
  title: string;
  spreadsheetUrl: string;
  sheets: SheetTabInfo[];
}

export interface SpeechLogEntry {
  type: string;
  title: string;
  wpm: number | string;
  pitchHz: number | string;
  volumeConsistency: number | string;
  clarityDb: number | string;
  overallScore: number | string;
  diagnostic: string;
}

export interface ModuleProgressEntry {
  userLevel: string;
  xp: number;
  completedCount: number;
  badgesCount: number;
  badgesList: string;
}

/**
 * Helper to ensure valid access token
 */
async function requireAccessToken(): Promise<string> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("Authentification Google requise. Veuillez vous connecter avec Google.");
  }
  return token;
}

/**
 * List the user's Google Sheets spreadsheets from Google Drive
 */
export async function listUserSpreadsheets(): Promise<DriveSpreadsheetFile[]> {
  const token = await requireAccessToken();
  const query = encodeURIComponent("mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false");
  const fields = encodeURIComponent("files(id, name, modifiedTime, webViewLink)");
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&pageSize=30&orderBy=modifiedTime desc`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Erreur lors de la récupération des classeurs (${res.status})`);
  }

  const data = await res.json();
  return data.files || [];
}

/**
 * Fetch detailed metadata of a specific spreadsheet
 */
export async function getSpreadsheetDetails(spreadsheetId: string): Promise<SpreadsheetDetails> {
  const token = await requireAccessToken();
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Erreur d'accès au classeur (${res.status})`);
  }

  const data = await res.json();
  const sheets: SheetTabInfo[] = (data.sheets || []).map((s: any) => ({
    sheetId: s.properties?.sheetId,
    title: s.properties?.title || 'Feuille',
    rowCount: s.properties?.gridProperties?.rowCount,
    columnCount: s.properties?.gridProperties?.columnCount,
  }));

  return {
    spreadsheetId: data.spreadsheetId,
    title: data.properties?.title || 'Classeur sans titre',
    spreadsheetUrl: data.spreadsheetUrl,
    sheets,
  };
}

/**
 * Fetch rows/values from a range in a spreadsheet
 */
export async function getSpreadsheetValues(spreadsheetId: string, range: string): Promise<string[][]> {
  const token = await requireAccessToken();
  const encodedRange = encodeURIComponent(range);
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Erreur de lecture des données (${res.status})`);
  }

  const data = await res.json();
  return data.values || [];
}

/**
 * Create a specialized Oratoria Google Sheet with two preformatted tabs:
 * 1. "Journal d'Éloquence" (for speech recordings and acoustic diagnostics)
 * 2. "Bilan Pédagogique" (for user levels, XP, badges, and completed lessons)
 */
export async function createOratoriaSpreadsheet(customTitle?: string): Promise<SpreadsheetDetails> {
  const token = await requireAccessToken();
  const dateStr = new Date().toLocaleDateString('fr-FR');
  const title = customTitle || `Oratoria - Journal d'Éloquence & Suivi (${dateStr})`;

  const payload = {
    properties: {
      title,
    },
    sheets: [
      {
        properties: {
          title: "Journal d'Éloquence",
          gridProperties: {
            frozenRowCount: 1,
          },
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: [
                  { userEnteredValue: { stringValue: "Date & Heure" } },
                  { userEnteredValue: { stringValue: "Type d'Exercice" } },
                  { userEnteredValue: { stringValue: "Titre / Sujet" } },
                  { userEnteredValue: { stringValue: "Débit (WPM)" } },
                  { userEnteredValue: { stringValue: "Pitch Moyen (Hz)" } },
                  { userEnteredValue: { stringValue: "Cohérence Vol. (%)" } },
                  { userEnteredValue: { stringValue: "Clarté SNR (dB)" } },
                  { userEnteredValue: { stringValue: "Score Global (/100)" } },
                  { userEnteredValue: { stringValue: "Verdict & Diagnostic Oratoire" } },
                ],
              },
            ],
          },
        ],
      },
      {
        properties: {
          title: "Bilan Pédagogique",
          gridProperties: {
            frozenRowCount: 1,
          },
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: [
                  { userEnteredValue: { stringValue: "Date & Heure" } },
                  { userEnteredValue: { stringValue: "Niveau Oratoire" } },
                  { userEnteredValue: { stringValue: "Points XP Cumulés" } },
                  { userEnteredValue: { stringValue: "Modules Complétés" } },
                  { userEnteredValue: { stringValue: "Nombre de Badges" } },
                  { userEnteredValue: { stringValue: "Liste des Distinctions" } },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Erreur lors de la création du classeur (${res.status})`);
  }

  const created = await res.json();
  return {
    spreadsheetId: created.spreadsheetId,
    title: created.properties?.title,
    spreadsheetUrl: created.spreadsheetUrl,
    sheets: (created.sheets || []).map((s: any) => ({
      sheetId: s.properties?.sheetId,
      title: s.properties?.title,
      rowCount: s.properties?.gridProperties?.rowCount,
      columnCount: s.properties?.gridProperties?.columnCount,
    })),
  };
}

/**
 * Append a speech practice or acoustic performance log entry into the sheet
 */
export async function appendSpeechLog(
  spreadsheetId: string,
  entry: SpeechLogEntry,
  targetSheetTitle = "Journal d'Éloquence"
): Promise<void> {
  const token = await requireAccessToken();
  const dateFormatted = new Date().toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const row = [
    dateFormatted,
    entry.type,
    entry.title,
    entry.wpm,
    entry.pitchHz,
    entry.volumeConsistency,
    entry.clarityDb,
    entry.overallScore,
    entry.diagnostic,
  ];

  const range = `${targetSheetTitle}!A:I`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [row],
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Erreur lors de l'enregistrement dans Google Sheets (${res.status})`);
  }
}

/**
 * Append current user curriculum progress snapshot to the spreadsheet
 */
export async function appendProgressSnapshot(
  spreadsheetId: string,
  progress: ModuleProgressEntry,
  targetSheetTitle = "Bilan Pédagogique"
): Promise<void> {
  const token = await requireAccessToken();
  const dateFormatted = new Date().toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const row = [
    dateFormatted,
    progress.userLevel,
    progress.xp,
    progress.completedCount,
    progress.badgesCount,
    progress.badgesList,
  ];

  const range = `${targetSheetTitle}!A:F`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [row],
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Erreur lors de l'export de progression (${res.status})`);
  }
}
