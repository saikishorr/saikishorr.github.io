/* ==========================================================================
   AI PERSONA ASSISTANT WIDGET
   Interactive Bot for Portfolio Visitors
   ========================================================================== */

export class AiAssistantWidget {
  constructor() {
    this.toggleBtn = document.getElementById('ai-toggle-btn');
    this.chatBox = document.getElementById('ai-chat-box');
    this.closeBtn = document.getElementById('ai-close-btn');
    this.messages = document.getElementById('ai-messages');
    this.input = document.getElementById('ai-input');
    this.sendBtn = document.getElementById('ai-send-btn');

    this.knowledge = {
      skills: "Saikishor is proficient in C#, ASP.NET, PHP, MySQL, SQL Server, JavaScript (ES2023), HTML5, CSS3, Git, GitHub, Laravel, CodeIgniter, and WordPress.",
      experience: "Saikishor works as a Software Engineer in Pune, specializing in Enterprise Application Development, ERP systems, and modern web architectures.",
      projects: "Key projects include ChitLAN (Financial ERP), Meeting Room Booking System (.NET/SQL), Screenplay Writer, AI Support Agent, and Institutional Portals.",
      education: "Saikishor holds a Master of Computer Applications (MCA) and a Bachelor of Computer Applications (BCA).",
      goal: "His career ambition is to excel as an Enterprise Software Engineer focusing on Distributed Systems, AI, and Cloud Architecture, with aspirations for research/PhD.",
      contact: "You can email Saikishor at saikishor164@gmail.com or connect via LinkedIn (saikishor164) and GitHub (Saikishorr)."
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

    // Append User Message
    this.appendMsg(text, 'user');
    this.input.value = '';

    // Generate Bot Response
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

    if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
      return this.knowledge.skills;
    } else if (q.includes('experience') || q.includes('job') || q.includes('work') || q.includes('role')) {
      return this.knowledge.experience;
    } else if (q.includes('project') || q.includes('chitlan') || q.includes('booking')) {
      return this.knowledge.projects;
    } else if (q.includes('education') || q.includes('mca') || q.includes('degree')) {
      return this.knowledge.education;
    } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) {
      return this.knowledge.contact;
    } else if (q.includes('goal') || q.includes('future') || q.includes('phd') || q.includes('distributed')) {
      return this.knowledge.goal;
    } else if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return "Hello! I am Saikishor's AI Assistant. Ask me about his software engineering background, .NET & PHP projects, skills, or career goals!";
    } else {
      return "Thanks for asking! Saikishor is a passionate Software Engineer in Pune skilled in .NET, PHP, and AI systems. Feel free to explore the interactive terminal or contact him directly!";
    }
  }
}
