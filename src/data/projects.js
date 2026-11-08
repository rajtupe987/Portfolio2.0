export const projects = [
  {
    id: 'npms',
    title: 'Narayana Product Management System (NPMS)',
    image: '/images/project-npms.svg',
    shortDescription:
      'A full-stack academic and product management platform built using Next.js 13, integrating core academic entities, configurable feature modules, RBAC, OAuth 2.0, and GraphQL-based backend communication.',
    description:
      'A full-stack academic and product management platform built using Next.js 13, integrating core academic entities, configurable feature modules, RBAC, OAuth 2.0, and GraphQL-based backend communication.',
    stack: ['Next.js', 'React', 'TypeScript', 'GraphQL', 'Apollo Client', 'Redux', 'PostgreSQL', 'GCP'],
    overview: 'Built a unified academic and product management platform to consolidate operational flows into a single scalable admin experience.',
    objective: 'Create a flexible, maintainable platform for academic and product operations in a multi-feature enterprise environment.',
    responsibilities: [
      'Architected the end-to-end application structure for the admin dashboard.',
      'Designed GraphQL data ingestion and model integrations.',
      'Implemented reusable feature toggles and secure access controls.',
    ],
    implementation: [
      'Built a modular Next.js frontend for product and academic workflows.',
      'Connected domain-specific GraphQL clients to multiple backend services.',
      'Structured configuration-driven feature management for long-term scalability.',
    ],
    challenges: [
      'Balancing modularity with enterprise-level fast iteration and maintainability.',
      'Designing a secure feature architecture that supports dynamic rollout across multiple teams.',
    ],
  },
  {
    id: 'autograde',
    title: 'AI-Powered AutoGrade — NOMS',
    image: '/images/project-autograde.svg',
    shortDescription:
      'An AI-powered examination grading interface featuring real-time feedback, bulk processing, and streamlined grading workflows, reducing manual grading time by up to 80%.',
    description:
      'An AI-powered examination grading interface featuring real-time feedback, bulk processing, and streamlined grading workflows, reducing manual grading time by up to 80%.',
    stack: ['Next.js', 'React', 'JavaScript', 'TypeScript', 'AI-powered workflows'],
    overview: 'Developed an interface that helps streamline assessment grading and improve turnaround time for academic operations.',
    objective: 'Reduce time-intensive manual grading with real-time feedback and bulk processing workflows.',
    responsibilities: [
      'Designed the frontend experience for grading operations.',
      'Built bulk workflow controls for processing large answer sets.',
      'Worked on user feedback and status visibility for graders.',
    ],
    implementation: [
      'Created responsive interfaces for grading inputs and review states.',
      'Integrated real-time feedback surfaces to display insights as evaluations progressed.',
      'Optimized workflows to handle large academic volumes quickly.',
    ],
    challenges: [
      'Ensuring feedback loops remain intuitive even under large-scale batch processing.',
      'Delivering a clear operational interface for institutional grading teams.',
    ],
  },
  {
    id: 'nmonitor',
    title: 'NMonitor — NLearn4',
    image: '/images/project-nmonitor.svg',
    shortDescription:
      'A student examination monitoring solution tracking attendance, scheduling, participation metrics, and examination activities with automated reporting and bulk downloads.',
    description:
      'A student examination monitoring solution tracking attendance, scheduling, participation metrics, and examination activities with automated reporting and bulk downloads.',
    stack: ['Node.js', 'Backend Workflows', 'GCP', 'Reporting'],
    overview: 'Created a monitoring and reporting layer for exam activity and student participation across the NLearn4 ecosystem.',
    objective: 'Provide operational visibility into exam and attendance behavior with automated reporting.',
    responsibilities: [
      'Migrated and expanded the NMonitor module into the NLearn4 architecture.',
      'Implemented report generation and bulk export workflows.',
      'Tracked attendance, scheduling, and participation events across modules.',
    ],
    implementation: [
      'Developed backend workflows to collect and normalize exam and participation signals.',
      'Built automation for reporting and bulk downloads to support stakeholders.',
      'Connected data flows to enterprise-grade GCP hosting and infrastructure patterns.',
    ],
    challenges: [
      'Keeping the reporting workflows useful for both operational and academic decision-making.',
      'Handling multiple data channels without losing clarity or performance.',
    ],
  },
  {
    id: 'offline-analysis',
    title: 'Offline Exam Analysis — NOMS',
    image: '/images/project-analysis.svg',
    shortDescription:
      'A React-based examination analysis platform with workflow management, rank generation visualization, and SMS notification interfaces supporting examination operations across multiple branches.',
    description:
      'A React-based examination analysis platform with workflow management, rank generation visualization, and SMS notification interfaces supporting examination operations across multiple branches.',
    stack: ['React', 'JavaScript', 'Dashboards', 'Workflow Management'],
    overview: 'Built a practice-focused analytics and operational platform for exam analysis spanning workflow, ranking, and communication needs.',
    objective: 'Support end-to-end offline exam operations with visibility into rankings and branch-level processes.',
    responsibilities: [
      'Architected the UI layer for examination analytics and workflow management.',
      'Created dashboards for result processing and rank generation.',
      'Connected communication workflows for notifications and branch operations.',
    ],
    implementation: [
      'Designed a scalable React dashboard for workflow visibility.',
      'Built visual summaries and operational insights for ranking outcomes.',
      'Created an interface capable of supporting multi-branch academic operation flows.',
    ],
    challenges: [
      'Delivering complex operational insights in an intuitive user interface.',
      'Supporting thousands of records while ensuring clarity across branch workflows.',
    ],
  },
]
