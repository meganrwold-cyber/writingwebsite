// Small JS helpers: mobile nav toggle, set current year, smooth scroll, simple client validation
document.addEventListener('DOMContentLoaded',function(){
  // set year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if(toggle && nav){
    toggle.addEventListener('click',function(){
      nav.classList.toggle('show');
    });
  }

  // smooth links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
        // hide nav on mobile
        if(nav) nav.classList.remove('show');
      }
    });
  });

  // simple form submit handler for better UX (still posts to mailto fallback)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',function(e){
      const email = document.getElementById('email');
      if(email && !email.checkValidity()){
        e.preventDefault();
        email.focus();
        alert('Please enter a valid email address.');
      }
    });
  }

  // highlight active tab in the header nav (works for local file URLs)
  (function markActiveTab(){
    const links = document.querySelectorAll('#site-nav a');
    if(!links || links.length===0) return;
    // derive filename from location
    const path = window.location.pathname || window.location.href;
    const parts = path.split('/');
    const filename = parts.pop() || parts.pop() || 'home.html'; // handle trailing slash

    links.forEach(a=>{
      const href = a.getAttribute('href');
      if(!href) return;
      // compare by equality or if current URL endsWith the href
      if(href === filename || window.location.href.endsWith(href)){
        a.classList.add('active');
      }
    });
  })();

});
