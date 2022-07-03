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