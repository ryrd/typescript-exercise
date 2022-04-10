// reusable function
const closeAddReset :Function = () => {
    addReset.classList.toggle("hidden");
    addReset.classList.toggle("flex");
};

const closePopup :Function = () => {
    popup.classList.toggle("hidden");
    popup.classList.toggle("flex");
};

//---------show add reset--------
const showAddReset = document.querySelector('#show-add') as HTMLButtonElement;
const addReset = document.querySelector('#add-reset') as HTMLDivElement;

showAddReset.addEventListener('click', () => {
    addReset.classList.toggle("flex");
    addReset.classList.toggle("hidden");
});

//---------close add reset-------
const addMenuDown = document.querySelector('#add-menu-down')!;

addReset.addEventListener('click', e => {
    if(e.target === e.currentTarget) closeAddReset();
});

addMenuDown.addEventListener('click', () => closeAddReset());

//---------show reset pop up-------
const resetSavingBtn = document.querySelector('#reset-saving') as HTMLButtonElement;
const popup = document.querySelector('#confirm-popup') as HTMLDivElement;
const cancelReset = document.querySelector('#cancel-reset') as HTMLDivElement;

//---------cancel and close reset pop up-------
popup.addEventListener('click', e => {
    if(e.target === e.currentTarget) {
        popup.classList.toggle('hidden');
        popup.classList.toggle('flex');
    }
});
cancelReset.addEventListener('click', () => {
    popup.classList.toggle('hidden');
    popup.classList.toggle('flex');
});

//-------confirm reset saving and close reset pop up-------
const resetBtn = document.querySelector('.danger2') as HTMLButtonElement;
resetBtn.addEventListener('click', () => {
    closeAddReset();
    closePopup();
});

resetSavingBtn.addEventListener('click', () => {
    popup.classList.toggle('flex');
    popup.classList.toggle('hidden');
    // code for reset saving down here
});

