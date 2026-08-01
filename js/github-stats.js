/* ==========================================================================
   GITHUB LIVE STATS & CONTRIBUTION GRAPH
   ========================================================================== */

export class GitHubStats {
  constructor() {
    this.username = 'Saikishorr';
    this.canvas = document.getElementById('github-graph-canvas');
    this.starsEl = document.getElementById('github-stars-count');
    this.reposEl = document.getElementById('github-repos-count');
    this.commitsEl = document.getElementById('github-commits-count');

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
        if (this.reposEl) this.reposEl.innerText = data.public_repos || '24+';
        if (this.starsEl) this.starsEl.innerText = '48+';
        if (this.commitsEl) this.commitsEl.innerText = '580+';
      } else {
        this.setFallbackStats();
      }
    } catch (e) {
      this.setFallbackStats();
    }
  }

  setFallbackStats() {
    if (this.reposEl) this.reposEl.innerText = '24+';
    if (this.starsEl) this.starsEl.innerText = '48+';
    if (this.commitsEl) this.commitsEl.innerText = '580+';
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
        ctx.roundRect(x, y, size, size, 3);
        ctx.fill();
      }
    }
  }
}
