document.querySelectorAll('.parameters-dropdown').forEach(function (dropDownWrapper) {
    const dropDownBtn = dropDownWrapper.querySelector('.parameters-dropdown-button');
    const dropDownList = dropDownWrapper.querySelector('.parameters-dropdown-list');
    const dropDownListItems = dropDownList.querySelectorAll('.parameters-dropdown-list-item');
    const dropDownInput = dropDownWrapper.querySelector('.parameters-dropdown-input-hidden');

    // Функция для переключения видимости выпадающего списка
    function toggleDropDownList() {
        dropDownList.classList.toggle('parameters-dropdown-list--visible');
        dropDownBtn.classList.toggle('parameters-dropdown-button--active');
    }

    // Клик по кнопке. Открыть/Закрыть select
    dropDownBtn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleDropDownList();
    });

    // Клик по элементу списка
    dropDownListItems.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            dropDownBtn.innerText = this.innerText;
            dropDownInput.value = this.dataset.value;
            toggleDropDownList();
            dropDownBtn.focus();
            dropDownBtn.classList.add('parameters-dropdown-button--item-selected');
        });
    });

    // Клик снаружи дропдауна или выбор другого элемента
    document.addEventListener('click', function (e) {
        if (!dropDownWrapper.contains(e.target)) {
            dropDownBtn.classList.remove('parameters-dropdown-button--active');
            dropDownList.classList.remove('parameters-dropdown-list--visible');
            dropDownBtn.classList.remove('parameters-dropdown-button--item-selected');
        }
    });

    // Нажатие на Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (dropDownList.classList.contains('parameters-dropdown-list--visible')) {
                e.preventDefault();
                toggleDropDownList();
                dropDownBtn.focus();
                dropDownBtn.classList.remove('parameters-dropdown-button--item-selected');
            }
        }
    });
});

function validateInput(inputElement) {
    if (inputElement.value && !inputElement.value.match(/^[0-9]+$/)) {
        inputElement.classList.add('error');
        inputElement.placeholder = 'Ошибка';
    } else {
        inputElement.classList.remove('error');
        inputElement.placeholder = 'введите данные';
    }
}

// Меняет тень
var parameterGroups = document.querySelectorAll('.parameters-group');

function addActiveShadow(event) {
    event.stopPropagation();
    parameterGroups.forEach(function (group) {
        group.classList.remove('active-shadow');
    });
    this.classList.add('active-shadow');
}

function removeActiveShadow() {
    parameterGroups.forEach(function (group) {
        group.classList.remove('active-shadow');
    });
}

parameterGroups.forEach(function (group) {
    group.addEventListener('click', addActiveShadow);
});

document.addEventListener('click', removeActiveShadow);


// Модальное окно
document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("valveModal");
    var img = document.getElementById("valveImg");
    var span = document.getElementsByClassName("valve-modal-close")[0];
    var images = document.querySelectorAll(".valves-images-container img");
    var currentIndex = 0;

    function showImage(index) {
        images.forEach((img, idx) => {
            img.style.display = idx === index ? "" : "none";
        });
    }

    img.onclick = function (event) {
        event.stopPropagation();
        modal.style.display = "block";
        showImage(currentIndex);
    }

    span.onclick = function (event) {
        event.stopPropagation();
        modal.style.display = "none";
    }

    document.querySelector(".prev").onclick = function (event) {
        event.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    };

    document.querySelector(".next").onclick = function (event) {
        event.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    };

    document.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }, true);

    document.addEventListener('keydown', function (event) {
        if (modal.style.display === "block") {
            if (event.key === "ArrowRight") {
                event.preventDefault();
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(currentIndex);
            }
        }
    });
});

