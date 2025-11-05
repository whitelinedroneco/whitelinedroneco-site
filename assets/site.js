
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    if ((path === '' && href.endsWith('index.html')) || href.endsWith(path)) {
      a.classList.add('active');
    }
  });
  const btn = document.querySelector('.menu-btn');
  const list = document.querySelector('nav ul');
  if(btn && list){
    btn.addEventListener('click',()=>{
      const on = getComputedStyle(list).display !== 'none';
      list.style.display = on ? 'none' : 'flex';
      list.style.flexDirection = 'column';
      list.style.gap = '12px';
      list.style.padding = '12px 0';
    });
  }
});
