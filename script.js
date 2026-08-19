const progress = document.getElementById('progressBar');
const links = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const sidebar = document.getElementById('sidebar');
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
