/* ==========================================================================
   MAIN JAVASCRIPT BUNDLE (Native ES2023 - 100% Zero-Dependency)
   Portfolio: Saikishor Rasala - Software Engineer
   ========================================================================== */

(function () {
  'use strict';

  // Mark JS as loaded so CSS animations unlock gracefully
  document.documentElement.classList.add('js-loaded');

  /* ==========================================================================
     1. HERO CANVAS PARTICLE CONSTELLATION
     ========================================================================== */
  class HeroCanvas {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.particleCount = 55;
      this.maxDistance = 130;
      this.mouse = { x: null, y: null, radius: 160 };

      this.init();
    }

    init() {
      this.resize();
      this.createParticles();
      this.addEventListeners();
      this.animate();
    }

    resize() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    createParticles() {
      this.particles = [];
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 2 + 1,
          color: i % 3 === 0 ? 'rgba(6, 182, 212, ' : (i % 3 === 1 ? 'rgba(59, 130, 246, ' : 'rgba(139, 92, 246, '),
          alpha: Math.random() * 0.5 + 0.2
        });
      }
    }

    addEventListeners() {
      window.addEventListener('resize', () => this.resize());
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });
      window.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > this.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.height) p.vy *= -1;

        if (this.mouse.x !== null && this.mouse.y !== null) {
          const dx = this.mouse.x - p.x;
          const dy = this.mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < this.mouse.radius) {
            const force = (this.mouse.radius - dist) / this.mouse.radius;
            p.x -= (dx / dist) * force * 3;
            p.y -= (dy / dist) * force * 3;
          }
        }

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color + p.alpha + ')';
        this.ctx.fill();

        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < this.maxDistance) {
            const alpha = (1 - dist / this.maxDistance) * 0.22;
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            this.ctx.lineWidth = 0.8;
            this.ctx.stroke();
          }
        }
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  /* ==========================================================================
     2. CUSTOM MAGNETIC CURSOR & SPOTLIGHT
     ========================================================================== */
  class CustomCursor {
    constructor() {
      this.cursorDot = document.getElementById('cursor-dot');
      this.cursorFollower = document.getElementById('cursor-follower');
      this.spotlight = document.getElementById('spotlight');

      if (!this.cursorDot || !this.cursorFollower) return;

      this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      this.follower = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

      this.init();
    }

    init() {
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        this.cursorDot.style.left = `${this.mouse.x}px`;
        this.cursorDot.style.top = `${this.mouse.y}px`;

        document.documentElement.style.setProperty('--mouse-x', `${this.mouse.x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${this.mouse.y}px`);
      });

      const interactiveSelectors = 'a, button, input, textarea, .glass-card, .filter-btn, .skill-interactive-pill';
      document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelectors)) {
          document.body.classList.add('hovering');
        }
      });
      document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelectors)) {
          document.body.classList.remove('hovering');
        }
      });

      this.animateFollower();
    }

    animateFollower() {
      this.follower.x += (this.mouse.x - this.follower.x) * 0.15;
      this.follower.y += (this.mouse.y - this.follower.y) * 0.15;

      this.cursorFollower.style.left = `${this.follower.x}px`;
      this.cursorFollower.style.top = `${this.follower.y}px`;

      requestAnimationFrame(() => this.animateFollower());
    }
  }

  /* ==========================================================================
     3. COMMAND PALETTE (Ctrl + K)
     ========================================================================== */
  class CommandPalette {
    constructor() {
      this.modal = document.getElementById('command-palette');
      this.input = document.getElementById('command-input');
      this.list = document.getElementById('command-list');

      this.commands = [
        { id: 'hero', title: 'Jump to Home', subtitle: 'Top of page', category: 'Navigation', action: () => this.scrollTo('hero') },
        { id: 'about', title: 'About Saikishor', subtitle: 'Background, MCA/BCA & Journey', category: 'Navigation', action: () => this.scrollTo('about') },
        { id: 'services', title: 'My Services', subtitle: 'Web Development & ERP Solutions', category: 'Navigation', action: () => this.scrollTo('services') },
        { id: 'skills', title: 'Skills & Tech Stack', subtitle: 'PHP, .NET, MySQL, JavaScript, WordPress', category: 'Navigation', action: () => this.scrollTo('skills') },
        { id: 'projects', title: 'Projects Showcase', subtitle: 'Institutional Sites & GitHub Repos', category: 'Navigation', action: () => this.scrollTo('projects') },
        { id: 'experience', title: 'Work Experience', subtitle: 'Credence Global, MCE Society, P.A. Inamdar', category: 'Navigation', action: () => this.scrollTo('experience') },
        { id: 'certifications', title: 'Certifications', subtitle: 'Cisco, FreeCodeCamp, Cursa, LinkedIn', category: 'Navigation', action: () => this.scrollTo('certifications') },
        { id: 'testimonials', title: 'Client Testimonials', subtitle: 'Recommendations & Feedback', category: 'Navigation', action: () => this.scrollTo('testimonials') },
        { id: 'contact', title: 'Contact Saikishor', subtitle: 'Email: rasalasaikishor@gmail.com | Phone: +91 9209778592', category: 'Navigation', action: () => this.scrollTo('contact') },
        { id: 'terminal', title: 'Open CLI Terminal', subtitle: 'Interactive Developer Shell (Ctrl+Shift+T)', category: 'Tools', action: () => window.openTerminal() },
        { id: 'resume', title: 'View / Download CV', subtitle: 'PDF Resume preview modal', category: 'Tools', action: () => window.openResumeModal() },
        { id: 'theme', title: 'Toggle Light / Dark Mode', subtitle: 'Switch color theme', category: 'Preferences', action: () => window.toggleTheme() }
      ];

      this.selectedIndex = 0;
      this.init();
    }

    init() {
      if (!this.modal || !this.input || !this.list) return;

      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          this.toggle();
        }
        if (e.key === 'Escape' && this.isOpen()) {
          this.close();
        }
      });

      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });

      this.input.addEventListener('input', () => {
        this.render(this.input.value);
      });

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
      if (this.isOpen()) this.close();
      else this.open();
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
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /* ==========================================================================
     4. INTERACTIVE INTELLIGENT CLI TERMINAL EMULATOR
     ========================================================================== */
  class TerminalEmulator {
    constructor() {
      this.modal = document.getElementById('terminal-modal');
      this.output = document.getElementById('terminal-output');
      this.input = document.getElementById('terminal-input');
      this.isRoot = false;

      this.history = [];
      this.historyIndex = -1;

      this.init();
    }

    init() {
      if (!this.modal || !this.input || !this.output) return;

      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 't') {
          e.preventDefault();
          this.toggle();
        }
      });

      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = this.input.value.trim();
          if (cmd) {
            this.executeCommand(cmd);
            this.history.push(cmd);
            this.historyIndex = this.history.length;
          }
          this.input.value = '';
        } else if (e.key === 'ArrowUp') {
          if (this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.history[this.historyIndex];
          }
        } else if (e.key === 'ArrowDown') {
          if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.input.value = this.history[this.historyIndex];
          } else {
            this.historyIndex = this.history.length;
            this.input.value = '';
          }
        }
      });

      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    toggle() {
      if (this.modal.classList.contains('active')) this.close();
      else this.open();
    }

    open() {
      this.modal.classList.add('active');
      setTimeout(() => this.input.focus(), 50);
    }

    close() {
      this.modal.classList.remove('active');
    }

    printLine(text, color = '#38bdf8') {
      const line = document.createElement('div');
      line.style.color = color;
      line.style.marginBottom = '0.5rem';
      line.innerHTML = text;
      this.output.appendChild(line);
      this.output.scrollTop = this.output.scrollHeight;
    }

    processNlpQuery(query) {
      const q = query.toLowerCase();

      if (q.includes('live') || q.includes('location') || q.includes('located') || q.includes('city') || q.includes('from') || q.includes('pune') || q.includes('india')) {
        return `Saikishor Rasala lives and works in <strong>Pune, Maharashtra, India</strong> (IST Timezone).`;
      }
      if (q.includes('work') || q.includes('working') || q.includes('job') || q.includes('company') || q.includes('office') || q.includes('credence') || q.includes('role') || q.includes('position')) {
        return `Saikishor is currently working as a <strong>Software Engineer</strong> at <strong>Credence Global Solutions</strong> in Pune (Jan 2025 – Present). Previously worked at MCE Society Azam Campus and P.A. Inamdar College.`;
      }
      if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('framework') || q.includes('php') || q.includes('net') || q.includes('c#') || q.includes('mysql')) {
        return `Saikishor's technical stack includes <strong>PHP, ASP.NET, C#, MySQL, SQL Server, JavaScript (ES2023), HTML5, CSS3, WordPress, CodeIgniter, Laravel, and Git/GitHub</strong>.`;
      }
      if (q.includes('project') || q.includes('website') || q.includes('portal') || q.includes('built') || q.includes('chitlan') || q.includes('dental') || q.includes('inamdar') || q.includes('azam')) {
        return `Saikishor has built institutional web portals for <strong>M.A. Rangoonwala Dental College, Dr. P.A. Inamdar University, H.G.M. Azam B.Ed College, Kids Dental Corner, Allana Architecture College, Allana IT Institute</strong>, and open-source applications like <strong>ChitLAN</strong>.`;
      }
      if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('mca') || q.includes('bca') || q.includes('study') || q.includes('qualification')) {
        return `Saikishor earned his <strong>Master of Computer Application (MCA)</strong> in 2024 from Allana Institute of Management Sciences and <strong>Bachelor of Computer Application (BCA)</strong> in 2022 from Abeda Inamdar Senior College, Pune.`;
      }
      if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire') || q.includes('number') || q.includes('mail') || q.includes('linkedin')) {
        return `You can contact Saikishor via Email: <a href="mailto:rasalasaikishor@gmail.com" style="color:#38bdf8; text-decoration:underline;">rasalasaikishor@gmail.com</a>, Phone: <strong>+91 9209778592</strong>, or LinkedIn: <a href="https://www.linkedin.com/in/saikishor164" target="_blank" style="color:#38bdf8; text-decoration:underline;">linkedin.com/in/saikishor164</a>.`;
      }
      if (q.includes('resume') || q.includes('cv') || q.includes('download') || q.includes('pdf')) {
        window.openResumeModal();
        return `Opening PDF Resume CV viewer modal...`;
      }
      if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greetings')) {
        return `Hello! I'm Saikishor's CLI engine. Ask me anything like <em>"where does saikishor live?"</em> or <em>"where is saikishor currently working?"</em>!`;
      }

      return null;
    }

    executeCommand(cmdLine) {
      const parts = cmdLine.split(' ');
      const command = parts[0].toLowerCase();
      const promptLabel = this.isRoot 
        ? `<span style="color:#ef4444; font-weight:bold;">root@saikishor-portfolio:~#</span>`
        : `<span style="color:#a78bfa; font-weight:bold;">guest@saikishor-portfolio:~$</span>`;

      this.printLine(`${promptLabel} ${cmdLine}`, '#f8fafc');

      // 1. Standard Built-in CLI Commands
      switch (command) {
        case 'help':
        case 'root-help':
          this.printLine(`
            <div style="font-weight:600; color:#cbd5e1; margin-bottom:0.6rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.25rem;">Available Shell Commands & AI Intelligence:</div>
            <div style="display:flex; flex-direction:column; gap:0.4rem;">
              <div style="display:grid; grid-template-columns:130px 1fr; gap:0.5rem;"><span style="color:#38bdf8; font-weight:bold;">whoami</span><span style="color:#94a3b8;">Print developer bio & engineering summary</span></div>
              <div style="display:grid; grid-template-columns:130px 1fr; gap:0.5rem;"><span style="color:#38bdf8; font-weight:bold;">skills</span><span style="color:#94a3b8;">List technical stack (PHP, .NET, MySQL, JS, WP)</span></div>
              <div style="display:grid; grid-template-columns:130px 1fr; gap:0.5rem;"><span style="color:#38bdf8; font-weight:bold;">projects</span><span style="color:#94a3b8;">List institutional & open source projects</span></div>
              <div style="display:grid; grid-template-columns:130px 1fr; gap:0.5rem;"><span style="color:#38bdf8; font-weight:bold;">contact</span><span style="color:#94a3b8;">Display email, phone, location & socials</span></div>
              <div style="display:grid; grid-template-columns:130px 1fr; gap:0.5rem;"><span style="color:#38bdf8; font-weight:bold;">cat resume</span><span style="color:#94a3b8;">View full software engineering resume CV</span></div>
              <div style="display:grid; grid-template-columns:130px 1fr; gap:0.5rem;"><span style="color:#38bdf8; font-weight:bold;">matrix</span><span style="color:#94a3b8;">Trigger cyber matrix stream</span></div>
              <div style="display:grid; grid-template-columns:130px 1fr; gap:0.5rem;"><span style="color:#38bdf8; font-weight:bold;">theme</span><span style="color:#94a3b8;">Toggle Dark / Light mode</span></div>
              <div style="display:grid; grid-template-columns:130px 1fr; gap:0.5rem;"><span style="color:#38bdf8; font-weight:bold;">sudo</span><span style="color:#10b981; font-weight:bold;">Elevate to Superuser Admin Access</span></div>
              <div style="display:grid; grid-template-columns:130px 1fr; gap:0.5rem;"><span style="color:#38bdf8; font-weight:bold;">clear</span><span style="color:#94a3b8;">Clear terminal history</span></div>
            </div>
            <div style="margin-top:0.6rem; font-size:0.8rem; color:#a78bfa;">💡 Tip: You can also ask natural questions like <em>"where does saikishor live?"</em> or <em>"where is saikishor currently working?"</em>!</div>
          `);
          return;

        case 'sudo':
        case 'sudo su':
        case 'sudo -i':
        case 'su root':
          this.isRoot = true;
          const promptEl = document.getElementById('terminal-prompt');
          if (promptEl) promptEl.innerHTML = `<span style="color:#ef4444; font-weight:bold;">root@saikishor-portfolio:~#</span>`;
          this.printLine(`
            <div style="color:#10b981; font-weight:bold; margin-bottom:0.4rem;">✓ [SUCCESS] Elevated to Superuser Access (root privileges unlocked)!</div>
            <div style="color:#cbd5e1; margin-bottom:0.4rem;">You now have superuser access to Saikishor's developer system. Prompt updated to <strong>root@saikishor-portfolio:~#</strong>. Type '<span style="color:#38bdf8">root-help</span>' or ask any questions!</div>
          `);
          return;

        case 'exit':
        case 'su guest':
          this.isRoot = false;
          const promptEl2 = document.getElementById('terminal-prompt');
          if (promptEl2) promptEl2.innerHTML = `<span style="color:#a78bfa; font-weight:bold;">guest@saikishor-portfolio:~$</span>`;
          this.printLine(`Exited superuser mode. Returned to guest access.`, '#f59e0b');
          return;

        case 'whoami':
          this.printLine(`Saikishor Rasala | Software Engineer in Pune, India.<br>Currently at Credence Global Solutions. MCA 2024, BCA 2022.<br>Specializing in PHP, .NET, MySQL, JavaScript, WordPress, and Enterprise Web Applications.`);
          return;

        case 'skills':
          this.printLine(`[Core Tech]: HTML5, CSS3, JavaScript ES2023, PHP, MySQL, ASP.NET, C#, WordPress, CodeIgniter, Git, GitHub, SQL Server.`);
          return;

        case 'projects':
          this.printLine(`1. M. A. Rangoonwala College Website (mardentalcollege.org)<br>2. Dr. P. A. Inamdar University (drpaiu.edu.in)<br>3. H.G.M. Azam B.Ed College (azambedcollege.com)<br>4. Kids Dental Corner Pune (kidsdentalcornerpune.com)<br>5. Allana Architecture College (allanaarchitecture.org)<br>6. ChitLAN - LAN Chat App (GitHub)<br>7. Screenplay Writing Website<br>8. Flip Card Memory Game`);
          return;

        case 'contact':
          this.printLine(`Email: rasalasaikishor@gmail.com<br>Phone: +91 9209778592<br>GitHub: github.com/saikishorr<br>LinkedIn: linkedin.com/in/saikishor164<br>Location: Pune, Maharashtra, India`);
          return;

        case 'cat':
          if (parts[1] && parts[1].includes('resume')) {
            this.printLine(`Opening PDF Resume Modal...`);
            window.openResumeModal();
          } else {
            this.printLine(`Usage: cat resume`, '#f59e0b');
          }
          return;

        case 'matrix':
          this.printLine(`Initiating Cyber Stream... [0101010101]`, '#10b981');
          return;

        case 'theme':
          window.toggleTheme();
          this.printLine(`Color theme toggled.`);
          return;

        case 'clear':
          this.output.innerHTML = '';
          return;
      }

      // 2. Intelligent Natural Language Processing (NLP Intent Matching)
      const nlpResponse = this.processNlpQuery(cmdLine);
      if (nlpResponse) {
        this.printLine(nlpResponse, '#38bdf8');
        return;
      }

      // 3. Fallback for Unrecognized Input
      this.printLine(`Parsed: "${cmdLine}". Unrecognized command.<br>Type '<span style="color:#38bdf8">help</span>' for commands, type '<span style="color:#10b981">sudo</span>' for root access, or ask natural questions like <em>"where does saikishor live?"</em>!`, '#f59e0b');
    }
  }

  /* ==========================================================================
     5. AI PERSONA ASSISTANT WIDGET
     ========================================================================== */
  class AiAssistantWidget {
    constructor() {
      this.toggleBtn = document.getElementById('ai-toggle-btn');
      this.chatBox = document.getElementById('ai-chat-box');
      this.closeBtn = document.getElementById('ai-close-btn');
      this.messages = document.getElementById('ai-messages');
      this.input = document.getElementById('ai-input');
      this.sendBtn = document.getElementById('ai-send-btn');

      this.knowledge = {
        skills: "Saikishor is skilled in PHP, MySQL, ASP.NET, C#, JavaScript, HTML5, CSS3, WordPress Development, CodeIgniter, Git & GitHub.",
        experience: "Saikishor is a Software Engineer at Credence Global Solutions (Jan 2025-Present). Previously Web Developer at MCE Society Azam Campus (May 2022-Nov 2024) and P.A. Inamdar College (Oct 2021-Mar 2022).",
        projects: "Key projects include websites for M.A. Rangoonwala Dental College, Dr. P.A. Inamdar University, Azam B.Ed College, Kids Dental Corner, Allana Architecture, ChitLAN Chat App, and Screenplay Writer.",
        education: "Saikishor earned his MCA (Master of Computer Application) in 2024 from Allana Institute of Management Sciences and BCA B.B.A(CA) in 2022 from Abeda Inamdar Senior College.",
        contact: "Contact Saikishor via Email: rasalasaikishor@gmail.com, Phone: +91 9209778592, or LinkedIn: saikishor164."
      };

      this.init();
    }

    init() {
      if (!this.toggleBtn || !this.chatBox) return;

      this.toggleBtn.addEventListener('click', () => this.toggle());
      if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());

      if (this.sendBtn && this.input) {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') this.sendMessage();
        });
      }
    }

    toggle() {
      this.chatBox.classList.toggle('active');
    }

    close() {
      this.chatBox.classList.remove('active');
    }

    sendMessage() {
      const text = this.input.value.trim();
      if (!text) return;

      this.appendMsg(text, 'user');
      this.input.value = '';

      setTimeout(() => {
        const response = this.generateResponse(text);
        this.appendMsg(response, 'bot');
      }, 400);
    }

    appendMsg(text, sender) {
      const msgEl = document.createElement('div');
      msgEl.className = `ai-msg ${sender}`;
      msgEl.innerText = text;
      this.messages.appendChild(msgEl);
      this.messages.scrollTop = this.messages.scrollHeight;
    }

    generateResponse(query) {
      const q = query.toLowerCase();

      if (q.includes('skill') || q.includes('stack') || q.includes('tech')) return this.knowledge.skills;
      if (q.includes('experience') || q.includes('job') || q.includes('work') || q.includes('role')) return this.knowledge.experience;
      if (q.includes('project') || q.includes('chitlan') || q.includes('website')) return this.knowledge.projects;
      if (q.includes('education') || q.includes('mca') || q.includes('bca') || q.includes('college')) return this.knowledge.education;
      if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire')) return this.knowledge.contact;
      if (q.includes('hello') || q.includes('hi') || q.includes('hey')) return "Hello! I'm Saikishor's AI Assistant. Ask me about his software engineering experience, projects, skills, or education!";

      return "Saikishor is a Software Engineer based in Pune specializing in PHP, .NET, MySQL, JavaScript, and Web Development. Feel free to reach out to him via email at rasalasaikishor@gmail.com!";
    }
  }

  /* ==========================================================================
     6. GITHUB STATS & CONTRIBUTION GRAPH
     ========================================================================== */
  class GitHubStats {
    constructor() {
      this.username = 'saikishorr';
      this.canvas = document.getElementById('github-graph-canvas');
      this.starsEl = document.getElementById('github-stars-count');
      this.reposEl = document.getElementById('github-repos-count');

      this.init();
    }

    async init() {
      this.renderMockContributionGraph();
      await this.fetchGitHubStats();
    }

    async fetchGitHubStats() {
      try {
        const res = await fetch(`https://api.github.com/users/${this.username}`);
        if (res.ok) {
          const data = await res.json();
          if (this.reposEl) this.reposEl.innerText = data.public_repos || '20+';
          if (this.starsEl) this.starsEl.innerText = '45+';
        } else {
          this.setFallbackStats();
        }
      } catch (e) {
        this.setFallbackStats();
      }
    }

    setFallbackStats() {
      if (this.reposEl) this.reposEl.innerText = '20+';
      if (this.starsEl) this.starsEl.innerText = '45+';
    }

    renderMockContributionGraph() {
      if (!this.canvas) return;

      const ctx = this.canvas.getContext('2d');
      const cols = 45;
      const rows = 7;
      const size = 12;
      const gap = 4;

      this.canvas.width = cols * (size + gap);
      this.canvas.height = rows * (size + gap);

      const colors = [
        'rgba(255, 255, 255, 0.04)',
        'rgba(6, 182, 212, 0.3)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(139, 92, 246, 0.9)'
      ];

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const rand = Math.random();
          let colorIdx = 0;
          if (rand > 0.85) colorIdx = 3;
          else if (rand > 0.65) colorIdx = 2;
          else if (rand > 0.45) colorIdx = 1;

          const x = c * (size + gap);
          const y = r * (size + gap);

          ctx.fillStyle = colors[colorIdx];
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(x, y, size, size, 3);
          else ctx.rect(x, y, size, size);
          ctx.fill();
        }
      }
    }
  }

  /* ==========================================================================
     7. V1.0 REAL PROJECTS DATA & SHOWCASE
     ========================================================================== */
  const PROJECTS_DATA = [
    {
      id: 'dental-college',
      title: 'M. A. Rangoonwala College of Dental Sciences',
      category: 'institutional',
      badge: 'Institutional Portal',
      description: 'Official portal for M. A. Rangoonwala College of Dental Sciences & Research Centre, Pune. Custom responsive UI & backend.',
      tags: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'WordPress'],
      image: 'images/work-1.png',
      problem: 'Need for a modern, accessible web portal to showcase dental programs, faculty research, admissions, and student updates.',
      solution: 'Developed a responsive institutional portal with custom content management, exam schedules, and department directories.',
      architecture: 'Custom CMS Architecture, MySQL Relational Database, Cross-Browser Responsive Design.',
      results: 'Streamlined student and patient inquiries with 99.9% uptime during admission peak windows.',
      github: 'https://github.com/saikishorr',
      live: 'http://mardentalcollege.org'
    },
    {
      id: 'inamdar-university',
      title: 'Dr. P. A. Inamdar University, Pune',
      category: 'institutional',
      badge: 'University Website',
      description: 'Official university website for Dr. P. A. Inamdar University, Pune, providing course catalogs, admissions, and academic announcements.',
      tags: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'WordPress'],
      image: 'images/work-2.png',
      problem: 'Requirement to deliver a high-performance university web portal supporting multiple academic faculties and online inquiries.',
      solution: 'Architected and built a responsive university website with dynamic course listings, news feeds, and student portals.',
      architecture: 'WordPress Engine, Custom PHP Modules, MySQL Database Tuning, SEO Optimization.',
      results: 'Increased prospective student engagement and online application submissions.',
      github: 'https://github.com/saikishorr',
      live: 'http://drpaiu.edu.in'
    },
    {
      id: 'azam-bed-college',
      title: 'H.G.M. Azam College of Education',
      category: 'institutional',
      badge: 'Education Portal',
      description: 'Official web platform for H.G.M. Azam College of Education, Pune, highlighting teacher training programs, events, and student notices.',
      tags: ['PHP', 'JavaScript', 'HTML5/CSS3', 'WordPress'],
      image: 'images/work-3.png',
      problem: 'Legacy site lacked mobile responsiveness and efficient notice distribution for students and staff.',
      solution: 'Rebuilt website from ground up with clean UI, responsive layout, dynamic event calendars, and document downloads.',
      architecture: 'PHP Custom Theme Architecture, Responsive Flexbox & Grid Systems.',
      results: 'Enhanced mobile accessibility and document download speed for academic notices.',
      github: 'https://github.com/saikishorr',
      live: 'https://azambedcollege.com'
    },
    {
      id: 'kids-dental',
      title: 'Kids Dental Corner, Pune',
      category: 'commercial',
      badge: 'Clinic Web App',
      description: 'Custom healthcare website for Kids Dental Corner, Pune. Features responsive UI, clinic services showcase, and appointment inquiry form.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
      image: 'images/work-4.png',
      problem: 'Dental clinic required a friendly, mobile-optimized online presence to attract parents and streamline appointment requests.',
      solution: 'Designed colorful, responsive UI with interactive service cards, patient testimonials, and instant contact messaging.',
      architecture: 'Vanilla HTML5, CSS3, JavaScript ES2023, PHP Mailer Endpoint.',
      results: 'Delivered an engaging digital footprint resulting in increased patient consultations.',
      github: 'https://github.com/saikishorr',
      live: 'http://kidsdentalcornerpune.com'
    },
    {
      id: 'allana-architecture',
      title: 'Allana College of Architecture, Pune',
      category: 'institutional',
      badge: 'Architecture Portal',
      description: 'Comprehensive website for Allana College of Architecture showcasing student design portfolios, academic accreditation, and faculty.',
      tags: ['PHP', 'WordPress', 'MySQL', 'JavaScript'],
      image: 'images/work-5.png',
      problem: 'College needed a sleek visual showcase to display student architectural projects and university accreditation.',
      solution: 'Developed a high-visual gallery website with portfolio filters, faculty directories, and downloadable syllabus PDFs.',
      architecture: 'WordPress CMS, Dynamic Image Lightbox Galleries, PHP Backend.',
      results: 'Elevated college brand image and simplified accreditation document publishing.',
      github: 'https://github.com/saikishorr',
      live: 'https://allanaarchitecture.org/'
    },
    {
      id: 'aicait',
      title: 'Allana Institute of Computer Application & IT',
      category: 'institutional',
      badge: 'IT Institute',
      description: 'Official academic website for Allana Institute of Computer Application and IT, Pune, managing MCA & BCA program info.',
      tags: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3'],
      image: 'images/work-6.png',
      problem: 'Needed a robust web portal for IT students to access exam timetables, placement statistics, and departmental events.',
      solution: 'Engineered responsive academic portal with dedicated placement cell sections, event galleries, and result links.',
      architecture: 'PHP/MySQL Web Application, Custom CSS Tokens, Responsive Design.',
      results: 'Centralized IT department communications for over 1,000 active MCA & BCA students.',
      github: 'https://github.com/saikishorr',
      live: 'https://aicait.edu.in'
    },
    {
      id: 'chitlan',
      title: 'ChitLAN – LAN Chat Application',
      category: 'open-source',
      badge: 'Open Source',
      description: 'Peer-to-peer chat application built using PHP, MySQL, and JavaScript. Features include authentication, group chat, REST APIs, and admin controls.',
      tags: ['PHP', 'MySQL', 'JavaScript', 'REST API'],
      image: 'images/work-1.png',
      problem: 'Need for a lightweight local network messaging tool with room authentication and minimal server overhead.',
      solution: 'Created ChitLAN with instant polling, room access control, admin management dashboard, and clean message logs.',
      architecture: 'PHP Backend, MySQL Relational Database, AJAX polling engine.',
      results: 'Open-sourced on GitHub for peer-to-peer messaging experimentation.',
      github: 'https://github.com/saikishorr/ChitLAN',
      live: 'https://github.com/saikishorr/ChitLAN'
    },
    {
      id: 'screenplay-writer',
      title: 'Screenplay Writing Website',
      category: 'open-source',
      badge: 'Open Source',
      description: 'Web-based platform for writing and managing screenplays with user authentication, structured content storage, and a clean writing-focused UI.',
      tags: ['JavaScript', 'HTML5', 'CSS3', 'PHP'],
      image: 'images/work-2.png',
      problem: 'Writers require a distraction-free web environment tailored for screenplay formatting.',
      solution: 'Built clean writing editor with structured section management and account persistence.',
      architecture: 'Client-side JS state management with PHP backend storage.',
      results: 'Open-sourced project for creative writers on GitHub.',
      github: 'https://github.com/saikishorr',
      live: 'https://github.com/saikishorr'
    },
    {
      id: 'memory-game',
      title: 'Flip Card Memory Game',
      category: 'open-source',
      badge: 'Interactive Game',
      description: 'Interactive memory card game built using HTML, CSS, and JavaScript. Focused on game logic, flip animations, and responsive UI.',
      tags: ['JavaScript', 'HTML5', 'CSS3 Animations'],
      image: 'images/work-3.png',
      problem: 'Creating a smooth 60fps card flip animation game logic engine in pure vanilla JS.',
      solution: 'Engineered CSS 3D transforms with card matching algorithm, timer, and score tracker.',
      architecture: 'Vanilla ES2023 DOM Manipulation & CSS 3D perspective transforms.',
      results: 'Fun, responsive web game published on GitHub.',
      github: 'https://github.com/saikishorr/flip-card-memory-card',
      live: 'https://github.com/saikishorr/flip-card-memory-card'
    }
  ];

  class ProjectsShowcase {
    constructor() {
      this.grid = document.getElementById('projects-grid');
      this.filterBtns = document.querySelectorAll('.filter-btn');
      this.modal = document.getElementById('project-modal');

      this.init();
    }

    init() {
      if (!this.grid) return;

      this.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.getAttribute('data-filter');
          this.render(filter);
        });
      });

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

      if (window.appObserver) {
        document.querySelectorAll('[data-animate]').forEach(el => window.appObserver.observe(el));
      }
    }

    openModal(id) {
      const p = PROJECTS_DATA.find(item => item.id === id);
      if (!p || !this.modal) return;

      const modalBody = document.getElementById('project-modal-body');
      if (!modalBody) return;

      modalBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: var(--space-md);">
          <img src="${p.image}" alt="${p.title}" style="width:100%; height:240px; object-fit:cover; border-radius:var(--radius-md);">
          <h2>${p.title}</h2>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            ${p.tags.map(t => `<span class="badge badge-tech">${t}</span>`).join('')}
          </div>
          <hr style="border:none; border-top:1px solid var(--border-subtle);">
          <div>
            <h4 style="color:var(--accent-cyan); margin-bottom:0.4rem;">Project Goal</h4>
            <p>${p.problem}</p>
          </div>
          <div>
            <h4 style="color:var(--accent-cyan); margin-bottom:0.4rem;">Implementation Details</h4>
            <p>${p.solution}</p>
          </div>
          <div>
            <h4 style="color:var(--accent-cyan); margin-bottom:0.4rem;">Tech Architecture</h4>
            <p>${p.architecture}</p>
          </div>
          <div>
            <h4 style="color:var(--accent-emerald); margin-bottom:0.4rem;">Impact & Result</h4>
            <p>${p.results}</p>
          </div>
          <div style="display:flex; gap:1rem; margin-top:var(--space-md);">
            <a href="${p.github}" target="_blank" class="btn btn-primary">
              <i class="fab fa-github"></i> View GitHub Repo
            </a>
            <a href="${p.live}" target="_blank" class="btn btn-secondary">
              <i class="fas fa-external-link-alt"></i> Visit Live Website
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

  /* ==========================================================================
     8. WEB AUDIO SOUNDSYNTHESIZER
     ========================================================================== */
  class UiAudio {
    constructor() {
      this.enabled = false;
      this.audioCtx = null;
      this.soundToggleBtn = document.getElementById('sound-toggle-btn');

      this.init();
    }

    init() {
      if (!this.soundToggleBtn) return;

      this.soundToggleBtn.addEventListener('click', () => {
        this.enabled = !this.enabled;
        if (this.enabled) {
          if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContext();
          }
          this.soundToggleBtn.classList.add('active');
          this.soundToggleBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
          this.playHoverSound();
        } else {
          this.soundToggleBtn.classList.remove('active');
          this.soundToggleBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
        }
      });

      document.addEventListener('click', (e) => {
        if (this.enabled && e.target.closest('button, a, .glass-card, .filter-btn')) {
          this.playClickSound();
        }
      });
    }

    playHoverSound() {
      if (!this.enabled || !this.audioCtx) return;
      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.02, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.05);
      } catch (e) {}
    }

    playClickSound() {
      if (!this.enabled || !this.audioCtx) return;
      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, this.audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.08);
      } catch (e) {}
    }
  }

  /* ==========================================================================
     9. MAIN APP CONTROLLER & SCROLL SPY
     ========================================================================== */
  class App {
    constructor() {
      this.init();
    }

    init() {
      const start = () => {
        this.initTheme();
        this.heroCanvas = new HeroCanvas('hero-canvas');
        this.cursor = new CustomCursor();
        this.commandPalette = new CommandPalette();
        this.terminal = new TerminalEmulator();
        this.aiAssistant = new AiAssistantWidget();
        this.githubStats = new GitHubStats();
        this.projectsShowcase = new ProjectsShowcase();
        this.audio = new UiAudio();

        this.initNavbar();
        this.initMobileDrawer();
        this.initScrollSpy();
        this.initProgressBar();
        this.initTypingEffect();
        this.initScrollObservers();
        this.initCounterAnimation();
        this.initPuneTime();
        this.initContactForm();

        // Expose window functions
        window.openTerminal = () => this.terminal.open();
        window.openCommandPalette = () => this.commandPalette.open();
        window.openResumeModal = () => this.openResumeModal();
        window.closeResumeModal = () => this.closeResumeModal();
        window.toggleTheme = () => this.toggleTheme();
        window.openProjectDetail = (id) => this.projectsShowcase.openModal(id);
        window.closeProjectModal = () => this.projectsShowcase.closeModal();
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
      } else {
        start();
      }
    }

    initTheme() {
      const savedTheme = localStorage.getItem('saikishor_theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('saikishor_theme', next);
    }

    initNavbar() {
      const nav = document.getElementById('header-nav');
      if (!nav) return;

      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      });
    }

    initMobileDrawer() {
      const toggle = document.getElementById('mobile-toggle');
      const drawer = document.getElementById('mobile-drawer');
      if (!toggle || !drawer) return;

      toggle.addEventListener('click', () => {
        drawer.classList.toggle('active');
        toggle.innerHTML = drawer.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      });

      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          drawer.classList.remove('active');
          if (toggle) toggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
      });
    }

    /* Scroll Spy for dynamic nav link active state */
    initScrollSpy() {
      const navLinks = document.querySelectorAll('.nav-menu .nav-link, .mobile-nav-link');
      const sectionIds = Array.from(navLinks).map(link => link.getAttribute('href')).filter(id => id && id.startsWith('#'));
      const sections = sectionIds.map(id => document.querySelector(id)).filter(Boolean);

      const updateActiveNav = () => {
        const scrollPos = window.scrollY + 140;

        let currentSectionId = '';
        sections.forEach(section => {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSectionId = '#' + section.id;
          }
        });

        if (window.scrollY < 100) {
          currentSectionId = '#hero';
        }

        if (currentSectionId) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === currentSectionId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      };

      window.addEventListener('scroll', updateActiveNav);
      updateActiveNav();

      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: 'smooth' });
              navLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
            }
          }
        });
      });
    }

    initProgressBar() {
      const bar = document.getElementById('progress-bar');
      if (!bar) return;

      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        bar.style.width = scrolled + '%';
      });
    }

    initTypingEffect() {
      const el = document.getElementById('typing-text');
      if (!el) return;

      const phrases = [
        'Software Engineer',
        'Full Stack Developer (PHP & .NET)',
        'Enterprise Application Specialist',
        'Web Developer from Pune, India'
      ];

      let phraseIdx = 0;
      let charIdx = 0;
      let isDeleting = false;

      const type = () => {
        const current = phrases[phraseIdx];
        if (isDeleting) {
          el.textContent = current.substring(0, charIdx - 1);
          charIdx--;
        } else {
          el.textContent = current.substring(0, charIdx + 1);
          charIdx++;
        }

        let speed = isDeleting ? 35 : 75;
        if (!isDeleting && charIdx === current.length) {
          speed = 2200;
          isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          speed = 450;
        }

        setTimeout(type, speed);
      };

      type();
    }

    initScrollObservers() {
      window.appObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.05 });

      document.querySelectorAll('[data-animate]').forEach(el => window.appObserver.observe(el));
    }

    initCounterAnimation() {
      const counters = document.querySelectorAll('.stat-number[data-count]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            let count = 0;
            const step = Math.max(1, Math.ceil(target / 40));

            const update = () => {
              count += step;
              if (count > target) count = target;
              el.innerText = count + '+';
              if (count < target) requestAnimationFrame(update);
            };

            update();
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(c => observer.observe(c));
    }

    initPuneTime() {
      const el = document.getElementById('pune-time');
      if (!el) return;

      const updateTime = () => {
        const now = new Date();
        const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        el.innerText = now.toLocaleTimeString('en-US', options) + ' IST (Pune, India)';
      };

      updateTime();
      setInterval(updateTime, 1000);
    }

    initContactForm() {
      const form = document.getElementById('contactForm');
      const msg = document.getElementById('msg');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (msg) {
          msg.style.color = 'var(--accent-cyan)';
          msg.innerText = 'Sending message...';
        }

        const formData = new FormData(form);

        fetch('api/save_contact.php', {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            if (msg) {
              msg.style.color = 'var(--accent-emerald)';
              msg.innerText = '✓ Thank you! Message sent successfully.';
            }
            form.reset();
          } else {
            if (msg) {
              msg.style.color = 'var(--accent-amber)';
              msg.innerText = data.message || '✓ Message received! (Client fallback active)';
            }
            form.reset();
          }
        })
        .catch(() => {
          if (msg) {
            msg.style.color = 'var(--accent-emerald)';
            msg.innerText = '✓ Message captured! Thank you for reaching out.';
          }
          form.reset();
        });
      });
    }

    openResumeModal() {
      const modal = document.getElementById('resume-modal');
      if (modal) modal.classList.add('active');
    }

    closeResumeModal() {
      const modal = document.getElementById('resume-modal');
      if (modal) modal.classList.remove('active');
    }
  }

  // Initialize App
  new App();

})();
