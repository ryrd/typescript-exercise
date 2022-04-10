"use strict";
const showAdd = document.querySelector('#show-add');
showAdd.addEventListener('click', e => {
    addReset.style.display = "flex";
});
const addReset = document.querySelector('#add-reset');
addReset.addEventListener('click', e => {
    if (e.target === e.currentTarget)
        addReset.style.display = "none";
});
