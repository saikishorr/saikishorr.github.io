/* ==========================================================================
   MAGNETIC CURSOR & SPOTLIGHT EFFECT
   ========================================================================== */

export class CustomCursor {
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

      // Update Dot Immediately
      this.cursorDot.style.left = `${this.mouse.x}px`;
      this.cursorDot.style.top = `${this.mouse.y}px`;

      // Update CSS Spotlight variables
      document.documentElement.style.setProperty('--mouse-x', `${this.mouse.x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${this.mouse.y}px`);
    });

    // Hover detection on interactive elements
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
    // Lerp physics for fluid follower motion
    this.follower.x += (this.mouse.x - this.follower.x) * 0.15;
    this.follower.y += (this.mouse.y - this.follower.y) * 0.15;

    this.cursorFollower.style.left = `${this.follower.x}px`;
    this.cursorFollower.style.top = `${this.follower.y}px`;

    requestAnimationFrame(() => this.animateFollower());
  }
}
