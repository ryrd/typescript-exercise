const mainText = document.querySelector('#main-text') as HTMLHeadingElement;
const todaySpentInput = document.querySelector('#today-spent-input') as HTMLInputElement;

const addPeriod: Function = (x: number): string => {
    var parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join("");
}   


let moneyLeft: number = 0;

if(localStorage.getItem('money-left') !== null){
    mainText.innerText = addPeriod(parseInt(localStorage.getItem('money-left')!));
    moneyLeft = parseInt(localStorage.getItem('money-left')!);
}

const form = document.querySelector('#today-spent-form') as HTMLFormElement;

form.addEventListener('submit', e => {
    e.preventDefault();
    if(todaySpentInput.value){
        localStorage.setItem('new-spent', todaySpentInput.value);
        moneyLeft -= parseInt(todaySpentInput.value);
        mainText.innerText = addPeriod(moneyLeft);
        localStorage.setItem('money-left', moneyLeft.toString());
    }else {
        console.log('kosong');
    };
});

const incomeForm = document.querySelector('#income-form') as HTMLFormElement;
const incomeInput = document.querySelector('#income-input') as HTMLFormElement;

incomeForm.addEventListener('submit', e => {
    e.preventDefault();
    if(incomeInput.value){
        moneyLeft += parseInt(incomeInput.value);
        mainText.innerText = addPeriod(moneyLeft);
        localStorage.setItem('money-left', moneyLeft.toString());
        toggleAddReset();
    }else {
        console.log('kosong');
    };
});


//---------------------------------------------------------------------
//---------------------------------------------------------------------

const showAddReset = document.querySelector('#show-add') as HTMLButtonElement;
const addReset = document.querySelector('#add-reset') as HTMLDivElement;
const addResetContent = document.querySelector('#add-reset-content') as HTMLDivElement;

// reusable function
const toggleAddReset :Function = () => {
    addReset.classList.toggle("hidden");
    addReset.classList.toggle("flex");
    // addReset.classList.toggle('bg-opacity-0');
    // addReset.classList.toggle('bg-opacity-70');
    // addResetContent.classList.toggle('translate-y-full');
    // addResetContent.classList.toggle('translate-y-0');
};

const togglePopup :Function = () => {
    popup.classList.toggle("hidden");
    popup.classList.toggle("flex");
    popup.classList.toggle('bg-opacity-0');
    popup.classList.toggle('bg-opacity-70');
};

//---------show add reset--------

showAddReset.addEventListener('click', () => {
    toggleAddReset();
});

//---------close add reset-------
const addMenuDown = document.querySelector('#add-menu-down')!;

addReset.addEventListener('click', e => {
    if(e.target === e.currentTarget) toggleAddReset();
});

addMenuDown.addEventListener('click', () => toggleAddReset());

//---------show reset pop up-------
const resetSavingBtn = document.querySelector('#reset-saving') as HTMLButtonElement;
const popup = document.querySelector('#confirm-popup') as HTMLDivElement;
const cancelReset = document.querySelector('#cancel-reset') as HTMLDivElement;
const resetBtn = document.querySelector('.danger2') as HTMLButtonElement;

resetSavingBtn.addEventListener('click', () => {
    togglePopup(); //open popup
    popup.style.opacity = '1';
}); 

//---------cancel and close reset pop up-------
popup.addEventListener('click', e => {
    if(e.target === e.currentTarget) togglePopup();
});

cancelReset.addEventListener('click', () => {
    togglePopup();
});

//-------confirm reset saving and close reset pop up-------
resetBtn.addEventListener('click', () => {
    toggleAddReset();
    togglePopup();
    // code for reset saving down here
});

