import './sass/main.scss';
import PhotoCard from './markup/photo-card.hbs';
import fatch from './apiService.js';


const refs = {
    inputValue: document.querySelector(`.search-form`),
    responseContainer: document.querySelector(`.gallery`),
    loadMore: document.querySelector('.loadMore'),
}
refs.inputValue.addEventListener('submit', showImages);
refs.loadMore.addEventListener('click', showMore);
let inputValue = '';
var number = 0;

function showImages(event) {
    event.preventDefault()
    refs.responseContainer.innerHTML = ''
    inputValue = event.currentTarget.elements.query.value.trim();
    number = 1;

    if (inputValue.trim() === '') {
        refs.loadMore.classList.add('is-hidden');
        return
    }
    fatch(inputValue, number)
        .then(value => {
            responseVarification(value)
        })
        .then(refs.loadMore.classList.remove('is-hidden'))
        .then(event.currentTarget.elements.query.value = '')
        .catch(error => {
            console.log(error);
        })
};

function responseVarification(value) {
    refs.responseContainer.insertAdjacentHTML('beforeend', PhotoCard(value.hits))
}

function scroll() {
    window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
    });
}

function showMore() {
    number += 1
    fatch(inputValue, number)
        .then(value => {
            responseVarification(value)
        })
        .then(setTimeout(() => {
            scroll()
        }, 700))
        .catch(error => {
            console.log(error);
        });
};