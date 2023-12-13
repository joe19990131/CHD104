import { data } from './data.js';

let show_count = 4;


function news_show() {
    // 按日期新舊排序
    data.sort((a, b) => new Date(b.date) - new Date(a.date));


    var card_list = document.getElementById('news_flex');
    card_list.innerHTML = "";


    var title_div = document.createElement('div');
    title_div.classList.add('col', 'col-12', 'title');

    var title_h3 = document.createElement('h3');
    title_h3.textContent = "最新消息";
    title_div.appendChild(title_h3);
    card_list.appendChild(title_div);


    for (let i = 0; i < show_count; i++) {
        var item = data[i];

        // 設定連結
        var card_link = document.createElement('a');
        card_link.href = "news_content.html?id="+item.id;
        card_link.classList.add('col', 'col-11', 'news_item', 'flex', 'script_font');

        // tag
        var card_tag = document.createElement('h3');
        card_tag.textContent = item.tag;
        card_tag.classList.add('flex', 'center_flex');

        // date
        var card_title = document.createElement('p');
        card_title.textContent = item.title;
        card_title.classList.add('flex', 'center_flex');

        card_link.appendChild(card_tag);
        card_link.appendChild(card_title);

        card_list.appendChild(card_link);
    }

    // more
    var news_more_div = document.createElement('div');
    news_more_div.classList.add('col', 'col-11', 'news_item_more_flex', 'center_flex', 'flex');

    var news_more = document.createElement('a');
    news_more.textContent = "MORE➤";
    news_more.href = "news.html";
    news_more.classList.add('btn_style', 'btn_hover', 'script_font', 'flex', 'center_flex');
    news_more_div.appendChild(news_more);
    card_list.appendChild(news_more_div);
}

function iframe_change(btn_id) {
    if (btn_id == 'btn_nouth') {
        document.getElementById('call_tel').innerText = "電話:02-0000000";
        document.getElementById('call_address').innerText = "地址:台北市信義區OO路OO巷OO號3F";
        document.getElementById('call_iframe').src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28937.993425568162!2d121.19206371562498!3d24.957635500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346823ea50c732a5%3A0x1b5e6ee66e9fec49!2z57ev6IKyVGliYU1l6ZmE6Kit5Lit5aOi6IG36KiT5Lit5b-D!5e0!3m2!1szh-TW!2stw!4v1700481215188!5m2!1szh-TW!2stw";
    }
    else if (btn_id == 'btn_south') {
        document.getElementById('call_tel').innerText = "電話:07-0000000";
        document.getElementById('call_address').innerText = "地址:高雄市左營區中華路123號";
        document.getElementById('call_iframe').src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.4676872269783!2d121.54067797642479!3d25.052132837559075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab90d642cdc1%3A0x1459df8556710135!2z57ev6IKyVGliYU1l5Y-w5YyXSmF2YeWwsealremkiuaIkOePrQ!5e0!3m2!1szh-TW!2stw!4v1702435392405!5m2!1szh-TW!2stw";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // 清除 localStorage
    localStorage.clear();
    news_show();
});

document.getElementById('btn_nouth').addEventListener('click', function () {
    iframe_change('btn_nouth');
});

document.getElementById('btn_south').addEventListener('click', function () {
    iframe_change('btn_south');
});