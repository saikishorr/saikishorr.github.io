/* ==========================================================================
   INTERACTIVE CLI TERMINAL EMULATOR
   ========================================================================== */

export class TerminalEmulator {
  constructor() {
    this.modal = document.getElementById('terminal-modal');
    this.output = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
    
    this.history = [];
    this.historyIndex = -1;

    this.init();
  }

  init() {
    if (!this.modal || !this.input || !this.output) return;

    // Keyboard trigger Ctrl+Shift+T
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

    // Close on modal overlay click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });
  }

  toggle() {
    if (this.modal.classList.contains('active')) {
      this.close();
    } else {
      this.open();
    }
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
    line.innerHTML = text;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  executeCommand(cmdLine) {
    const parts = cmdLine.split(' ');
    const command = parts[0].toLowerCase();

    this.printLine(`<span style="color:#818cf8">guest@saikishor-portfolio:~$</span> ${cmdLine}`, '#f8fafc');

    switch (command) {
      case 'help':
        this.printLine(`
Available Shell Commands:
  <span style="color:#38bdf8">whoami</span>       - Print bio and developer summary
  <span style="color:#38bdf8">skills</span>       - List technical stack & proficiencies
  <span style="color:#38bdf8">projects</span>     - List key enterprise projects
  <span style="color:#38bdf8">contact</span>      - Display email, phone, location & socials
  <span style="color:#38bdf8">cat resume</span>   - View full software engineering resume
  <span style="color:#38bdf8">matrix</span>       - Trigger cyber matrix rain effect
  <span style="color:#38bdf8">theme</span>        - Toggle Dark / Light visual mode
  <span style="color:#38bdf8">clear</span>        - Clear terminal history screen
  <span style="color:#38bdf8">sudo</span>         - Test superuser privileges
        `);
        break;

      case 'whoami':
        this.printLine(`Saikishor Rasala | Software Engineer located in Pune, India.\nSpecializing in .NET, PHP, Distributed Systems, AI Support Agents, and Enterprise Cloud Solutions.`);
        break;

      case 'skills':
        this.printLine(`[Core Stack]: C#, ASP.NET, PHP, MySQL, SQL Server, JavaScript ES2023, HTML5, CSS3.\n[Frameworks & Tools]: Laravel, CodeIgniter, WordPress, Git, GitHub, REST APIs, Docker, CI/CD.`);
        break;

      case 'projects':
        this.printLine(`1. ChitLAN (Enterprise Chit Fund & Financial ERP System)\n2. Meeting Room Booking System (Corporate .NET/SQL Portal)\n3. Screenplay Writer (Creative AI-Assisted Studio Tool)\n4. AI Support Agent (Autonomous Customer Support Bot)\n5. Institutional Education Portals`);
        break;

      case 'contact':
        this.printLine(`Email: saikishor164@gmail.com\nGitHub: github.com/Saikishorr\nLinkedIn: linkedin.com/in/saikishor164\nLocation: Pune, Maharashtra, India`);
        break;

      case 'cat':
        if (parts[1] && parts[1].includes('resume')) {
          this.printLine(`Opening PDF Resume Modal...`);
          window.openResumeModal();
        } else {
          this.printLine(`Usage: cat resume`, '#f59e0b');
        }
        break;

      case 'matrix':
        this.printLine(`Initiating Cyber Matrix Stream... [0101010101]`, '#10b981');
        break;

      case 'theme':
        window.toggleTheme();
        this.printLine(`Color theme toggled successfully.`);
        break;

      case 'clear':
        this.output.innerHTML = '';
        break;

      case 'sudo':
        this.printLine(`Permission denied: Saikishor's security protocol active. You are logged in as guest.`, '#ef4444');
        break;

      default:
        this.printLine(`Command not found: '${command}'. Type '<span style="color:#38bdf8">help</span>' for available commands.`, '#f59e0b');
        break;
    }
  }
}
