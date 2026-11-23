import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { JournalBrief } from '../data/studioData';

interface JournalModalProps {
  brief: JournalBrief | null;
  onClose: () => void;
}

export function JournalModal({ brief, onClose }: JournalModalProps) {
  useEffect(() => {
    if (!brief) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [brief, onClose]);

  if (!brief) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="journal-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white border border-[#E2E6ED] rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 backdrop-blur-xs border-b border-[#E2E6ED]">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <span>{brief.topic}</span>
            <span aria-hidden="true">·</span>
            <span>{brief.published}</span>
            <span aria-hidden="true">·</span>
            <span>{brief.readTime}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close technical brief"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E2E6ED] text-[#475569] hover:text-[#0F172A] hover:bg-[#F7F8FA] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <article className="p-6 sm:p-8 space-y-6">
          <header className="space-y-3 pb-5 border-b border-[#E2E6ED]">
            <h2
              id="journal-modal-title"
              className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A] text-balance"
            >
              {brief.title}
            </h2>
            <p className="text-sm text-[#475569]">
              By <span className="font-medium text-[#0F172A]">{brief.author}</span> · {brief.authorRole}
            </p>
          </header>

          <div className="p-4 bg-[#F7F8FA] border border-[#E2E6ED] rounded-lg">
            <p className="text-xs font-semibold text-[#1E40AF] mb-1">
              Key Research Finding
            </p>
            <p className="text-sm leading-relaxed text-[#0F172A]">
              {brief.keyTakeaway}
            </p>
          </div>

          <div className="space-y-6">
            {brief.sections.map((section) => (
              <section key={section.heading} className="space-y-2">
                <h3 className="font-display text-lg font-semibold text-[#0F172A]">
                  {section.heading}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#475569]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
