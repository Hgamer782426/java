/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  CAPABILITIES,
  HERO_MEDIA,
  HERO_METRICS,
  JOURNAL_BRIEFS,
  PROJECTS,
  type JournalBrief,
  type ProjectCategory,
  type ProjectCommission,
} from './data/studioData';
import { Navbar } from './components/Navbar';
import { ResilientImage } from './components/ResilientImage';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { JournalModal } from './components/JournalModal';
import { ConsultationForm } from './components/ConsultationForm';

const PROJECT_FILTERS: ProjectCategory[] = [
  'All',
  'Cultural',
  'Civic & Transit',
  'Acoustic Labs',
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<ProjectCommission | null>(null);
  const [activeBrief, setActiveBrief] = useState<JournalBrief | null>(null);
  const [preselectedTypology, setPreselectedTypology] = useState<string | undefined>(undefined);
  const [preselectedNote, setPreselectedNote] = useState<string | undefined>(undefined);

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === selectedCategory);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestSimilar = (project: ProjectCommission) => {
    const typologyMap: Record<ProjectCommission['category'], string> = {
      Cultural: 'cultural',
      'Civic & Transit': 'civic',
      'Acoustic Labs': 'acoustic',
    };
    setPreselectedTypology(typologyMap[project.category]);
    setPreselectedNote(
      `Requesting feasibility review benchmarked against ${project.title} (${project.areaSqm}).`
    );
    setActiveProject(null);
    setTimeout(scrollToContact, 80);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#0F172A]">
      <Navbar onScheduleClick={scrollToContact} />

      <main className="flex-1">
        {/* 1. Hero Section: Proposition + Single Primary CTA + 16:9 Architectural Focal Image */}
        <section id="practice" className="border-b border-[#E2E6ED] bg-white">
          <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-16 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-5 flex flex-col justify-between gap-8">
                <div className="space-y-5">
                  <p className="text-xs font-medium text-[#64748B]">
                    Copenhagen · Zurich · ISO 14001 Timber &amp; Acoustic Practice
                  </p>
                  <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08] font-semibold tracking-tight text-[#0F172A] text-balance">
                    Mass-timber structures tuned for quiet civic life.
                  </h1>
                  <p className="text-base leading-relaxed text-[#475569] max-w-[52ch]">
                    Korsholm engineers long-span glulam buildings, concert halls, and transit canopies where structural carpentry and room acoustics work as a single precision system.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1E40AF] hover:bg-[#1E3A8A] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
                  >
                    <span>Schedule Discovery Call</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0F172A] hover:text-[#1E40AF] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF] rounded-sm"
                  >
                    <span>Inspect Case Studies</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col">
                <figure className="flex-1 flex flex-col overflow-hidden rounded-xl border border-[#E2E6ED] bg-[#EEF1F5]">
                  <ResilientImage
                    src={HERO_MEDIA.image}
                    alt={HERO_MEDIA.alt}
                    fallbackTitle="Nordhavn Botanical Pavilion"
                    className="w-full aspect-[16/9] lg:aspect-auto lg:h-full object-cover"
                  />
                  <figcaption className="px-4 py-2.5 bg-white border-t border-[#E2E6ED] text-xs text-[#64748B]">
                    {HERO_MEDIA.caption}
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Full-Width 4-Column Quantified Metrics Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#E2E6ED]">
              {HERO_METRICS.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="font-mono tabular-nums text-2xl sm:text-3xl font-medium tracking-tight text-[#0F172A]">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#475569]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Core Capabilities: Asymmetric Bento Grid with Editorial Numbering */}
        <section id="capabilities" className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-medium text-[#1E40AF]">
                Engineering Disciplines
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance">
                Integrated structural, acoustic, and daylight engineering.
              </h2>
            </div>
            <p className="text-sm text-[#475569] max-w-sm">
              Every commission pairs structural engineers with acoustic physicists from schematic massing through CNC millwork.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap) => {
              if (cap.featured && cap.image) {
                return (
                  <article
                    key={cap.id}
                    className="lg:col-span-2 bg-white border border-[#E2E6ED] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
                  >
                    <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
                      <div className="space-y-3">
                        <div className="text-xs font-mono text-[#64748B]">
                          {cap.index} {cap.subtitle}
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#0F172A]">
                          {cap.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#475569]">
                          {cap.description}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-[#E2E6ED] space-y-1.5">
                        <div className="font-mono tabular-nums text-xs font-medium text-[#1E40AF]">
                          {cap.metric}
                        </div>
                        <div className="text-xs text-[#64748B]">
                          {cap.deliverables}
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-5 bg-[#EEF1F5] border-t md:border-t-0 md:border-l border-[#E2E6ED]">
                      <ResilientImage
                        src={cap.image}
                        alt={cap.imageAlt || cap.title}
                        fallbackTitle={cap.title}
                        className="w-full h-full min-h-[220px] object-cover"
                      />
                    </div>
                  </article>
                );
              }

              return (
                <article
                  key={cap.id}
                  className="bg-white border border-[#E2E6ED] rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-[#64748B]">
                      {cap.index} {cap.subtitle}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#0F172A]">
                      {cap.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#475569]">
                      {cap.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#E2E6ED] space-y-1.5">
                    <div className="font-mono tabular-nums text-xs font-medium text-[#1E40AF]">
                      {cap.metric}
                    </div>
                    <div className="text-xs text-[#64748B]">
                      {cap.deliverables}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 3. Selected Commissions & Proof of Impact */}
        <section id="projects" className="bg-white border-y border-[#E2E6ED]">
          <div className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs font-medium text-[#1E40AF]">
                  Built Work &amp; Commissioning Proof
                </p>
                <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance">
                  Measured performance across recent civic commissions.
                </h2>
              </div>

              {/* Interactive Filter Controls */}
              <div
                role="tablist"
                aria-label="Filter projects by typology"
                className="flex flex-wrap items-center gap-1 p-1 bg-[#F7F8FA] border border-[#E2E6ED] rounded-lg self-start"
              >
                {PROJECT_FILTERS.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] ${
                        isActive
                          ? 'bg-white text-[#0F172A] shadow-xs border border-[#E2E6ED]'
                          : 'text-[#475569] hover:text-[#0F172A]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="group bg-[#F7F8FA] border border-[#E2E6ED] rounded-xl overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-[#CBD5E1]"
                >
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#EEF1F5] border-b border-[#E2E6ED]">
                      <ResilientImage
                        src={project.image}
                        alt={project.imageAlt}
                        fallbackTitle={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-6 sm:p-8 space-y-3">
                      {/* Unboxed Metadata */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                        <span>{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.location}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{project.areaSqm}</span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#0F172A]">
                        {project.title}
                      </h3>

                      <p className="text-sm font-medium text-[#1E40AF]">
                        {project.headlineMetric}
                      </p>

                      <p className="text-sm leading-relaxed text-[#475569]">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0F172A] hover:text-[#1E40AF] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF] rounded-sm"
                    >
                      <span>View Acoustic &amp; Structural Specs</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <span className="font-mono tabular-nums text-xs text-[#64748B]">
                      {project.year}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Client Proof & Technical Journal */}
        <section id="journal" className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Attributable Endorsements Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-medium text-[#1E40AF]">
                  Partner Endorsements
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A]">
                  Commissioning outcomes from public clients.
                </h2>
              </div>

              <div className="space-y-6">
                {PROJECTS.slice(0, 2).map((project) => (
                  <blockquote
                    key={project.id}
                    className="bg-white border border-[#E2E6ED] rounded-xl p-6 space-y-4"
                  >
                    <p className="text-sm sm:text-base leading-relaxed text-[#0F172A]">
                      &ldquo;{project.testimonial.quote}&rdquo;
                    </p>
                    <footer className="pt-3 border-t border-[#E2E6ED] flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
                      <div>
                        <span className="font-semibold text-[#0F172A]">
                          {project.testimonial.author}
                        </span>
                        <span aria-hidden="true"> · </span>
                        <span>
                          {project.testimonial.role}, {project.testimonial.organization}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="font-medium text-[#1E40AF] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {project.title.split(' ')[0]} Case
                      </button>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Technical Briefs Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-medium text-[#1E40AF]">
                  Practice Journal
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A]">
                  Published research &amp; engineering notes.
                </h2>
              </div>

              <div className="space-y-4">
                {JOURNAL_BRIEFS.map((brief) => (
                  <article
                    key={brief.id}
                    className="bg-white border border-[#E2E6ED] rounded-xl p-6 space-y-3 hover:border-[#CBD5E1] transition-colors"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                      <span>{brief.topic}</span>
                      <span aria-hidden="true">·</span>
                      <span>{brief.published}</span>
                      <span aria-hidden="true">·</span>
                      <span>{brief.readTime}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#0F172A]">
                      {brief.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#475569]">
                      {brief.excerpt}
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveBrief(brief)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1E40AF] hover:underline cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF] rounded-sm"
                      >
                        <span>Read Engineering Brief</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Interactive Scope Estimator & Consultation Form */}
        <section id="contact" className="bg-white border-t border-[#E2E6ED]">
          <div className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24 space-y-10">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-medium text-[#1E40AF]">
                New Commissions &amp; Feasibility
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance">
                Start a structural or acoustic feasibility review.
              </h2>
              <p className="text-sm sm:text-base text-[#475569]">
                Share your program parameters for an initial timber-frame schedule and embodied carbon assessment.
              </p>
            </div>

            <ConsultationForm
              preselectedTypologyId={preselectedTypology}
              preselectedContextNote={preselectedNote}
            />
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#F7F8FA] border-t border-[#E2E6ED]">
        <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-2">
            <a
              href="#practice"
              className="font-display text-lg font-bold tracking-tight text-[#0F172A]"
            >
              Korsholm
            </a>
            <p className="text-xs leading-relaxed text-[#64748B] max-w-xs">
              Architectural engineering and spatial acoustics practice designing low-carbon timber civic structures across Northern Europe.
            </p>
          </div>

          <div className="md:col-span-4 space-y-2 text-xs text-[#475569]">
            <p className="font-semibold text-[#0F172A]">Studios</p>
            <p>Bredgade 45, 1260 København K, Denmark</p>
            <p>Limmatquai 112, 8001 Zürich, Switzerland</p>
            <p className="font-mono text-[#64748B] pt-1">studio@korsholm-arch.eu</p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs text-[#475569]">
            <p className="font-semibold text-[#0F172A]">Sections</p>
            <ul className="space-y-1.5">
              <li>
                <a href="#practice" className="hover:text-[#0F172A] hover:underline">
                  Practice
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-[#0F172A] hover:underline">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#0F172A] hover:underline">
                  Projects
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-[#0F172A] hover:underline">
                  Journal
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#E2E6ED]">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#64748B]">
            <span>© {new Date().getFullYear()} Korsholm Arkitekter &amp; Akustik ApS. All rights reserved.</span>
            <span>ISO 14001 · Eurocode 5 Certified Practice</span>
          </div>
        </div>
      </footer>

      {/* Interactive Detail Modals */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onRequestSimilar={handleRequestSimilar}
      />

      <JournalModal
        brief={activeBrief}
        onClose={() => setActiveBrief(null)}
      />
    </div>
  );
}
