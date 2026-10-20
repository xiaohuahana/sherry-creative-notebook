/* V&A: four tangible writing choices, illustrated with original article screenshots. */
(() => {
 const originalArticle='https://mp.weixin.qq.com/s/zOBkYEziMBpS5jZa-_b0VQ';
 const ornament='<svg class="va-flower" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 87V34M50 64C22 68 16 52 18 46c21-1 30 7 32 18Zm0-13c24 0 34-16 31-25-20 2-29 12-31 25Z"/><path d="M50 38C18 48 28 17 41 23 43 0 64 0 64 20 86 14 86 40 64 38 67 57 42 58 50 38Z"/></svg>';
 const objectArt=type=>{
  if(type==='archive')return `<span class="va-object-art va-archive"><span class="va-file-back"></span><span class="va-file-front"><small>V&A / PATTERN ARCHIVE</small><img src="assets/va/pattern.webp" alt="" loading="lazy"><span class="va-scan"></span><b>ALICE IN WONDERLAND</b><i>C. F. A. Voysey · 1930s</i></span><span class="va-file-tab">01</span></span>`;
  if(type==='jewelry')return `<span class="va-object-art va-jewelry"><span class="va-jewel-lining"><img src="assets/va/necklace.webp" alt="" loading="lazy"></span><span class="va-jewel-front">A LITTLE ART, EVERY DAY</span><span class="va-jewel-lid">${ornament}<b>V&A</b></span><span class="va-jewel-clasp"></span></span>`;
  if(type==='postcard')return `<span class="va-object-art va-postcard"><span class="va-postcard-back"><i>DEAR SUMMER,</i><b>Wish you were here.</b><span>✉</span></span><span class="va-postcard-front"><img src="assets/va/summer-photo.webp" alt="" loading="lazy"><span class="va-postmark">AUG<br>SUMMER</span><b>A summer to remember.</b></span></span>`;
  return `<span class="va-object-art va-gift"><span class="va-gift-shadow"></span><span class="va-gift-base"><i></i><b>V&A</b></span><span class="va-gift-lid"><i></i></span><span class="va-gift-bow"><i></i><b></b></span><span class="va-gift-tag">a little art<br>for you ♡</span></span>`;
 };
 const choices=[
  {type:'archive',name:'设计来源引入',object:'纹样档案卡',label:'01 / FROM THE ARCHIVE',body:'先讲馆藏历史、艺术背景和纹样故事，再自然进入产品。',file:'source-snippet',caption:'馆藏纹样与设计来源 → 爱丽丝系列',alt:'原文截图：蓝色标题、沃塞设计背景与爱丽丝纹样档案'},
  {type:'jewelry',name:'不是高高在上的艺术',object:'首饰盒',label:'02 / ART, WITHIN REACH',body:'强调艺术的日常性，避免使用过分有距离感的语言。',file:'daily-snippet',caption:'以“艺术，理应触手可及”收束全文',alt:'原文截图：橙色底白字的艺术日常性收束段落'},
  {type:'postcard',name:'场景化感官',object:'夏日明信片',label:'03 / A SUMMER FEELING',body:'调动视觉想象，让读者代入佩戴首饰的氛围感，唤起情绪共鸣。',file:'summer-snippet',caption:'佩戴画面与夏日晚霞、微光、动作的感官联想',alt:'原文截图：佩戴手链的人物图与浅黄色夏日感官描写'},
  {type:'gift',name:'同时覆盖自用与送礼',object:'礼盒',label:'04 / FOR ME, FOR YOU',body:'文案既要支持“为自己购买”，也要支持“把它送给重要的人”。',file:'gift-snippet',caption:'开篇同时连接自我犒赏与礼物心意',alt:'原文截图：橙色开篇中自用、送礼与日常夏日造型的完整段落'}
 ];
 window.VA_STRATEGY_HTML=`<div class="va-strategy-intro"><p>认识设计来源，让艺术走进日常；再把夏日的佩戴想象，写成送给自己或他人的心意。</p><span class="va-desktop-hint">把鼠标停在小物上，翻开原文的一角 ↘</span><span class="va-mobile-hint">向下翻阅，点击小物可以再看一次 ↘</span></div><div class="va-choices">${choices.map((c,i)=>`<article class="va-choice va-choice-${c.type}" data-va-choice="${i}"><div class="va-choice-story"><div class="va-choice-heading"><span>${c.label}</span><h3>${c.name}</h3></div><button class="va-object-button" type="button" aria-expanded="false" aria-controls="va-evidence-${i}" aria-label="展开${c.object}及对应原文截图">${objectArt(c.type)}<span class="va-object-caption">${c.object} <i>↗</i></span></button><p class="va-choice-description">${c.body}</p></div><figure class="va-evidence" id="va-evidence-${i}"><div class="va-evidence-label"><span>ARTICLE FRAGMENT / 原文局部</span><b>0${i+1}</b></div><button class="va-screenshot" type="button" data-zoom="assets/va/${c.file}.webp" aria-label="放大查看${c.alt}"><img src="assets/va/${c.file}.webp" alt="${c.alt}" loading="lazy" width="900" height="${[1685,628,1444,931][i]}"><span>点击放大阅读 ↗</span></button><figcaption>${c.caption}</figcaption></figure></article>`).join('')}</div><div class="va-packing" aria-label="将四个写作策略装进一篇完整文章"><div class="va-packing-sticky"><div class="va-packing-heading"><span class="eyebrow">FOUR CHOICES, ONE STORY</span><h3>把夏日的艺术，<br>装进一份心意。</h3><p>让设计、日常与感受，在一篇文章里相遇。</p></div><div class="va-packing-stage"><span class="va-pack-orbit" aria-hidden="true"></span>${choices.slice(0,3).map((c,i)=>`<div class="va-pack-item va-pack-${i}" aria-hidden="true">${objectArt(c.type)}</div>`).join('')}<a class="va-final-gift" href="${originalArticle}" target="_blank" rel="noopener noreferrer" aria-label="打开微信原文：V&A种草，八月戴点艺术感">${objectArt('gift')}<span class="va-final-caption"><strong>打开这份夏日心意 ↗</strong><small>V&A种草 丨 八月，“戴”点艺术感</small></span></a></div><span class="va-pack-scroll">再往下，把故事打包 ↓</span><a class="va-return" href="index.html#writing-va">返回产品/品牌文案 ↩</a></div></div>`;

 function init(){
  if(new URLSearchParams(location.search).get('project')!=='va')return;
  const root=document.documentElement,rows=[...document.querySelectorAll('.va-choice')],packing=document.querySelector('.va-packing');
  if(!packing)return;
  root.classList.add('va-experience');document.body.classList.add('va-page');
  const calm=matchMedia('(prefers-reduced-motion:reduce)'),touch=matchMedia('(hover:none), (pointer:coarse)'),chapter=document.querySelector('#chapter-2');
  let complete=false;try{complete=sessionStorage.getItem('va-article-packed')==='yes';}catch{}
  const finish=()=>{complete=true;packing.classList.add('is-packed');packing.style.setProperty('--pack',1);try{sessionStorage.setItem('va-article-packed','yes');}catch{}};
  const reveal=row=>{row.classList.add('va-is-revealed');row.querySelector('.va-object-button').setAttribute('aria-expanded','true');};
  const play=row=>{reveal(row);row.classList.remove('va-playing');requestAnimationFrame(()=>requestAnimationFrame(()=>row.classList.add('va-playing')));};
  rows.forEach(row=>{
   row.addEventListener('pointerenter',()=>{if(!touch.matches){play(row);}});
   row.addEventListener('focusin',()=>reveal(row));
   row.querySelector('.va-object-button').addEventListener('click',()=>play(row));
  });
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('va-in-view');if((touch.matches||innerWidth<=700)&&!e.target.dataset.vaPlayed){e.target.dataset.vaPlayed='yes';play(e.target);}}}),{threshold:.24});
  rows.forEach(row=>observer.observe(row));
  const lerp=(a,b,t)=>a+(b-a)*t,clamp=v=>Math.max(0,Math.min(1,v)),smooth=t=>t*t*(3-2*t),range=(p,a,b)=>smooth(clamp((p-a)/(b-a)));
  let queued=false;
  function render(){
   queued=false;const r=packing.getBoundingClientRect(),height=innerHeight,p=clamp(-r.top/Math.max(1,r.height-height));
   root.classList.toggle('va-reading-strategy',chapter.getBoundingClientRect().top<=85);
   if(calm.matches){rows.forEach(reveal);packing.classList.add('va-calm');return;}
   packing.classList.remove('va-calm');
   if(p>=.995&&!complete)finish();
   const stage=packing.querySelector('.va-packing-stage').getBoundingClientRect(),mobile=innerWidth<=700,w=stage.width,h=stage.height;
   const gy=h*(mobile?.69:.72),gx=w*.5,gift=packing.querySelector('.va-final-gift');
   const move=range(p,0,.28),reached=complete?1:move;
   gift.style.setProperty('--gift-x',lerp(w*.74,gx,reached)+'px');gift.style.setProperty('--gift-y',lerp(h*.52,gy,reached)+'px');gift.style.setProperty('--gift-angle',lerp(-8,0,reached)+'deg');
   const lidOpen=complete?0:range(p,.05,.2)*(1-range(p,.84,.97));
   gift.style.setProperty('--lid-lift',(-65*lidOpen)+'px');gift.style.setProperty('--lid-turn',(-10*lidOpen)+'deg');
   const starts=[[.18,.48],[.78,.16],[.46,.12]],near=[[.28,.55],[.72,.5],[.5,.3]];
   packing.querySelectorAll('.va-pack-item').forEach((el,i)=>{
    const gather=range(p,.15,.36),collect=range(p,.4+i*.135,.54+i*.135),x=lerp(lerp(w*starts[i][0],w*near[i][0],gather),gx,collect),y=lerp(lerp(h*starts[i][1],h*near[i][1],gather),gy-28,collect);
    el.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%) scale(${complete?0:1-.83*collect}) rotate(${lerp([-12,9,-7][i],0,collect)}deg)`;
    el.style.opacity=complete?0:1-range(p,.49+i*.135,.57+i*.135);
   });
   packing.style.setProperty('--pack',complete?1:p);
  }
  const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(render);}};
  if(complete){finish();packing.classList.add('va-packed-return');}
  root.classList.add('va-interactions-ready');
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);addEventListener('pageshow',schedule);calm.addEventListener('change',schedule);touch.addEventListener('change',()=>{if(touch.matches)rows.filter(row=>row.classList.contains('va-in-view')).forEach(play);});
  document.fonts?.ready.then(schedule);render();
 }
 document.addEventListener('DOMContentLoaded',init);
})();
