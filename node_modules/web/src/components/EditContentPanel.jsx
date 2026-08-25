import React, { useState } from 'react';
import { useEditableContent } from '@/contexts/EditableContent.jsx';
import { X, Save, RefreshCw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EditContentPanel() {
  const { content, updateContent, resetContent, isEditMode, toggleEditMode } = useEditableContent();
  const [activeTab, setActiveTab] = useState('hero');
  const [saved, setSaved] = useState(false);

  if (!isEditMode) return null;

  const sections = Object.keys(content);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-[100] w-full md:w-[450px] bg-background/95 backdrop-blur-3xl border-l border-primary/20 shadow-2xl flex flex-col h-[100dvh] animate-in slide-in-from-right">
      <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0 bg-background">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Editor de Conteúdo
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Alterações são aplicadas em tempo real.</p>
        </div>
        <button 
          onClick={toggleEditMode}
          className="p-2 hover:bg-white/10 rounded-full transition-colors touch-target"
        >
          <X className="w-5 h-5 text-muted-foreground hover:text-white" />
        </button>
      </div>

      <div className="flex overflow-x-auto shrink-0 border-b border-white/10 p-2 scrollbar-hide">
        {sections.map(section => (
          <button
            key={section}
            onClick={() => setActiveTab(section)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors touch-target",
              activeTab === section 
                ? "bg-primary/20 text-primary border border-primary/30" 
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            )}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {Object.entries(content[activeTab]).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="text-sm font-semibold text-white/80 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            {value.length > 60 ? (
              <textarea
                value={value}
                onChange={(e) => updateContent(activeTab, key, e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all min-h-[120px] resize-y"
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => updateContent(activeTab, key, e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all touch-target"
              />
            )}
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-white/10 shrink-0 bg-background/50 flex gap-4">
        <button
          onClick={resetContent}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors touch-target font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Restaurar
        </button>
        <button
          onClick={handleSave}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98] touch-target font-bold shadow-[0_0_20px_hsla(var(--primary)/0.3)]"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Salvo!' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}