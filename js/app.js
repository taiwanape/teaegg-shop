const P=[{id:'6',name:'原味 6 入',price:139,n:6,img:'egg-6'},{id:'12',name:'原味 12 入',price:249,n:12,img:'egg-12'}];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const q={'6':0,'12':0};
const total=()=>P.reduce((s,p)=>s+q[p.id]*p.price,0),count=()=>q['6']+q['12'];
$('#products').innerHTML=P.map(p=>`<article class="prod"><div class="ph" style="background-image:url(images/${p.img}-800.jpg)" role="img" aria-label="${p.name}茶葉蛋"></div><div class="pbody"><h3>${p.name}</h3><p class="pp"><b>NT$${p.price}</b><small>暫定．含運．每顆約 NT$${Math.round(p.price/p.n)}</small></p><div class="step"><button type="button" data-id="${p.id}" data-d="-1" aria-label="減少${p.name}">−</button><output id="q${p.id}">0</output><button type="button" data-id="${p.id}" data-d="1" aria-label="增加${p.name}">+</button></div><button type="button" class="add" data-id="${p.id}" data-d="1">加入</button></div></article>`).join('');
document.addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(!b)return;const id=b.dataset.id;q[id]=Math.max(0,Math.min(30,q[id]+ +b.dataset.d));render()});
function render(){P.forEach(p=>{$('#q'+p.id).textContent=q[p.id];$(`[data-id="${p.id}"][data-d="-1"]`).disabled=!q[p.id];$(`.add[data-id="${p.id}"]`).closest('.prod').classList.toggle('on',q[p.id]>0)});
 const t=total(),n=count(),line=P.filter(p=>q[p.id]).map(p=>`${p.name} × ${q[p.id]}`).join('、')||'尚未選擇';
 $$('.js-total').forEach(e=>e.textContent=t);$$('.js-count').forEach(e=>e.textContent=n);$$('.js-line').forEach(e=>e.textContent=line);
 $('#bar').hidden=!n||seen.size>0;document.body.classList.toggle('has-bar',!$('#bar').hidden)}
const seen=new Set();const io=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?seen.add(e.target):seen.delete(e.target));render()});['#order','#products'].forEach(s=>io.observe($(s)));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('#orderForm').onsubmit=e=>{e.preventDefault();if(!total()){alert('請先選擇商品數量');$('#shop').scrollIntoView();return}
 const f=Object.fromEntries(new FormData(e.target));const items=P.filter(p=>q[p.id]).map(p=>`<li>${p.name} × ${q[p.id]} = NT$${q[p.id]*p.price}</li>`).join('');
 $('#summary').innerHTML=`<h3>訂單已送出（示範，未實際付款）</h3><ul>${items}</ul><p><b>合計 NT$${total()}（暫定價格，含運）</b></p><p>${esc(f.name)}｜${esc(f.phone)}<br>${esc(f.carrier)}低溫宅配，${esc(f.shipday)}出貨<br>地址：${esc(f.address)}<br>付款：${esc(f.pay)}（帳號資訊待填）</p>`;
 $('#summary').hidden=false;e.target.hidden=true;$('#summary').scrollIntoView({block:'center'})};
render();
