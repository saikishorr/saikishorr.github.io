const links = [
  { name: "LinkedIn", icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/saikishor164/" },
  { name: "Google Dev Profile", icon: "fas fa-code", url: "https://g.dev/saikishor164" },
  { name: "Portfolio", icon: "fas fa-globe", url: "https://saikishorr.github.io" },
  { name: "GitHub", icon: "fab fa-github", url: "https://github.com/saikishorr" },
  { name: "Dev.to", icon: "fab fa-dev", url: "https://dev.to/saikishor164" },
  { name: "CodePen", icon: "fab fa-codepen", url: "https://codepen.io/saikishorrasala" },
  { name: "HackerRank", icon: "fas fa-terminal", url: "https://www.hackerrank.com/profile/rasalasaikishor" },
  { name: "LeetCode", icon: "fas fa-code", url: "https://leetcode.com/u/saikishor164/" },
  { name: "Telegram", icon: "fab fa-telegram", url: "https://t.me/Saikishor164" },
  { name: "Twitter", icon: "fab fa-twitter", url: "https://twitter.com/saikishor164" },
  { name: "Instagram", icon: "fab fa-instagram", url: "https://instagram.com/saikishor164" },
];

const linkList = document.getElementById('linkList');

links.forEach(link => {
  const a = document.createElement('a');
  a.href = link.url;
  a.target = '_blank';
  a.innerHTML = `<i class="${link.icon}"></i>${link.name}`;
  linkList.appendChild(a);
});
