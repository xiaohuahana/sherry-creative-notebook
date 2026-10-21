const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>[...root.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
$$('.writing-list details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.writing-list details').forEach(other=>{if(other!==d)other.open=false;});}));
let toastTimer;function toast(text){const el=$('.toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3200);}
$('#copy-wechat').addEventListener('click',async()=>{try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText('SherrYan777');}else{const t=document.createElement('textarea');t.value='SherrYan777';t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();const ok=document.execCommand('copy');t.remove();if(!ok)throw new Error();}toast('微信号已复制：SherrYan777');}catch{toast('微信号：SherrYan777（可手动复制）');}});
if('IntersectionObserver' in window){
 document.body.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.08});$$('.reveal').forEach(e=>observer.observe(e));
 const counts=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;counts.unobserve(e.target);if(reduced.matches)return;const total=Number(e.target.dataset.count),suffix=e.target.dataset.suffix||'',start=performance.now();function tick(t){const k=Math.min((t-start)/1200,1);e.target.textContent=Math.round(total*(1-Math.pow(1-k,3))).toLocaleString('en-US')+suffix;if(k<1)requestAnimationFrame(tick);}requestAnimationFrame(tick);}),{threshold:.7});$$('[data-count]').forEach(e=>counts.observe(e));
}
const screens=[['home','封面'],['about','关于我'],['contents','目录'],['writing','文案'],['film','影像'],['work','精选案例'],['contact','联系']];
$('.screen-dots').innerHTML=screens.map(([id,name])=>`<a href="#${id}" aria-label="${name}"><span>${name}</span><i></i></a>`).join('');
let queued=false;
function updateScroll(){
 const root=document.documentElement,max=root.scrollHeight-innerHeight;
 $('.scroll-progress').style.width=(max>0?scrollY/max*100:0)+'%';
 const home=$('#home').getBoundingClientRect(),about=$('#about').getBoundingClientRect(),
       contents=$('#contents').getBoundingClientRect(),work=$('#work').getBoundingClientRect();
 // Re-enable native snapping as the directory enters view, not only after it aligns.
 const inDirectory=contents.top<innerHeight*.65&&contents.bottom>innerHeight*.35;
 root.classList.toggle('reading-directory',inDirectory);
 root.classList.toggle('reading-intro',!inDirectory&&home.top<=1&&about.bottom>1);
 // At the end of the cases, hand control back to native snapping for Contact.
 root.classList.toggle('reading-work',!inDirectory&&work.top<=1&&work.bottom>innerHeight+1);
 let active='home';
 screens.forEach(([id])=>{if(document.getElementById(id).getBoundingClientRect().top<innerHeight*.45)active=id;});
 $$('.screen-dots a').forEach(a=>{const selected=a.hash==='#'+active;a.classList.toggle('current',selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
 $$('.site-header nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+active));
 queued=false;
}
addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updateScroll);}},{passive:true});addEventListener('resize',updateScroll);addEventListener('pageshow',updateScroll);updateScroll();
const art=$('.hero-art');art.addEventListener('pointermove',e=>{if(reduced.matches||!matchMedia('(pointer:fine)').matches)return;const r=art.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;$$('.parallax',art).forEach(el=>el.style.translate=`${x*Number(el.dataset.depth)}px ${y*Number(el.dataset.depth)}px`);});art.addEventListener('pointerleave',()=>{$$('.parallax',art).forEach(el=>el.style.translate='0 0');});
let lastSpark=0;art.addEventListener('pointermove',e=>{if(reduced.matches||!matchMedia('(pointer:fine)').matches||performance.now()-lastSpark<110)return;lastSpark=performance.now();const s=document.createElement('span');s.className='cursor-spark';s.setAttribute('aria-hidden','true');s.textContent='✦';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';document.body.append(s);setTimeout(()=>s.remove(),850);});

// A directory link opens the corresponding writing category on the home page.
function openLinkedWriting(){
 const target=document.getElementById(location.hash.slice(1));
 if(!target?.matches('.writing-list details'))return;
 $$('.writing-list details').forEach(item=>{item.open=item===target;});
}
openLinkedWriting();addEventListener('hashchange',openLinkedWriting);
