// AOS init
AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });

// Year in footer
document.querySelectorAll('#year').forEach(n => n.textContent = new Date().getFullYear());

// Theme toggle with persistence
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
updateModeLabel();

document.querySelectorAll('#themeToggle').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const current = root.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateModeLabel();
  });
});
function updateModeLabel(){
  const isDark = (root.getAttribute('data-theme')||'light') === 'dark';
  document.querySelectorAll('.mode-label').forEach(n=> n.textContent = isDark ? 'Light' : 'Dark');
}

// Smooth scrolling for same-page links
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const id = a.getAttribute('href');
  if(id.length > 1){
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior:'smooth', block:'start' });
  }
});

// Back to top visibility
const backBtn = document.getElementById('backToTop');
const onScroll = ()=>{
  if (!backBtn) return;
  backBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
};
window.addEventListener('scroll', onScroll);
backBtn?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// Bootstrap form validation
(() => {
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault(); event.stopPropagation();
      } else {
        event.preventDefault();
        alert('Thanks! Your message was validated (demo).');
        form.reset(); form.classList.remove('was-validated');
        return;
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// Project filters (projects.html)
document.querySelectorAll('[data-filter]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const f = btn.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('#projectGrid [data-category]').forEach(card=>{
      const show = f==='all' || card.dataset.category===f;
      card.style.display = show ? '' : 'none';
      if (show) card.classList.add('aos-animate');
    });
  });
});

// Animate skill bars (skills.html)
function animateBars(){
  document.querySelectorAll('.progress-bar').forEach(bar=>{
    const rect = bar.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 100;
    if(inView && !bar.dataset.done){
      const pct = +bar.dataset.target || 0;
      bar.style.width = pct + '%';
      bar.closest('.mb-3').querySelector('.percent').textContent = pct + '%';
      bar.dataset.done = '1';
    }
  });
}
window.addEventListener('scroll', animateBars);
window.addEventListener('load', animateBars);
