/* ==========================================================================
   PROJECTS SHOWCASE & CASE STUDY MODAL VIEWER
   ========================================================================== */

export const PROJECTS_DATA = [
  {
    id: 'chitlan',
    title: 'ChitLAN - Financial ERP System',
    category: 'erp',
    badge: 'Enterprise ERP',
    description: 'A comprehensive multi-branch chit fund financial ERP application automating subscriber ledgers, auction tracking, interest calculations, and automated receipt billing.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'FPDF'],
    image: 'images/work-1.png',
    problem: 'Manual Chit Fund management led to accounting discrepancies, delayed receipts, and inefficient subscriber auditing.',
    solution: 'Engineered a centralized web ERP with automated double-entry ledger calculation, payment reminders, and instant PDF statement generation.',
    architecture: 'MVC Architecture, MySQL relational schema with indexing for fast financial aggregation, client-side dynamic validation.',
    results: 'Reduced month-end balancing time by 90% and digitized financial management across multiple branches.',
    github: 'https://github.com/Saikishorr',
    live: 'https://saikishor.netlify.app'
  },
  {
    id: 'meeting-booking',
    title: 'Enterprise Meeting Room Booking System',
    category: 'dotnet',
    badge: '.NET / Enterprise',
    description: 'Corporate resource management system built for scheduling conference rooms, managing equipment, avoiding double-bookings, and tracking attendee RSVPs.',
    tags: ['ASP.NET', 'C#', 'SQL Server', 'JavaScript', 'Bootstrap'],
    image: 'images/work-2.png',
    problem: 'Overlapping conference room reservations in high-density office environments caused schedule conflicts and wasted executive time.',
    solution: 'Designed a real-time availability calendar with conflict detection, automated email notifications, and room capacity enforcement.',
    architecture: 'ASP.NET Core Web Application, EF Core, SQL Server Stored Procedures, SignalR real-time calendar updates.',
    results: 'Streamlined facility scheduling across 15+ meeting rooms with zero double-booking conflicts.',
    github: 'https://github.com/Saikishorr',
    live: 'https://saikishor.netlify.app'
  },
  {
    id: 'ai-support-agent',
    title: 'Autonomous AI Support Agent',
    category: 'ai',
    badge: 'AI & Automation',
    description: 'An intelligent customer support bot capable of analyzing user queries, parsing documentation, and resolving tier-1 support tickets automatically.',
    tags: ['JavaScript ES2023', 'PHP', 'AI APIs', 'JSON-LD', 'CSS Glass'],
    image: 'images/work-3.png',
    problem: 'High volume of repetitive support tickets overwhelmed support representatives, increasing resolution latency.',
    solution: 'Developed an autonomous agent widget with natural language pattern matching, fallback escalations, and interactive response drawers.',
    architecture: 'Client-side ES2023 NLP engine, PHP REST backend logging, asynchronous payload streaming.',
    results: 'Handled over 60% of routine inquiries automatically with sub-second response times.',
    github: 'https://github.com/Saikishorr',
    live: 'https://saikishor.netlify.app'
  },
  {
    id: 'screenplay-writer',
    title: 'Screenplay Writer Application',
    category: 'creative',
    badge: 'Creative Software',
    description: 'A focused, distraction-free screenplay editor with automated Industry-Standard Fountain/Hollywood formatting, scene management, and character dialogue breakdown.',
    tags: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'LocalStorage'],
    image: 'images/work-4.png',
    problem: 'Screenwriters struggle with complex formatting software that interrupts flow and lacks instant cloud/local persistence.',
    solution: 'Built a sleek web editor with automatic element auto-tabbing (Character, Parenthetical, Dialogue, Action) and PDF exports.',
    architecture: 'Pure Vanilla JS state engine, custom DOM text parser, localized IndexedDB persistence layer.',
    results: 'Enables rapid scriptwriting with 100% compliance to standard script formatting standards.',
    github: 'https://github.com/Saikishorr',
    live: 'https://saikishor.netlify.app'
  },
  {
    id: 'institutional-websites',
    title: 'Institutional Education Portals',
    category: 'erp',
    badge: 'Higher Education',
    description: 'Web portals for academic institutions providing student admissions, course announcements, faculty profiles, and examination results access.',
    tags: ['PHP', 'WordPress', 'MySQL', 'JavaScript', 'CSS3'],
    image: 'images/work-5.png',
    problem: 'Legacy educational websites lacked responsive mobile design, high-contrast accessibility, and fast load speeds during exam result releases.',
    solution: 'Designed and deployed optimized custom themes and database indexing to sustain heavy student traffic spikes.',
    architecture: 'Custom WordPress theme architecture, object caching, headless CMS capabilities, MySQL query optimization.',
    results: 'Served 10,000+ active students with 99.9% uptime during peak exam result query windows.',
    github: 'https://github.com/Saikishorr',
    live: 'https://saikishor.netlify.app'
  },
  {
    id: 'open-source-tools',
    title: 'Open Source Utilities & Libraries',
    category: 'open-source',
    badge: 'Open Source',
    description: 'A suite of open source developer tools, helper libraries, and code generators released on GitHub for software engineers.',
    tags: ['Git', 'GitHub', 'JavaScript', 'C#', 'PHP'],
    image: 'images/work-6.png',
    problem: 'Developers often re-create boilerplate code for database CRUD interfaces and utility helpers.',
    solution: 'Published lightweight, reusable utilities and modular code templates with comprehensive documentation and MIT licensing.',
    architecture: 'Modular JavaScript & C# helper modules, standardized npm/NuGet ready structures.',
    results: 'Starred and utilized by fellow developers in open source community projects.',
    github: 'https://github.com/Saikishorr',
    live: 'https://saikishor.netlify.app'
  }
];

export class ProjectsShowcase {
  constructor() {
    this.grid = document.getElementById('projects-grid');
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.modal = document.getElementById('project-modal');
    
    this.init();
  }

  init() {
    if (!this.grid) return;

    // Filter Buttons logic
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        this.render(filter);
      });
    });

    // Close Modal on click outside
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    this.render('all');
  }

  render(filter) {
    const filtered = filter === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === filter);

    this.grid.innerHTML = filtered.map(p => `
      <div class="glass-card project-card" data-animate>
        <div class="project-card-image-box">
          <img src="${p.image}" alt="${p.title}" class="project-card-image" loading="lazy">
          <div class="project-card-overlay">
            <span class="badge badge-tech">${p.badge}</span>
          </div>
        </div>
        <div class="project-details">
          <div class="project-title-row">
            <h3>${p.title}</h3>
          </div>
          <p>${p.description}</p>
          <div class="skill-tags-wrapper" style="margin-top: 0.75rem;">
            ${p.tags.map(t => `<span class="badge" style="font-size:0.75rem;">${t}</span>`).join('')}
          </div>
          <div class="project-actions">
            <button class="btn btn-secondary" style="padding: 0.5rem 1rem;" onclick="openProjectDetail('${p.id}')">
              Case Study
            </button>
            <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-icon" title="View Source on GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="${p.live}" target="_blank" rel="noopener" class="btn btn-icon" title="Live Preview">
              <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  openModal(id) {
    const p = PROJECTS_DATA.find(item => item.id === id);
    if (!p || !this.modal) return;

    const modalBody = document.getElementById('project-modal-body');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: var(--space-md);">
        <img src="${p.image}" alt="${p.title}" style="width:100%; height:260px; object-fit:cover; border-radius:var(--radius-md);">
        <h2>${p.title}</h2>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          ${p.tags.map(t => `<span class="badge badge-tech">${t}</span>`).join('')}
        </div>
        <hr style="border:none; border-top:1px solid var(--border-subtle);">
        <div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.4rem;">The Challenge</h4>
          <p>${p.problem}</p>
        </div>
        <div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.4rem;">The Engineering Solution</h4>
          <p>${p.solution}</p>
        </div>
        <div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.4rem;">System Architecture</h4>
          <p>${p.architecture}</p>
        </div>
        <div>
          <h4 style="color:var(--accent-emerald); margin-bottom:0.4rem;">Impact & Results</h4>
          <p>${p.results}</p>
        </div>
        <div style="display:flex; gap:1rem; margin-top:var(--space-md);">
          <a href="${p.github}" target="_blank" class="btn btn-primary">
            <i class="fab fa-github"></i> View GitHub Repository
          </a>
          <a href="${p.live}" target="_blank" class="btn btn-secondary">
            <i class="fas fa-external-link-alt"></i> Live Demo Portal
          </a>
        </div>
      </div>
    `;

    this.modal.classList.add('active');
  }

  closeModal() {
    if (this.modal) this.modal.classList.remove('active');
  }
}
