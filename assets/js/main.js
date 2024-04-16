//закрывать меню при изменении размера экрана
window.addEventListener('resize', () => {
    if (window.innerWidth > 1050) {
        document.querySelector(".header-top").classList.remove("is-active");
        document.querySelector("body").classList.remove("is-dropdown-open");
    }
})


window.addEventListener('click', (e) => {
    // кастомный селект: показать варианты
    if (e.target.classList.contains('select__selected')) {
        let selectEl = e.target.closest('.select');
        let selectEls = document.querySelectorAll('.select');
        const filteredSelectEls = Array.from(selectEls).filter(el => el !== selectEl);
        if (filteredSelectEls) { filteredSelectEls.forEach(i => i.classList.remove('is-active')); }
        selectEl.classList.toggle('is-active');

        // кастомный селект: выделить ранее выбранный вариант
        let selectOptions = selectEl.querySelectorAll('.select-option');
        if (selectOptions) { selectOptions.forEach(option => { option.classList.toggle('is-selected', option.dataset.value === e.target.dataset.value); }); }
    }

    // кастомный селект: выбрать вариант
    if (e.target.classList.contains('select-option')) {
        let selectedEl = e.target.closest('.select').querySelector('.select__selected');
        selectedEl.innerText = e.target.innerText;
        selectedEl.dataset.value = e.target.dataset.value;
        e.target.closest('.select').classList.remove('is-active');
    }

    // кастомный селект: скрыть варианты
    if (!e.target.closest('.select')) {
        let selectEls = document.querySelectorAll('.select');
        if (selectEls) { selectEls.forEach(i => i.classList.remove('is-active')); }
    }

    // показать меню
    if (e.target.dataset.hasOwnProperty('action')) {
        if (e.target.dataset.action == "show-menu") {
            document.querySelector(".header-top").classList.add("is-active");
            document.querySelector("body").classList.add("is-dropdown-open");
        }
    }
    // скрыть меню
    if (e.target.dataset.hasOwnProperty('action')) {
        if (e.target.dataset.action == "hide-menu") {
            document.querySelector(".header-top").classList.remove("is-active");
            document.querySelector("body").classList.remove("is-dropdown-open");
        }
    }
});

// аккордионы
const accTitles = document.querySelectorAll(".accordion__title");
if (accTitles.length) {
    accTitles.forEach(accTitle => {
        accTitle.addEventListener("click", () => {
            accTitle.closest(".accordion__item").classList.toggle("is-active");
        })
    })
}

// всплывающие окна через фансибокс
Fancybox.bind("[data-fancybox]", {
    l10n: {
        CLOSE: "Закрыть",
        NEXT: "Вперед",
        PREV: "Назад",
        MODAL: "Можно закрыть, нажав ESC",
        ERROR: "Ошибка",
        IMAGE_ERROR: "Изображение не найдено",
        ELEMENT_NOT_FOUND: "HTML не найден",
        AJAX_NOT_FOUND: "Ошибка при загрузке AJAX: Контент не найден",
        AJAX_FORBIDDEN: "Ошибка при загрузке AJAX: Запрещено",
        IFRAME_ERROR: "Ошибка при загрузке",
    },
});

//показать имя файла при заполнении формы
document.addEventListener('click', function (event) {
    if (event.target.tagName === 'INPUT' && event.target.type === 'file') {
        event.target.addEventListener('change', function () {
            const fileName = event.target.files[0].name;
            event.target.closest(".form-row").querySelector("label").dataset.fileName = fileName;
        });
    }
});