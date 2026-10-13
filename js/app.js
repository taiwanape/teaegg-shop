const PRODUCTS=[
 {id:'six',name:'原味 6 入',desc:'含運組合價．每顆獨立真空包',price:139},
 {id:'twelve',name:'原味 12 入',desc:'含運組合價．每顆獨立真空包',price:249}];
const LATER=[{name:'20 入',desc:'【待定】'},{name:'家庭號',desc:'【待定】'}];
let cart=JSON.parse(localStorage.getItem('zhuwei-cart')||'{}');
const $=s=>document.querySelector(s);
function save(){localStorage.setItem('zhuwei-cart',JSON.stringify(cart));render()}
function add(id){cart[id]=(cart[id]||0)+1;save()}
function chg(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];save()}
function total(){return PRODUCTS.reduce((s,p)=>s+(cart[p.id]||0)*p.price,0)}
function toggleCart(){$('#cart').classList.toggle('open')}
function render(){
 $('#productGrid').innerHTML=PRODUCTS.map(p=>`<div class="card"><img src="images/mascot.jpg" alt=""><h3>${p.name}</h3><p>${p.desc}</p><p class="price">NT$${p.price}</p><small>暫定・範例價格（含運）</small><br><button class="btn" onclick="add('${p.id}')">加入購物車</button></div>`).join('')+
  LATER.map(p=>`<div class="card soon"><h3>${p.name}</h3><p>${p.desc}</p><small>即將推出</small></div>`).join('');
 $('#cartItems').innerHTML=PRODUCTS.filter(p=>cart[p.id]).map(p=>`<li>${p.name}<span class="qty"><button onclick="chg('${p.id}',-1)">−</button> ${cart[p.id]} <button onclick="chg('${p.id}',1)">+</button></span>NT$${cart[p.id]*p.price}</li>`).join('')||'<li>購物車是空的</li>';
 $('#cartTotal').textContent=total();$('#cartCount').textContent=Object.values(cart).reduce((a,b)=>a+b,0);
}
$('#orderForm').onsubmit=e=>{e.preventDefault();if(!total()){alert('購物車是空的');return}
 const f=Object.fromEntries(new FormData(e.target));
 const items=PRODUCTS.filter(p=>cart[p.id]).map(p=>`<li>${p.name} × ${cart[p.id]} = NT$${cart[p.id]*p.price}</li>`).join('');
 $('#summary').innerHTML=`<h3>訂單摘要（示範，未實際付款）</h3><p>${f.name}｜${f.phone}</p><ul>${items}</ul><p>低溫宅配（${f.carrier}），${f.shipday}出貨<br>地址：${f.address}</p><p>運費：已含於組合價（滿額免運門檻【待定】）</p><p><b>合計：NT$${total()}（暫定價格）</b></p><p>付款方式：${f.pay}（請於【X】小時內完成付款，帳號／LINE Pay 資訊待填）</p>`;
 $('#summary').hidden=false;e.target.hidden=true;cart={};save()};
render();
