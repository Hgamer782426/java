import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onScheduleClick: () => void;
}

const NAV_LINKS = [
  { href: '#practice', label: 'Practice' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#projects', label: 'Projects' },
  { href: '#journal', label: 'Journal' },
];

export function Navbar({ onScheduleClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F8FA]/95 backdrop-blur-sm border-b border-[#E2E6ED]">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#practice"
          className="font-display text-xl font-bold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF] rounded-sm"
        >
          Korsholm
        </a>

        {/* Zone 2: 4 single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 hover:text-[#0F172A] underline-offset-4 hover:underline transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onScheduleClick}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#1E40AF] hover:bg-[#1E3A8A] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
          >
            Schedule Consultation
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E2E6ED] bg-white text-[#0F172A] hover:bg-[#EEF1F5] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2E6ED] bg-white px-6 py-4 space-y-2">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="min-h-11 flex items-center text-base font-medium text-[#0F172A] hover:text-[#1E40AF] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#E2E6ED]">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onScheduleClick();
              }}
              className="w-full min-h-11 px-4 py-2.5 text-sm font-medium text-white bg-[#1E40AF] hover:bg-[#1E3A8A] rounded-lg transition-colors cursor-pointer"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
