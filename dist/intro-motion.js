(() => {
 const origin=document.querySelector('.portrait-origin'),destination=document.querySelector('.portrait-destination'),portrait=document.querySelector('#traveling-portrait'),about=document.querySelector('#about');
 if(!origin||!destination||!portrait||!about)return;
 const calm=matchMedia('(prefers-reduced-motion:reduce)');
 if(!calm.matches){
  let bounds,queued=false;
  const pageBox=el=>{const r=el.getBoundingClientRect();return{x:r.left,y:r.top+scrollY,width:r.width,height:r.height};};
  function measure(){
   bounds={from:pageBox(origin),to:pageBox(destination),start:document.querySelector('#home').offsetTop,end:about.offsetTop};
   portrait.style.width=bounds.from.width+'px';
   render();
  }
  function render(){
   queued=false;if(!bounds)return;
   const {from,to,start,end}=bounds,p=Math.max(0,Math.min(1,(scrollY-start)/(end-start))),blend=p*p*(3-2*p);
   const x=from.x+(to.x-from.x)*blend,y=from.y+(to.y-from.y)*blend-scrollY,scale=1+(to.width/from.width-1)*blend,angle=-7+4*blend;
   portrait.style.transform=`translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) scale(${scale.toFixed(5)}) rotate(${angle.toFixed(2)}deg)`;
   portrait.style.visibility=y+from.height*scale<-80||y>innerHeight+80?'hidden':'visible';
   portrait.dataset.scene=p===0?'cover':p===1?'about':'moving';
  }
  const requestRender=()=>{if(!queued){queued=true;requestAnimationFrame(render);}};
  document.body.append(portrait);portrait.classList.add('is-traveling');document.documentElement.classList.add('portrait-animation-ready');
  measure();
  addEventListener('scroll',requestRender,{passive:true});addEventListener('resize',measure);addEventListener('pageshow',measure);
  const layoutObserver=new ResizeObserver(measure);[origin,destination,about,document.querySelector('#home')].forEach(el=>layoutObserver.observe(el));
  document.fonts?.ready.then(measure);
 }
 const intro=document.querySelector('.typed-intro');
 if(!intro||calm.matches)return;
 const letters=[];
 intro.querySelectorAll('[data-type-line]').forEach(line=>{
  const text=line.textContent,accessible=document.createElement('span'),visual=document.createElement('span');
  accessible.className='visually-hidden';accessible.textContent=text;visual.setAttribute('aria-hidden','true');
  Array.from(text).forEach(character=>{const span=document.createElement('span');span.className='intro-char';span.textContent=character;visual.append(span);letters.push(span);});
  line.replaceChildren(accessible,visual);
 });
 intro.classList.add('typing-ready');
 let started=false,timer,index=0;
 function finish(){clearTimeout(timer);letters.forEach(span=>{span.classList.add('is-typed');span.classList.remove('typing-caret');});intro.classList.add('typing-complete');}
 function typeNext(){
  if(calm.matches){finish();return;}
  if(index>0)letters[index-1].classList.remove('typing-caret');
  if(index>=letters.length){intro.classList.add('typing-complete');return;}
  const letter=letters[index++];letter.classList.add('is-typed','typing-caret');
  timer=setTimeout(typeNext,/[。；，]/.test(letter.textContent)?115:24);
 }
 const typeObserver=new IntersectionObserver(entries=>{if(!started&&entries.some(e=>e.isIntersecting)){started=true;typeObserver.disconnect();typeNext();}},{threshold:.25});
 typeObserver.observe(intro);calm.addEventListener('change',()=>{if(calm.matches)finish();});
})();
