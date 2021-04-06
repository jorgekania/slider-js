'use strict';

//Arrays de imagens
const images = [
    {
        "id": "1001",
        "author": "Danielle MacInnes",
        "width": 5616,
        "height": 3744,
        "url": "https://unsplash.com/photos/1DkWWN1dr-s",
        "download_url": "https://picsum.photos/id/1001/5616/3744"
    },
    {
        "id": "1002",
        "author": "NASA",
        "width": 4312,
        "height": 2868,
        "url": "https://unsplash.com/photos/6-jTZysYY_U",
        "download_url": "https://picsum.photos/id/1002/4312/2868"
    },
    {
        "id": "1003",
        "author": "E+N Photographies",
        "width": 1181,
        "height": 1772,
        "url": "https://unsplash.com/photos/GYumuBnTqKc",
        "download_url": "https://picsum.photos/id/1003/1181/1772"
    },
    {
        "id": "1004",
        "author": "Greg Rakozy",
        "width": 5616,
        "height": 3744,
        "url": "https://unsplash.com/photos/SSxIGsySh8o",
        "download_url": "https://picsum.photos/id/1004/5616/3744"
    },
    {
        "id": "1005",
        "author": "Matthew Wiebe",
        "width": 5760,
        "height": 3840,
        "url": "https://unsplash.com/photos/tBtuxtLvAZs",
        "download_url": "https://picsum.photos/id/1005/5760/3840"
    }];

//Constantes
const slider = document.querySelector(".slider");
const btns = document.querySelectorAll(".btn");
const back = document.querySelector('.background');
const ulOption = document.getElementById('ulOption');

var time = 3000;
var index = 0;
var op_index = 0;

//Cria o html com as imagens e botões de próximo e anterior
const loadImages = (images, container) => {
    images.forEach((image, indice) => {

        let classBtn;
        if (indice == 0) {
            classBtn = 'id="first"';
        } else if (indice == images.length - 1) {
            classBtn = 'id="last"';
        } else {
            classBtn = '';
        }

        container.innerHTML += `
                    <div class="img" ${classBtn}>
                        <img src="${image.download_url}">
                    </div>`
    })
}

//Carrega as imagens do array
const loadBackground = (imgBack, div) => {
    imgBack.forEach(img => {
        div.innerHTML += `<img src="${img.download_url}" class="bg">`
    })
}

//Botões de numeração das imagens
const loadOptions = () => {
    let i = 0;
    for (i; i < images.length; i++) {
        ulOption.innerHTML += `<li class="option" op-index="${i}">${i + 1}</li>`
    }
}
loadImages(images, slider);
// loadBackground(images, back);
loadOptions();

const slides = document.querySelectorAll(".img");
const backgrounds = document.querySelectorAll('.bg');
const options = document.querySelectorAll('.option');

var size = slides[index].clientWidth;

update();

//Atualiza o slider
function update() {
    slider.style.transform = "translateX(" + (-size * index) + "px)";

    // backgrounds.forEach(img => img.classList.remove('show'));
    // backgrounds[op_index].classList.add('show');

    options.forEach(option => option.classList.remove('colored'));
    options[op_index].classList.add('colored');
}

//Chama o efeito de atualização do slider
function slide() {
    slider.style.transition = "transform .5s ease-in-out";
    update();
}

//Botões proximo e anterior
function btnCheck() {

    var id;
    if (id == '') {
        id = 'next';
    }

    if (id === "prev") {
        index--;
        if (op_index === 0) {
            op_index = images.length - 1;
        }
        else {
            op_index--;
        }
    }
    else {
        index++;
        if (op_index === images.length - 1) {
            op_index = 0;
        }
        else {
            op_index++;
        }
    }
    index = op_index;
    slide();
}

//Botões para passar as imagens
function optionFunc() {
    let i = Number(this.getAttribute('op-index'));
    op_index = i;
    index = i;
    slide();
}
btns.forEach(btn => btn.addEventListener('click', btnCheck));
options.forEach(option => option.addEventListener('click', optionFunc));

//Para fazer as imagens passarem automáticamente a cada X segundos
const loadNext = () => {
    setInterval(function () {
        document.querySelector('.img').classList.add('opacityTransition');
        btnCheck();
        document.querySelector('.img').classList.remove('opacityTransition');
    }, time);
}

loadNext();
