// Small UI helpers: nav toggle, current year, and contact form validation
(function(){
  // Nav toggles (works for each page that uses same id pattern)
  function setupToggle(id){
    const btn = document.getElementById(id);
    const nav = document.getElementById('primaryNav');
    if(!btn || !nav) return;
    btn.addEventListener('click', ()=>{
      const expanded = nav.style.display === 'block';
      nav.style.display = expanded ? '' : 'block';
      btn.setAttribute('aria-expanded', String(!expanded));
    });
  }
  ['navToggle','navToggle2','navToggle3','navToggle4'].forEach(setupToggle);

  // current years for any footer span ids used across pages
  ['curYear','curYear2','curYear3','curYear4'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = new Date().getFullYear();
  });

  // Form handling
  const form = document.getElementById('contactForm');
  if(form){
    const feedback = document.getElementById('formFeedback');
    const resetBtn = document.getElementById('resetBtn');

    function validate(){
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if(name.length < 2) return 'Please enter your name.';
      if(!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email address.';
      if(message.length < 10) return 'Message must be at least 10 characters.';
      return '';
    }

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const err = validate();
      if(err){
        if(feedback) feedback.textContent = err;
        return;
      }
      // Local-only demo behavior. Replace with fetch() to your backend.
      if(feedback) feedback.textContent = 'Thanks — your message looks good! (Form is currently local-only)';
      form.reset();
    });

    if(resetBtn) resetBtn.addEventListener('click', ()=>{ form.reset(); if(feedback) feedback.textContent=''; });
  }

  // Close small-screen nav when a link is clicked
  const nav = document.getElementById('primaryNav');
  if(nav){
    nav.addEventListener('click', (e)=>{
      if(e.target.tagName === 'A' && window.innerWidth <= 900){
        nav.style.display = '';
      }
    });
  }
})();