
// Load working GitHub repos
fetch('https://api.github.com/users/Scottsito/repos')
  .then(response => response.json())
  .then(repos => {
    const list = document.getElementById('repo-list');
    repos.filter(r => r.homepage && r.homepage.startsWith('http')).forEach(repo => {
      const a = document.createElement('a');
      a.href = repo.homepage;
      a.textContent = `🔗 ${repo.name}`;
      a.target = '_blank';
      list.appendChild(a);
    });
  });

// Secret ARG redirect
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'b') {
    document.addEventListener('keydown', (e2) => {
      if (e2.key === 'v') {
        const box = document.getElementById('secret-box');
        box.style.display = 'block';
        document.getElementById('secret-input').addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter') {
            if (ev.target.value.trim().toLowerCase() === 'mymind') {
              window.location.href = 'https://scottsito.github.io/pbplqg/thoughts.html';
            }
          }
        });
      }
    }, { once: true });
  }
});

//Background logic
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#bb86fc";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  requestAnimationFrame(animate);
}
animate();
