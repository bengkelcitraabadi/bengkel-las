const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;

// menu mobile + penanda halaman aktif
const nav=$('#nav'),bt=$('.burger');
bt.onclick=()=>bt.setAttribute('aria-expanded',nav.classList.toggle('open'));
$$('.links a').forEach(a=>{if(a.getAttribute('href')===(location.pathname.split('/').pop()||'index.html'))a.classList.add('on');a.onclick=()=>nav.classList.remove('open')});

// garis progres scroll
addEventListener('scroll',()=>{$('.bar').style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%'},{passive:true});

// muncul saat scroll + hitung angka
function cnt(el){const t=el.dataset.n==='y'?new Date().getFullYear()-2000:+el.dataset.n;let s;const f=ts=>{s??=ts;const p=Math.min((ts-s)/1400,1);el.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');$$('[data-n]',e.target).forEach(cnt);io.unobserve(e.target)}),{threshold:.2});
$$('.rv').forEach(el=>io.observe(el));

// kartu miring mengikuti kursor
$$('.tilt').forEach(c=>{c.onpointermove=e=>{const r=c.getBoundingClientRect();c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*10+'deg');c.style.setProperty('--rx',((e.clientY-r.top)/r.height-.5)*-10+'deg')};c.onpointerleave=()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')}});

// percikan las di hero
const cv=$('#sp');
if(cv&&!calm){const x=cv.getContext('2d'),h=cv.parentElement;let W,H,P=[];
const rs=()=>{W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight};rs();addEventListener('resize',rs);
const em=(px,py,n)=>{for(let i=0;i<n;i++){const a=Math.random()*6.28,s=1+Math.random()*5;P.push({x:px,y:py,vx:Math.cos(a)*s,vy:Math.sin(a)*s-2,l:1})}};
const at=e=>{const r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]};
h.onpointermove=e=>em(...at(e),3);h.onpointerdown=e=>em(...at(e),50);
setInterval(()=>em(W*.78,H*.62,4),90);
(function f(){x.clearRect(0,0,W,H);P=P.filter(p=>p.l>0);for(const p of P){x.strokeStyle=`rgba(255,${160+p.l*70|0},60,${p.l})`;x.lineWidth=2;x.beginPath();x.moveTo(p.x,p.y);p.x+=p.vx;p.y+=p.vy;p.vy+=.18;p.l-=.02;x.lineTo(p.x,p.y);x.stroke()}requestAnimationFrame(f)})()}

// tab visi / misi
$$('.tabs button').forEach(b=>b.onclick=()=>{$$('.tabs button').forEach(o=>o.classList.toggle('on',o===b));$$('.pane').forEach(p=>p.hidden=p.id!==b.dataset.t)});

// filter galeri + lightbox
const items=$$('.gal figure');
if(items.length){
const chips=$$('.chip');
const set=k=>{chips.forEach(c=>c.classList.toggle('on',c.dataset.f===k));items.forEach(f=>{const show=k==='semua'||f.dataset.c===k;if(show){f.hidden=false;requestAnimationFrame(()=>f.classList.remove('off'))}else{f.classList.add('off');setTimeout(()=>{if(f.classList.contains('off'))f.hidden=true},300)}})};
chips.forEach(c=>c.onclick=()=>set(c.dataset.f));
if(location.hash)set(location.hash.slice(1));
const lb=$('#lb');let i=0;
const vis=()=>items.filter(f=>!f.hidden);
const show=n=>{const v=vis();i=(n+v.length)%v.length;const f=v[i];$('img',lb).src=$('img',f).src;$('#cap').textContent=f.querySelector('figcaption').textContent+' ('+(i+1)+'/'+v.length+')'};
items.forEach(f=>f.onclick=()=>{lb.classList.add('on');show(vis().indexOf(f))});
$('#x').onclick=()=>lb.classList.remove('on');
$('#pv').onclick=()=>show(i-1);$('#nx').onclick=()=>show(i+1);
lb.onclick=e=>{if(e.target===lb)lb.classList.remove('on')};
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key==='Escape')lb.classList.remove('on');if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
}

// form pemesanan -> WhatsApp
const fm=$('#pesan');
if(fm)fm.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(fm));
if(!d.jenis||!d.lokasi.trim()){$('#err').textContent='Pilih jenis pekerjaan dan isi lokasi pemasangan dulu.';return}
$('#err').textContent='';
const t=`Halo Bengkel Las Citra Abadi, saya ${d.nama||''} ingin memesan: ${d.jenis}.\nLokasi: ${d.lokasi}.\n${d.detail?'Detail: '+d.detail:''}`;
open('https://wa.me/628128176125?text='+encodeURIComponent(t),'_blank')};
