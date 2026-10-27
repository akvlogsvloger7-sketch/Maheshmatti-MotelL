// ===== YOUR DETAILS (edit these) =====
var WA="919876543210"; // WhatsApp number with country code, no + sign
// Add your YouTube video IDs here (the part after v= in the link). Keep "YOUR_VIDEO_ID" until you have one.
var LIVE_URL=""; // PASTE your YouTube live or video link between the quotes, e.g. "https://www.youtube.com/watch?v=XXXXXXXXXXX"
var VIDEOS=[
 {id:"__ANIM__",title:"Live Night View",sub:"Animated preview",img:0},
 {id:"YOUR_VIDEO_ID",title:"Property Tour",sub:"Walk through the motel",img:0},
 {id:"YOUR_VIDEO_ID",title:"Room Walkthrough",sub:"See our rooms",img:7},
 {id:"YOUR_VIDEO_ID",title:"Restaurant",sub:"Food and dining area",img:2},
 {id:"YOUR_VIDEO_ID",title:"Surroundings",sub:"Parking and garden",img:5}
];
var IMG=["images/exterior.jpg",
"images/reception.jpg",
"images/dining.jpg",
"images/parking.jpg",
"images/sign.jpg",
"images/garden.jpg",
"images/room-standard.jpg",
"images/room-deluxe.jpg",
"images/room-family.jpg",
"images/room-suite.jpg"];
var GAL=[0,7,8,1,2,3,4,5],CAP=["Motel Exterior","Deluxe Room","Family Room","Reception","Restaurant","Parking","Open 24 Hours","Garden Lawn"];
var COLORS=["#5a3a22","#a8743c","#c8995f","#8a5a2b","#b98650","#7a4b2a"];

function bgset(el,i){el.style.background="url('"+IMG[i]+"') center/cover"}
document.querySelectorAll("[data-i]").forEach(function(el){bgset(el,+el.dataset.i)});

// nav
var menu=document.getElementById("menu");
document.getElementById("burger").onclick=function(){menu.classList.toggle("open")};
menu.onclick=function(e){if(e.target.tagName==="A")menu.classList.remove("open")};

// video tour
function ytId(u){u=String(u||"");var m=u.match(/(?:v=|youtu\.be\/|\/live\/|\/embed\/|\/shorts\/)([\w-]{11})/);return m?m[1]:(/^[\w-]{11}$/.test(u)&&u.indexOf("YOUR")!==0?u:"")}
if(ytId(LIVE_URL))VIDEOS.unshift({id:ytId(LIVE_URL),title:"LIVE: Motel Camera",sub:"Streaming now",img:0});
var cvLive=document.getElementById("livecv");
var frame=document.getElementById("frame"),wall=document.getElementById("wall"),tph=document.getElementById("tph");
function play(i){
 var v=VIDEOS[i],anim=v.id==="__ANIM__",vid=anim?"":ytId(v.id);cvLive.style.display=anim?"block":"none";var real=!!vid;
 tph.style.display=(real||anim)?"none":"grid";
 if(!real)tph.style.background="linear-gradient(rgba(59,38,22,.5),rgba(59,38,22,.78)),url('"+IMG[v.img]+"') center/cover";
 frame.src=real?"https://www.youtube.com/embed/"+vid+"?autoplay=1&mute=1&rel=0":"about:blank";
 [].forEach.call(wall.children,function(b,j){b.classList.toggle("on",i===j)});
}
VIDEOS.forEach(function(v,i){var b=document.createElement("button");b.className="vid";b.innerHTML='<i>▶</i><b>'+v.title+'</b><small>'+v.sub+'</small>';b.firstChild.style.background="url('"+IMG[v.img]+"') center/cover";b.onclick=function(){play(i)};wall.appendChild(b)});
play(0);

// gallery + lightbox
var gal=document.getElementById("gal"),lb=document.getElementById("lb"),lbi=document.getElementById("lbi");
function tile(bg,cap){var d=document.createElement("div");d.className="ph";d._bg=bg;d.style.background=bg;if(cap)d.innerHTML="<em>"+cap+"</em>";d.onclick=function(){lbi.style.background=d._bg;lb.classList.add("on")};gal.appendChild(d)}
GAL.forEach(function(g,k){tile("url('"+IMG[g]+"') center/cover",CAP[k])});
lb.onclick=function(){lb.classList.remove("on")};
document.getElementById("pf").onchange=function(){[].forEach.call(this.files,function(f){tile("url('"+URL.createObjectURL(f)+"') center/cover","")})};

// reviews
var TS=[["Rahul S.","Business traveller","Clean room, quick check-in at night and a very friendly team. Perfect stop on a long trip."],["Anita K.","Family trip","The family room was spacious and spotless. Our kids loved the garden and the food was great."],["Gurdeep P.","Road trip","Easy parking, hot water all night and fair prices. We will stay here again."]];
var ti=0,tc=document.getElementById("tc"),td=document.getElementById("td");
TS.forEach(function(t,i){var d=document.createElement("i");d.onclick=function(){showT(i)};td.appendChild(d)});
function showT(i){ti=i;var t=TS[i];tc.style.opacity=0;setTimeout(function(){tc.innerHTML='<div class="stars">★★★★★</div><q>'+t[2]+'</q><b>'+t[0]+'</b><small>'+t[1]+'</small>';tc.style.opacity=1},200);[].forEach.call(td.children,function(d,j){d.classList.toggle("on",j===i)})}
showT(0);setInterval(function(){showT((ti+1)%TS.length)},5000);

// forms -> WhatsApp
function wa(t){window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(t),"_blank")}
document.getElementById("bform").onsubmit=function(e){e.preventDefault();
 var t="Hello Maheshmatti Motel! I would like to book.\nName: "+bn.value+"\nPhone: "+bp.value+"\nRoom: "+br.value+"\nGuests: "+bg.value+"\nCheck-in: "+bi.value+"\nCheck-out: "+bo.value;
 wa(t);document.getElementById("bmsg").textContent="🤎 Thanks "+bn.value+"! Your request is opening in WhatsApp. We’ll confirm shortly."};
document.getElementById("cform").onsubmit=function(e){e.preventDefault();
 wa("Hello Maheshmatti Motel!\nName: "+cn.value+"\nPhone: "+cp.value+"\n"+cm.value);document.getElementById("cmsg").textContent="💬 Opening WhatsApp… thank you!"};
var di=new Date().toISOString().slice(0,10);document.getElementById("bi").min=di;document.getElementById("bo").min=di;

// scroll reveal, bar, back to top
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll(".rv").forEach(function(el,i){el.style.transitionDelay=(i%4)*0.08+"s";io.observe(el)});
var bar=document.getElementById("bar"),tp=document.getElementById("top");
window.addEventListener("scroll",function(){var h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+"%";tp.classList.toggle("on",scrollY>600)});
tp.onclick=function(){window.scrollTo({top:0,behavior:"smooth"})};

// pages (hash routing)
var PAGES=["about","dining","rates","contact"];
function route(){var h=location.hash.slice(1),isPage=PAGES.indexOf(h)>-1;
 document.getElementById("pg-home").classList.toggle("on",!isPage);
 PAGES.forEach(function(p){document.getElementById("pg-"+p).classList.toggle("on",p===h)});
 if(isPage){window.scrollTo(0,0)}else{window.dispatchEvent(new Event("resize"));if(h){setTimeout(function(){var el=document.getElementById(h);if(el)el.scrollIntoView()},40)}}}
var ORDER=["about","dining","rates","contact"],NM={about:"About",dining:"Dining",rates:"Rates",contact:"Contact"};
ORDER.forEach(function(p,i){var pv=ORDER[(i+3)%4],nx=ORDER[(i+1)%4],n=document.createElement("div");n.className="pgnav";n.innerHTML='<a href="#'+pv+'">← '+NM[pv]+'</a><a href="#home">Home</a><a href="#'+nx+'">'+NM[nx]+' →</a>';document.getElementById("pg-"+p).appendChild(n)});
function mark(){var h=location.hash.slice(1)||"home";document.querySelectorAll("nav a").forEach(function(a){a.classList.toggle("act",a.getAttribute("href")==="#"+h)})}
window.addEventListener("hashchange",function(){route();mark()});
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href^='#']");if(a){setTimeout(route,0);setTimeout(mark,30)}});
route();mark();

// ===== ELECTRIC LIGHTNING =====
var RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
var bc=document.getElementById("bolt"),bx=bc.getContext("2d"),bolts=[],fsh=document.getElementById("flash");
function bsize(){bc.width=innerWidth;bc.height=innerHeight}bsize();window.addEventListener("resize",bsize);
function mk(x1,y1,x2,y2,d,out){if(d<4){out.push([x1,y1,x2,y2]);return}var mx=(x1+x2)/2+(Math.random()-.5)*d,my=(y1+y2)/2+(Math.random()-.5)*d;mk(x1,y1,mx,my,d/2,out);mk(mx,my,x2,y2,d/2,out)}
function strike(x1,y1,x2,y2,w){var sg=[];mk(x1,y1,x2,y2,Math.hypot(x2-x1,y2-y1)*.35,sg);var br=[];if(sg.length>20)for(var i=0;i<3;i++){var q=sg[Math.floor(Math.random()*sg.length)],a=[];mk(q[0],q[1],q[0]+(Math.random()-.5)*300,q[1]+Math.random()*220,120,a);br.push(a)}bolts.push({s:sg,b:br,l:1,w:w||2})}
function path(list){bx.beginPath();list.forEach(function(g){bx.moveTo(g[0],g[1]);bx.lineTo(g[2],g[3])});bx.stroke()}
function bloop(){bx.clearRect(0,0,bc.width,bc.height);bolts=bolts.filter(function(o){o.l-=.05;return o.l>0});
 bolts.forEach(function(o){var a=Math.min(1,o.l*1.5)*(Math.random()>.25?1:.5);bx.lineCap="round";bx.lineJoin="round";
  bx.shadowColor="#e8962a";bx.shadowBlur=24;bx.lineWidth=o.w*4;bx.strokeStyle="rgba(217,138,31,"+a*.5+")";path(o.s);
  bx.shadowBlur=0;bx.lineWidth=o.w*2.2;bx.strokeStyle="rgba(80,44,14,"+a*.8+")";path(o.s);
  bx.lineWidth=o.w*.9;bx.strokeStyle="rgba(255,246,220,"+a+")";path(o.s);
  o.b.forEach(function(br){bx.lineWidth=o.w*1.4;bx.strokeStyle="rgba(80,44,14,"+a*.55+")";path(br);bx.lineWidth=o.w*.5;bx.strokeStyle="rgba(255,240,200,"+a*.8+")";path(br)})});
 requestAnimationFrame(bloop)}
bloop();
function flash(){fsh.style.opacity=1;setTimeout(function(){fsh.style.opacity=0},90)}
function auto(){if(!document.hidden){var x=Math.random()*innerWidth;strike(x,0,x+(Math.random()-.5)*320,innerHeight*(.35+Math.random()*.5),2.2);flash()}setTimeout(auto,2200+Math.random()*3800)}
if(!RM){setTimeout(auto,900);
 document.querySelectorAll(".card,.btn").forEach(function(el){el.addEventListener("mouseenter",function(){var r=el.getBoundingClientRect();strike(r.left+Math.random()*r.width,r.top,r.left+Math.random()*r.width,r.bottom,1.6)})});
 var lastS=0;window.addEventListener("mousemove",function(e){var n=Date.now();if(n-lastS>140&&Math.random()<.45){lastS=n;strike(e.clientX,e.clientY,e.clientX+(Math.random()-.5)*140,e.clientY+(Math.random()-.5)*140,1.2)}})}

// ===== LIVE NIGHT VIEW (animated) =====
(function(){
 var c=cvLive,g=c.getContext("2d"),W=960,H=540,st=[],i;
 for(i=0;i<90;i++)st.push([Math.random()*W,Math.random()*250,Math.random()*1.4+.4,Math.random()*6]);
 var t0=performance.now();
 function tr(x,y,s,sw){g.fillStyle="#4a3120";g.fillRect(x-4*s,y-34*s,8*s,34*s);g.fillStyle="#6b4a2e";[[0,-62,34],[-20,-44,24],[20,-44,24]].forEach(function(p){g.beginPath();g.arc(x+p[0]*s+sw,y+p[1]*s,p[2]*s,0,6.283);g.fill()})}
 function draw(now){
  if(c.style.display==="none"){requestAnimationFrame(draw);return}
  var t=(now-t0)/1000,u=(t%16)/16,x,k;
  var sk=g.createLinearGradient(0,0,0,H*.75);sk.addColorStop(0,"#1c130b");sk.addColorStop(.6,"#4a3120");sk.addColorStop(1,"#a8743c");g.fillStyle=sk;g.fillRect(0,0,W,H);
  st.forEach(function(s){g.globalAlpha=.35+.65*Math.abs(Math.sin(t*1.3+s[3]));g.fillStyle="#fff3d6";g.fillRect(s[0],s[1],s[2],s[2])});g.globalAlpha=1;
  var mg=g.createRadialGradient(780,110,10,780,110,140);mg.addColorStop(0,"rgba(255,244,214,.9)");mg.addColorStop(.25,"rgba(255,230,170,.35)");mg.addColorStop(1,"rgba(255,230,170,0)");g.fillStyle=mg;g.fillRect(600,0,360,300);
  g.fillStyle="#fff6dc";g.beginPath();g.arc(780,110,36,0,6.283);g.fill();
  g.fillStyle="rgba(240,220,190,.16)";for(k=0;k<3;k++){var cx=((u*1.2+k*.37)%1.3)*(W+300)-150,cy=70+k*55;[[0,0,60,18],[40,-8,50,16],[-40,6,44,14]].forEach(function(p){g.beginPath();g.ellipse(cx+p[0],cy+p[1],p[2],p[3],0,0,6.283);g.fill()})}
  g.fillStyle="#3b2a1d";g.beginPath();g.moveTo(0,H);for(x=0;x<=W;x+=20)g.lineTo(x,330+34*Math.sin(x/110));g.lineTo(W,H);g.fill();
  g.fillStyle="#2a1d13";g.beginPath();g.moveTo(0,H);for(x=0;x<=W;x+=20)g.lineTo(x,380+22*Math.sin(x/70+1.5));g.lineTo(W,H);g.fill();
  g.fillStyle="#2a1d13";g.fillRect(0,430,W,H-430);g.fillStyle="#1c130b";g.fillRect(0,470,W,H-470);
  g.fillStyle="#e6d3b3";for(x=-((t*60)%140);x<W;x+=140)g.fillRect(x,505,70,6);
  g.fillStyle="#f0dfc4";g.fillRect(250,250,520,180);g.fillStyle="#5a3a22";g.beginPath();g.moveTo(232,250);g.lineTo(788,250);g.lineTo(760,214);g.lineTo(260,214);g.fill();
  g.fillStyle="#d9c2a0";g.fillRect(250,338,520,6);
  for(k=0;k<5;k++){var wx=285+k*98,on=Math.sin(t*.7+k*2.1)>-.55;
   g.fillStyle=on?"#ffd98a":"#7a5a3a";g.fillRect(wx,272,58,52);
   if(on){var wg=g.createRadialGradient(wx+29,298,4,wx+29,298,70);wg.addColorStop(0,"rgba(255,200,100,.35)");wg.addColorStop(1,"rgba(255,200,100,0)");g.fillStyle=wg;g.fillRect(wx-40,240,138,120)}
   g.fillStyle="#8a5a2b";g.fillRect(wx+4,360,50,70);g.fillStyle="#f0dfc4";g.fillRect(wx+40,396,4,4)}
  g.fillStyle="#2a1d13";g.fillRect(150,150,10,285);g.fillRect(110,110,190,64);
  var fa=(Math.sin(t*23)>.97||(t%7>6.1&&t%7<6.25))?.35:1;
  g.save();g.globalAlpha=fa;g.shadowColor="#ffb347";g.shadowBlur=24;g.fillStyle="#ffe2a8";g.font="700 46px Georgia,serif";g.textAlign="center";g.fillText("MOTEL",205,157);g.restore();
  var sw=Math.sin(t*1.4)*2;tr(850,430,1.1,sw);tr(205,440,.9,sw);
  var carx=-260+u*(W+520);
  g.fillStyle="#c8995f";g.fillRect(carx,478,170,38);g.fillStyle="#a8743c";g.beginPath();g.moveTo(carx+34,478);g.lineTo(carx+128,478);g.lineTo(carx+106,448);g.lineTo(carx+58,448);g.fill();
  g.fillStyle="#d6e0e8";g.beginPath();g.moveTo(carx+44,476);g.lineTo(carx+120,476);g.lineTo(carx+103,454);g.lineTo(carx+60,454);g.fill();
  g.fillStyle="#1c130b";[40,130].forEach(function(o){g.beginPath();g.arc(carx+o,516,15,0,6.283);g.fill()});
  var hl=g.createLinearGradient(carx+170,0,carx+400,0);hl.addColorStop(0,"rgba(255,235,170,.55)");hl.addColorStop(1,"rgba(255,235,170,0)");
  g.fillStyle=hl;g.beginPath();g.moveTo(carx+168,490);g.lineTo(carx+420,455);g.lineTo(carx+420,535);g.lineTo(carx+168,505);g.fill();
  g.fillStyle="#ffefb8";g.fillRect(carx+164,488,8,12);
  var vg=g.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,H*.9);vg.addColorStop(0,"rgba(0,0,0,0)");vg.addColorStop(1,"rgba(20,10,3,.45)");g.fillStyle=vg;g.fillRect(0,0,W,H);
  requestAnimationFrame(draw)}
 requestAnimationFrame(draw);
})();

// card tilt + cursor glow
document.querySelectorAll(".card").forEach(function(c){
 c.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transition="transform .1s";c.style.transform="perspective(700px) rotateY("+x*10+"deg) rotateX("+(-y*10)+"deg) translateY(-6px)"});
 c.addEventListener("mouseleave",function(){c.style.transition="";c.style.transform=""})});
var gl=document.getElementById("glow");
window.addEventListener("mousemove",function(e){gl.style.transform="translate("+(e.clientX-150)+"px,"+(e.clientY-150)+"px)"});

// hero particles
var cv=document.getElementById("fx"),cx=cv.getContext("2d"),ps=[],W,H;
function size(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight}
size();window.addEventListener("resize",size);
for(var i=0;i<70;i++)ps.push({x:Math.random()*2000,y:Math.random()*1200,r:Math.random()*2.4+1,s:Math.random()*.7+.2,a:Math.random()*6,c:COLORS[i%6]});
(function loop(){cx.clearRect(0,0,W,H);ps.forEach(function(p){p.y-=p.s;p.a+=.015;if(p.y<-10){p.y=H+10;p.x=Math.random()*W}cx.globalAlpha=0.25+0.5*Math.abs(Math.sin(p.a));cx.beginPath();cx.arc(p.x%W,p.y,p.r,0,6.283);cx.fillStyle=p.c;cx.fill()});cx.globalAlpha=1;requestAnimationFrame(loop)})();
