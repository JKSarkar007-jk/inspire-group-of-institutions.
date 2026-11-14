var D={
degree:{t:"Inspire Degree College",l:"Undergraduate programmes in commerce, arts, science and computer applications.",c:["B.Com","B.A","B.Sc","BCA","BBA"]},
school:{t:"Inspire School",l:"A learning path for children from their first year in school to 10th standard.",c:["Nursery","LKG","UKG","1st std","2nd std","3rd std","4th std","5th std","6th std","7th std","8th std","9th std","10th std"]},
computer:{t:"Universal Computer Education",l:"Job-ready computer skills, from the basics to programming. Many more courses are available.",c:["Basic Computer","MS Office","MS Excel / Advanced Excel","Tally Prime / GST","Data Entry","Typing","DTP","Photoshop","ADCA","PGDCA","C Programming","C++","Java","Python"]},
jobs:{t:"Job Assessment",l:"Find out how job-ready you are and get guidance on the next step.",c:["Skill assessment","Interview preparation","Job guidance"]}
};
var P=document.getElementById("p"),tabs=document.querySelectorAll(".tabs button");
function show(k){
 tabs.forEach(function(b){b.setAttribute("aria-selected",b.dataset.k===k)});
 var d=D[k];P.setAttribute("aria-labelledby","t-"+k);
 P.innerHTML="<h3></h3><p class='lead'></p><ul class='chips'></ul><h3 style='margin-top:28px'>Enquire about <span id=en></span></h3><form id=f><label>Your name<input name=n required autocomplete=name></label><label>Phone number<input name=p type=tel required autocomplete=tel></label><label>Course<select name=w></select></label><label>Message (optional)<textarea name=m rows=3></textarea></label><button class=btn type=submit>Send enquiry</button></form><div id=ok role=status></div>";
 P.querySelector("h3").textContent=d.t;P.querySelector(".lead").textContent=d.l;document.getElementById("en").textContent=d.t;
 var u=P.querySelector("ul"),sel=P.querySelector("select");
 d.c.forEach(function(x){var li=document.createElement("li");li.textContent=x;u.appendChild(li);var o=document.createElement("option");o.textContent=x;sel.appendChild(o)});
 var f=document.getElementById("f");
 f.addEventListener("submit",function(e){e.preventDefault();var x=f.elements;
  var m="Hello, I would like to enquire about "+d.t+".\nName: "+x.n.value+"\nPhone: "+x.p.value+"\nCourse: "+x.w.value+(x.m.value?"\nMessage: "+x.m.value:"");
  var url="https://wa.me/919449174324?text="+encodeURIComponent(m);
  var ok=document.getElementById("ok");ok.textContent="Thank you. Tap the button to send your "+d.t+" enquiry on WhatsApp. ";
  var a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noopener";a.textContent="Send on WhatsApp";a.style.fontWeight="700";ok.appendChild(a);
  f.style.display="none";ok.style.display="block";window.open(url,"_blank","noopener");});
}
tabs.forEach(function(b){b.addEventListener("click",function(){show(b.dataset.k)})});
document.querySelectorAll("[data-pick]").forEach(function(a){a.addEventListener("click",function(){show(a.dataset.pick)})});
var role="Staff",mode="login",stage=0,via="pw",lf=document.getElementById("lf"),lm=document.getElementById("lmsg");
function lui(){
 document.getElementById("idL").textContent=role+" ID";
 var r=mode==="register",o=!r&&via==="otp",d=r?stage===2:(!o&&stage===0),e=lf.elements,H=function(i,v){document.getElementById(i).hidden=!v};
 H("phL",r||o);H("otpL",stage===1);H("nameL",r&&stage===2);H("idW",d);H("pwW",d);H("cpL",r&&stage===2);
 e.ph.required=r||o;e.ph.readOnly=(r||o)&&stage>0;e.otp.required=stage===1;e.fn.required=r&&stage===2;e.id.required=d;e.pw.required=d;e.cp.required=r&&stage===2;
 e.pw.autocomplete=r?"new-password":"current-password";
 document.getElementById("lbtn").textContent=o?(stage===0?"Send OTP":"Verify OTP"):!r?(stage===0?"Continue":"Verify OTP"):stage===0?"Send OTP":stage===1?"Verify OTP":"Register as "+role.toLowerCase();
 var vb=document.getElementById("viaBtn");vb.parentNode.hidden=r;vb.textContent=via==="otp"?"Login with ID and password instead":"Login with OTP instead";
 document.querySelectorAll("#roleSeg button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.r===role)});
 document.getElementById("swapTxt").textContent=r?"Already registered?":"New here?";document.getElementById("swapBtn").textContent=r?"Back to login":"Register as "+role.toLowerCase();
 lm.style.display="none";document.getElementById("dash").hidden=true;
}
document.querySelectorAll("#roleSeg button").forEach(function(b){b.addEventListener("click",function(){role=b.dataset.r;mode="login";via="pw";stage=0;lf.reset();lui()})});
document.getElementById("swapBtn").addEventListener("click",function(){mode=mode==="login"?"register":"login";via="pw";stage=0;lf.reset();lui()});
function msg(t){lm.textContent=t;lm.style.display="block"}
document.getElementById("viaBtn").addEventListener("click",function(){via=via==="pw"?"otp":"pw";stage=0;lf.reset();lui()});
var DB={
Student:[['Notices',['Unit test timetable will be shared by your class teacher.','Fee due date: last day of this month.']],['Today’s timetable',['9:00 Accountancy','10:00 English','11:15 Computer lab']],['Fee status',['Total fee: ₹20,000','Paid: ₹15,000','Balance: ₹5,000']],['Results',['Internal test 1: 18 / 25','Internal test 2: 21 / 25']]],
Staff:[['Notices',['Staff meeting on Saturday, 10:00 am.','Submit internal marks by the end of the month.']],['Mark attendance',['BCA 1st year (Section A)','B.Com 2nd year','School: 5th std']],['My classes today',['9:00 BCA 1st year','11:15 B.Com 2nd year']],['Student lists',['Download class list','Download parent contact list']]],
Management:[['Pending registrations',['Rahul K. (Staff) <button class=ap>Approve</button>','Priya S. (Student) <button class=ap>Approve</button>','Anil M. (Staff) <button class=ap>Approve</button>']],['Post a notice',['Write and send a notice to students, staff or all','Available once login is connected']],['Reports',['New admission enquiries this month: 24','Fees collected this month: ₹1,85,000','Staff present today: 18 of 20']]]};
function dashShow(who){
 var d=document.getElementById('dash'),h='<h3></h3><p class=note>Sample data for preview. Real information will come from the college records once login is connected.</p><div class=grid>';
 DB[role].forEach(function(c){h+='<div class=card><h3>'+c[0]+'</h3><ul>'+c[1].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>'});
 h+='</div><button type=button class=btn id=lo>Logout</button>';
 d.innerHTML=h;d.querySelector('h3').textContent=role+' dashboard: welcome, '+who;
 d.querySelectorAll('.ap').forEach(function(b){b.addEventListener('click',function(){b.textContent='Approved';b.disabled=true})});
 document.getElementById('lo').addEventListener('click',function(){d.hidden=true});
 d.hidden=false;d.scrollIntoView({behavior:'smooth',block:'nearest'});
}
lf.addEventListener("submit",function(e){e.preventDefault();var f=lf.elements;
 if(mode==="register"){
  if(stage===0){stage=1;lui();msg("Preview only: no SMS was sent. In the real version, a 6-digit code goes to "+f.ph.value+" if the number is on the college's staff list. Enter any 6 digits to continue.");return}
  if(stage===1){stage=2;lui();msg("Mobile number verified (preview). Now set up your "+role.toLowerCase()+" login.");return}
  if(f.pw.value!==f.cp.value){msg("The two passwords do not match. Enter the same password in both fields.");return}
  stage=0;lf.reset();lui();msg("Preview only: nothing was saved. When login is connected, your "+role.toLowerCase()+" registration will be sent for approval.");return}
 if(via==="otp"){
  if(stage===0){stage=1;lui();msg("Preview only: no SMS was sent. In the real version, a 6-digit code goes to "+f.ph.value+" if the number is registered. Enter any 6 digits to continue.");return}
  var w=f.ph.value;stage=0;lf.reset();lui();dashShow(w);return}
 if(stage===0){stage=1;lui();msg("Preview only: no SMS was sent. In the real version, a 6-digit code goes to the mobile number registered for this "+role.toLowerCase()+" ID. Enter any 6 digits to continue.");return}
 var who=f.id.value;stage=0;lf.reset();lui();dashShow(who);
});
lui();
var LG=document.getElementById("login");
function loginOpen(){role="Staff";mode="login";via="pw";stage=0;lf.reset();lui();LG.hidden=false;document.body.style.overflow="hidden";document.getElementById("loginClose").focus()}
function loginClose(){LG.hidden=true;document.getElementById("dash").hidden=true;document.body.style.overflow="";document.getElementById("loginOpen").focus()}
document.getElementById("loginOpen").addEventListener("click",loginOpen);
document.getElementById("loginClose").addEventListener("click",loginClose);
document.querySelectorAll("[data-login]").forEach(function(b){b.addEventListener("click",function(e){e.preventDefault();loginOpen()})});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!LG.hidden)loginClose()});
P.innerHTML="<p class='lead'>Select a portal above to see its courses and send an enquiry.</p>";
