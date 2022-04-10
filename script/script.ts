const showAdd = document.querySelector('#show-add') as HTMLButtonElement;
showAdd.addEventListener('click', e => {
    addReset.style.display = "flex";
});

const addReset = document.querySelector('#add-reset') as HTMLDivElement;
addReset.addEventListener('click', e => {
    if(e.target === e.currentTarget) addReset.style.display = "none";
});
