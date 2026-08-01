/* ==========================================================================
   COMMAND PALETTE (Ctrl + K) MODAL SEARCH
   ========================================================================== */

export class CommandPalette {
  constructor() {
    this.modal = document.getElementById('command-palette');
    this.input = document.getElementById('command-input');
    this.list = document.getElementById('command-list');
    
    this.commands = [
      { id: 'hero', title: 'Jump to Hero', subtitle: 'Top of page', category: 'Navigation', action: () => this.scrollTo('hero') },
      { id: 'about', title: 'About & Journey', subtitle: 'Background & Philosophy', category: 'Navigation', action: () => this.scrollTo('about') },
      { id: 'skills', title: 'Skills & Tech Stack', subtitle: '.NET, PHP, Distributed Systems', category: 'Navigation', action: () => this.scrollTo('skills') },
      { id: 'projects', title: 'Projects Showcase', subtitle: 'ChitLAN, Room Booking, AI Support', category: 'Navigation', action: () => this.scrollTo('projects') },
      { id: 'experience', title: 'Work Experience', subtitle: 'Software Engineering Career', category: 'Navigation', action: () => this.scrollTo('experience') },
      { id: 'github', title: 'GitHub & Open Source', subtitle: 'Live Stats & Contributions', category: 'Navigation', action: () => this.scrollTo('github') },
      { id: 'research', title: 'Research & Roadmap', subtitle: 'AI, Distributed Systems & PhD Goals', category: 'Navigation', action: () => this.scrollTo('research') },
      { id: 'contact', title: 'Contact Saikishor', subtitle: 'Send an email or message', category: 'Navigation', action: () => this.scrollTo('contact') },
      { id: 'terminal', title: 'Open CLI Terminal', subtitle: 'Interactive Developer Shell (Ctrl+Shift+T)', category: 'Tools', action: () => window.openTerminal() },
      { id: 'resume', title: 'View / Download Resume', subtitle: 'PDF Resume preview modal', category: 'Tools', action: () => window.openResumeModal() },
      { id: 'theme', title: 'Toggle Light / Dark Mode', subtitle: 'Switch color theme', category: 'Preferences', action: () => window.toggleTheme() }
    ];

    this.selectedIndex = 0;
    this.init();
  }

  init() {
    if (!this.modal || !this.input || !this.list) return;

    // Keyboard trigger Ctrl+K / Cmd+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Close on overlay click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Filter input
    this.input.addEventListener('input', () => {
      this.render(this.input.value);
    });

    // Arrow navigation
    this.input.addEventListener('keydown', (e) => {
      const items = this.list.querySelectorAll('.command-item');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.selectedIndex = (this.selectedIndex + 1) % items.length;
        this.updateSelection(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.selectedIndex = (this.selectedIndex - 1 + items.length) % items.length;
        this.updateSelection(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        items[this.selectedIndex]?.click();
      }
    });

    this.render('');
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.modal.classList.add('active');
    this.input.value = '';
    this.render('');
    setTimeout(() => this.input.focus(), 50);
  }

  close() {
    this.modal.classList.remove('active');
  }

  isOpen() {
    return this.modal.classList.contains('active');
  }

  render(query) {
    const q = query.toLowerCase().trim();
    const filtered = this.commands.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.subtitle.toLowerCase().includes(q) || 
      c.category.toLowerCase().includes(q)
    );

    this.selectedIndex = 0;
    this.list.innerHTML = filtered.length === 0 
      ? `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted);">No matching commands found.</div>` 
      : filtered.map((c, idx) => `
        <div class="command-item ${idx === 0 ? 'selected' : ''}" data-index="${idx}">
          <div>
            <div style="font-weight: 600;">${c.title}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${c.subtitle}</div>
          </div>
          <span class="shortcut-badge">${c.category}</span>
        </div>
      `).join('');

    // Attach click events
    this.list.querySelectorAll('.command-item').forEach((itemEl, idx) => {
      itemEl.addEventListener('click', () => {
        filtered[idx].action();
        this.close();
      });
    });
  }

  updateSelection(items) {
    items.forEach((el, idx) => {
      if (idx === this.selectedIndex) {
        el.classList.add('selected');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('selected');
      }
    });
  }

  scrollTo(id) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
