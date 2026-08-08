/* ==========================================================================
   AI PERSONA ASSISTANT WIDGET
   Interactive Intelligent Persona for Portfolio Visitors
   ========================================================================== */

export class AiAssistantWidget {
  constructor() {
    this.toggleBtn = document.getElementById('ai-toggle-btn');
    this.chatBox = document.getElementById('ai-chat-box');
    this.closeBtn = document.getElementById('ai-close-btn');
    this.messages = document.getElementById('ai-messages');
    this.input = document.getElementById('ai-input');
    this.sendBtn = document.getElementById('ai-send-btn');
    this.clearBtn = document.getElementById('ai-clear-btn');
    this.soundBtn = document.getElementById('ai-sound-btn');
    this.tooltip = document.getElementById('ai-greeting-tooltip');
    this.tooltipClose = document.getElementById('ai-tooltip-close');
    this.chipsContainer = document.getElementById('ai-suggestion-chips');

    this.soundEnabled = true;
    this.isTyping = false;

    // Comprehensive Intent Knowledge Base
    this.intents = [
      {
        id: 'greetings',
        keywords: ['hello', 'hi', 'hey', 'greetings', 'sup', 'morning', 'afternoon', 'who are you', 'what are you', 'your name', 'persona', 'bot', 'assistant'],
        response: () => `Hello! 👋 I am <strong>Saikishor's AI Persona</strong>. I am trained on Saikishor Rasala's background as a Software Engineer based in Pune.<br><br>Feel free to ask me about his tech stack, work experience, projects, or MCA degree!`
      },
      {
        id: 'skills_tech',
        keywords: ['skill', 'stack', 'tech', 'technology', 'language', 'framework', 'php', 'c#', 'net', 'dotnet', 'sql', 'mysql', 'javascript', 'js', 'html', 'css', 'wordpress', 'codeigniter', 'laravel', 'git', 'tools', 'backend', 'frontend'],
        response: () => `<strong>Saikishor's Technical Stack & Skills:</strong><br><br>
        • <strong>Backend:</strong> <span class="ai-msg-badge">C#</span> <span class="ai-msg-badge">ASP.NET Core / MVC</span> <span class="ai-msg-badge">PHP</span> <span class="ai-msg-badge">CodeIgniter</span> <span class="ai-msg-badge">REST APIs</span><br>
        • <strong>Databases:</strong> <span class="ai-msg-badge">MySQL</span> <span class="ai-msg-badge">SQL Server</span><br>
        • <strong>Frontend:</strong> <span class="ai-msg-badge">JavaScript (ES6+)</span> <span class="ai-msg-badge">HTML5</span> <span class="ai-msg-badge">CSS3</span> <span class="ai-msg-badge">Bootstrap</span><br>
        • <strong>CMS & Tools:</strong> <span class="ai-msg-badge">WordPress</span> <span class="ai-msg-badge">Git & GitHub</span> <span class="ai-msg-badge">IIS</span> <span class="ai-msg-badge">VS Code</span>`
      },
      {
        id: 'experience',
        keywords: ['experience', 'job', 'work', 'career', 'company', 'role', 'credence', 'azam', 'p.a. inamdar', 'history', 'position', 'employer', 'years'],
        response: () => `<strong>Saikishor's Professional Experience:</strong><br><br>
        1. 💼 <strong>Software Engineer</strong> @ Credence Global Solutions <em>(Jan 2025 – Present)</em><br>
        2. 🌐 <strong>Web Developer</strong> @ MCE Society Azam Campus <em>(May 2022 – Nov 2024)</em><br>
        3. 💻 <strong>Web Developer Intern</strong> @ P.A. Inamdar College <em>(Oct 2021 – Mar 2022)</em><br><br>
        He specializes in enterprise web applications, database optimization, and modular software architecture.`
      },
      {
        id: 'projects',
        keywords: ['project', 'chitlan', 'booking', 'website', 'portfolio', 'application', 'app', 'built', 'developed', 'dental', 'inamdar', 'screenplay', 'system'],
        response: () => `<strong>Featured Engineering Projects:</strong><br><br>
        • 📊 <strong>ChitLAN:</strong> Enterprise Financial ERP & Chit Fund Management Application built with C# and SQL Server.<br>
        • 📅 <strong>Meeting Room Booking System:</strong> ASP.NET MVC app for workplace resource scheduling.<br>
        • 🎓 <strong>Institutional Web Portals:</strong> Custom PHP/WordPress portals for M.A. Rangoonwala Dental College & Dr. P.A. Inamdar University.<br>
        • 🎬 <strong>Screenplay Writer:</strong> Interactive digital scriptwriting tool.<br><br>
        <button class="ai-msg-action-btn" onclick="document.getElementById('projects').scrollIntoView({behavior:'smooth'})"><i class="fas fa-arrow-down"></i> Explore Showcase Section</button>`
      },
      {
        id: 'chitlan',
        keywords: ['chitlan', 'chit fund', 'erp', 'financial'],
        response: () => `<strong>ChitLAN Financial ERP:</strong><br><br>
        ChitLAN is an enterprise financial application developed by Saikishor for managing chit fund transactions, member ledgers, auction records, and real-time financial reporting. Built with robust C# / SQL Server architecture for high transaction integrity.`
      },
      {
        id: 'education',
        keywords: ['education', 'degree', 'mca', 'bca', 'bba', 'college', 'university', 'study', 'qualification', 'academic', 'allana', 'abeda'],
        response: () => `<strong>Educational Background:</strong><br><br>
        🎓 <strong>Master of Computer Applications (MCA)</strong><br>
        Allana Institute of Management Sciences, Pune <em>(2022 – 2024)</em><br><br>
        🎓 <strong>B.B.A (Computer Applications) / BCA</strong><br>
        Abeda Inamdar Senior College, Pune <em>(2019 – 2022)</em>`
      },
      {
        id: 'resume',
        keywords: ['resume', 'cv', 'download', 'pdf', 'bio-data', 'curriculum vitae'],
        response: () => `You can view or download Saikishor's official CV/Resume directly right here!<br><br>
        <button class="ai-msg-action-btn" onclick="window.openResumeModal()"><i class="fas fa-file-pdf"></i> View & Download Resume PDF</button>`
      },
      {
        id: 'contact',
        keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'call', 'mail', 'linkedin', 'github', 'address', 'location', 'pune', 'where'],
        response: () => `<strong>Get In Touch with Saikishor:</strong><br><br>
        📍 <strong>Location:</strong> Pune, Maharashtra, India<br>
        📧 <strong>Email:</strong> <a href="mailto:rasalasaikishor@gmail.com" style="color:var(--accent-cyan);">rasalasaikishor@gmail.com</a><br>
        📞 <strong>Phone:</strong> <a href="tel:+919209778592" style="color:var(--accent-cyan);">+91 9209778592</a><br>
        🔗 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/saikishor164" target="_blank" rel="noopener" style="color:var(--accent-cyan);">saikishor164</a><br>
        💻 <strong>GitHub:</strong> <a href="https://github.com/saikishorr" target="_blank" rel="noopener" style="color:var(--accent-cyan);">Saikishorr</a>`
      },
      {
        id: 'goals',
        keywords: ['goal', 'future', 'phd', 'research', 'ambition', 'aspirations', 'distributed', 'vision', 'aim'],
        response: () => `<strong>Career Vision & Aspirations:</strong><br><br>
        Saikishor aims to excel as a Senior Enterprise Software Engineer focusing on Distributed Systems, Cloud Architecture, and AI Systems, with plans for higher research (PhD) in Computer Science.`
      },
      {
        id: 'terminal',
        keywords: ['terminal', 'cli', 'cmd', 'command', 'shell'],
        response: () => `Did you know? Saikishor's portfolio features an interactive <strong>Developer Terminal Shell</strong>!<br><br>
        <button class="ai-msg-action-btn" onclick="window.openTerminal()"><i class="fas fa-terminal"></i> Open Developer Shell</button>`
      }
    ];

    this.init();
  }

  init() {
    if (!this.toggleBtn || !this.chatBox) return;

    // Toggle & Close Events
    this.toggleBtn.addEventListener('click', () => this.toggle());
    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
    if (this.clearBtn) this.clearBtn.addEventListener('click', () => this.clearChat());
    if (this.soundBtn) this.soundBtn.addEventListener('click', () => this.toggleSound());

    // Input & Send Events
    if (this.sendBtn && this.input) {
      this.sendBtn.addEventListener('click', () => this.sendMessage());
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.sendMessage();
      });
    }

    // Quick Suggestion Chips Handler
    if (this.chipsContainer) {
      this.chipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.ai-chip');
        if (chip) {
          const query = chip.getAttribute('data-query');
          if (query) {
            this.input.value = query;
            this.sendMessage();
          }
        }
      });
    }

    // Greeting Tooltip Auto-show after 5s
    setTimeout(() => {
      if (this.tooltip && !this.chatBox.classList.contains('active')) {
        this.tooltip.classList.add('active');
      }
    }, 5000);

    if (this.tooltipClose) {
      this.tooltipClose.addEventListener('click', () => {
        if (this.tooltip) this.tooltip.classList.remove('active');
      });
    }
  }

  toggle() {
    const isActive = this.chatBox.classList.toggle('active');
    if (this.tooltip) this.tooltip.classList.remove('active');
    if (isActive && this.input) {
      this.input.focus();
    }
  }

  close() {
    this.chatBox.classList.remove('active');
  }

  clearChat() {
    if (!this.messages) return;
    this.messages.innerHTML = `
      <div class="ai-msg bot">
        Chat history cleared. Hello! I'm <strong>Saikishor's AI Persona</strong>. How can I assist you today?
      </div>
    `;
    this.playSound('receive');
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    if (this.soundBtn) {
      const icon = this.soundBtn.querySelector('i');
      if (icon) {
        icon.className = this.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
      }
      this.soundBtn.style.color = this.soundEnabled ? 'var(--accent-cyan)' : 'var(--text-muted)';
    }
  }

  playSound(type = 'receive') {
    if (!this.soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'send') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
      } else {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (e) {}
  }

  sendMessage() {
    if (this.isTyping) return;
    const text = this.input.value.trim();
    if (!text) return;

    // Append User Message
    this.appendMsg(text, 'user');
    this.input.value = '';
    this.playSound('send');

    // Show Typing Indicator
    this.showTypingIndicator();

    // Process Bot Response with delay
    setTimeout(() => {
      this.removeTypingIndicator();
      const responseHtml = this.generateResponse(text);
      this.appendMsg(responseHtml, 'bot');
      this.playSound('receive');
    }, 550);
  }

  appendMsg(content, sender) {
    const msgEl = document.createElement('div');
    msgEl.className = `ai-msg ${sender}`;
    if (sender === 'user') {
      msgEl.textContent = content;
    } else {
      msgEl.innerHTML = content;
    }
    this.messages.appendChild(msgEl);
    this.messages.scrollTop = this.messages.scrollHeight;
  }

  showTypingIndicator() {
    this.isTyping = true;
    const indicator = document.createElement('div');
    indicator.id = 'ai-typing-indicator';
    indicator.className = 'ai-msg bot ai-typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    this.messages.appendChild(indicator);
    this.messages.scrollTop = this.messages.scrollHeight;
  }

  removeTypingIndicator() {
    this.isTyping = false;
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) indicator.remove();
  }

  generateResponse(query) {
    const cleanQuery = query.toLowerCase().trim();

    let bestMatch = null;
    let maxScore = 0;

    for (const intent of this.intents) {
      let score = 0;
      for (const keyword of intent.keywords) {
        if (cleanQuery.includes(keyword)) {
          const isExactWord = new RegExp(`\\b${keyword}\\b`, 'i').test(cleanQuery);
          score += isExactWord ? 3 : 1;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = intent;
      }
    }

    if (bestMatch && maxScore > 0) {
      return bestMatch.response();
    }

    return `Thanks for asking! I'm trained on Saikishor's professional profile. I couldn't find an exact match for that query.<br><br>
    Try asking about:<br>
    • <strong>Technical Stack:</strong> PHP, C#, .NET, SQL, JavaScript<br>
    • <strong>Experience:</strong> Software Engineer at Credence Global Solutions<br>
    • <strong>Projects:</strong> ChitLAN ERP, Booking System, Portals<br>
    • <strong>Contact Info or Resume PDF</strong>`;
  }
}
