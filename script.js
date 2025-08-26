// 🚀 Multi-Tool Calculator & Clock
// 🌟 Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    let display = document.getElementById('answer');
    showView('calculator');
    setInterval(updateClock, 1000);
    setupCalculator(display);
});
// 🧭 Switch between calculator and clock views
function showView(view) {
    // 🔍 Get the calculator and clock elements
    const calculator = document.getElementById('calculator-view');
    const clock = document.getElementById('clock-view');
    // 📱 Show calculator or clock based on what was clicked
    if (view === 'calculator') {
        calculator.style.display = 'block';
        clock.style.display = 'none';
    } else if (view === 'clock') {
        calculator.style.display = 'none';
        clock.style.display = 'block';
    }
    // 🎯 Update navigation buttons to show which one is active
    const buttons = document.querySelectorAll('.nav-btn');
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute('data-view') === view) {
            buttons[i].classList.add('active');
        } else {
            buttons[i].classList.remove('active');
        }
    }
}
// 🕐 Update clock every second
function updateClock() {
    // ⏰ Get current date and time
    const now = new Date();
    // 🔢 Update time parts (hours, minutes, seconds)
    const timeParts = document.querySelectorAll('.time-part');
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    // 🔄 Convert to 12-hour format
    if (hours >= 12) {
        hours = hours - 12;
    }
    if (hours === 0) {
        hours = 12;
    }
    // 📺 Update the time display
    timeParts[0].textContent = hours.toString().padStart(2, '0');
    timeParts[1].textContent = minutes.toString().padStart(2, '0');
    timeParts[2].textContent = seconds.toString().padStart(2, '0');
    // 🌅 Update AM/PM
    if (now.getHours() >= 12) {
        document.querySelector('.ampm').textContent = 'PM';
    } else {
        document.querySelector('.ampm').textContent = 'AM';
    }
    // 📅 Update the date display
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('en-US', options);
    document.getElementById('date-display').textContent = dateString;
}
// 🧮 Set up calculator button listeners
function setupCalculator(display) {
    const buttons = document.querySelectorAll('.calc-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const text = button.textContent;
            
            if (text === '=') {
                doAnser(display);
            } else if (text === 'CE') {
                clre(display);
            } else if (text === '⌫') {
                delte(display);
            } else if (text === '√') {
                getsquare(display);
            } else if (text === '∛') {
                getsquare3(display);
            } else if (text === '÷' || text === '×' || text === '−' || text === '+') {
                WriteNumbers(display, text);
            } else if (text === '.') {
                WriteNumbers(display, '.');
            } else if (text === '(' || text === ')') {
                WriteNumbers(display, text);
            } else {
                WriteNumbers(display, text);
            }
        });
    });
}
// 🔢 Calculator functions
function WriteNumbers(display, val) {
    display.value = display.value === '0' && val !== '.' ? val : display.value + val;
    showLiveResult(display); 
}
function clre(display) { 
    display.value = '0'; 
    const resultDisplay = document.getElementById('result-display');
    resultDisplay.textContent = '';
    resultDisplay.classList.remove('show');
}
function delte(display) {
    const inptArry = display.value;
    let rslt = "";
    for (let i = 0; i < inptArry.length - 1; i++) rslt += inptArry[i];
    display.value = rslt || '0';
    showLiveResult(display); 
}
// 🔍 Root calculation helper function
function calculateRoot(num, isCube = false) {
    if (num === 1) return 1;
    let found = false;
    if (num % 2 === 0) {
        for (let i = 2; i <= num / 2; i++) {
            if (i % 2 === 0) {
                const rslt = isCube ? i * i * i : i * i;
                if (rslt === num) { found = true; return i; }
            }
        }
    } else {
        for (let i = 3; i <= num / 3; i++) {
            if (i % 2 !== 0) {
                const rslt = isCube ? i * i * i : i * i;
                if (rslt === num) { found = true; return i; }
            }
        }
    }
    return found ? num : 'Error, can\'t do complex calculations';
}
function getsquare(display) {
    display.value = '√';
}
function getsquare3(display) {
    display.value = '∛';
}
// 🎯 Super simple live preview
function showLiveResult(display) {
    const resultDisplay = document.getElementById('result-display');
    try {
        let expr = display.value;
        if (expr.includes('√')) {
            const number = expr.replace('√', '');
            if (number && !isNaN(number)) {
                const num = parseFloat(number);
                const result = calculateRoot(num, false);
                if (result !== 'Error, can\'t do complex calculations') {
                    resultDisplay.textContent = `= ${result}`;
                    resultDisplay.classList.add('show');
                    return;
                }
            }
        }
        if (expr.includes('∛')) {
            const number = expr.replace('∛', '');
            if (number && !isNaN(number)) {
                const num = parseFloat(number);
                const result = calculateRoot(num, true);
                if (result !== 'Error, can\'t do complex calculations') {
                    resultDisplay.textContent = `= ${result}`;
                    resultDisplay.classList.add('show');
                    return;
                }
            }
        }
        expr = expr.replace(/×/g, '*');
        expr = expr.replace(/÷/g, '/');
        expr = expr.replace(/−/g, '-');
        const result = eval(expr);
        if (isFinite(result)) {
            resultDisplay.textContent = `= ${result}`;
            resultDisplay.classList.add('show');
        } else {
            resultDisplay.textContent = '';
            resultDisplay.classList.remove('show');
        }
    } catch { 
        resultDisplay.textContent = '';
        resultDisplay.classList.remove('show');
    }
}
// 🧮 Calculate final answer
function doAnser(display) {
    const resultDisplay = document.getElementById('result-display');
    try {
        let expr = display.value;
        // 🔍 Handle square root
        if (expr.includes('√')) {
            const number = expr.replace('√', '');
            if (number && !isNaN(number)) {
                const num = parseFloat(number);
                display.value = calculateRoot(num, false);
                document.getElementById('result-display').textContent = '';
                return;
            }
        }
        // 🔍 Handle cube root
        if (expr.includes('∛')) {
            const number = expr.replace('∛', '');
            if (number && !isNaN(number)) {
                const num = parseFloat(number);
                display.value = calculateRoot(num, true);
                document.getElementById('result-display').textContent = '';
                return;
            }
        }
        // 🧮 Regular calculation
        expr = expr.replace(/×/g, '*');
        expr = expr.replace(/÷/g, '/');
        expr = expr.replace(/−/g, '-');
        const result = eval(expr);
        display.value = isFinite(result) ? result : 'Error';
        document.getElementById('result-display').textContent = '';
    } catch { 
        display.value = 'Error'; 
    }
}