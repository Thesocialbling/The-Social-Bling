
// ── WORK PROJECTS DATA
const WK_PROJECTS = [
  {
    title:'The Sassy Bae',cat:'Fashion · Social Media',tagline:'From zero to iconic.',
    bg:'linear-gradient(145deg,#1a2a1a,#2d4a2d)',
    desc:'A complete brand and social media build for a fashion startup. We defined their voice, aesthetic, and content strategy — turning a blank slate into a feed that felt distinctly them. Reels that stopped scrollers, content that converted followers into customers.',
    tags:['Reels Production','Brand Voice','Feed Direction','Caption Writing','Strategy'],
    results:[{n:'0→12K',l:'Followers in 90 days'},{n:'8.4%',l:'Avg Engagement Rate'},{n:'3X',l:'Website Traffic'},{n:'32',l:'Pieces/Month'}]
  },
  {
    title:'Anandam World City',cat:'Real Estate · Social',tagline:'A township, reimagined.',
    bg:'linear-gradient(145deg,#1a1a2a,#2a2a4a)',
    desc:'Repositioning a large-scale township project from a flat property listing to a lifestyle destination. Strategic content showing community, greenery, and modern living — making Anandam feel like a dream, not just a deal.',
    tags:['Social Strategy','Content Creation','Paid Ads','Community Growth'],
    results:[{n:'5X',l:'Lead Quality Improvement'},{n:'40%',l:'Cost Per Lead Drop'},{n:'22K',l:'Monthly Reach'},{n:'18',l:'Months Together'}]
  },
  {
    title:'Kawediya Jewellers',cat:'Jewellery · Branding',tagline:'Heritage, modernised.',
    bg:'linear-gradient(145deg,#2a1a10,#4a2a18)',
    desc:'A decades-old jewellery brand needed an identity that honoured its roots while speaking to a new generation. We built a visual language that felt both timeless and contemporary — logo, guidelines, packaging direction, and social presence.',
    tags:['Logo Design','Brand Guidelines','Identity System','Social Templates','Packaging'],
    results:[{n:'100%',l:'Brand Consistency'},{n:'New',l:'Digital Presence'},{n:'60%',l:'Younger Audience'},{n:'2',l:'Awards Won'}]
  },
  {
    title:'RAW Sugar',cat:'F&B · Brand Launch',tagline:'Bold. Clean. Craveable.',
    bg:'linear-gradient(145deg,#2a1015,#4a1a25)',
    desc:'D2C healthy snack brand launching into a crowded market. We created an identity that was bold enough to stand out on a shelf and warm enough to build a loyal community. Launch strategy, social presence, and content engine built from scratch.',
    tags:['D2C Strategy','Brand Identity','Social Launch','Content Production','Influencer Seeding'],
    results:[{n:'Day 1',l:'Sold Out Launch'},{n:'4.2K',l:'Pre-launch Waitlist'},{n:'6X',l:'ROAS on Paid'},{n:'92%',l:'Repeat Purchase'}]
  },
  {
    title:'Smitam Lifestyle',cat:'Lifestyle · Full Service',tagline:'Consistent. Aspirational. Theirs.',
    bg:'linear-gradient(145deg,#2a1a0d,#4a2e12)',
    desc:'A full-scale social media management project for a lifestyle brand that needed to look and feel premium consistently. Monthly content calendars, Reels production, caption writing, community management, and growth strategy — all handled end to end.',
    tags:['Full Management','Reels','Creative Direction','Community','Analytics'],
    results:[{n:'5X',l:'Engagement Growth'},{n:'18K',l:'New Followers'},{n:'98%',l:'Client Retention'},{n:'12',l:'Months Running'}]
  },
  {
    title:'Kaze Bangalore',cat:'Hospitality · Launch',tagline:'Fully booked on night one.',
    bg:'linear-gradient(145deg,#0d1a2a,#12284a)',
    desc:'Pre-launch buzz, grand opening content, and sustained social growth for a new restaurant in Bangalore. We built anticipation for 3 weeks before launch, drove footfall on opening night, and kept the momentum going with consistent content that made Kaze feel like the city\'s most talked-about table.',
    tags:['Event Launch','Pre-Hype Campaign','Live Coverage','Influencer Collab','Post-event Content'],
    results:[{n:'Sold',l:'Out Opening Night'},{n:'2.3K',l:'Saves on Launch Post'},{n:'11',l:'Press Features'},{n:'4.8★',l:'Google Rating'}]
  },
  {
    title:'Orange Alchemy',cat:'Beauty · Brand Positioning',tagline:'Bold beauty, globally relevant.',
    bg:'linear-gradient(145deg,#1a100a,#3a1f10)',
    desc:'A boutique beauty brand with a bold personality needed positioning to match. We defined their brand world — the language, the visual codes, the content tone — and translated it into a social presence that felt premium without being pretentious.',
    tags:['Brand Positioning','Visual Direction','Social Strategy','Global Appeal'],
    results:[{n:'3',l:'Markets Entered'},{n:'40K',l:'Monthly Impressions'},{n:'6.1%',l:'Engagement Rate'},{n:'Premium',l:'Market Positioning'}]
  },
  {
    title:'Pan-India Events',cat:'Events · Multiple Projects',tagline:'Sold out. Every time.',
    bg:'linear-gradient(145deg,#180e28,#2a183a)',
    desc:'A series of events across Mumbai, Delhi, Bangalore, and Hyderabad — each one needing pre-event buzz, live social coverage, and post-event community building. We handled the full promotional arc for multiple clients across multiple cities, consistently driving sold-out turnouts.',
    tags:['Pre-Event Hype','Live Coverage','Influencer Outreach','Post-Event Recap','Ticket Sales'],
    results:[{n:'9',l:'Events Promoted'},{n:'100%',l:'Sell-Through Rate'},{n:'3X',l:'Avg Ticket Sales Lift'},{n:'50K+',l:'Combined Reach'}]
  },
  {
    title:"Aure' Fragrance",cat:'Luxury · Global',tagline:'Artisan luxury, global stage.',
    bg:'linear-gradient(145deg,#0a0a1a,#18183a)',
    desc:'An artisan perfumery with extraordinary product needed a brand that matched its ambition. We built an identity worthy of global shelves — refined, evocative, unmistakable. Full brand system, packaging direction, and a social presence that made every post feel like an invitation into a world.',
    tags:['Luxury Branding','Identity System','Global Strategy','Packaging Direction','Social Direction'],
    results:[{n:'3',l:'International Stockists'},{n:'Luxury',l:'Segment Positioning'},{n:'Press',l:'Coverage in 5 Countries'},{n:'2X',l:'AOV Increase'}]
  }
];

let wkCurrentIdx = 0;
let wkVisibleIndices = WK_PROJECTS.map((_,i)=>i);

function wkModalOpen(idx){
  wkCurrentIdx = wkVisibleIndices.indexOf(idx);
  if(wkCurrentIdx < 0) wkCurrentIdx = 0;
  wkModalRender();
  document.getElementById('wk-modal').classList.add('open');
  document.body.style.overflow='hidden';
}

function wkModalClose(e){
  if(e && e.currentTarget === document.getElementById('wk-modal')){
    // Only close if clicking the backdrop itself, not children
    if(e.target !== document.getElementById('wk-modal') && !e.target.classList.contains('wk-modal-bg')) return;
  }
  document.getElementById('wk-modal').classList.remove('open');
  document.body.style.overflow='';
}

function wkModalNav(dir){
  wkCurrentIdx = ((wkCurrentIdx + dir) + wkVisibleIndices.length) % wkVisibleIndices.length;
  wkModalRender();
}

function wkModalRender(){
  const realIdx = wkVisibleIndices[wkCurrentIdx];
  const p = WK_PROJECTS[realIdx];
  document.getElementById('wkMVisBg').style.background = p.bg;
  document.getElementById('wkMNum').textContent = String(realIdx+1).padStart(2,'0');
  document.getElementById('wkMCat').textContent = p.cat;
  document.getElementById('wkMTitle').textContent = p.title;
  document.getElementById('wkMTagline').textContent = p.tagline;
  document.getElementById('wkMDesc').textContent = p.desc;
  document.getElementById('wkMCounter').textContent = (wkCurrentIdx+1) + ' / ' + wkVisibleIndices.length;
  document.getElementById('wkMTags').innerHTML = p.tags.map(t=>`<span class="wk-modal-tag">${t}</span>`).join('');
  document.getElementById('wkMResults').innerHTML = p.results.map(r=>`<div class="wk-modal-result"><div class="wk-modal-result-n">${r.n}</div><div class="wk-modal-result-l">${r.l}</div></div>`).join('');
}

// Keyboard nav
document.addEventListener('keydown',e=>{
  if(!document.getElementById('wk-modal').classList.contains('open'))return;
  if(e.key==='Escape'){document.getElementById('wk-modal').classList.remove('open');document.body.style.overflow='';}
  if(e.key==='ArrowLeft')wkModalNav(-1);
  if(e.key==='ArrowRight')wkModalNav(1);
});



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
  },{threshold:.07});
  document.querySelectorAll('.rv:not(.vis)').forEach(el=>io.observe(el));
}
initRv();

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

// ── CONTACT FORM (Formspree)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqereroz';

function subF(){
  const n=document.getElementById('fn').value.trim();
  const b=document.getElementById('fb').value.trim();
  const e=document.getElementById('fe').value.trim();
  const s=document.getElementById('fs').value;
  const m=document.getElementById('fm').value.trim();

  if(!n||!e){alert('Please fill in your name and email.');return;}

  const btn=document.getElementById('fsubBtn');
  const note=document.getElementById('fnoteMsg');
  const originalBtnText=btn.textContent;
  btn.disabled=true;
  btn.textContent='Sending…';

  const fd = new FormData();
  fd.append('name', n);
  fd.append('company', b);
  fd.append('email', e);
  fd.append('service', s);
  fd.append('message', m);

  fetch(FORMSPREE_ENDPOINT,{
    method:'POST',
    headers:{'Accept':'application/json'},
    body: fd
  })
  .then(res=>{
    if(res.ok){
      document.getElementById('fmain').style.display='none';
      document.getElementById('fsuc').style.display='block';
    } else {
      return res.json().then(data=>{
        const msg = (data && data.errors && data.errors.length)
          ? data.errors.map(err=>err.message).join(', ')
          : 'Something went wrong. Please try again.';
        throw new Error(msg);
      });
    }
  })
  .catch(err=>{
    if(note){
      note.textContent = err.message || 'Something went wrong. Please try again or email us directly.';
      note.style.color = '#c0392b';
    } else {
      alert(err.message || 'Something went wrong. Please try again.');
    }
  })
  .finally(()=>{
    btn.disabled=false;
    btn.textContent=originalBtnText;
  });
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
