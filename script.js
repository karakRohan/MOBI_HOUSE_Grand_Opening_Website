document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = '☰';
    }));
  }
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(item => observer.observe(item));
  } else items.forEach(item => item.classList.add('visible'));

  // Countdown to 1 November 2026, 10:30 AM IST.
  const countdown = document.getElementById('opening-countdown');
  if (countdown) { const target = new Date(countdown.dataset.target).getTime(); const updateCountdown = () => { let diff = Math.max(0,target-Date.now()); const days=Math.floor(diff/86400000); diff%=86400000; const hours=Math.floor(diff/3600000); diff%=3600000; const minutes=Math.floor(diff/60000); diff%=60000; const seconds=Math.floor(diff/1000); countdown.querySelector('[data-days]').textContent=String(days).padStart(2,'0'); countdown.querySelector('[data-hours]').textContent=String(hours).padStart(2,'0'); countdown.querySelector('[data-minutes]').textContent=String(minutes).padStart(2,'0'); countdown.querySelector('[data-seconds]').textContent=String(seconds).padStart(2,'0'); if(target<=Date.now()){const c=document.querySelector('.countdown-caption');if(c)c.textContent='The grand opening day is here — welcome to MOBI HOUSE!';} }; updateCountdown(); setInterval(updateCountdown,1000); }
  // Audible autoplay is attempted; browsers may require a tap before sound can play.
  const audio=document.querySelector('.site-audio'), audioButton=document.querySelector('.audio-toggle'), audioStatus=document.querySelector('.audio-status');
  if(audio&&audioButton){audio.volume=0.55;const setAudioState=playing=>{audioButton.textContent=playing?'❚❚':'▶';audioButton.setAttribute('aria-label',playing?'Pause background music':'Play background music');if(audioStatus)audioStatus.textContent=playing?'Music playing':'Tap ▶ to start music';};audioButton.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();setAudioState(true);}catch(_){if(audioStatus)audioStatus.textContent='Tap again to allow audio';}}else{audio.pause();setAudioState(false);}});audio.addEventListener('play',()=>setAudioState(true));audio.addEventListener('pause',()=>setAudioState(false));audio.play().then(()=>setAudioState(true)).catch(()=>setAudioState(false));}
});