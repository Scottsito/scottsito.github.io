
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
