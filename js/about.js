
// ── LOADER
setTimeout(()=>{
  const ld=document.getElementById('loader');
  ld.classList.add('hide');
  setTimeout(()=>{ld.style.display='none';},650);
},2100);

// ── CURSOR (disabled — using native mouse pointer instead)


// ── MOBILE NAV TOGGLE
function toggleMobNav(){
  const ham=document.getElementById('navHam');
  const nav=document.getElementById('mob-nav');
  const ov=document.getElementById('mob-nav-overlay');
  ham.classList.toggle('open');
  nav.classList.toggle('open');
  ov.classList.toggle('open');
  document.body.style.overflow=nav.classList.contains('open')?'hidden':'';
}

// ── NAV SCROLL
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('sc',window.scrollY>55);
});

// ── PAGE NAVIGATION
function gp(pg){
  document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
  document.getElementById('pg-'+pg).classList.add('on');
  window.scrollTo({top:0,behavior:'instant'});
  // close mobile nav if open
  const ham=document.getElementById('navHam');
  const mobNav=document.getElementById('mob-nav');
  const ov=document.getElementById('mob-nav-overlay');
  if(ham&&mobNav&&mobNav.classList.contains('open')){
    ham.classList.remove('open');mobNav.classList.remove('open');ov.classList.remove('open');document.body.style.overflow='';
  }
  setTimeout(initRv,100);
  return false;
}

// ── SCROLL REVEAL
function initRv(){
  const io=new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting) setTimeout(()=>e.target.classList.add('vis'),i*65);
    });
  },{threshold:.01,rootMargin:'0px 0px -5% 0px'});
  document.querySelectorAll('.rv:not(.vis)').forEach(el=>io.observe(el));
}
initRv();
// Fallback: force-reveal anything still hidden shortly after load/scroll,
// in case the IntersectionObserver misses an element during fast scrolling.
function forceRevealVisible(){
  document.querySelectorAll('.rv:not(.vis)').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.top<window.innerHeight && r.bottom>0){ el.classList.add('vis'); }
  });
}
window.addEventListener('scroll',forceRevealVisible,{passive:true});
window.addEventListener('load',forceRevealVisible);
setTimeout(forceRevealVisible,2500);

// ── FAQ
function faqT(btn){
  const it=btn.closest('.fi'),was=it.classList.contains('op');
  document.querySelectorAll('.fi').forEach(f=>f.classList.remove('op'));
  if(!was)it.classList.add('op');
}

// ── SERVICES ACCORDION
function svcT(hd){
  const it=hd.closest('.si'),was=hd.classList.contains('oh');
  document.querySelectorAll('.si-hd').forEach(h=>h.classList.remove('oh'));
  document.querySelectorAll('.si-body').forEach(b=>b.classList.remove('ob'));
  if(!was){hd.classList.add('oh');it.querySelector('.si-body').classList.add('ob');}
}

// ── BEFORE/AFTER SLIDER
function initBA(id,aid,hid){
  const sl=document.getElementById(id);
  if(!sl)return;
  const af=document.getElementById(aid),hd=document.getElementById(hid);
  let drag=false;
  function setP(e){
    const r=sl.getBoundingClientRect();
    const x=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));
    af.style.clipPath=`inset(0 ${(1-x)*100}% 0 0)`;
    hd.style.left=`${x*100}%`;
  }
  sl.addEventListener('mousedown',e=>{drag=true;setP(e)});
  document.addEventListener('mousemove',e=>{if(drag)setP(e)});
  document.addEventListener('mouseup',()=>drag=false);
  sl.addEventListener('touchmove',e=>{setP({clientX:e.touches[0].clientX});e.preventDefault();},{passive:false});
}
initBA('ba1','ba1a','ba1h');
initBA('ba2','ba2a','ba2h');

// ── WORK FILTER
function wkF(btn,cat){
  document.querySelectorAll('.wfb').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  const cards = document.querySelectorAll('.wcard');
  wkVisibleIndices = [];
  cards.forEach(c=>{
    const show=cat==='all'||c.dataset.cat.includes(cat);
    if(show){
      wkVisibleIndices.push(parseInt(c.dataset.idx));
      c.style.display='flex';
      c.style.opacity='0';c.style.transform='translateY(14px)';
      setTimeout(()=>{c.style.transition='opacity .4s,transform .4s';c.style.opacity='1';c.style.transform='translateY(0)';},20);
    } else {
      c.style.transition='opacity .3s';c.style.opacity='0';
      setTimeout(()=>{c.style.display='none';},320);
    }
  });
}

// ── CONTACT FORM
function subF(){
  const n=document.getElementById('fn').value.trim();
  const e=document.getElementById('fe').value.trim();
  if(!n||!e){alert('Please fill in your name and email.');return;}
  document.getElementById('fmain').style.display='none';
  document.getElementById('fsuc').style.display='block';
}


// ── BLOG FILTER
function blF(btn,cat){
  document.querySelectorAll('#bl-filters .wfb').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.bl-card').forEach(c=>{
    const show=cat==='all'||c.dataset.bcat.includes(cat);
    if(show){
      c.style.display='flex';
      c.style.opacity='0';c.style.transform='translateY(14px)';
      setTimeout(()=>{c.style.transition='opacity .4s,transform .4s';c.style.opacity='1';c.style.transform='translateY(0)';},20);
    } else {
      c.style.transition='opacity .3s';c.style.opacity='0';
      setTimeout(()=>{c.style.display='none';},320);
    }
  });
}

// ── HERO VIDEO WALL PULSE
const vcells=document.querySelectorAll('.hvc:not(.big)');
if(vcells.length){
  setInterval(()=>{
    const r=Math.floor(Math.random()*vcells.length);
    vcells[r].style.opacity='.35';
    vcells[r].style.transition='opacity .7s';
    setTimeout(()=>{vcells[r].style.opacity='1';},700);
  },1600);
}

// ── REEL CARD ROTATOR
(function(){
  const classes=['rc-front','rc-mid1','rc-mid2','rc-back1','rc-back2','rc-exit'];
  function rotateReels(){
    const stack=document.getElementById('reelStack');
    if(!stack)return;
    const cards=[...stack.querySelectorAll('.reel-card')];
    // Remove all state classes
    cards.forEach(c=>c.classList.remove(...classes));
    // Shift: last card becomes front, others push back
    const last=cards.pop();
    cards.unshift(last);
    // Assign classes
    cards.forEach((c,i)=>{if(classes[i])c.classList.add(classes[i])});
    // Re-append in new order
    cards.forEach(c=>stack.appendChild(c));
  }
  setInterval(rotateReels,2200);
})();

(function(){
  const phrases=['YOU?','NEXT?','YOUR BRAND?',"LET'S BUILD"];
  let idx=0;
  const el=document.getElementById('morphText');
  if(!el)return;
  setInterval(()=>{
    el.classList.add('fade-out');
    setTimeout(()=>{
      idx=(idx+1)%phrases.length;
      el.textContent=phrases[idx];
      el.classList.remove('fade-out');
    },260);
  },1100);
})();

// ── STAGGER REVEAL for vyst-grid and partners-grid
(function(){
  const staggerIO=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const grid=entry.target;
      const cells=grid.querySelectorAll('.vyst-logo-card,.vyst-count-card,.vyst-you-card,.pg-cell');
      cells.forEach((cell,i)=>{
        setTimeout(()=>cell.classList.add('revealed'),i*45);
      });
      staggerIO.unobserve(grid);
    });
  },{threshold:.06});
  const cg=document.getElementById('clientGrid');
  if(cg)staggerIO.observe(cg);

  // Partners dot-grid stagger
  const dg=document.getElementById('partnersGrid');
  if(dg){
    const dcIO=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        const cells=entry.target.querySelectorAll('.dc:not(.empty):not(.label-card)');
        cells.forEach((cell,i)=>{setTimeout(()=>cell.classList.add('dcrev'),i*60);});
        dcIO.unobserve(entry.target);
      });
    },{threshold:.08});
    dcIO.observe(dg);
  }
})();

// ── TESTIMONIAL CAROUSEL
(function(){
  const track = document.getElementById('testiTrack');
  const dotsWrap = document.getElementById('testiDots');
  if(!track) return;
  const cards = [...track.querySelectorAll('.tc')];
  let current = 0;
  let perView = 3;
  let autoTimer;

  function getPerView(){
    return window.innerWidth <= 900 ? 1 : 3;
  }

  function buildDots(){
    perView = getPerView();
    const total = Math.ceil(cards.length / perView);
    dotsWrap.innerHTML='';
    for(let i=0;i<total;i++){
      const d=document.createElement('div');
      d.className='testi-dot'+(i===current?' active':'');
      d.onclick=()=>{ goTo(i); resetAuto(); };
      dotsWrap.appendChild(d);
    }
  }

  function updateCardSizes(){
    perView = getPerView();
    const wrap = track.parentElement;
    const wrapW = wrap.offsetWidth;
    const gap = 20;
    const cardW = perView === 1
      ? wrapW
      : (wrapW - gap * (perView - 1)) / perView;
    cards.forEach(c=>{
      c.style.flex = `0 0 ${cardW}px`;
      c.style.width = `${cardW}px`;
    });
    track.style.gap = `${gap}px`;
  }

  function goTo(idx){
    perView = getPerView();
    const total = Math.ceil(cards.length / perView);
    current = ((idx % total) + total) % total;
    const wrap = track.parentElement;
    const wrapW = wrap.offsetWidth;
    const gap = 20;
    const cardW = perView === 1
      ? wrapW
      : (wrapW - gap * (perView - 1)) / perView;
    const slideAmt = (cardW + gap) * perView * current;
    track.style.transform = `translateX(-${slideAmt}px)`;
    dotsWrap.querySelectorAll('.testi-dot').forEach((d,i)=>d.classList.toggle('active',i===current));
  }

  window.testiMove = function(dir){ goTo(current + dir); resetAuto(); };

  function resetAuto(){
    clearInterval(autoTimer);
    autoTimer = setInterval(()=>{ goTo(current+1); }, 4500);
  }

  function init(){
    updateCardSizes();
    buildDots();
    goTo(0);
    resetAuto();
  }

  window.addEventListener('resize',()=>{ current=0; init(); });
  // Wait for layout
  setTimeout(init, 100);
})();

// ── GENDER-BASED PERSON ICONS (used instead of photos)
const PERSON_ICONS = {
  female: '<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg"><path d="M60 8C40 8 26 24 26 46c0 10 3 18 8 24-10 8-14 16-14 16h80s-4-8-14-16c5-6 8-14 8-24C94 24 80 8 60 8z" fill="currentColor" opacity="0.85"/><circle cx="60" cy="50" r="26" fill="currentColor"/><path d="M60 100c-26 0-46 16-46 38v2h92v-2c0-22-20-38-46-38z" fill="currentColor"/></svg>',
  male: '<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg"><path d="M60 14c-16 0-28 10-30 26 6-4 12-6 18-6 4 6 8 8 12 8s8-2 12-8c6 0 12 2 18 6-2-16-14-26-30-26z" fill="currentColor" opacity="0.85"/><circle cx="60" cy="46" r="24" fill="currentColor"/><path d="M60 96c-24 0-44 15-44 36v4h88v-4c0-21-20-36-44-36z" fill="currentColor"/></svg>'
};

// ── FOUNDERS DATA
const FOUNDERS = [
  {
    initial: 'G',
    name: 'Grisha Sanghavi',
    post: 'Founder & Content Creator · MSc Marketing & Strategy, London | Marketing L5 | 6 Years Experience',
    role: 'Founder',
    bgGradient: 'linear-gradient(135deg,#2a1a10,#1a1410)',
    accentColor: '#FFC6D3',
    photo: null,
    gender: 'female',
    bio: "The mind behind the bling. Grisha Sanghavi is the Founder of The Social Bling — a marketing agency built on one simple belief: every brand deserves to be seen, heard, and remembered. With a passion for building brands from the ground up, Grisha leads the vision, strategy, and creative direction that drives The Social Bling's work across India and beyond.\n\nStrategist by training. Creator by passion. Ad-maker in the making.\n\nHolding an MSc in Marketing & Strategy from a London university and a Marketing Level 5 qualification, Grisha brought her international education back home with one clear mission — to build a marketing agency that genuinely moves the needle for Indian and global brands. With 6 years of hands-on industry experience across social media, SEO, content strategy, and brand building, Grisha has worked with startups, SMBs, and growing businesses across India — helping them find their voice, own their audience, and scale with confidence.\n\nAt just 25, she is proof that world-class marketing doesn't have to come with a corporate price tag or a corner-office attitude. Grisha leads The Social Bling with energy, strategy, and a deep obsession with results.",
    message: "Your brand is already remarkable — most businesses just haven't told the world yet. That's exactly what we're here to do.",
    tags: ['Brand Strategy', 'Content Creation', 'Social Media', 'SEO', 'Ad-Making', '6 Years Experience']
  },
  {
    initial: 'H',
    name: 'Harshit',
    post: 'Co-Founder · CIMA Qualified | Marketing Specialist',
    role: 'Co-Founder',
    bgGradient: 'linear-gradient(135deg,#0d1a14,#1a1410)',
    accentColor: '#4a8a6a',
    photo: null,
    gender: 'male',
    bio: "The engine behind the execution. Harshit is the Co-Founder of The Social Bling and the operational backbone behind every campaign the agency runs. A CIMA-qualified professional and a marketing specialist, Harshit brings a rare combination of financial rigour and creative marketing thinking — the kind that ensures every rupee of a client's budget is working as hard as possible.\n\nAt 26, Harshit has already built a reputation for turning strategy into execution without losing momentum. Whether it's managing multi-platform campaigns, overseeing client delivery, or diving deep into analytics to find what's really working — Harshit is the person who makes sure The Social Bling doesn't just promise results, it delivers them.",
    message: "Good marketing is never about being loud — it's about being unmistakably clear about who you are and who you serve.",
    tags: ['Campaign Management', 'Analytics', 'Client Delivery', 'Financial Strategy', 'Multi-Platform']
  }
];

function openFounder(idx) {
  const f = FOUNDERS[idx];
  const modal = document.getElementById('ab2-founder-modal');

  // Always show a gender-based vector icon (no real photos)
  const initialEl = document.getElementById('modalInitial');
  const photoImg  = document.getElementById('modalPhotoImg');

  photoImg.style.display = 'none';
  initialEl.style.display = 'flex';
  initialEl.style.background = 'none';
  initialEl.style.backgroundImage = 'none';
  initialEl.style['-webkit-background-clip'] = 'unset';
  initialEl.style['background-clip'] = 'unset';
  initialEl.style['-webkit-text-fill-color'] = 'unset';
  initialEl.style.color = f.accentColor;
  initialEl.innerHTML = PERSON_ICONS[f.gender] || PERSON_ICONS.male;

  document.getElementById('modalPhotoBg').style.background = f.bgGradient;
  document.getElementById('modalName').textContent = f.name;
  document.getElementById('modalPost').textContent = f.post;
  document.getElementById('modalPost').style.color = f.accentColor;
  document.getElementById('modalRole').textContent = f.role;
  document.getElementById('modalRole').style.background = f.accentColor;

  // Bio paragraphs
  const msgEl = document.getElementById('modalMessage');
  if (f.bio) {
    msgEl.innerHTML = f.bio.split('\n\n').map(p => `<p style="margin:0 0 .9rem;line-height:1.7">${p}</p>`).join('');
  } else {
    msgEl.innerHTML = `<p style="margin:0;line-height:1.7">${f.message}</p>`;
  }

  // Quote
  const quoteEl = document.getElementById('modalQuote');
  if (quoteEl) quoteEl.textContent = `"${f.message}"`;

  const tagsEl = document.getElementById('modalTags');
  tagsEl.innerHTML = f.tags.map(t => `<span class="ab2-modal-tag">${t}</span>`).join('');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeFounder() {
  document.getElementById('ab2-founder-modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFounder(); });
