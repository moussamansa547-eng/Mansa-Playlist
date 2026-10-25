import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi, CheckCircle2, X } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useLanguage } from '../context/LanguageContext';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, wasOffline } = useOnlineStatus();
  const [showReconnected, setShowReconnected] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { t } = useLanguage();

  // Reset dismissal whenever connection state changes back to online
  useEffect(() => {
    if (isOnline) {
      setIsDismissed(false);
    }
  }, [isOnline]);

  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (!isOnline && !isDismissed) {
    return (
      <aside
        aria-label={t('offline.active')}
        className="fixed bottom-20 lg:bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-slate-900/95 px-3.5 py-2 text-xs font-medium text-amber-300 shadow-xl shadow-black/40 backdrop-blur-md animate-in slide-in-from-bottom-2 duration-300 max-w-[90vw]"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
        <WifiOff className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5 text-left pr-1">
          <span className="font-semibold text-slate-100">{t('offline.active')}</span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">•</span>
          <span className="text-slate-300 text-[11px]">{t('offline.desc')}</span>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="ml-auto p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          title={t('offline.close')}
          aria-label={t('offline.close')}
        >
          <X className="w-4 h-4" />
        </button>
      </aside>
    );
  }

  if (showReconnected) {
    return (
      <aside
        aria-label={t('offline.reconnected')}
        className="fixed bottom-20 lg:bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-slate-900/95 px-3.5 py-2 text-xs font-medium text-emerald-300 shadow-xl shadow-black/40 backdrop-blur-md animate-in slide-in-from-bottom-2 fade-out duration-300"
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
        <Wifi className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
        <span className="text-slate-100 font-medium">{t('offline.reconnected')}</span>
        <button
          onClick={() => setShowReconnected(false)}
          className="ml-2 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          title={t('offline.close')}
          aria-label={t('offline.close')}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </aside>
    );
  }

  return null;
};
