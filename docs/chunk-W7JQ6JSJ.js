import{F as m,M as u,R as l,U as t,_ as c,g as n,j as i}from"./chunk-VWSHPDZY.js";var o={currentUser:{image:{png:"./images/avatars/image-juliusomo.png",webp:"./images/avatars/image-juliusomo.webp"},username:"juliusomo"},comments:[{id:1,content:"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",createdAt:1673876815698,score:12,user:{image:{png:"./images/avatars/image-amyrobson.png",webp:"./images/avatars/image-amyrobson.webp"},username:"amyrobson"},replies:[]},{id:2,content:"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",createdAt:1706881717126,score:5,user:{image:{png:"./images/avatars/image-maxblagun.png",webp:"./images/avatars/image-maxblagun.webp"},username:"maxblagun"},replies:[{id:3,content:"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",createdAt:1707486570180,score:4,replyingTo:"maxblagun",user:{image:{png:"./images/avatars/image-ramsesmiron.png",webp:"./images/avatars/image-ramsesmiron.webp"},username:"ramsesmiron"}},{id:4,content:"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",createdAt:1707832199463,score:2,replyingTo:"ramsesmiron",user:{image:{png:"./images/avatars/image-juliusomo.png",webp:"./images/avatars/image-juliusomo.webp"},username:"juliusomo"}}]}]};var g=(()=>{let e=class e{loadUser(s){let a={user:null};return o.currentUser.username===s&&Object.assign(a,{user:o.currentUser}),i(a).pipe(m(1500))}};e.\u0275fac=function(a){return new(a||e)},e.\u0275prov=t({token:e,factory:e.\u0275fac,providedIn:"root"});let r=e;return r})();var k=(()=>{let e=class e{constructor(){this.userService=c(g),this.user=new n(null),this.user$=this.user.asObservable()}get loggedInUser(){return this.user.getValue()}loadUser(s){return this.userService.loadUser(s).pipe(l(a=>{this.user.next(a.user)}),u())}};e.\u0275fac=function(a){return new(a||e)},e.\u0275prov=t({token:e,factory:e.\u0275fac,providedIn:"root"});let r=e;return r})();export{o as a,k as b};
