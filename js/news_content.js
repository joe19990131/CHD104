import { data } from './data.js';
import { data_2 } from './data.js';

var newsId = "";
var findnum = null;
var findnum_2 = null;

function getid() {
    let urlParams = new URLSearchParams(window.location.search);
    var id_check = urlParams.get('id');
    return id_check;
}

function show() {
    newsId = getid();

    findnum = data.findIndex(function(item) {
        return item.id === newsId;
    });
    
    findnum_2 = data_2.findIndex(function(item) {
        return item.id === newsId;
    });

    document.getElementById("content_title").innerText = data[findnum].title;
    document.getElementById("content_header").innerText = data_2[findnum_2].content_header;

    var card_img_1 = document.createElement('img');
    card_img_1.src = data_2[findnum_2].content_img_1;
    document.getElementById("content_img_1").appendChild(card_img_1);

    var card_img_2 = document.createElement('img');
    card_img_2.src = data_2[findnum_2].content_img_2;
    document.getElementById("content_img_2").appendChild(card_img_2);

    document.getElementById("content_main").innerHTML = data_2[findnum_2].content_main;
}

document.addEventListener('DOMContentLoaded', function () {
    show();
});