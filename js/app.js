const P=[{id:'6',name:'主委茶葉蛋 原味 6 入',short:'原味 6 入',pitch:'每週現滷，剝殼即食，一次吃剛好',price:139,n:6},
 {id:'12',name:'主委茶葉蛋 原味 12 入',short:'原味 12 入',pitch:'家庭份量，每顆約 NT$21 更划算',price:249,n:12}];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let cart={};try{cart=JSON.parse(localStorage.getItem('zw-cart')||'{}')}catch(e){}
let cur=P[0],pq=1;
const total=()=>P.reduce((s,p)=>s+(cart[p.id]||0)*p.price,0),count=()=>P.reduce((s,p)=>s+(cart[p.id]||0),0);
function save(){try{localStorage.setItem('zw-cart',JSON.stringify(cart))}catch(e){}renderCart()}
$('#grid').innerHTML=P.map(p=>`<a class="card" href="#/p/${p.id}"><img src="images/egg-${p.id}-800.jpg" alt="${p.name}" width="800" height="600" loading="lazy"><div class="cbody"><h3>${p.name}</h3><p class="pitch">${p.pitch}</p><p class="cprice">NT$<b>${p.price}</b><small>暫定．含運</small></p><span class="btn line">選購</span></div></a>`).join('');
function renderCart(){
 $$('.js-count').forEach(e=>e.textContent=count());$$('.js-total').forEach(e=>e.textContent=total());
 $('#cartList').innerHTML=P.map(p=>`<li><img src="images/egg-${p.id}-800.jpg" alt="" width="80" height="60"><div class="ci"><b>${p.short}</b><span>NT$${p.price}</span></div><div class="step"><button type="button" data-id="${p.id}" data-d="-1" aria-label="減少${p.short}"${cart[p.id]?'':' disabled'}>−</button><output>${cart[p.id]||0}</output><button type="button" data-id="${p.id}" data-d="1" aria-label="增加${p.short}">+</button></div></li>`).join('');
}
document.addEventListener('click',e=>{const b=e.target.closest('#cartList [data-d]');if(!b)return;const id=b.dataset.id;cart[id]=Math.max(0,Math.min(30,(cart[id]||0)+ +b.dataset.d));if(!cart[id])delete cart[id];save()});
function renderP(){$('#pQty').textContent=pq;$('#pMinus').disabled=pq<=1}
$('#pMinus').onclick=()=>{pq=Math.max(1,pq-1);renderP()};$('#pPlus').onclick=()=>{pq=Math.min(30,pq+1);renderP()};
function addCur(){cart[cur.id]=(cart[cur.id]||0)+pq;save()}
$('#pAdd').onclick=()=>{addCur();const t=$('#toast');t.textContent=`已加入 ${cur.short} × ${pq}，購物車共 ${count()} 件`;t.hidden=false;clearTimeout(t._t);t._t=setTimeout(()=>t.hidden=true,2500)};
$('#pBuy').onclick=()=>{addCur();location.hash='#/checkout'};
function route(){const h=location.hash||'#/';let pg='list';const m=h.match(/^#\/p\/(6|12)$/);
 if(m){pg='product';cur=P.find(p=>p.id==m[1]);pq=1;$('#pName').textContent=cur.name;$('#pCrumb').textContent=cur.short;$('#pPitch').textContent=cur.pitch;$('#pPrice').textContent=cur.price;$('#pImg').src=`images/egg-${cur.id}.jpg`;$('#pImg').alt=cur.name;$('#toast').hidden=true;renderP();document.title=cur.name+'｜主委茶葉蛋'}
 else if(h=='#/checkout'){pg='checkout';document.title='結帳｜主委茶葉蛋'}else document.title='主委茶葉蛋｜古早味滷蛋．慢火入味';
 $$('.page').forEach(s=>s.hidden=s.id!='page-'+pg);scrollTo(0,0)}
addEventListener('hashchange',route);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('#orderForm').onsubmit=e=>{e.preventDefault();if(!total()){alert('購物車是空的，請先選購');return}
 const f=Object.fromEntries(new FormData(e.target));const items=P.filter(p=>cart[p.id]).map(p=>`<li>${p.short} × ${cart[p.id]} = NT$${cart[p.id]*p.price}</li>`).join('');
 $('#summary').innerHTML=`<h3>訂單已送出（示範，未實際付款）</h3><ul>${items}</ul><p><b>合計 NT$${total()}（暫定價格，含運）</b></p><p>${esc(f.name)}｜${esc(f.phone)}<br>${esc(f.carrier)}低溫宅配，${esc(f.shipday)}出貨<br>地址：${esc(f.address)}<br>付款：${esc(f.pay)}（帳號資訊待填）</p>`;
 $('#summary').hidden=false;e.target.hidden=true;cart={};save();$('#summary').scrollIntoView({block:'center'})};
renderCart();route();
