// =========TOP BTN SELECTE=========

let btnsTop = document.querySelectorAll('.data-farm__top-link');

function hideActiveBtn() {
    btnsTop.forEach(btn => btn.classList.remove('active-btn'));
}

function activateBtn(index) {
    btnsTop[index].classList.add('active-btn')
}

btnsTop.forEach((btn, index) => btn.addEventListener('click', () => {
    hideActiveBtn();
    activateBtn(index);
}));

// =========DROPDOWN=========

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


// =========DATE TO SPAN=========

const inputDate = document.querySelector('.datepicker-input');
const textDateInActive = document.querySelector('#copyDate');

let getNormalDate = function () {
    let date = new Date(inputDate.value);
    if (!!date.valueOf()) {
        let day = (date.getDate() < 10 ? '0' : '') + (date.getDate());
        let month = (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1);
        let year = date.getFullYear();

        return day + '.' + month + '.' + year;
    }
}

inputDate.addEventListener('change', function () {
    textDateInActive.textContent = getNormalDate();
});
