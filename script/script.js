"use strict";
//---------------------variables----------------
let moneyLeft = 0;
let lastSpents = [];
let last3daysSpents = [0, 0, 0];
let monthSpent = 0;
let previousMoneyLeft;
//---------------------DOM selections----------------
const mainText = document.querySelector('#main-text');
const form = document.querySelector('#today-spent-form');
const todaySpentInput = document.querySelector('#today-spent-input');
const lastSpentList = document.querySelector('#today-spents');
const last3daysSpentList = document.querySelector('#three-days-spents');
const thisMonthSpent = document.querySelector('#this-month-spent');
const showAddReset = document.querySelector('#show-add');
const addReset = document.querySelector('#add-reset');
const addResetContent = document.querySelector('#add-reset-content');
const incomeForm = document.querySelector('#income-form');
const incomeInput = document.querySelector('#income-input');
const addMenuDown = document.querySelector('#add-menu-down');
const popup = document.querySelector('#confirm-popup');
const cancelReset = document.querySelector('#cancel-reset');
const resetBtn = document.querySelector('.danger2');
const resetSavingBtn = document.querySelector('#reset-saving');
const emptyPopup = document.querySelector('#empty-popup');
const moneyLestPopup = document.querySelector('#money-lest-popup');
const click = new Audio('../sfx/click.wav');
const clickDown = new Audio('../sfx/clickDown.wav');
const warning = new Audio('../sfx/warning.wav');
const counterUp = new Audio('../sfx/counterup.wav');
const counterDown = new Audio('../sfx/counterdown.wav');
//---------------------------------------------
//---------------------------------------------
// -------------------functions---------------------
const toggleAddReset = () => {
    addReset.classList.toggle("-z-10");
    addReset.classList.toggle("z-10");
};
const togglePopup = () => {
    popup.classList.toggle("hidden");
    popup.classList.toggle("flex");
};
const toggleEmptyPopup = () => {
    emptyPopup.classList.toggle("hidden");
    emptyPopup.classList.toggle("flex");
};
const toggleMoneyLestPopup = () => {
    moneyLestPopup.classList.toggle("hidden");
    moneyLestPopup.classList.toggle("flex");
};
const addPeriod = (x) => {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join("");
};
//-----------------money counter animation--------------------
//counter animation function copied from Md. Taifuzzaman Bilash on codepen.io --with little modification
const counterAnim = (start, end) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp)
            startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / 1000, 1);
        mainText.innerText = addPeriod(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};
const addNewSpent = (spents) => {
    const newspentlist = spents.map(spent => {
        return `<li class="border border-white border-opacity-25 border-l-0 border-t-0 border-r-0 pl-1 text-glow">${addPeriod(spent)}</li>`;
    });
    lastSpentList.innerHTML = newspentlist.join('');
};
const addthreeSpent = (spents) => {
    const newspentlist = spents.map(spent => {
        return `<li class="border border-white border-opacity-25 border-l-0 border-t-0 border-r-0 pl-1 text-glow">${addPeriod(spent)}</li>`;
    });
    last3daysSpentList.innerHTML = newspentlist.join('');
};
const addMonthSpent = (spent) => {
    thisMonthSpent.innerHTML = `<li class="border border-white border-opacity-25 border-l-0 border-t-0 border-r-0 pl-1 text-glow">${addPeriod(spent)}</li>`;
};
//--------------------------------------------------
//--------------------------------------------------
//--------------check last spent local storage and add to UI-----------------
if (localStorage.getItem('last-spents') !== null) {
    const lastSpentsFromLocal = JSON.parse(localStorage.getItem('last-spents'));
    lastSpents.push(...lastSpentsFromLocal);
    addNewSpent(lastSpentsFromLocal);
}
//--------------check last 3 days spent local storage and add to UI------------------
if (localStorage.getItem('last-3days-spent') !== null) {
    const last3daysSpentsFromLocal = JSON.parse(localStorage.getItem('last-3days-spent'));
    last3daysSpents[0] = last3daysSpentsFromLocal[0];
    last3daysSpents[1] = last3daysSpentsFromLocal[1];
    last3daysSpents[2] = last3daysSpentsFromLocal[2];
    addthreeSpent(last3daysSpents);
}
//---------check money left local storage and add to UI
if (localStorage.getItem('money-left') !== null) {
    mainText.innerText = addPeriod(parseInt(localStorage.getItem('money-left')));
    moneyLeft = parseInt(localStorage.getItem('money-left'));
}
//-----------------check today date-----------------
const today = new Date();
if (localStorage.getItem('current-date') !== null) {
    if (`${today.getDate()}-${today.getMonth()}` !== localStorage.getItem('current-date')) {
        if (`${today.getMonth()}` !== localStorage.getItem('this-month')) {
            localStorage.setItem('date-now', `${today.getDate()}`);
            if (lastSpents.length) {
                last3daysSpents[2] = last3daysSpents[1];
                last3daysSpents[1] = last3daysSpents[0];
                last3daysSpents[0] = lastSpents.reduce((total, eachSpent) => total + eachSpent);
                addthreeSpent(last3daysSpents);
                lastSpentList.innerHTML = '';
            }
        }
        if (`${today.getDate()}` !== localStorage.getItem('date-now')) {
            //change last 3 days spents
            last3daysSpents[2] = last3daysSpents[1];
            last3daysSpents[1] = last3daysSpents[0];
            last3daysSpents[0] = lastSpents.length ? lastSpents.reduce((total, eachSpent) => total + eachSpent) : 0;
            addthreeSpent(last3daysSpents);
            lastSpentList.innerHTML = '';
        }
        //change current date localstorage
        localStorage.setItem('current-date', `${today.getDate()}-${today.getMonth()}`);
        localStorage.setItem('date-now', `${today.getDate()}`);
        //change last 3 days localstorage
        localStorage.setItem('last-3days-spent', JSON.stringify(last3daysSpents));
        //delete yesterday lastSpents
        lastSpents = [];
        localStorage.removeItem('last-spents');
    }
}
else {
    localStorage.setItem('current-date', `${today.getDate()}-${today.getMonth()}`);
    localStorage.setItem('date-now', `${today.getDate()}`);
}
if (localStorage.getItem('this-month') !== null) {
    if (`${today.getMonth()}` !== localStorage.getItem('this-month')) {
        monthSpent = 0;
        thisMonthSpent.innerHTML = '';
        localStorage.setItem('this-month', `${today.getMonth()}`);
        localStorage.removeItem('month-spents');
    }
    else if (localStorage.getItem('month-spents') !== null) {
        monthSpent = parseInt(localStorage.getItem('month-spents'));
        addMonthSpent(monthSpent);
    }
}
else {
    localStorage.setItem('this-month', `${today.getMonth()}`);
}
//-----------------------------------------------------
//-----------------------------------------------------
todaySpentInput.addEventListener('click', () => {
    const tap = new Audio('../sfx/key.wav');
    tap.play();
});
todaySpentInput.addEventListener('input', () => {
    const tap = new Audio('../sfx/key.wav');
    tap.play();
});
//form to input new spent
form.addEventListener('submit', e => {
    e.preventDefault();
    if (todaySpentInput.value) {
        if ((moneyLeft - parseInt(todaySpentInput.value)) > 0) {
            previousMoneyLeft = moneyLeft;
            moneyLeft -= parseInt(todaySpentInput.value);
            localStorage.setItem('money-left', moneyLeft.toString());
            counterDown.play();
            counterAnim(previousMoneyLeft, moneyLeft);
            monthSpent += parseInt(todaySpentInput.value);
            localStorage.setItem('month-spents', monthSpent.toString());
            addMonthSpent(monthSpent);
            lastSpents.push(parseInt(todaySpentInput.value));
            localStorage.setItem('last-spents', JSON.stringify(lastSpents));
            addNewSpent(lastSpents);
            todaySpentInput.value = '';
            todaySpentInput.blur();
        }
        else if (todaySpentInput.value === '8000000000') {
            document.querySelector('#m').classList.toggle('hidden');
            setTimeout(() => {
                document.querySelector('#m').classList.toggle('hidden');
                todaySpentInput.value = '';
                todaySpentInput.blur();
            }, 1000);
        }
        else {
            warning.play();
            toggleMoneyLestPopup();
        }
    }
    else {
        warning.play();
        toggleEmptyPopup();
    }
    ;
});
//form to add new income
incomeForm.addEventListener('submit', e => {
    e.preventDefault();
    if (incomeInput.value) {
        previousMoneyLeft = moneyLeft;
        moneyLeft += parseInt(incomeInput.value);
        localStorage.setItem('money-left', moneyLeft.toString());
        counterUp.play();
        counterAnim(previousMoneyLeft, moneyLeft);
        toggleAddReset();
        if (window.innerWidth < 768) {
            addResetContent.style.transform = 'translateY(100%)';
            addReset.style.backgroundColor = '#00000000';
        }
        incomeInput.value = '';
        incomeInput.blur();
    }
    else {
        warning.play();
        toggleEmptyPopup();
    }
    ;
});
incomeInput.addEventListener('click', () => {
    const tap = new Audio('../sfx/key.wav');
    tap.play();
});
incomeInput.addEventListener('input', () => {
    const tap = new Audio('../sfx/key.wav');
    tap.play();
});
//bottom to reset saving and close reset pop up
resetBtn.addEventListener('click', () => {
    toggleAddReset();
    if (window.innerWidth < 768) {
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
let currentWindowSize;
if (window.innerWidth < 768)
    currentWindowSize = 'small';
else if (window.innerWidth >= 768)
    currentWindowSize = 'medium';
window.addEventListener('resize', () => {
    if (window.innerWidth < 768 && currentWindowSize != 'small') {
        currentWindowSize = 'small';
        addResetContent.style.transform = 'translateY(100%)';
    }
    else if (window.innerWidth >= 768 && currentWindowSize != 'medium') {
        currentWindowSize = 'medium';
        addResetContent.style.transform = 'translateY(0%)';
    }
    ;
});
//---------UI interaction---------------------
//show add reset
showAddReset.addEventListener('click', () => {
    click.play();
    toggleAddReset();
    addResetContent.style.transform = 'translateY(0%)';
    addReset.style.backgroundColor = '#00000055';
});
//close add reset
addReset.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
        clickDown.play();
        toggleAddReset();
        if (window.innerWidth < 768) {
            addResetContent.style.transform = 'translateY(100%)';
            addReset.style.backgroundColor = '#00000000';
        }
    }
    ;
});
addMenuDown.addEventListener('click', () => {
    clickDown.play();
    toggleAddReset();
    if (window.innerWidth < 768) {
        addResetContent.style.transform = 'translateY(100%)';
        addReset.style.backgroundColor = '#00000000';
    }
});
//show reset pop up
resetSavingBtn.addEventListener('click', () => {
    warning.play();
    togglePopup();
    popup.style.opacity = '1';
});
//---------cancel and close reset pop up-------
popup.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
        togglePopup();
    }
    ;
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
