!function(){var e="js-page-header",t=1.3333;function n(n){n.length>1&&setTimeout(function(){var o=document.querySelector(n).getBoundingClientRect(),i=void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop,c=document.querySelector(e).offsetHeight*t;document.documentElement.scrollTop=o.top+i-c},50)}window.location.hash.length>0&&n(window.location.hash);var o=document.querySelectorAll("a[href^='#']");o.length>0&&o.forEach(function(e){var t=e.getAttribute("href");e.addEventListener("click",function(){n(t)})});var i={};!function(e){var t=!1;if("function"==typeof define&&define.amd&&(define(e),t=!0),"object"==typeof i&&(i=e(),t=!0),!t){var n=window.Cookies,o=window.Cookies=e();o.noConflict=function(){return window.Cookies=n,o}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var o in n)t[o]=n[o]}return t}return function t(n){function o(t,i,c){var r;if("undefined"!=typeof document){if(arguments.length>1){if("number"==typeof(c=e({path:"/"},o.defaults,c)).expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*c.expires),c.expires=a}c.expires=c.expires?c.expires.toUTCString():"";try{r=JSON.stringify(i),/^[\{\[]/.test(r)&&(i=r)}catch(g){}i=n.write?n.write(i,t):encodeURIComponent(String(i)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=(t=(t=encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var s="";for(var l in c)c[l]&&(s+="; "+l,!0!==c[l]&&(s+="="+c[l]));return document.cookie=t+"="+i+s}t||(r={});for(var u=document.cookie?document.cookie.split("; "):[],d=/(%[0-9A-Z]{2})+/g,f=0;f<u.length;f++){var m=u[f].split("="),p=m.slice(1).join("=");this.json||'"'!==p.charAt(0)||(p=p.slice(1,-1));try{var h=m[0].replace(d,decodeURIComponent);if(p=n.read?n.read(p,h):n(p,h)||p.replace(d,decodeURIComponent),this.json)try{p=JSON.parse(p)}catch(g){}if(t===h){r=p;break}t||(r[h]=p)}catch(g){}}return r}}return o.set=o,o.get=function(e){return o.call(o,e)},o.getJSON=function(){return o.apply({json:!0},[].slice.call(arguments))},o.defaults={},o.remove=function(t,n){o(t,"",e(n,{expires:-1}))},o.withConverter=t,o}(function(){})});var c="cookie-info-banner",r=document.querySelector(".".concat("js-page-footer")),a="0px",s=document.createElement("div");"ok"!==i.get("cib_CookiePermission")&&(s.classList.add(c),s.innerHTML='<div class="wrapper"><div class="'.concat(c,'__box"><p class="').concat(c,'__message"><span class="').concat(c,'__message-text">').concat('Cookies help deliver this website. By using this website, you agree to its use of cookies, as detailed in the <a href="/privacy/">privacy policy</a>.','</span> <button type="button" class="').concat(c,'__close-button">OK</button></p></div></div>'),r.parentNode.insertBefore(s,r.nextSibling),a="".concat(document.querySelector(".".concat(c)).offsetHeight,"px"),r.style.marginBottom=a,document.querySelector(".".concat(c,"__close-button")).addEventListener("click",function(e){e.preventDefault(),r.style.marginBottom="0px",s.style.display="none",i.set("cib_CookiePermission","ok",{expires:3650,path:"/"})})),window.addEventListener("resize",function(){"ok"!==i.get("cib_CookiePermission")&&(a="".concat(document.querySelector(".".concat(c)).offsetHeight,"px"),r.style.marginBottom=a)});document.querySelectorAll("a[target='_blank']:not([rel='noopener'])").forEach(function(e){e.setAttribute("rel","noopener")});var l=document.querySelector(".".concat("js-main-navigation")),u=document.querySelector(".".concat("js-main-navigation__toggle")),d=document.querySelectorAll(".".concat("js-main-navigation__list"," > .").concat("has-children"));document.querySelectorAll(".".concat("js-main-navigation__list"," > .").concat("has-children"," > a")).forEach(function(e){var t=e.getAttribute("href");e.setAttribute("data-href",t),e.removeAttribute("href")}),d.forEach(function(e){e.addEventListener("click",function(){Array.from(e.parentElement.children).filter(function(t){return t!==e}).forEach(function(e){e.classList.remove("show-submenu")}),e.classList.toggle("show-submenu")})}),u.addEventListener("click",function(){u.classList.contains("show-submenu")&&d.forEach(function(e){e.classList.remove("show-submenu")}),u.classList.toggle("show-submenu")}),document.documentElement.addEventListener("click",function(){d.forEach(function(e){e.classList.remove("show-submenu")}),u.classList.remove("show-submenu")}),l.addEventListener("click",function(e){e.stopPropagation()});!function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"print-links-footer",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"print-only",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"h3",i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"Links",c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"[",r=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"]";if(void 0!==e&&null!==document.querySelector(e)){var a=document.createElement("section");a.classList.add(t,n),a.innerHTML="<".concat(o,">").concat(i,"</").concat(o,">");var s=document.createElement("ol"),l=[],u=1;document.querySelectorAll("".concat(e,' a[href]:not([href^=\'#\']):not([href^="mailto"]):not([href^="javascript"])')).forEach(function(e){if(e.getElementsByTagName("img").length<1){var t,o=e.href,i=document.createElement("sup");i.classList.add(n);var a=l.indexOf(o);if(t=a>-1?a+1:u,i.innerHTML=c+t+r,e.parentNode.insertBefore(i,e.nextSibling),a<0){var d=document.createElement("li");d.innerHTML=o,s.appendChild(d),l.push(o),u+=1}}}),a.appendChild(s),document.querySelector("body").appendChild(a)}}(".js-page-main-content")}();
//# sourceMappingURL=main-bundle.js.map