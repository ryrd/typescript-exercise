//---------------------variables----------------
let moneyLeft: number = 0;
let lastSpents: number[] = [];
let last3daysSpents: [number, number, number] = [0 , 0 , 0];

let previousMoneyLeft : number;

//---------------------DOM selections----------------
const mainText = document.querySelector('#main-text') as HTMLHeadingElement;

const form = document.querySelector('#today-spent-form') as HTMLFormElement;
const todaySpentInput = document.querySelector('#today-spent-input') as HTMLInputElement;

const lastSpentList = document.querySelector('#today-spents') as HTMLUListElement;
const last3daysSpentList = document.querySelector('#three-days-spents') as HTMLUListElement;

const showAddReset = document.querySelector('#show-add') as HTMLButtonElement;
const addReset = document.querySelector('#add-reset') as HTMLDivElement;
const addResetContent = document.querySelector('#add-reset-content') as HTMLDivElement;

const incomeForm = document.querySelector('#income-form') as HTMLFormElement;
const incomeInput = document.querySelector('#income-input') as HTMLFormElement;

const addMenuDown = document.querySelector('#add-menu-down')!;

const popup = document.querySelector('#confirm-popup') as HTMLDivElement;
const cancelReset = document.querySelector('#cancel-reset') as HTMLDivElement;
const resetBtn = document.querySelector('.danger2') as HTMLButtonElement;
const resetSavingBtn = document.querySelector('#reset-saving') as HTMLButtonElement;

const emptyPopup = document.querySelector('#empty-popup') as HTMLDivElement;

const moneyLestPopup = document.querySelector('#money-lest-popup') as HTMLDivElement;


//---------------------------------------------
//---------------------------------------------


// -------------------reusable function---------------------
const toggleAddReset :Function = (): void => {
    addReset.classList.toggle("-z-10");
    addReset.classList.toggle("z-10");
};

const togglePopup :Function = (): void => {
    popup.classList.toggle("hidden");
    popup.classList.toggle("flex");
};

const toggleEmptyPopup :Function = (): void => {
    emptyPopup.classList.toggle("hidden");
    emptyPopup.classList.toggle("flex");
};

const toggleMoneyLestPopup :Function = (): void => {
    moneyLestPopup.classList.toggle("hidden");
    moneyLestPopup.classList.toggle("flex");
};

const addPeriod: Function = (x: number): string => {
    let parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join("");
}

//-----------------money counter animation--------------------
//counter animation function copied from Md. Taifuzzaman Bilash on codepen.io --with little modification
const counterAnim: Function = (start: number, end: number): void => {
    let startTimestamp: any = null;
    const step = (timestamp: any) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / 1000, 1);
        mainText.innerText = addPeriod(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const addNewSpent: Function = (spents: number[]) :void => {
    const newspentlist = spents.map(spent => {
        return `<li class="border border-white border-opacity-40 border-l-0 border-t-0 border-r-0 pl-1">${addPeriod(spent)}</li>`;
    });
    lastSpentList.innerHTML = newspentlist.toString().replace(/,/g, "");
}

const addthreeSpent: Function = (spents: number[]) :void => {
    const newspentlist = spents.map(spent => {
        return `<li class="border border-white border-opacity-40 border-l-0 border-t-0 border-r-0 pl-1">${addPeriod(spent)}</li>`;
    });
    last3daysSpentList.innerHTML = newspentlist.toString().replace(/,/g, "");
}
//--------------------------------------------------
//--------------------------------------------------

//--------------check last spent local storage and add to UI-----------------

if(localStorage.getItem('last-spents') !== null){
    const lastSpentsFromLocal = JSON.parse(localStorage.getItem('last-spents')!);
    lastSpents.push(...lastSpentsFromLocal);
    addNewSpent(lastSpentsFromLocal);
}

//--------------check last 3 days spent local storage and add to UI------------------
if(localStorage.getItem('last-3days-spent') !== null){
    const last3daysSpentsFromLocal = JSON.parse(localStorage.getItem('last-3days-spent')!);
    last3daysSpents[0] = last3daysSpentsFromLocal[0];
    last3daysSpents[1] = last3daysSpentsFromLocal[1];
    last3daysSpents[2] = last3daysSpentsFromLocal[2];
    addthreeSpent(last3daysSpents);
}

//---------check money left local storage and add to UI
if(localStorage.getItem('money-left') !== null){
    mainText.innerText = addPeriod(parseInt(localStorage.getItem('money-left')!));
    moneyLeft = parseInt(localStorage.getItem('money-left')!);
}

//-----------------check today date-----------------
const today = new Date();

if(localStorage.getItem('current-date') !== null) {
    if(`${today.getDate()}-${today.getMonth()}` !== localStorage.getItem('current-date')){
        //change last 3 days spents
        last3daysSpents[2] = last3daysSpents[1];
        last3daysSpents[1] = last3daysSpents[0];
        last3daysSpents[0] = lastSpents.length ? lastSpents.reduce((total, eachSpent) => total+eachSpent) : 0;

        //change current date localstorage
        localStorage.setItem('current-date', `${today.getDate()}-${today.getMonth()}`);

        //change last 3 days localstorage
        localStorage.setItem('last-3days-spent', JSON.stringify(last3daysSpents));

        //delete yesterday lastSpents
        lastSpents = [];
        localStorage.removeItem('last-spents');
    }   
}
else{
    localStorage.setItem('current-date', `${today.getDate()}-${today.getMonth()}`);
}

//-----------------------------------------------------
//-----------------------------------------------------

//form to input new spent
form.addEventListener('submit', e => {
    e.preventDefault();
    if(todaySpentInput.value){
        if((moneyLeft - parseInt(todaySpentInput.value)) > 0){
            previousMoneyLeft = moneyLeft;
            moneyLeft -= parseInt(todaySpentInput.value);
            localStorage.setItem('money-left', moneyLeft.toString());
            counterAnim(previousMoneyLeft, moneyLeft);
    
            lastSpents.push(parseInt(todaySpentInput.value));
            localStorage.setItem('last-spents', JSON.stringify(lastSpents));
            addNewSpent(lastSpents);
            
            todaySpentInput.value = '';
            todaySpentInput.blur();
        }
        else if(todaySpentInput.value === '8000000000'){
            document.querySelector('#m')!.classList.toggle('hidden');
            setTimeout(()=> {
                document.querySelector('#m')!.classList.toggle('hidden');
                todaySpentInput.value = '';
                todaySpentInput.blur();
            }, 700);
        }
        else{
            toggleMoneyLestPopup();
        }
    }else {
        toggleEmptyPopup();
    };
});

//form to add new income
incomeForm.addEventListener('submit', e => {
    e.preventDefault();
    if(incomeInput.value){
        previousMoneyLeft = moneyLeft;
        moneyLeft += parseInt(incomeInput.value);
        localStorage.setItem('money-left', moneyLeft.toString());
        counterAnim(previousMoneyLeft, moneyLeft);
        
        toggleAddReset();
        if(window.innerWidth < 768){
            addResetContent.style.transform = 'translateY(100%)';
            addReset.style.backgroundColor = '#00000000';
        }
        
        incomeInput.value = '';
        incomeInput.blur();
    }else {
        toggleEmptyPopup();
    };
});

//bottom to reset saving and close reset pop up
resetBtn.addEventListener('click', () => {
    toggleAddReset();

    if(window.innerWidth < 768){
        addResetContent.style.transform = 'translateY(100%)';
        addReset.style.backgroundColor = '#00000000';
    }

    togglePopup();

    moneyLeft = 0;
    mainText.innerText = addPeriod(moneyLeft);
    lastSpentList.innerHTML = '';
    last3daysSpentList.innerHTML = '';
    localStorage.clear();
});

//------------------------------------------------------------
//------------------------------------------------------------

const mediaQuerySmall = window.matchMedia('(max-width: 767px)');
const mediaQueryMedium = window.matchMedia('(min-width: 768px)');
type windowSize = 'small' | 'medium';
let currentWindowSize: windowSize;

if(window.innerWidth < 768) currentWindowSize = 'small';
else if(window.innerWidth >= 768) currentWindowSize = 'medium';

window.addEventListener('resize', () => {
    if(window.innerWidth < 768 && currentWindowSize != 'small') {
        currentWindowSize = 'small';
        addResetContent.style.transform = 'translateY(100%)'; 
    }
    else if(window.innerWidth >= 768 && currentWindowSize != 'medium') {
        currentWindowSize = 'medium';
        addResetContent.style.transform = 'translateY(0%)';
    };
});

//---------UI interaction---------------------

//show add reset
showAddReset.addEventListener('click', () => {
    toggleAddReset();
    addResetContent.style.transform = 'translateY(0%)';
    addReset.style.backgroundColor = '#00000055';
});

//close add reset
addReset.addEventListener('click', e => {
    if(e.target === e.currentTarget) {
        toggleAddReset();
        if(window.innerWidth < 768){
            addResetContent.style.transform = 'translateY(100%)';
            addReset.style.backgroundColor = '#00000000';
        }
    };
});
addMenuDown.addEventListener('click', () => {
    toggleAddReset();
    if(window.innerWidth < 768){
        addResetContent.style.transform = 'translateY(100%)';
        addReset.style.backgroundColor = '#00000000';
    }
});

//show reset pop up
resetSavingBtn.addEventListener('click', () => {
    togglePopup();
    popup.style.opacity = '1';
}); 

//---------cancel and close reset pop up-------
popup.addEventListener('click', e => {
    if(e.target === e.currentTarget) togglePopup();
});
cancelReset.addEventListener('click', () => {
    togglePopup();
});

//close empty popup
emptyPopup.addEventListener('click', () => {
    toggleEmptyPopup();
});

//close money lest popup
moneyLestPopup.addEventListener('click', () => {
    toggleMoneyLestPopup();
});