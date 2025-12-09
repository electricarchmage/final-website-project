// Simple interactions + form validation
document.addEventListener('DOMContentLoaded', () => {
  // header year placeholders
  const y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
  document.getElementById('yearAbout')?.textContent = y;
  document.getElementById('yearProjects')?.textContent = y;
  document.getElementById('yearContact')?.textContent = y;

  // mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', (!expanded).toString());
      if(mobileMenu.hasAttribute('hidden')){
        mobileMenu.removeAttribute('hidden');
      } else {
        mobileMenu.setAttribute('hidden', '');
      }
    });
  }

  // contact form handling
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      clearErrors();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();
      const honeypot = form.honeypot?.value || '';

      // honeypot anti-spam
      if(honeypot){
        showStatus('Spam detected — submission blocked.', true);
        return;
      }

      let ok = true;
      if(name.length < 2){ setError('err-name', 'Please enter your name (2+ chars).'); ok = false; }
      if(!isValidEmail(email)){ setError('err-email', 'Please provide a valid email.'); ok = false; }
      if(subject.length < 3){ setError('err-subject', 'Subject is too short.'); ok = false; }
      if(message.length < 15){ setError('err-message', 'Message must be at least 15 characters.'); ok = false; }

      if(!ok){
        showStatus('Please fix errors above.', true);
        return;
      }

      // Attempt a client-side "mailto:" fallback so GitHub Pages can still surface message
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        ``,
        message
      ].join('\n');

      const mailto = `mailto:you@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showStatus('Opening your mail client...', false);
      // open mail client
      window.location.href = mailto;

      // Optionally also clear form
      setTimeout(() => { form.reset(); showStatus('If your mail client didn\'t open, you can copy/paste your message to you@example.com.', false); }, 800);
    });
  }

  // helpers
  function setError(id, text){
    const el = document.getElementById(id);
    if(el) el.textContent = text;
  }
  function clearErrors(){
    ['err-name','err-email','err-subject','err-message'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.textContent = '';
    });
    showStatus('', false);
  }
  function showStatus(msg, isError){
    const s = document.getElementById('formStatus');
    if(s){
      s.textContent = msg;
      s.style.color = isError ? '#ff7676' : '';
    }
  }
  function isValidEmail(email){
    // strict but reasonable
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
