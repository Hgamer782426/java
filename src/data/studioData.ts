export type ProjectCategory = 'All' | 'Cultural' | 'Civic & Transit' | 'Acoustic Labs';

export interface TechnicalSpec {
  parameter: string;
  target: string;
  measured: string;
}

export interface ProjectCommission {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  location: string;
  year: string;
  areaSqm: string;
  headlineMetric: string;
  summary: string;
  challenge: string;
  solution: string;
  image: string;
  imageAlt: string;
  specs: TechnicalSpec[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    organization: string;
  };
}

export interface CapabilityItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string;
  metric: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
}

export interface JournalBrief {
  id: string;
  title: string;
  topic: string;
  published: string;
  readTime: string;
  author: string;
  authorRole: string;
  excerpt: string;
  sections: {
    heading: string;
    body: string;
  }[];
  keyTakeaway: string;
}

export interface TypologyOption {
  id: string;
  label: string;
  weeksPer1000Sqm: number;
  baseWeeks: number;
  carbonReductionPct: number;
  typicalRt60: string;
}

export const HERO_MEDIA = {
  image: '/src/assets/images/hero_timber_pavilion_1795449567799.jpg',
  alt: 'Nordic mass-timber and glass cultural pavilion on a limestone plaza at golden hour',
  caption: 'Nordhavn Botanical Pavilion · Copenhagen · Completed 2025',
};

export const HERO_METRICS = [
  { value: '42', label: 'Civic & Cultural Commissions' },
  { value: '0.38s', label: 'Median Acoustic RT60 Variance' },
  { value: '-48%', label: 'Embodied Carbon vs Concrete' },
  { value: '14', label: 'Nordic Timber Engineering Awards' },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'mass-timber',
    index: '01.',
    title: 'Mass Timber Structural Systems',
    subtitle: 'Long-Span Glulam & Hybrid Steel Joinery',
    description:
      'We engineer clear-span cross-laminated timber and beech LVL frames that cut structural dead weight by half while meeting strict Eurocode fire and seismic ratings.',
    deliverables: 'BIM Level 400 Fabrication Models · CNC Joinery Schedules · Lifecycle Carbon Audits',
    metric: 'Up to 32m column-free timber spans',
    featured: true,
    image: '/src/assets/images/studio_material_detail_1795449570271.jpg',
    imageAlt: 'Scale model of a precision timber and steel structural joint beside architectural blueprints',
  },
  {
    id: 'room-acoustics',
    index: '02.',
    title: 'Room Acoustics & Sound Isolation',
    subtitle: 'Psychoacoustic Ray-Tracing & Timber Baffles',
    description:
      'Integrated wall louvers and Helmholtz cavity resonators sculpted directly into structural timber surfaces eliminate suspended synthetic ceiling tiles.',
    deliverables: '3D Odeon Acoustic Models · Reverberation Tuning · Floating Slab Isolation',
    metric: '±0.05s target RT60 calibration',
  },
  {
    id: 'daylight-envelope',
    index: '03.',
    title: 'Passive Daylight & Thermal Envelopes',
    subtitle: 'Clerestory Geometry & Triple-Glazed Facades',
    description:
      'Orientation-calibrated timber brise-soleil and high-bay clerestories balance year-round northern daylight penetration without summer solar overheating.',
    deliverables: 'Annual Daylight Autonomy Models · Thermal Bridge Analysis · Natural Ventilation',
    metric: '38 kWh/m² annual heating demand',
  },
  {
    id: 'modular-prefab',
    index: '04.',
    title: 'Prefabricated Assembly & Disassembly',
    subtitle: 'Dry-Bolted Reversible Connections',
    description:
      'Every primary beam-to-column node uses dry-bolted concealed steel plates, enabling rapid crane erection on site and full component reuse at end of building life.',
    deliverables: 'Off-Site Cassette Sequencing · Crane Rigging Plans · Material Passports',
    metric: '40% faster on-site erection schedule',
  },
];

export const PROJECTS: ProjectCommission[] = [
  {
    id: 'aarhus-chamber-hall',
    title: 'Aarhus Chamber Music Conservatory',
    category: 'Cultural',
    location: 'Aarhus, Denmark',
    year: '2025',
    areaSqm: '3,400 m²',
    headlineMetric: '1.18s Tuned Reverberation Across 480 Seats',
    summary:
      'A 480-seat recital hall framed entirely in acoustic Nordic birch and engineered spruce, isolating harbor traffic noise to below NC-15.',
    challenge:
      'The waterfront site sits 65 meters from an active freight rail spur, creating 74 dB low-frequency ground vibration peaks during rehearsals.',
    solution:
      'We floated the entire timber box-in-box auditorium on elastomeric helical springs and CNC-milled 1,420 variable-depth birch louvers to scatter mid-frequency reflections.',
    image: '/src/assets/images/case_concert_hall_1795449570099.jpg',
    imageAlt: 'Interior of a contemporary chamber music concert hall with sculpted pale birch acoustic wall louvers',
    specs: [
      { parameter: 'Unoccupied RT60 (500 Hz)', target: '1.20 s', measured: '1.18 s' },
      { parameter: 'Background Noise Criterion', target: 'NC-18', measured: 'NC-14' },
      { parameter: 'Embodied Carbon (A1–A3)', target: '240 kgCO2e/m²', measured: '198 kgCO2e/m²' },
      { parameter: 'Structural Span', target: '24.0 m', measured: '24.6 m' },
    ],
    testimonial: {
      quote:
        'Before commissioning the hall, our chamber ensembles struggled with harsh slap-echo in renovated concrete rooms. Korsholm integrated acoustic diffusion directly into the load-bearing birch walls, giving us concert-grade clarity without a single visible speaker or foam panel.',
      author: 'Henrik Lindqvist',
      role: 'Artistic Director',
      organization: 'Jutland Chamber Conservatory',
    },
  },
  {
    id: 'basel-civic-library',
    title: 'Rheinbogen Public Library & Reading Atrium',
    category: 'Civic & Transit',
    location: 'Basel, Switzerland',
    year: '2024',
    areaSqm: '6,200 m²',
    headlineMetric: '-54% Embodied Carbon vs Reinforced Concrete',
    summary:
      'Three-story civic reading hall spanned by asymmetrical Douglas fir trusses that bring diffused northern daylight deep into study floors.',
    challenge:
      'Municipal sustainability mandates required net-negative structural carbon while maintaining quiet 38 dBA reading zones inside an open multi-level atrium.',
    solution:
      'Perforated ash acoustic soffits backed with recycled sheep-wool absorption paired with a 28-meter reciprocal glulam roof truss reduced steel tonnage by 61%.',
    image: '/src/assets/images/case_civic_library_1795449570306.jpg',
    imageAlt: 'Sunlit civic library atrium featuring soaring glulam timber trusses and pale ash reading tables',
    specs: [
      { parameter: 'Reading Room Ambient Level', target: '≤ 40 dBA', measured: '36.5 dBA' },
      { parameter: 'Daylight Autonomy (300 lux)', target: '75%', measured: '84%' },
      { parameter: 'Embodied Carbon Reduction', target: '-40%', measured: '-54%' },
      { parameter: 'On-Site Frame Erection', target: '16 weeks', measured: '11 weeks' },
    ],
    testimonial: {
      quote:
        'Prior municipal builds ran months behind due to cast-in-place curing delays. With Korsholm’s pre-engineered timber cassettes, our 6,200 m² roof structure closed in eleven weeks and cut winter heating demand nearly in half.',
      author: 'Dr. Sabine Meier-Vogt',
      role: 'Chief Municipal Architect',
      organization: 'Canton Basel-Stadt Building Dept.',
    },
  },
  {
    id: 'nordhavn-transit-concourse',
    title: 'Central Plaza Light-Rail Canopy',
    category: 'Civic & Transit',
    location: 'Malmö, Sweden',
    year: '2024',
    areaSqm: '4,950 m²',
    headlineMetric: '14.5m Timber Cantilever Erected in 18 Nights',
    summary:
      'Weather-shielded tramway concourse combining salt-resistant brushed duplex steel columns with prefabricated larch roof ribs.',
    challenge:
      'Platform canopies had to be installed over live electrified tram tracks exclusively during four-hour overnight maintenance windows.',
    solution:
      'Pre-stressed timber-steel Vierendeel cassettes were craned directly from flatbed trailers onto pre-leveled baseplates, locking in place with four-bolt shear pins.',
    image: '/src/assets/images/case_transit_canopy_1795449570022.jpg',
    imageAlt: 'Cantilevered mass-timber and brushed steel civic transit canopy over a granite concourse at twilight',
    specs: [
      { parameter: 'Cantilever Projection', target: '14.0 m', measured: '14.5 m' },
      { parameter: 'Nightly Installation Pace', target: '2 bays / night', measured: '3 bays / night' },
      { parameter: 'Design Service Life', target: '75 years', measured: '100 years' },
      { parameter: 'Wind Uplift Rating', target: '2.4 kN/m²', measured: '2.9 kN/m²' },
    ],
    testimonial: {
      quote:
        'Closing the central tram corridor was off the table. Korsholm engineered modular larch bays that clicked onto steel piers between midnight and 4:00 AM with zero commuter disruption.',
      author: 'Anders Nyqvist',
      role: 'Director of Rail Infrastructure',
      organization: 'Skåne Regional Transit',
    },
  },
  {
    id: 'zurich-acoustic-pavilion',
    title: 'ETH Timber & Psychoacoustics Test Pavilion',
    category: 'Acoustic Labs',
    location: 'Zurich, Switzerland',
    year: '2025',
    areaSqm: '1,850 m²',
    headlineMetric: 'Variable 0.4s–1.9s Mechanical Baffle Tuning',
    summary:
      'Reconfigurable timber research pavilion equipped with motorized rotating wall fins for testing spatial speech intelligibility and ensemble acoustics.',
    challenge:
      'Researchers needed a single structural shell capable of shifting rapidly between dry speech studio acoustics and resonant choral hall conditions.',
    solution:
      'Dual-sided beechwood acoustic fins rotate 180 degrees via silent belt drives, exposing either mineral wool absorbers or dense parabolic oak reflectors.',
    image: '/src/assets/images/hero_timber_pavilion_1795449567799.jpg',
    imageAlt: 'Mass-timber and glass architectural pavilion on a clean limestone plaza',
    specs: [
      { parameter: 'Variable RT60 Range', target: '0.5–1.8 s', measured: '0.42–1.94 s' },
      { parameter: 'Speech Transmission Index', target: '0.78 STI', measured: '0.83 STI' },
      { parameter: 'Reconfiguration Cycle', target: '≤ 120 s', measured: '78 s' },
      { parameter: 'Reversible Timber Share', target: '85%', measured: '94%' },
    ],
    testimonial: {
      quote:
        'Our faculty previously needed three separate off-campus labs to test spatial sound fields. Having a single reconfigurable timber hall with silent motorized fins doubled our weekly experimental throughput.',
      author: 'Prof. Lukas Steiner',
      role: 'Chair of Architectural Acoustics',
      organization: 'Swiss Federal Acoustic Research Group',
    },
  },
];

export const JOURNAL_BRIEFS: JournalBrief[] = [
  {
    id: 'dry-bolted-joinery',
    title: 'Designing Mass Timber for Second-Life Disassembly',
    topic: 'Structural Engineering',
    published: 'October 2026',
    readTime: '5 min read',
    author: 'Maren Korsholm, MNAL',
    authorRole: 'Founding Partner & Principal Structural Engineer',
    excerpt:
      'Why epoxy-glued composite slabs trap embodied carbon, and how dry-bolted beechwood shear connectors allow entire structural bays to be unbolted and relocated.',
    keyTakeaway:
      'Switching from wet-poured concrete toppings to dry-screwed CLT deck diaphragms recovers 91% of primary structural mass intact at decommissioning.',
    sections: [
      {
        heading: 'The Composite Trap in Modern Timber',
        body: 'Many contemporary hybrid timber buildings pour 80mm of reinforced concrete directly over cross-laminated timber decks for acoustic mass and diaphragm stiffness. While effective structurally, bonded wet toppings contaminate the wood fibers, forcing demolition crews to chip or incinerate the timber at end of life.',
      },
      {
        heading: 'Dry-Bolted Node Geometry',
        body: 'In our Copenhagen and Zurich commissions, we replace cast-in-place toppings with pre-compressed beech LVL splines and concealed galvanized shear plates. Every node is documented in an accessible structural material passport engraved directly onto the steel gusset.',
      },
      {
        heading: 'Measured Cost & Schedule Parity',
        body: 'Across four recent civic builds totaling 16,400 m², eliminating wet concrete trades saved an average of five weeks on the critical-path crane schedule—offsetting the 4% hardware premium for precision CNC steel connectors.',
      },
    ],
  },
  {
    id: 'integrated-acoustic-louvers',
    title: 'Eliminating Suspended Ceilings Through Structural Diffusion',
    topic: 'Room Acoustics',
    published: 'August 2026',
    readTime: '4 min read',
    author: 'Tobias Lindholm, Dr. sc. techn.',
    authorRole: 'Partner & Lead Acoustic Physicist',
    excerpt:
      'How CNC-slotted glulam ribs and variable-depth cavity backing let exposed wood architecture achieve library-grade quiet without plastic baffles.',
    keyTakeaway:
      'Slot-perforated timber ribs covering just 38% of a ceiling soffit deliver a 0.75 NRC absorption coefficient across human speech frequencies (500–2000 Hz).',
    sections: [
      {
        heading: 'The Exposed Timber Reverberation Problem',
        body: 'Uncoated spruce and Douglas fir reflect 92% of incident mid- and high-frequency sound energy. Left untreated in open-plan civic halls, exposed timber creates fatiguing reverberation tails exceeding 2.4 seconds.',
      },
      {
        heading: 'Helmholtz Tuning Inside the Structure',
        body: 'Instead of hanging mineral fiber clouds underneath the timber, we mill 12mm Helmholtz slots between secondary ceiling joists and pack recycled cellulose or sheep wool inside the structural depth. The ceiling reads as uninterrupted craft carpentry while performing as a calibrated broadband absorber.',
      },
    ],
  },
];

export const TYPOLOGY_OPTIONS: TypologyOption[] = [
  {
    id: 'cultural',
    label: 'Cultural & Concert Hall',
    weeksPer1000Sqm: 2.8,
    baseWeeks: 14,
    carbonReductionPct: 51,
    typicalRt60: '1.10s – 1.45s',
  },
  {
    id: 'civic',
    label: 'Civic Library or Transit Hub',
    weeksPer1000Sqm: 2.2,
    baseWeeks: 12,
    carbonReductionPct: 48,
    typicalRt60: '0.55s – 0.75s',
  },
  {
    id: 'workspace',
    label: 'Timber Workplace & Lab',
    weeksPer1000Sqm: 1.8,
    baseWeeks: 10,
    carbonReductionPct: 46,
    typicalRt60: '0.40s – 0.55s',
  },
  {
    id: 'acoustic',
    label: 'Acoustic Retrofit & Shell',
    weeksPer1000Sqm: 1.4,
    baseWeeks: 8,
    carbonReductionPct: 62,
    typicalRt60: '0.35s – 1.80s',
  },
];
