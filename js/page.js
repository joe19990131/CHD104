import { data } from './data.js';

// 每頁DATA數
const itemsPerPage = 9;

let currentPage = 0;
let maxpage = 0;
let save_tag = "";

function init() {
    // 從 localStorage 中獲取 JSON 字符串
    const storedData = localStorage.getItem('pageData');
    // 將 JSON 字符串轉換為物件
    const parsedData = JSON.parse(storedData);

    if (parsedData) {
        // 使用存儲的當前頁數
        currentPage = parsedData.currentPage;
        save_tag = parsedData.filter;
    } else {
        // 如果沒有存儲的當前頁數，設置為 1
        currentPage = 1;
        save_tag = "分類一";
    }
}

// 分類tag
function tags(tag, page) {
    // 使用 filter 過濾符合條件的項目
    var filterdata = data.filter(item => item.tag === tag);
    maxpage = Math.ceil(filterdata.length / itemsPerPage);
    document.getElementById("news_page").innerText = page;

    currentPage = page;

    if (maxpage == 1) {
        document.getElementById("prevButton").style.display = "none";
        document.getElementById("nextButton").style.display = "none";
        document.getElementById("news_page_flex").style.justifyContent = 'center';
    }
    else if (page == maxpage) {
        document.getElementById("prevButton").style.display = "block";
        document.getElementById("nextButton").style.display = "none";
        document.getElementById("news_page_flex").style.justifyContent = 'flex-start';
    }
    else if (page == 1) {
        document.getElementById("prevButton").style.display = "none";
        document.getElementById("nextButton").style.display = "block";
        document.getElementById("news_page_flex").style.justifyContent = 'flex-end';
    }
    else {
        document.getElementById("prevButton").style.display = "block";
        document.getElementById("nextButton").style.display = "block";
        document.getElementById("news_page_flex").style.justifyContent = 'center';
    }
    show(filterdata, tag);
}

// show結果
function show(filterdata, tag) {
    //目前頁數陣列該show的資料
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var currentPageData = filterdata.slice(startIndex, endIndex);

    // 顯示當前頁面的結果
    itemcreate(currentPageData);

    // 頁碼紀錄
    pagebtn(currentPage, tag);
}

//子內容動態生成
function itemcreate(currentPageData) {
    var card_list = document.getElementById('new_card_list');
    card_list.innerHTML = "";

    for (let i = 0; i < currentPageData.length; i++) {
        var item = currentPageData[i];

        // 設定連結
        var card_link = document.createElement('a');
        card_link.href = "news_content.html?id="+item.id;
        card_link.classList.add('col', 'flex', 'news_card');

        // 設定圖片框
        var card_img_div = document.createElement('div');
        card_img_div.classList.add('news_card_img');

        // 設定圖片
        var card_img = document.createElement('img');
        card_img.src = item.pic;
        card_img_div.appendChild(card_img);

        // 標題
        var card_title = document.createElement('h3');
        card_title.textContent = item.title;
        card_title.classList.add('script_font_jp');

        // date
        var card_date = document.createElement('span');
        card_date.textContent = item.date;
        card_date.classList.add('script_font');

        // more
        var card_more = document.createElement('div');
        card_more.textContent = "MORE➤";
        card_more.classList.add('card_more', 'script_font_jp');


        card_link.appendChild(card_img_div);
        card_link.appendChild(card_title);
        card_link.appendChild(card_date);
        card_link.appendChild(card_more);

        card_list.appendChild(card_link);
    }
}

// 上一頁
function pagepre() {
    if (currentPage >= 2) {
        currentPage -= 1;
    }
    tags(save_tag, currentPage);
}

// 下一頁
function pagenext() {
    if (currentPage <= maxpage - 1) {
        currentPage += 1;
    }
    tags(save_tag, currentPage);
}

//頁碼紀錄
function pagebtn(currentpage, tag) {
    let dataToStore = {
        currentPage: currentpage,
        filter: tag // 這裡是你的 filter 值
    };

    // 將物件轉換為 JSON 字符串
    const jsonString = JSON.stringify(dataToStore);

    // 使用 localStorage 存儲 JSON 字符串
    localStorage.setItem('pageData', jsonString);
    init();
}

// 初始化顯示所有項目
document.addEventListener('DOMContentLoaded', function () {

    // 獲取所有沒有 "news_card" 類別的 <a> 標籤
    const linksWithoutNewsCard = document.querySelectorAll('a:not(.news_card)');

    // 設置每個標籤的點擊事件處理函數
    linksWithoutNewsCard.forEach(function (link) {
        link.addEventListener('click', function () {
            // 清除 localStorage
            localStorage.clear();

            // 這裡可以添加其他處理代碼，例如導航到新的頁面等
        });
    });
    // localStorage.clear();
    init();
    tags(save_tag, currentPage);
});

document.getElementById('prevButton').addEventListener('click', function () {
    pagepre();
});

document.getElementById('nextButton').addEventListener('click', function () {
    pagenext();
});

document.getElementById('tags_1').addEventListener('click', function () {
    tags('分類一', 1);
});

document.getElementById('tags_2').addEventListener('click', function () {
    tags('分類二', 1);
});

document.getElementById('tags_3').addEventListener('click', function () {
    tags('分類三', 1);
});

