import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { TYPOLOGY_OPTIONS } from '../data/studioData';

interface ConsultationFormProps {
  preselectedTypologyId?: string;
  preselectedContextNote?: string;
}

interface FormErrors {
  fullName?: string;
  organization?: string;
  email?: string;
  brief?: string;
}

export function ConsultationForm({
  preselectedTypologyId,
  preselectedContextNote,
}: ConsultationFormProps) {
  const [typologyId, setTypologyId] = useState<string>(
    preselectedTypologyId || TYPOLOGY_OPTIONS[0].id
  );
  const [areaSqm, setAreaSqm] = useState<number>(3500);
  const [studioOffice, setStudioOffice] = useState<'Copenhagen' | 'Zurich'>('Copenhagen');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedSummary, setSubmittedSummary] = useState<{
    referenceCode: string;
    name: string;
    email: string;
    typology: string;
    areaSqm: number;
    office: string;
  } | null>(null);

  useEffect(() => {
    if (preselectedTypologyId) {
      setTypologyId(preselectedTypologyId);
    }
  }, [preselectedTypologyId]);

  useEffect(() => {
    if (preselectedContextNote) {
      setBrief(preselectedContextNote);
    }
  }, [preselectedContextNote]);

  const activeTypology =
    TYPOLOGY_OPTIONS.find((item) => item.id === typologyId) || TYPOLOGY_OPTIONS[0];

  const estimatedEngineeringWeeks = Math.round(
    activeTypology.baseWeeks + (areaSqm / 1000) * activeTypology.weeksPer1000Sqm
  );

  // Typical concrete frame ~420 kgCO2e/m2; mass-timber reduction based on typology
  const estimatedCarbonSavedTonnes = Math.round(
    (areaSqm * 0.42 * activeTypology.carbonReductionPct) / 100
  );

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!organization.trim()) {
      nextErrors.organization = 'Please specify your municipality, institution, or firm.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      nextErrors.email = 'Please enter a valid work email address.';
    }
    if (!brief.trim() || brief.trim().length < 15) {
      nextErrors.brief = 'Please share a short summary of your site or acoustic goals (at least 15 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const randomRef = `KH-${new Date().getFullYear()}-${String(
      Math.floor(1000 + Math.random() * 9000)
    )}`;

    setSubmittedSummary({
      referenceCode: randomRef,
      name: fullName.trim(),
      email: email.trim(),
      typology: activeTypology.label,
      areaSqm,
      office: studioOffice,
    });
  };

  const handleReset = () => {
    setSubmittedSummary(null);
    setFullName('');
    setOrganization('');
    setEmail('');
    setBrief('');
    setErrors({});
  };

  if (submittedSummary) {
    return (
      <div className="bg-white border border-[#E2E6ED] rounded-xl p-8 space-y-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#1E40AF] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <h3 className="font-display text-xl font-semibold text-[#0F172A]">
              Consultation Request Received
            </h3>
            <p className="text-sm text-[#475569]">
              A partner in our {submittedSummary.office} studio will review your scope and respond within two business days.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#F7F8FA] border border-[#E2E6ED] rounded-lg text-sm">
          <div>
            <span className="block text-xs text-[#64748B]">Reference</span>
            <span className="font-mono tabular-nums font-medium text-[#0F172A]">
              {submittedSummary.referenceCode}
            </span>
          </div>
          <div>
            <span className="block text-xs text-[#64748B]">Program Typology</span>
            <span className="font-medium text-[#0F172A]">
              {submittedSummary.typology}
            </span>
          </div>
          <div>
            <span className="block text-xs text-[#64748B]">Estimated Floor Area</span>
            <span className="font-mono tabular-nums font-medium text-[#0F172A]">
              {submittedSummary.areaSqm.toLocaleString()} m²
            </span>
          </div>
        </div>

        <p className="text-xs text-[#64748B]">
          Confirmation copy prepared for <span className="text-[#0F172A] font-medium">{submittedSummary.email}</span>.
        </p>

        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium text-[#0F172A] bg-white border border-[#E2E6ED] hover:bg-[#F7F8FA] rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Interactive Scope Estimator Column */}
      <div className="lg:col-span-5 bg-white border border-[#E2E6ED] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1.5">
          <h3 className="font-display text-xl font-semibold text-[#0F172A]">
            Preliminary Scope Benchmark
          </h3>
          <p className="text-sm text-[#475569]">
            Adjust building typology and floor area to estimate structural engineering duration and embodied carbon savings.
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-semibold text-[#475569]">
            Building Typology
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TYPOLOGY_OPTIONS.map((option) => {
              const active = option.id === typologyId;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setTypologyId(option.id)}
                  className={`px-3.5 py-2.5 text-left text-xs font-medium rounded-lg border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] ${
                    active
                      ? 'bg-[#1E40AF] text-white border-[#1E40AF]'
                      : 'bg-[#F7F8FA] text-[#0F172A] border-[#E2E6ED] hover:bg-[#EEF1F5]'
                  }`}
                >
                  <span className="block truncate">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="area-slider" className="font-semibold text-[#475569]">
              Gross Floor Area
            </label>
            <span className="font-mono tabular-nums font-medium text-[#0F172A]">
              {areaSqm.toLocaleString()} m²
            </span>
          </div>
          <input
            id="area-slider"
            type="range"
            min={500}
            max={20000}
            step={250}
            value={areaSqm}
            onChange={(e) => setAreaSqm(Number(e.target.value))}
            className="w-full accent-[#1E40AF] cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono tabular-nums text-[#64748B]">
            <span>500 m²</span>
            <span>10,000 m²</span>
            <span>20,000 m²</span>
          </div>
        </div>

        {/* Live Calculated Benchmark Readout */}
        <div className="pt-4 border-t border-[#E2E6ED] grid grid-cols-3 gap-4">
          <div>
            <span className="block text-[11px] text-[#64748B]">Design &amp; BIM</span>
            <span className="font-mono tabular-nums text-lg font-semibold text-[#0F172A]">
              {estimatedEngineeringWeeks} wks
            </span>
          </div>
          <div>
            <span className="block text-[11px] text-[#64748B]">Carbon Avoided</span>
            <span className="font-mono tabular-nums text-lg font-semibold text-[#0F172A]">
              {estimatedCarbonSavedTonnes.toLocaleString()} t
            </span>
          </div>
          <div>
            <span className="block text-[11px] text-[#64748B]">Target RT60</span>
            <span className="font-mono tabular-nums text-sm font-semibold text-[#0F172A] leading-7">
              {activeTypology.typicalRt60}
            </span>
          </div>
        </div>
      </div>

      {/* Validated Inquiry Form Column */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="lg:col-span-7 bg-white border border-[#E2E6ED] rounded-xl p-6 sm:p-8 space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E6ED]">
          <div>
            <h3 className="font-display text-xl font-semibold text-[#0F172A]">
              Schedule a Feasibility Review
            </h3>
            <p className="text-xs text-[#64748B]">
              Direct review with structural and acoustic partners.
            </p>
          </div>
          <div className="inline-flex items-center gap-1 p-1 bg-[#F7F8FA] border border-[#E2E6ED] rounded-lg self-start">
            {(['Copenhagen', 'Zurich'] as const).map((office) => (
              <button
                key={office}
                type="button"
                onClick={() => setStudioOffice(office)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  studioOffice === office
                    ? 'bg-white text-[#0F172A] shadow-xs border border-[#E2E6ED]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {office} Studio
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="full-name" className="block text-xs font-medium text-[#0F172A]">
              Full Name
            </label>
            <input
              id="full-name"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
              }}
              placeholder="e.g. Astrid Lindholm"
              aria-invalid={Boolean(errors.fullName)}
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-2 focus:outline-offset-0 focus:outline-[#1E40AF] ${
                errors.fullName ? 'border-red-600' : 'border-[#E2E6ED]'
              }`}
            />
            {errors.fullName && (
              <p className="flex items-center gap-1.5 text-xs text-red-700">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="organization" className="block text-xs font-medium text-[#0F172A]">
              Organization or Municipality
            </label>
            <input
              id="organization"
              type="text"
              value={organization}
              onChange={(e) => {
                setOrganization(e.target.value);
                if (errors.organization) setErrors((prev) => ({ ...prev, organization: undefined }));
              }}
              placeholder="e.g. City of Aarhus Cultural Board"
              aria-invalid={Boolean(errors.organization)}
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-2 focus:outline-offset-0 focus:outline-[#1E40AF] ${
                errors.organization ? 'border-red-600' : 'border-[#E2E6ED]'
              }`}
            />
            {errors.organization && (
              <p className="flex items-center gap-1.5 text-xs text-red-700">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.organization}</span>
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="work-email" className="block text-xs font-medium text-[#0F172A]">
            Work Email
          </label>
          <input
            id="work-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="name@organization.org"
            aria-invalid={Boolean(errors.email)}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-2 focus:outline-offset-0 focus:outline-[#1E40AF] ${
              errors.email ? 'border-red-600' : 'border-[#E2E6ED]'
            }`}
          />
          {errors.email && (
            <p className="flex items-center gap-1.5 text-xs text-red-700">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="project-brief" className="block text-xs font-medium text-[#0F172A]">
            Project Context &amp; Target Schedule
          </label>
          <textarea
            id="project-brief"
            rows={4}
            value={brief}
            onChange={(e) => {
              setBrief(e.target.value);
              if (errors.brief) setErrors((prev) => ({ ...prev, brief: undefined }));
            }}
            placeholder="Describe site constraints, structural span requirements, acoustic goals, or target tender dates."
            aria-invalid={Boolean(errors.brief)}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-2 focus:outline-offset-0 focus:outline-[#1E40AF] ${
              errors.brief ? 'border-red-600' : 'border-[#E2E6ED]'
            }`}
          />
          {errors.brief && (
            <p className="flex items-center gap-1.5 text-xs text-red-700">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.brief}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <span className="text-xs text-[#64748B]">
            Selected scope: {activeTypology.label} · {areaSqm.toLocaleString()} m²
          </span>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[#1E40AF] hover:bg-[#1E3A8A] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
          >
            Request Feasibility Review
          </button>
        </div>
      </form>
    </div>
  );
}
