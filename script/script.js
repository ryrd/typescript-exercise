"use strict";
//---------------------variables----------------
let moneyLeft = 0;
let lastSpents = [];
let last3daysSpents = [0, 0, 0];
//---------------------------------------------
//---------------------------------------------
const showAddReset = document.querySelector('#show-add');
const addReset = document.querySelector('#add-reset');
const addResetContent = document.querySelector('#add-reset-content');
// reusable function
const toggleAddReset = () => {
    addReset.classList.toggle("hidden");
    addReset.classList.toggle("flex");
    // addReset.classList.toggle('bg-opacity-0');
    // addReset.classList.toggle('bg-opacity-70');
    // addResetContent.classList.toggle('translate-y-full');
    // addResetContent.classList.toggle('translate-y-0');
};
const togglePopup = () => {
    popup.classList.toggle("hidden");
    popup.classList.toggle("flex");
    popup.classList.toggle('bg-opacity-0');
    popup.classList.toggle('bg-opacity-70');
};
const emptyPopup = document.querySelector('#empty-popup');
const toggleEmptyPopup = () => {
    emptyPopup.classList.toggle("hidden");
    emptyPopup.classList.toggle("flex");
};
const addPeriod = (x) => {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join("");
};
const lastSpentList = document.querySelector('#today-spents');
const addNewSpent = (spents) => {
    const newspentlist = spents.map(spent => {
        return `<li class="border border-white border-opacity-40 border-l-0 border-t-0 border-r-0 pl-1">${spent}</li>`;
    });
    lastSpentList.innerHTML = newspentlist.toString().replace(/,/g, "");
};
if (localStorage.getItem('last-spents') !== null) {
    const lastSpentsFromLocal = JSON.parse(localStorage.getItem('last-spents'));
    lastSpents.push(...lastSpentsFromLocal);
    console.log(lastSpents);
    addNewSpent(lastSpentsFromLocal);
}
//-------------------------------------------------------------
//-------------------------------------------------------------
const mainText = document.querySelector('#main-text');
if (localStorage.getItem('money-left') !== null) {
    mainText.innerText = addPeriod(parseInt(localStorage.getItem('money-left')));
    moneyLeft = parseInt(localStorage.getItem('money-left'));
}
const form = document.querySelector('#today-spent-form');
const todaySpentInput = document.querySelector('#today-spent-input');
form.addEventListener('submit', e => {
    e.preventDefault();
    if (todaySpentInput.value) {
        moneyLeft -= parseInt(todaySpentInput.value);
        mainText.innerText = addPeriod(moneyLeft);
        localStorage.setItem('money-left', moneyLeft.toString());
        lastSpents.push(parseInt(todaySpentInput.value));
        console.log(lastSpents);
        const lastSpentsToLocal = JSON.stringify(lastSpents);
        localStorage.setItem('last-spents', lastSpentsToLocal);
        addNewSpent(lastSpents);
        todaySpentInput.value = '';
        todaySpentInput.blur();
    }
    else {
        toggleEmptyPopup();
    }
    ;
});
const incomeForm = document.querySelector('#income-form');
const incomeInput = document.querySelector('#income-input');
incomeForm.addEventListener('submit', e => {
    e.preventDefault();
    if (incomeInput.value) {
        moneyLeft += parseInt(incomeInput.value);
        mainText.innerText = addPeriod(moneyLeft);
        localStorage.setItem('money-left', moneyLeft.toString());
        toggleAddReset();
        incomeInput.value = '';
        incomeInput.blur();
    }
    else {
        toggleEmptyPopup();
    }
    ;
});
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------show add reset--------
showAddReset.addEventListener('click', () => {
    toggleAddReset();
});
//---------close add reset-------
const addMenuDown = document.querySelector('#add-menu-down');
addReset.addEventListener('click', e => {
    if (e.target === e.currentTarget)
        toggleAddReset();
});
addMenuDown.addEventListener('click', () => toggleAddReset());
//---------show reset pop up-------
const resetSavingBtn = document.querySelector('#reset-saving');
const popup = document.querySelector('#confirm-popup');
const cancelReset = document.querySelector('#cancel-reset');
const resetBtn = document.querySelector('.danger2');
resetSavingBtn.addEventListener('click', () => {
    togglePopup(); //open popup
    popup.style.opacity = '1';
});
//---------cancel and close reset pop up-------
popup.addEventListener('click', e => {
    if (e.target === e.currentTarget)
        togglePopup();
});
cancelReset.addEventListener('click', () => {
    togglePopup();
});
//-------confirm reset saving and close reset pop up-------
resetBtn.addEventListener('click', () => {
    toggleAddReset();
    togglePopup();
    moneyLeft = 0;
    mainText.innerText = addPeriod(moneyLeft);
    localStorage.setItem('money-left', moneyLeft.toString());
});
//------------close empty popup----------------
emptyPopup.addEventListener('click', () => {
    toggleEmptyPopup();
});
