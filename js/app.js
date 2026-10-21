const V=[{id:'6',name:'6 入',price:139,n:6},{id:'12',name:'12 入',price:249,n:12}];
const $=s=>document.querySelector(s);
let sel=V[0],qty=1;
$('#variants').innerHTML=V.map((v,i)=>`<label class="pill"><input type="radio" name="v" value="${i}"${i?'':' checked'}><span><b>${v.name}</b><em>NT$${v.price}</em><small>每顆約 NT$${Math.round(v.price/v.n)}</small></span></label>`).join('');
const total=()=>sel.price*qty;
function render(){
 $('#qty').textContent=qty;$('#minus').disabled=qty<=1;$('#total').textContent=total();
 const t=`原味 ${sel.name} × ${qty}　NT$${total()}`;$('#picked').textContent='已選：'+t;$('#barText').textContent=t;
}
$('#variants').onchange=e=>{sel=V[e.target.value];render()};
$('#plus').onclick=()=>{qty=Math.min(qty+1,20);render()};
$('#minus').onclick=()=>{qty=Math.max(qty-1,1);render()};
// sticky bar only when the buy box and order form are both off screen
const seen=new Set();
const io=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?seen.add(e.target):seen.delete(e.target));const show=!seen.size;$('#bar').hidden=!show;document.body.classList.toggle('has-bar',show)});['#ctaMain','#order'].forEach(s=>io.observe($(s)));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('#orderForm').onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));
 $('#summary').innerHTML=`<h3>訂單已送出（示範，未實際付款）</h3><p>原味 ${sel.name} × ${qty}<br><b>合計 NT$${total()}（暫定價格，含運）</b></p><p>${esc(f.name)}｜${esc(f.phone)}<br>${esc(f.carrier)}低溫宅配，${esc(f.shipday)}出貨<br>地址：${esc(f.address)}</p><p>付款：${esc(f.pay)}（帳號資訊待填）</p>`;
 $('#summary').hidden=false;e.target.hidden=true;$('#picked').hidden=true;$('#summary').scrollIntoView({block:'center'})};
render();
