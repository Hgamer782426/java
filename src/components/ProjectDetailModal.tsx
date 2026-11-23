import { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { ProjectCommission } from '../data/studioData';
import { ResilientImage } from './ResilientImage';

interface ProjectDetailModalProps {
  project: ProjectCommission | null;
  onClose: () => void;
  onRequestSimilar: (project: ProjectCommission) => void;
}

export function ProjectDetailModal({
  project,
  onClose,
  onRequestSimilar,
}: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-[#E2E6ED] rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 backdrop-blur-xs border-b border-[#E2E6ED]">
          <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.location}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{project.year}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project specifications"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E2E6ED] text-[#475569] hover:text-[#0F172A] hover:bg-[#F7F8FA] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Header & Photo */}
          <div className="space-y-4">
            <h2
              id="project-modal-title"
              className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A] text-balance"
            >
              {project.title}
            </h2>
            <p className="text-base text-[#1E40AF] font-medium">
              {project.headlineMetric}
            </p>
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border border-[#E2E6ED] bg-[#EEF1F5]">
              <ResilientImage
                src={project.image}
                alt={project.imageAlt}
                fallbackTitle={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#E2E6ED]">
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] mb-2">
                Site &amp; Engineering Constraint
              </h3>
              <p className="text-sm leading-relaxed text-[#475569]">
                {project.challenge}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] mb-2">
                Structural &amp; Acoustic Solution
              </h3>
              <p className="text-sm leading-relaxed text-[#475569]">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Measured Performance Table */}
          <div>
            <h3 className="text-sm font-semibold text-[#0F172A] mb-3">
              Verified Commissioning Metrics
            </h3>
            <div className="overflow-x-auto border border-[#E2E6ED] rounded-lg">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#F7F8FA] border-b border-[#E2E6ED] text-[#475569]">
                    <th className="py-2.5 px-4 font-medium">Parameter</th>
                    <th className="py-2.5 px-4 font-medium">Design Target</th>
                    <th className="py-2.5 px-4 font-medium">Measured Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E6ED]">
                  {project.specs.map((spec) => (
                    <tr key={spec.parameter} className="bg-white">
                      <td className="py-2.5 px-4 text-[#0F172A] font-medium">
                        {spec.parameter}
                      </td>
                      <td className="py-2.5 px-4 font-mono tabular-nums text-[#64748B]">
                        {spec.target}
                      </td>
                      <td className="py-2.5 px-4 font-mono tabular-nums font-medium text-[#0F172A]">
                        {spec.measured}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Attributable Testimonial */}
          <blockquote className="p-5 bg-[#F7F8FA] border border-[#E2E6ED] rounded-lg space-y-3">
            <p className="text-sm sm:text-base leading-relaxed text-[#0F172A]">
              &ldquo;{project.testimonial.quote}&rdquo;
            </p>
            <footer className="flex flex-wrap items-center gap-x-2 text-xs text-[#475569]">
              <span className="font-semibold text-[#0F172A]">
                {project.testimonial.author}
              </span>
              <span aria-hidden="true">·</span>
              <span>{project.testimonial.role}</span>
              <span aria-hidden="true">·</span>
              <span>{project.testimonial.organization}</span>
            </footer>
          </blockquote>

          {/* Modal Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E2E6ED]">
            <span className="text-xs text-[#64748B]">
              Gross Floor Area: <strong className="font-mono tabular-nums text-[#0F172A]">{project.areaSqm}</strong>
            </span>
            <button
              type="button"
              onClick={() => onRequestSimilar(project)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#1E40AF] hover:bg-[#1E3A8A] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
            >
              <span>Request Similar Feasibility Study</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
