// Preserve a shared chapter link after embedded font metrics settle.
(() => {
  const initialHash=location.hash;
  if(!initialHash||!document.fonts)return;
  let interacted=false;
  const events=['wheel','touchstart','pointerdown','keydown'];
  const mark=()=>{interacted=true;};
  events.forEach(event=>addEventListener(event,mark,{once:true,passive:true}));
  document.fonts.ready.then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
    if(!interacted&&location.hash===initialHash){
      let id;try{id=decodeURIComponent(initialHash.slice(1));}catch{return;}
      const section=document.getElementById(id);
      if(section)section.scrollIntoView({block:'start',behavior:'instant'});
    }
    events.forEach(event=>removeEventListener(event,mark));
  })));
})();
