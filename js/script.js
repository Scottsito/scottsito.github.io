
// Load working GitHub repos
fetch('https://api.github.com/users/Scottsito/repos')
  .then(response => response.json())
  .then(repos => {
    const list = document.getElementById('repo-list');
    repos.filter(r => r.homepage && r.homepage.startsWith('http')).forEach(repo => {
      const a = document.createElement('a');
      a.href = repo.homepage;
      a.textContent = `🔗 ${repo.name}`;
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

// Setup canvas
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";

// Section to avoid
const avoidSection = document.getElementById("about"); // change to your target section's ID

function resizeCanvas() {
  const width = document.documentElement.scrollWidth;
  const height = document.documentElement.scrollHeight;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // scale fix
}
window.addEventListener("resize", resizeCanvas);
window.addEventListener("scroll", resizeCanvas);
resizeCanvas();

// Create particles
let particles = [];
for (let i = 0; i < 1000; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  });
}

// Get current position of the section to avoid
function getAvoidBox() {
  if (!avoidSection) return null;
  const rect = avoidSection.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    right: rect.right + window.scrollX,
    bottom: rect.bottom + window.scrollY
  };
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const avoidBox = getAvoidBox();

  for (let p of particles) {
    // Movement
    p.x += p.dx;
    p.y += p.dy;

    // Bounce on edge
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    // Avoid section
    if (avoidBox &&
        p.x > avoidBox.left && p.x < avoidBox.right &&
        p.y > avoidBox.top && p.y < avoidBox.bottom) {
      p.dx *= -1;
      p.dy *= -1;
      p.x += p.dx * 2;
      p.y += p.dy * 2;
    }

    // Draw
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#bb86fc"; // light pink
    ctx.fill();
  }

  requestAnimationFrame(animate);
}
animate();
