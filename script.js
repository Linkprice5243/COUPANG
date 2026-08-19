const progress = document.getElementById('progressBar');
const links = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const sidebar = document.getElementById('sidebar');
const pageSections = [...document.querySelectorAll('main section[id]')];
let keyMoving = false;
const menuBtn = document.getElementById('menuBtn');

function updateProgress(){
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${Math.min(100, (scrollTop / height) * 100)}%`;
}
function updateActive(){
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', () => { updateProgress(); updateActive(); }, {passive:true});
menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
links.forEach(link => link.addEventListener('click', () => sidebar.classList.remove('open')));
updateProgress();
updateActive();

document.addEventListener('keydown', (e) => {
  if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'PageDown' && e.key !== 'PageUp') return;
  e.preventDefault();
  if (keyMoving) return;

  const currentY = window.scrollY + 120;
  let idx = pageSections.findIndex(s => s.offsetTop > currentY);
  if (idx === -1) idx = pageSections.length;

  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    const target = pageSections[Math.min(pageSections.length - 1, idx)];
    if (target) {
      keyMoving = true;
      target.scrollIntoView({behavior:'smooth', block:'start'});
      setTimeout(()=>keyMoving=false, 550);
    }
  } else {
    let prev = pageSections.filter(s => s.offsetTop < currentY - 100).pop();
    if (!prev) prev = pageSections[0];
    keyMoving = true;
    prev.scrollIntoView({behavior:'smooth', block:'start'});
    setTimeout(()=>keyMoving=false, 550);
  }
});
