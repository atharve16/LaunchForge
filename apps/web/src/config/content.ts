export interface ServiceContent {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  forWhom: string;
  problem: string;
  deliverables: string[];
  approach: string[];
  outcomes: string[];
}

export const services: ServiceContent[] = [
  {
    slug: 'idea-explosion',
    name: 'Idea Explosion',
    eyebrow: 'Discovery & product definition',
    summary:
      'Turn an early idea into a focused, testable product direction before committing to a build.',
    forWhom:
      'Founders with a problem worth solving but uncertainty around users, scope, priorities or technical direction.',
    problem:
      'Early teams often spend their first budget building assumptions. A short discovery engagement makes those assumptions visible and gives the team a decision-ready MVP brief.',
    deliverables: [
      'Founder workshop',
      'Prioritised MVP scope',
      'User flows and wireframes',
      'Clickable prototype plan',
      'Technical approach and delivery estimate',
    ],
    approach: [
      'Clarify the user and problem',
      'Map the highest-risk assumptions',
      'Shape and prioritise the first release',
      'Review the plan before build',
    ],
    outcomes: [
      'A shared product brief',
      'A smaller and clearer first release',
      'Evidence-backed build decisions',
    ],
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    eyebrow: 'Production web products',
    summary:
      'Design and engineer fast, maintainable web products with the operational foundations to keep shipping.',
    forWhom:
      'Startups that need a marketing site, SaaS product, portal, dashboard or admin experience built for real users.',
    problem:
      'An MVP still needs sound architecture, security basics, testing and a path to change. We balance launch speed with the parts that are expensive to repair later.',
    deliverables: [
      'Responsive product UI',
      'Frontend and API engineering',
      'Authentication and authorization',
      'Data model and migrations',
      'Testing, deployment and handover',
    ],
    approach: [
      'Confirm scope and acceptance criteria',
      'Build in reviewable milestones',
      'Validate quality and security',
      'Deploy with documentation',
    ],
    outcomes: [
      'A usable production release',
      'Maintainable source code',
      'A documented path for the next iteration',
    ],
  },
  {
    slug: 'mobile-development',
    name: 'Mobile Development',
    eyebrow: 'Cross-platform mobile',
    summary:
      'Ship focused mobile experiences without treating app-store submission and production readiness as afterthoughts.',
    forWhom:
      'Teams whose core user journey benefits from a native mobile experience, notifications or on-device capabilities.',
    problem:
      'Mobile scope expands quickly across platforms, devices and release processes. We define the smallest coherent mobile experience and plan distribution from day one.',
    deliverables: [
      'Mobile product flows',
      'Cross-platform application',
      'Backend integration',
      'Device and release testing',
      'Store submission support',
    ],
    approach: [
      'Validate the mobile use case',
      'Prototype core journeys',
      'Build and test incrementally',
      'Prepare release assets and submission',
    ],
    outcomes: [
      'A release-ready mobile product',
      'A repeatable release process',
      'Clear ownership after handover',
    ],
  },
  {
    slug: 'ai-solutions',
    name: 'AI Solutions',
    eyebrow: 'Practical product AI',
    summary:
      'Validate and integrate AI capabilities where they create measurable product or operational value.',
    forWhom:
      'Teams exploring assistants, document intelligence, search, summarisation, recommendations or workflow automation.',
    problem:
      'AI demos are easy; dependable product features require evaluation, data boundaries, fallbacks, cost controls and careful UX.',
    deliverables: [
      'Feasibility prototype',
      'Model and data-flow design',
      'Product integration',
      'Evaluation approach',
      'Safety, cost and observability plan',
    ],
    approach: [
      'Define the job and success criteria',
      'Test feasibility with representative data',
      'Design human review and failure paths',
      'Integrate and measure',
    ],
    outcomes: [
      'A validated use case',
      'An integration designed for real failure modes',
      'A roadmap grounded in evidence',
    ],
  },
  {
    slug: 'devops',
    name: 'Deployment & DevOps',
    eyebrow: 'Reliable delivery systems',
    summary:
      'Create a portable, understandable route from a code change to a monitored production release.',
    forWhom:
      'Teams with fragile releases, unclear environments, rising cloud costs or production systems that lack basic visibility.',
    problem:
      'Delivery slows when environments drift and releases depend on unwritten knowledge. We establish pragmatic infrastructure and operating practices.',
    deliverables: [
      'Cloud and environment review',
      'CI/CD pipeline',
      'Secrets and access setup',
      'Monitoring and backup baseline',
      'Runbooks and cost review',
    ],
    approach: [
      'Assess the current delivery path',
      'Prioritise operational risks',
      'Automate repeatable steps',
      'Document and transfer ownership',
    ],
    outcomes: [
      'More predictable releases',
      'Visible production health',
      'Portable infrastructure decisions',
    ],
  },
  {
    slug: 'startup-advisory',
    name: 'Startup Advisory',
    eyebrow: 'Fractional CTO leadership',
    summary:
      'Add experienced technical judgment to architecture, hiring, planning and investor-facing decisions.',
    forWhom:
      'Founders and small teams that need senior technical ownership before a full-time leadership hire makes sense.',
    problem:
      'Technical decisions compound early. Independent senior review helps a founder distinguish urgent risks from work that can wait.',
    deliverables: [
      'Architecture and code review',
      'Technical roadmap',
      'Hiring and interview support',
      'Delivery process coaching',
      'Due-diligence documentation support',
    ],
    approach: [
      'Establish decision context',
      'Review evidence and constraints',
      'Recommend a prioritised plan',
      'Stay involved through review cadence',
    ],
    outcomes: [
      'Clearer technical decisions',
      'Reduced delivery risk',
      'A stronger foundation for an internal team',
    ],
  },
];

export const processStages = [
  {
    name: 'Sketch',
    description: 'Clarify the user, problem, constraints and smallest valuable release.',
  },
  {
    name: 'Prototype',
    description: 'Make the core journey tangible and test the riskiest assumptions early.',
  },
  {
    name: 'Build',
    description:
      'Engineer in visible milestones with quality and security built into the definition of done.',
  },
  {
    name: 'Launch',
    description: 'Deploy, verify, document and put a support path around the first real users.',
  },
  {
    name: 'Grow',
    description: 'Learn from production evidence and choose the next investment deliberately.',
  },
] as const;

export const engagements = [
  {
    name: 'Idea Sprint',
    bestFor: 'Turning uncertainty into an actionable MVP plan.',
    cadence: 'Short, fixed-scope sprint',
    includes: [
      'Discovery workshop',
      'MVP prioritisation',
      'Flows and prototype direction',
      'Technical delivery plan',
    ],
  },
  {
    name: 'MVP Launch',
    bestFor: 'Taking a defined product from plan to production.',
    cadence: 'Milestone-based engagement',
    includes: [
      'Product and technical planning',
      'Design and engineering',
      'Testing and deployment',
      'Documentation and handover',
    ],
  },
  {
    name: 'Dedicated Squad',
    bestFor: 'Adding a senior-led product engineering unit.',
    cadence: 'Monthly, capacity-based',
    includes: [
      'Named senior ownership',
      'Cross-functional delivery',
      'Visible planning cadence',
      'Ongoing quality review',
    ],
  },
  {
    name: 'Fractional CTO',
    bestFor: 'Technical leadership without a full-time hire.',
    cadence: 'Monthly advisory cadence',
    includes: [
      'Architecture guidance',
      'Roadmap and process',
      'Hiring support',
      'Leadership reviews',
    ],
  },
  {
    name: 'On-demand help',
    bestFor: 'A bounded bug, feature, review or performance issue.',
    cadence: 'Scoped after assessment',
    includes: [
      'Initial diagnosis',
      'Defined work boundary',
      'Implementation or advice',
      'Clear handover',
    ],
  },
] as const;

export const navItems = [
  { href: '/services', label: 'Services' },
  { href: '/how-we-work', label: 'How we work' },
  { href: '/engagements', label: 'Engagements' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Insights' },
] as const;
