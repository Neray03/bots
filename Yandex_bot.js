// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match		 https://napli.ru/*
// @match 	 	 https://psyholog.me/
// @match        https://muzinstru.ru/*
// @icon
// @grant        none
// ==/UserScript==


let sites = {
	"napli.ru":['10 самых популярных шрифтов от Google',
				'Отключение редакций и ревизий в WordPress',
				'Вывод произвольных типов записей и полей в WordPress'],
	"muzinstru.ru":['Гобой','Как звучит флейта', 'Кларнет','Саксофон','Тромбон','Валторна'],
};


let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
//console.log(site);
let yandexInput = document.getElementsByName('text')[0];
let keywords = sites[site];
let keyword = keywords[getRandom(0,keywords.length)];
let btn = document.getElementsByClassName("button mini-suggest__button")[0];

let currentPage= document.getElementsByClassName("pager__item pager__item_current_yes pager__item_kind_page")[0];
//console.log(btn+"+"+currentPage);
let i =0;
let links = document.links;
//console.log(location.hostname);
if (btn !== undefined) {
	document.cookie = "site="+site;
}else if (location.hostname == "yandex.ru") {
	     site = getCookie("site");
      }else{
    	site = location.hostname;
      }
//console.log(site);

if((btn !== undefined)&(currentPage ==undefined)){
//	document.cookie = "site="+site;

   document.getElementsByClassName("search2__placeholder")[0].innerText ="";
	let timerId = setInterval(()=> {
		yandexInput.value += keyword[i];
		i++;
		if(i == keyword.length) {
			clearInterval(timerId);
			btn.click();
		}
	}, 1000);



}else if(location.hostname == site ) {
	console.log("Мы на "+site);
	setTimeout(()=>{
		let index = getRandom(0,links.length);

		if(getRandom(0,101)>=50) {
            location.href ="https://yandex.ru/";
		}
		if (links[index].href.indexOf(site)!=-1)
			links[index].click();
	},getRandom(4000,7000));
}
else{
	let nextYandexPage = true;
	for(let i=0; i<links.length; i++) {

       // console.log(links[i].href);
       // console.log(links[i].href.indexOf(site));
		if(links[i].href.indexOf(site)!=-1) {
			let link = links[i];
			nextYandexPage = false;
		//	console.log("Нашел фразу" + link);
			setTimeout(()=>{link.removeAttribute("target");
				link.click();},getRandom(3000,5000));
			break;
		}
	}
  //  let currentPage= document.getElementsByClassName("pager__item pager__item_current_yes pager__item_kind_page")[0];
  //     console.log(currentPage);
  //     console.log(currentPage.innerHTML);
       if(currentPage.innerHTML == "5") {
		nextYandexPage = false;
		location.href = "https://www.yandex.ru/";
	}

	if(nextYandexPage) {
        let nextPage= document.getElementsByClassName("link link_theme_none link_target_serp pager__item pager__item_kind_next i-bem")[0];
		setTimeout(()=>{
			nextPage.click();}
				   ,getRandom(3000,5000));
	}
}
	
function getRandom(min,max) {
	return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
