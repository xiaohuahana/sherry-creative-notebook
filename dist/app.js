const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const dialog = $('#project-dialog');
const content = $('#dialog-content');
const projects = {
 jala:{kicker:'CASE 01 / EMPLOYER BRANDING',title:'一起“玩”到“伽”',desc:'伽蓝集团最佳雇主品牌策划案。以 Z 世代职场人的视角，把职业成长转译为一场游戏：创建角色、点技能树、打怪升级、游戏大佬。通过可以参与的内容，传递暖心的雇主形象。',role:'方案统筹 · 创意方向 · 社媒运营',note:'第九届中国大学生公共关系策划创业大赛全国三等奖',pages:[5,6,7,8]},
 pastry:{kicker:'CASE 02 / INTEGRATED MARKETING',title:'等闲间：偷得浮生半日闲',desc:'原创校园糕点品牌 IMC 策划案。一个期末赶 due 的科大学生意外走入宋代画作，度过悠闲的一天，也从梦里带回一块糕点。以故事连接品牌、产品与当代校园生活。',role:'文案写作 · 拍摄 · 出镜',note:'日月之间，品悠闲之味。',pages:[9,10,11]},
 theatre:{kicker:'CASE 03 / CREATIVE PRODUCING',title:'伦敦原创戏剧：船长苏克',desc:'从创意构思、团队组建到排期与落地，参与从 0 到 1 的戏剧制作。围绕预热、演出和收尾制定社媒计划，在 Instagram 与小红书搭建不同的内容矩阵，让舞台与本地社群建立连接。',role:'项目统筹 · 社媒运营 · 媒体公关',note:'成功邀请 5 家本地媒体',pages:[12,13,14]},
 va:{kicker:'COPYWRITING 01 / BRAND',title:'把艺术，戴进日常。',desc:'英国艺术博物馆 V&A 联名首饰的品牌种草推文。面向追求审美与艺术感的年轻女性，用馆藏历史、设计师背景与纹样故事传递产品的文化价值；通过佩戴与送礼场景，让艺术变得可亲近。',role:'产品 / 品牌文案',note:'文化价值前置 · 场景化感官 · 自用与送礼',pages:[16]},
 seo:{kicker:'COPYWRITING 02 / SEARCH',title:'让答案，出现在搜索里。',desc:'BC 雅思 SEO 长图文，面向计划英 / 港留学及备考雅思的学生。以 BC 与 IDP、UKVI 等问题为入口，在竞品调研与用户利益点提炼的基础上，组织专业表达与长尾关键词。',role:'竞品调研 · SEO 文案 · 话术沉淀',note:'原作品页保留完整项目背景与策略',pages:[17]},
 sports:{kicker:'COPYWRITING 03 / B2B',title:'把项目成果，讲成合作价值。',desc:'2024 年国际乒联男女世界杯与 2023 年澳门世界乒乓球锦标赛项目文案。分层回应品牌赞助商与政企文旅客户的关注点，通过互动、品牌曝光与本地化玩法，呈现全流程执行与项目合作价值。',role:'To B 项目传播文案',note:'品牌权益 · 城市营销 · 全链路叙事',pages:[18]},
 dimoo:{kicker:'COPYWRITING 04 / VIDEO SCRIPT',title:'《我与我相处》',desc:'泡泡玛特 DIMOO 视频脚本创作。“Dimoo by your side” 的陪伴感，连接年轻人对情绪、自我愉悦和童心的需求。情绪没有好坏之分，负面情绪不必被消灭，正面情绪也不必刻意求索。',role:'消费者洞察 · 创意文案 · 视频分镜',note:'拥抱所有情绪，走向真实的自己。',pages:[19,20]},
 visa:{kicker:'MOVING STORIES / THEATRE PROMO',title:'Visa, Drama & Other Disasters',desc:'伦敦原创戏剧剧宣短视频，项目筹备期投放于 Instagram，用于吸引潜在观众与艺术品味相似的从业者。以鸟类视角展开：海鸥隐喻本地人，候鸟隐喻移民与外来者；用海鸥 meme、喜剧节奏和爵士乐建立统一系列风格。',role:'剧宣视频创意',note:'原 PDF 提供剧宣画面，未包含可播放视频文件',pages:[22]},
 documentary:{kicker:'PERSONAL DOCUMENTARY / 2024 / 13′',title:'Name',desc:'个人纪录片，创作于第七届澳门国际纪录片电影节影像工作坊，并于 2024 年改版重制。全片素材均由数码摄像机拍摄录制。',role:'个人纪录片创作',note:'2024 · 13 分钟',pages:[23],video:'https://youtu.be/8vRpt2pB1io'}
};
const stages = [
 ['创建角色','以互动预热视频，引导年轻人认识性格与特长，确定自己的职业目标，为后续传播项目预热。原投放媒介为 Bilibili，原作品集注明该视频链接已失效。'],
 ['点技能树','邀请伽蓝 HR 与各部门经理坐镇模拟面试直播间，还原面试流程，为参与者提供求职指导，传递暖心的雇主形象。投放媒介：抖音、微信。'],
 ['打怪升级','围绕“00 后整顿职场”话题，用遇到不会的工作、被同事抢功、未获预期升职加薪三个情景拍摄短片。以三级反转，呼吁直面职场现实。'],
 ['游戏大佬','邀请员工在微博和小红书分享工作环境、职场趣事与公司活动，用第一视角的真实内容回应候选人的搜索与了解需求。']
];
let lastTrigger, currentPage=1;
const pagePath=n=>`assets/page-${String(n).padStart(2,'0')}.webp`;
const pageLabel={1:'封面与个人介绍',2:'核心优势与专业技能',3:'目录',4:'案例分享',5:'一起玩到伽 · 项目概览',6:'创建角色与点技能树',7:'打怪升级',8:'游戏大佬',9:'等闲间 · 创意故事',10:'等闲间 · 品牌海报',11:'等闲间 · 品牌延展',12:'船长苏克 · 项目概览',13:'船长苏克 · 传播排期',14:'船长苏克 · 社媒运营',15:'文案',16:'V&A 品牌文案',17:'BC 雅思 SEO 文案',18:'体育赛事 To B 文案',19:'我与我相处 · 创意文案',20:'我与我相处 · 分镜节选',21:'视频',22:'戏剧宣传视频',23:'Name 个人纪录片',24:'联系信息'};
function openProject(key, trigger){
 lastTrigger=trigger;
 if(key==='all'){currentPage=1;renderOriginal();}else{
  const p=projects[key];if(!p)return;
  content.innerHTML=`<div class="dialog-intro"><span class="dialog-eyebrow">${p.kicker}</span><h2 id="dialog-title">${p.title}</h2><p>${p.desc}</p><div class="dialog-meta"><span><small>我的工作</small>${p.role}</span><span><small>项目备注</small>${p.note}</span></div>${p.video?`<div class="dialog-links"><a class="primary-button" href="${p.video}" target="_blank" rel="noopener noreferrer">在 YouTube 观看全片 <span>↗</span></a></div>`:''}</div>${key==='jala'?`<div class="dialog-extra"><div class="level-tabs" role="tablist" aria-label="四个传播阶段">${stages.map((s,i)=>`<button role="tab" id="stage-${i}" data-stage="${i}" aria-selected="${i===0}" aria-controls="stage-panel" tabindex="${i===0?'0':'-1'}">0${i+1} ${s[0]}</button>`).join('')}</div><div class="level-panel" role="tabpanel" id="stage-panel" aria-labelledby="stage-0" tabindex="0"><h3>创建角色</h3><p>${stages[0][1]}</p></div></div>`:''}<div class="dialog-gallery">${p.pages.map((n,i)=>`<figure><img src="${pagePath(n)}" alt="${pageLabel[n]}，原作品集第 ${n} 页" ${i?'loading="lazy"':''}><figcaption>${String(n).padStart(2,'0')} / ${pageLabel[n]} · 原作品页</figcaption></figure>`).join('')}</div>`;
 }
 dialog.showModal();document.body.classList.add('modal-open');dialog.scrollTop=0;
}
function closeDialog(){dialog.close();}
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastTrigger?.focus({preventScroll:true});});
$('#close-dialog').addEventListener('click',closeDialog);
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b)openProject(b.dataset.open,b);});
content.addEventListener('click',e=>{
 const t=e.target.closest('[data-stage]');if(t)selectStage(Number(t.dataset.stage));
 const p=e.target.closest('[data-page]');if(p){currentPage=Number(p.dataset.page);renderOriginal();dialog.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});}
});
function selectStage(i){$$('[data-stage]',content).forEach((b,j)=>{b.setAttribute('aria-selected',String(j===i));b.tabIndex=j===i?0:-1;});$('#stage-panel').innerHTML=`<h3>${stages[i][0]}</h3><p>${stages[i][1]}</p>`;$('#stage-panel').setAttribute('aria-labelledby',`stage-${i}`);}
content.addEventListener('keydown',e=>{const t=e.target.closest('[data-stage]');if(!t||!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();let i=Number(t.dataset.stage);i=e.key==='Home'?0:e.key==='End'?3:(i+(e.key==='ArrowRight'?1:3))%4;selectStage(i);$(`[data-stage="${i}"]`,content).focus();});
function renderOriginal(){content.innerHTML=`<div class="dialog-intro"><span class="dialog-eyebrow">THE ORIGINAL NOTEBOOK / 24 PAGES</span><h2 id="dialog-title">翻一翻，原来的作品集。</h2><p>保留原作品的每一页。选择页码，或使用下方按钮继续翻阅。</p><div class="dialog-links"><a href="assets/sherry-portfolio.pdf" download="燕骁然创意内容作品集.pdf">下载完整 PDF ↓</a></div></div><div class="all-gallery"><div class="page-jump" aria-label="选择作品集页码">${Array.from({length:24},(_,i)=>`<button data-page="${i+1}" class="${currentPage===i+1?'current':''}" ${currentPage===i+1?'aria-current="page"':''} aria-label="第 ${i+1} 页：${pageLabel[i+1]}">${i+1}</button>`).join('')}</div><img src="${pagePath(currentPage)}" alt="原作品集第 ${currentPage} 页：${pageLabel[currentPage]}"></div><div class="gallery-nav"><button data-page="${currentPage-1}" ${currentPage===1?'disabled':''}>← 上一页</button><span aria-live="polite">${currentPage} / 24 · ${pageLabel[currentPage]}</span><button data-page="${currentPage+1}" ${currentPage===24?'disabled':''}>下一页 →</button></div>`;}
$$('.writing-list details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.writing-list details').forEach(other=>{if(other!==d)other.open=false;});}));
let toastTimer;function toast(message){const el=$('.toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3200);}
$('#copy-wechat').addEventListener('click',async()=>{try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText('SherrYan777');}else{const t=document.createElement('textarea');t.value='SherrYan777';t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();if(!document.execCommand('copy'))throw new Error();t.remove();}toast('微信号已复制：SherrYan777');}catch{toast('微信号：SherrYan777（可手动复制）');}});
if('IntersectionObserver' in window){
 document.body.classList.add('motion-ready');
 const revealObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target);}});},{threshold:.1});
 $$('.reveal').forEach(e=>revealObserver.observe(e));
 const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;countObserver.unobserve(e.target);if(reduced.matches)return;const total=Number(e.target.dataset.count),suffix=e.target.dataset.suffix||'',start=performance.now();function tick(t){const k=Math.min((t-start)/1200,1);e.target.textContent=Math.round(total*(1-Math.pow(1-k,3))).toLocaleString('en-US')+suffix;if(k<1)requestAnimationFrame(tick);}requestAnimationFrame(tick);}),{threshold:.7});
 $$('[data-count]').forEach(e=>countObserver.observe(e));
}
let scrollQueued=false;function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;$('.scroll-progress').style.width=`${max>0?scrollY/max*100:0}%`;const ids=['about','work','writing','film'];let active='';ids.forEach(id=>{if(document.getElementById(id).getBoundingClientRect().top<innerHeight*.4)active=id;});$$('.site-header nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+active));scrollQueued=false;}
addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll);}},{passive:true});updateScroll();
const art=$('.hero-art');art.addEventListener('pointermove',e=>{if(reduced.matches||!matchMedia('(pointer:fine)').matches)return;const r=art.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;$$('.parallax',art).forEach(el=>{el.style.translate=`${x*Number(el.dataset.depth)}px ${y*Number(el.dataset.depth)}px`;});$('.polaroid').style.transform=`rotate(-7deg) perspective(700px) rotateX(${-y*.025}deg) rotateY(${x*.035}deg)`;});art.addEventListener('pointerleave',()=>{$$('.parallax',art).forEach(el=>el.style.translate='0 0');$('.polaroid').style.transform='';});
let sparkTime=0;art.addEventListener('pointermove',e=>{if(reduced.matches||!matchMedia('(pointer:fine)').matches||performance.now()-sparkTime<110)return;sparkTime=performance.now();const s=document.createElement('span');s.className='cursor-spark';s.setAttribute('aria-hidden','true');s.textContent='✦';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';document.body.append(s);setTimeout(()=>s.remove(),850);});
