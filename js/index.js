
  // ── Blog preview slider (init happens after cards are injected below) ──
  function initBlogPreviewSlider(){
    const track = document.getElementById('bprevTrack');
    const wrap = document.getElementById('bprevWrap');
    const dots = document.querySelectorAll('.bprev-dot');
    const prevBtn = document.getElementById('bprevPrev');
    const nextBtn = document.getElementById('bprevNext');
    if(!track) return;

    const total = track.children.length;

    function getCurrentIdx(){
      const cardW = track.children[0] ? track.children[0].offsetWidth + 26 : 1;
      return Math.round(track.scrollLeft / cardW);
    }

    function updateArrows(idx){
      if(prevBtn) prevBtn.disabled = idx <= 0;
      if(nextBtn) nextBtn.disabled = idx >= total - 1;
    }

    window.bprevGo = function(idx){
      const card = track.children[idx];
      if(!card) return;
      track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    };

    window.bprevStep = function(dir){
      const idx = getCurrentIdx();
      const next = Math.max(0, Math.min(total - 1, idx + dir));
      bprevGo(next);
    };

    track.addEventListener('scroll', ()=>{
      wrap.classList.toggle('scrolled', track.scrollLeft > 20);
      const active = getCurrentIdx();
      dots.forEach((d,i) => d.classList.toggle('active', i === active));
      updateArrows(active);
    });

    // initial state
    updateArrows(0);
  }

  // ── Autofetch real blog posts from blog.html so the home page preview
  //    always matches the actual blog — no more hardcoded/mismatched cards ──
  (function(){
    const track = document.getElementById('bprevTrack');
    if(!track) return;

    function pickHref(el){
      const explicit = el.getAttribute('data-href');
      if(explicit) return explicit;
      const onclickAttr = el.getAttribute('onclick') || '';
      const m = onclickAttr.match(/'([^']+)'/);
      return m ? m[1] : 'blog.html';
    }

    function extractPost(el, isFeatured){
      const band = el.querySelector(isFeatured ? '.blx-feat-band' : '.blx-c-band');
      const title = el.querySelector(isFeatured ? '.blx-feat-title' : '.blx-c-title');
      const exc = el.querySelector(isFeatured ? '.blx-feat-exc' : '.blx-c-exc');
      const cat = el.querySelector('.blx-c-cat');
      const date = el.querySelector('.blx-c-date');
      const read = el.querySelector('.blx-c-read');
      return {
        href: pickHref(el),
        bg: band ? band.getAttribute('style') : '',
        title: title ? title.textContent.trim() : '',
        exc: exc ? exc.textContent.trim() : '',
        cat: cat ? cat.textContent.trim() : '',
        date: date ? date.textContent.trim() : '',
        read: read ? read.textContent.trim() : ''
      };
    }

    function renderPosts(posts){
      if(!posts.length) return;

      track.innerHTML = posts.map((p, i) => `
        <div class="bprev-card rv" onclick="location.href='${p.href}'">
          <div class="bprev-card-band" style="${p.bg};height:200px;border-radius:16px 16px 0 0;background-size:cover;background-position:center;"></div>
          <div class="bprev-card-body">
            <div class="bprev-card-cat">${p.cat}</div>
            <div class="bprev-card-num">${String(i + 1).padStart(2, '0')} —</div>
            <div class="bprev-card-title">${p.title}</div>
            <p class="bprev-card-exc">${p.exc}</p>
            <div class="bprev-card-foot">
              <span class="bprev-card-date">${p.date}</span>
              <span class="bprev-card-read">${p.read}</span>
              <button class="bprev-card-btn">Read →</button>
            </div>
          </div>
        </div>
      `).join('');

      const dotsWrap = document.getElementById('bprevDots');
      if(dotsWrap){
        dotsWrap.innerHTML = posts.map((_, i) =>
          `<button class="bprev-dot${i === 0 ? ' active' : ''}" onclick="bprevGo(${i})"></button>`
        ).join('');
      }

      initBlogPreviewSlider();
      if(typeof initRv === 'function') initRv(); // re-run scroll-reveal so the newly injected cards fade in
    }

    async function loadBlogPreview(){
      try{
        const res = await fetch('blog.html');
        if(!res.ok) throw new Error('blog.html fetch failed: ' + res.status);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');

        const posts = [];
        const featured = doc.querySelector('.blx-feat');
        if(featured) posts.push(extractPost(featured, true));
        doc.querySelectorAll('.blx-c').forEach(el => posts.push(extractPost(el, false)));

        renderPosts(posts);
      }catch(err){
        console.error('Blog preview autofetch failed:', err);
      }
    }

    loadBlogPreview();
  })();
  


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
  setTimeout(initRv, 150); // re-init scroll reveal for new page sections
  setTimeout(initCountUp, 150); // re-init number count-up for new page sections
  setTimeout(initTextStagger, 150); // re-init word stagger reveal for new page sections
  return false;
}

// ── SCROLL REVEAL
function initRv(){
  // Disconnect old observers to avoid duplicate
  if(window._rvIO) window._rvIO.disconnect();
  window._rvIO = new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        setTimeout(()=>{
          e.target.classList.add('vis');
          window._rvIO && window._rvIO.unobserve(e.target);
        },i*65);
      }
    });
  },{threshold:.05, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.rv:not(.vis)').forEach(el=>window._rvIO.observe(el));
}
// Run after loader hides so elements are visible and measurable
setTimeout(initRv, 2200);
// Also run on scroll for lazy sections
window.addEventListener('scroll', function rvOnScroll(){
  initRv();
  window.removeEventListener('scroll', rvOnScroll);
}, {once:true});

// ── COUNT-UP NUMBER ANIMATION (stat numbers like 40+, 3.8M+, 98%, ★4.9)
function animateCountUp(el){
  if(el.dataset.counted) return;
  el.dataset.counted='1';
  const text=el.textContent.trim();
  const m=text.match(/\d+(\.\d+)?/);
  if(!m) return; // no numeric part, leave as-is
  const numStr=m[0];
  const decimals=numStr.includes('.')?numStr.split('.')[1].length:0;
  const target=parseFloat(numStr);
  const prefix=text.slice(0,m.index);
  const suffix=text.slice(m.index+numStr.length);
  const dur=1400;
  const start=performance.now();
  function frame(now){
    const p=Math.min((now-start)/dur,1);
    const eased=1-Math.pow(1-p,3);
    el.textContent=prefix+(target*eased).toFixed(decimals)+suffix;
    if(p<1) requestAnimationFrame(frame);
    else el.textContent=prefix+numStr+suffix;
  }
  requestAnimationFrame(frame);
}
function initCountUp(){
  if(window._cuIO) window._cuIO.disconnect();
  window._cuIO=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        animateCountUp(e.target);
        window._cuIO.unobserve(e.target);
      }
    });
  },{threshold:.4});
  document.querySelectorAll('.pfn:not([data-counted]),.hero-stat-n:not([data-counted])').forEach(el=>window._cuIO.observe(el));
}
setTimeout(initCountUp, 2200);
window.addEventListener('scroll', function cuOnScroll(){
  initCountUp();
  window.removeEventListener('scroll', cuOnScroll);
}, {once:true});

// ── WORD STAGGER TEXT REVEAL (scroll-stopper heading)
function initTextStagger(){
  if(window._tsIO) window._tsIO.disconnect();
  window._tsIO=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const words=e.target.querySelectorAll('.sw');
        words.forEach((w,i)=>{
          w.style.transitionDelay=(i*55)+'ms';
          w.classList.add('vis');
        });
        window._tsIO.unobserve(e.target);
      }
    });
  },{threshold:.3});
  document.querySelectorAll('#sstHeading:not(.ts-done)').forEach(el=>window._tsIO.observe(el));
}
setTimeout(initTextStagger, 2200);
window.addEventListener('scroll', function tsOnScroll(){
  initTextStagger();
  window.removeEventListener('scroll', tsOnScroll);
}, {once:true});

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
    // Mark cells for animation (progressive enhancement — cells are visible by default)
    const allCells=dg.querySelectorAll('.dc:not(.empty):not(.label-card)');
    allCells.forEach(cell=>cell.classList.add('dc-anim-ready'));
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

// ══ TRUSTED BY MOBILE CAROUSEL (auto-rotate) ══
(function(){
  const track = document.getElementById('tbcTrack');
  const dotsWrap = document.getElementById('tbcDots');
  if (!track) return;

  const slides = track.querySelectorAll('.tbc-slide');
  const total = slides.length;
  let cur = 0, timer = null;

  function goTo(n) {
    cur = (n + total) % total;
    track.style.transform = 'translateX(-' + (cur * 100) + '%)';
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.tbc-dot').forEach(function(d, i) {
        d.classList.toggle('on', i === cur);
      });
    }
  }

  function startAuto() { timer = setInterval(function() { goTo(cur + 1); }, 2800); }
  function stopAuto() { clearInterval(timer); }

  // touch swipe support
  let tx = 0;
  track.addEventListener('touchstart', function(e){ tx = e.touches[0].clientX; stopAuto(); }, {passive:true});
  track.addEventListener('touchend', function(e){
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? cur + 1 : cur - 1);
    startAuto();
  }, {passive:true});

  // dot click
  if (dotsWrap) {
    dotsWrap.querySelectorAll('.tbc-dot').forEach(function(dot, i){
      dot.addEventListener('click', function(){ stopAuto(); goTo(i); startAuto(); });
    });
  }

  goTo(0);
  startAuto();
})();

// ══ PARTNERS MOBILE CAROUSEL (auto-rotate) ══
(function(){
  const track = document.getElementById('pmcTrack');
  const dotsWrap = document.getElementById('pmcDots');
  if (!track) return;

  const slides = track.querySelectorAll('.pmc-slide');
  const total = slides.length;
  let cur = 0, timer = null;

  function goTo(n) {
    cur = (n + total) % total;
    track.style.transform = 'translateX(-' + (cur * 100) + '%)';
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.pmc-dot').forEach((d, i) => {
        d.classList.toggle('on', i === cur);
      });
    }
  }

  function startAuto() {
    timer = setInterval(function() { goTo(cur + 1); }, 2500);
  }
  function stopAuto() { clearInterval(timer); }

  // touch swipe support
  let tx = 0;
  track.addEventListener('touchstart', function(e){ tx = e.touches[0].clientX; stopAuto(); }, {passive:true});
  track.addEventListener('touchend', function(e){
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? cur + 1 : cur - 1);
    startAuto();
  }, {passive:true});

  // dot click
  if (dotsWrap) {
    dotsWrap.querySelectorAll('.pmc-dot').forEach(function(dot, i){
      dot.addEventListener('click', function(){ stopAuto(); goTo(i); startAuto(); });
    });
  }

  goTo(0);
  startAuto();
})();

