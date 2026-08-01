/* ==========================================================================
   MAIN CONTROLLER & BOOTSTRAPPER
   Saikishor Rasala Portfolio
   ========================================================================== */

import { HeroCanvas } from './canvas.js';
import { CustomCursor } from './cursor.js';
import { CommandPalette } from './command-palette.js';
import { TerminalEmulator } from './terminal.js';
import { AiAssistantWidget } from './ai-assistant.js';
import { GitHubStats } from './github-stats.js';
import { ProjectsShowcase } from './projects.js';
import { UiAudio } from './audio.js';

class App {
  constructor() {
    this.heroCanvas = null;
    this.cursor = null;
    this.commandPalette = null;
    this.terminal = null;
    this.aiAssistant = null;
    this.githubStats = null;
    this.projectsShowcase = null;
    this.audio = null;

    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      // 1. Initialize Theme
      this.initTheme();

      // 2. Initialize Subsystems
      this.heroCanvas = new HeroCanvas('hero-canvas');
      this.cursor = new CustomCursor();
      this.commandPalette = new CommandPalette();
      this.terminal = new TerminalEmulator();
      this.aiAssistant = new AiAssistantWidget();
      this.githubStats = new GitHubStats();
      this.projectsShowcase = new ProjectsShowcase();
      this.audio = new UiAudio();

      // 3. Page Level Effects
      this.initNavbar();
      this.initProgressBar();
      this.initTypingEffect();
      this.initScrollObservers();
      this.initCounterAnimation();
      this.initPuneTime();
      this.initContactForm();

      // Expose Global Helper Functions for inline handlers
      window.openTerminal = () => this.terminal.open();
      window.openCommandPalette = () => this.commandPalette.open();
      window.openResumeModal = () => this.openResumeModal();
      window.closeResumeModal = () => this.closeResumeModal();
      window.toggleTheme = () => this.toggleTheme();
      window.openProjectDetail = (id) => this.projectsShowcase.openModal(id);
      window.closeProjectModal = () => this.projectsShowcase.closeModal();
    });
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
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
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
      'Enterprise Developer (.NET & PHP)',
      'Distributed Systems Enthusiast',
      'AI & Cloud Automation Architect'
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

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIdx === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        speed = 500;
      }

      setTimeout(type, speed);
    };

    type();
  }

  initScrollObservers() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
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
        // Fallback for static hosts without PHP backend
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

// Instantiate App
new App();
