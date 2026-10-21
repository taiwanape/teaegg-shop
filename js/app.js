const PRODUCTS=[
 {id:'six',name:'原味 6 入',price:139},
 {id:'twelve',name:'原味 12 入',price:249}];
let cart={};try{cart=JSON.parse(localStorage.getItem('zhuwei-cart')||'{}')}catch(e){}
const $=s=>document.querySelector(s);
function save(){try{localStorage.setItem('zhuwei-cart',JSON.stringify(cart))}catch(e){}render()}
function add(id){cart[id]=(cart[id]||0)+1;save()}
function chg(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];save()}
function total(){return PRODUCTS.reduce((s,p)=>s+(cart[p.id]||0)*p.price,0)}
function count(){return Object.values(cart).reduce((a,b)=>a+b,0)}
function render(){
 $('#cartItems').innerHTML=PRODUCTS.filter(p=>cart[p.id]).map(p=>`<li><span>${p.name}</span><span class="qty"><button type="button" aria-label="減少" onclick="chg('${p.id}',-1)">−</button><b>${cart[p.id]}</b><button type="button" aria-label="增加" onclick="chg('${p.id}',1)">+</button></span><span>NT$${cart[p.id]*p.price}</span></li>`).join('')||'<li class="empty">購物車是空的，請先選商品</li>';
 const n=count(),t=total();
 $('#cartTotal').textContent=t;$('#cartCount').textContent=n;$('#barCount').textContent=n;$('#barTotal').textContent=t;
 $('#bar').hidden=!n;document.body.classList.toggle('has-bar',!!n);
}
$('#orderForm').onsubmit=e=>{e.preventDefault();if(!total()){alert('購物車是空的');return}
 const f=Object.fromEntries(new FormData(e.target));
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const items=PRODUCTS.filter(p=>cart[p.id]).map(p=>`<li>${p.name} × ${cart[p.id]} = NT$${cart[p.id]*p.price}</li>`).join('');
 $('#summary').innerHTML=`<h3>訂單已送出（示範，未實際付款）</h3><p>${esc(f.name)}｜${esc(f.phone)}</p><ul>${items}</ul><p>${esc(f.carrier)}低溫宅配，${esc(f.shipday)}出貨<br>地址：${esc(f.address)}</p><p><b>合計：NT$${total()}（暫定價格）</b><br>付款：${esc(f.pay)}（帳號資訊待填）</p>`;
 $('#summary').hidden=false;e.target.hidden=true;$('#cartItems').hidden=true;document.querySelector('#order .total').hidden=true;cart={};save();$('#summary').scrollIntoView()};
$('#productGrid').innerHTML=PRODUCTS.map(p=>`<div class="card"><h3>${p.name}</h3><p class="price">NT$${p.price}<small>（暫定）</small></p><p class="desc">每顆獨立真空包．含運</p><button class="btn" type="button" onclick="add('${p.id}')">加入購物車</button></div>`).join('');
render();
