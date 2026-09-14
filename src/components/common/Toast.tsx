import React from 'react';
import { useAppStore } from '../../lib/store';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { state } = useAppStore();

  if (!state.toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 px-4 py-3 rounded-xl border border-stone-700 shadow-2xl flex items-center gap-3 text-xs max-w-sm animate-bounceOnce"
    >
      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
      <span className="font-medium leading-normal">{state.toastMessage}</span>
    </div>
  );
};
