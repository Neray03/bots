 // ==UserScript==
// @name         New yandex 2604
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.yandex.ru/*
// @match 	 	https://muz-story.ru/*
// @icon
// @grant        none
// ==/UserScript==

console.log("yandex");
let yandexInput = document.getElementsByName('text')[0];
let keywords =['Гобой','Флейта', 'Кларнет','Саксофон','Тромбон','Валторна'];
let keyword = keywords[getRandom(0,keywords.length)];
let btn = document.getElementsByClassName("button mini-suggest__button button_theme_search")[0];
console.log(btn);
let i =0;
let links = document.links;



if(btn !== undefined){
    yandexInput.value="";

	let timerId = setInterval(()=> {
		yandexInput.value += keyword[i];
		i++;
		if(i == keyword.length) {
			clearInterval(timerId);
			btn.click();
		}
	}, 1000);
}else {

 
	for(let i=0; i<links.length; i++) {
        console.log(links[i].href);
		if(links[i].href.indexOf("muz-story.ru")!=-1) {
			let link = links[i];
			
			console.log("Нашел фразу" + link);
			
				link.click();
			break;
		}
    }
}
	function getRandom(min,max) {
	return Math.floor(Math.random()*(max-min)+min);
}


