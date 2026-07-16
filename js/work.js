
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

// ── WORK GALLERY: play video on hover (mix of photo + video items)
document.querySelectorAll('.wk-item-video video').forEach(v=>{
  const wrap=v.closest('.wk-item');
  wrap.addEventListener('mouseenter',()=>{ if(v.src) v.play().catch(()=>{}); });
  wrap.addEventListener('mouseleave',()=>{ v.pause(); });
});

// ── WORK GALLERY LIGHTBOX (click to view full, with prev/next/close)
(function(){
  const items=[...document.querySelectorAll('#wkGrid .wk-item')];
  if(!items.length)return;
  const lb=document.getElementById('wkLb');
  const stage=document.getElementById('wkLbStage');
  const titleEl=document.getElementById('wkLbTitle');
  const countEl=document.getElementById('wkLbCount');
  const btnClose=document.getElementById('wkLbClose');
  const btnPrev=document.getElementById('wkLbPrev');
  const btnNext=document.getElementById('wkLbNext');
  let idx=0;

  function dataFor(item){
    const isVideo=item.classList.contains('wk-item-video');
    const label=item.querySelector('.wk-item-label')?.textContent||'';
    if(isVideo){
      const v=item.querySelector('video');
      return {type:'video',src:v.src||'',poster:v.poster,label};
    }
    const img=item.querySelector('img');
    return {type:'image',src:img.src,label};
  }

  function render(){
    const d=dataFor(items[idx]);
    stage.querySelectorAll('img,video').forEach(el=>el.remove());
    let media;
    if(d.type==='video' && d.src){
      media=document.createElement('video');
      media.src=d.src;media.poster=d.poster;media.controls=true;media.autoplay=true;media.loop=true;media.playsInline=true;
    } else {
      media=document.createElement('img');
      media.src=d.type==='video'?d.poster:d.src;media.alt=d.label;
    }
    stage.insertBefore(media,stage.firstChild);
    titleEl.textContent=d.label;
    countEl.textContent=(idx+1)+' / '+items.length;
  }

  function open(i){
    idx=((i%items.length)+items.length)%items.length;
    render();
    lb.classList.add('is-open');
    document.body.style.overflow='hidden';
  }
  function close(){
    lb.classList.remove('is-open');
    document.body.style.overflow='';
    setTimeout(()=>{
      const v=stage.querySelector('video');
      if(v){v.pause();}
    },300);
  }
  function next(){open(idx+1);}
  function prev(){open(idx-1);}

  items.forEach((item,i)=>{
    item.addEventListener('click',()=>open(i));
  });
  btnClose.addEventListener('click',close);
  btnNext.addEventListener('click',e=>{e.stopPropagation();next();});
  btnPrev.addEventListener('click',e=>{e.stopPropagation();prev();});
  lb.addEventListener('click',e=>{ if(e.target===lb) close(); });
  document.addEventListener('keydown',e=>{
    if(!lb.classList.contains('is-open'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowRight')next();
    if(e.key==='ArrowLeft')prev();
  });
})();

