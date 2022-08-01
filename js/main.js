// =========SWITCHING BUTTONS=========

const btnsTop = document.querySelectorAll('.data-farm__top-link');
const btnsFilter = document.querySelectorAll('.filters__settings-btn');

function hideActiveBtn(arr) {
    arr.forEach(btn => btn.classList.remove('active-btn'));
}

function activateBtn(index, arr) {
    arr[index].classList.add('active-btn')
}

btnsTop.forEach((btn, index) => btn.addEventListener('click', () => {
    hideActiveBtn(btnsTop);
    activateBtn(index, btnsTop);
}));

btnsFilter.forEach((btn, index) => btn.addEventListener('click', () => {
    hideActiveBtn(btnsFilter);
    activateBtn(index, btnsFilter);
}));

// =========DROPDOWN=========

//TODO полностью переписать логику выпадающего меню

function toggleClass(elem, className) {
    if (elem.className.indexOf(className) !== -1) {
        elem.className = elem.className.replace(className, '');
    }
    else {
        elem.className = elem.className.replace(/\s+/g, ' ') + className;
    }

    return elem;
}

function toggleDisplay(elem) {
    const curDisplayStyle = elem.style.display;

    if (curDisplayStyle === 'none' || curDisplayStyle === '') {
        elem.style.display = 'block';
    }
    else {
        elem.style.display = 'none';
    }
}


function toggleMenuDisplay(e) {
    const dropdown = e.currentTarget.parentNode;
    const menu = dropdown.querySelector('.dropdown-menu');

    toggleClass(menu, 'hide');
}

function handleOptionSelected(e) {
    const menu = document.querySelector('.dropdown-menu');
    toggleClass(menu, 'hide');

    const id = e.target.id;
    const newValue = e.target.textContent + ' ';
    const titleElem = document.querySelector('.dropdown-toggle');
    titleElem.textContent = newValue;
}

const dropdownTitle = document.querySelector('.dropdown-toggle');
const dropdownOptions = document.querySelectorAll('.dropdown-item');

// bind listeners to these elements
dropdownTitle.addEventListener('click', toggleMenuDisplay);
dropdownOptions.forEach(option => option.addEventListener('click', handleOptionSelected));


// ========VALIDATION "FROM" "TO"==========

const settingsBtn = document.querySelector('.filters__settings-link--main');

function compareNumInFilters() {
    let fromAge = document.querySelector('#from-age').value;
    let toAge = document.querySelector('#to-age').value;
    let fromWeight = document.querySelector('#from-weight').value;
    let toWeight = document.querySelector('#to-weight').value;
    if (fromAge < toAge && fromWeight < toWeight) {
        //TODO добавить логику для фильтров
        console.log("Все верно!")
    } else {
        //TODO придумать как сообщить об ошибке 
        console.log("Неверно заполнена форма!")
    }
}

settingsBtn.addEventListener('click', () => {
    compareNumInFilters();
});


// =========DATE TO SPAN=========

const inputDate = document.querySelector('.datepicker-input');
const textDateInActive = document.querySelector('#copyDate');

let getNormalDate = function () {
    let date = new Date(inputDate.value);
    if (!!date.valueOf()) {
        let day = (date.getDate() < 10 ? '0' : '') + (date.getDate());
        let month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
        let year = date.getFullYear();

        return day + '.' + month + '.' + year;
    }
}

inputDate.addEventListener('change', function () {
    textDateInActive.textContent = getNormalDate();
});

// =========TABLE=========

let table = document.querySelector('#table');

const pageSize = 10;

let rowCount = table.rows.length;
let firstRow = table.rows[0].firstElementChild.tagName;
let hasHead = (firstRow === 'TH');
let tr = [];
let i, j, m = (hasHead) ? 1 : 0; //TODO Исправить!
let th = (hasHead ? table.rows[0].outerHTML : "");

let pageCount = Math.ceil(rowCount / pageSize);

if (pageCount > 1) {
    for (i = m, j = 0; i < rowCount; i++, j++) {
        tr[j] = table.rows[i].outerHTML;
    }
    table.insertAdjacentHTML("afterEnd", "<div id='btnPage'></div>");
    sort(1);
}

function sort(page) {
    let rows = th;
    let fRow = ((pageSize * page) - pageSize);
    for (i = fRow; i < (fRow + pageSize) && i < tr.length; i++) {
        rows += tr[i];
    }

    table.innerHTML = rows;
    document.querySelector('#btnPage').innerHTML = pageButtons(pageCount, page);
    // document.getElementById("page" + page).setAttribute("class", "activeBtnPage");
    document.getElementById("page" + page).classList.add("activeBtnPage")
}

function pageButtons(pageCount, curPage) {
    let prevDis = (curPage == 1) ? "disabled" : "";
    let nextDis = (curPage == pageCount) ? "disabled" : "";
    let btnPrev = "<input type='button' class='btnPage-switch btnPage-switch--prev' value='Предыдущая' onclick='sort(" + (curPage - 1) + ")' " + prevDis + ">";
    for (i = 1; i <= pageCount; i++) {
        btnPrev += "<input type='button' class='btnPage-switch btnPage-switch--num' id='page" + i + "'value='" + i + "' onclick='sort(" + i + ")'>";
    }
    btnPrev += "<input type='button' class='btnPage-switch btnPage-switch--next' value='Следующая' onclick='sort(" + (curPage + 1) + ")' " + nextDis + ">";
    return btnPrev;
}
