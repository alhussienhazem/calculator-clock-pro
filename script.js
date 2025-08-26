// 🎯 Calculator state variables
let displayValue = '0';
let isError = false;

// 🚀 Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupNavbar();
    setupClock();
    
    // 📱 Show calculator by default
    const calculator = document.getElementById('calculator-view');
    const clock = document.getElementById('clock-view');
    
    if (calculator) calculator.style.display = 'block';
    if (clock) clock.style.display = 'none';
    
    // ✨ Add loaded class for animations
    if (calculator) calculator.classList.add('loaded');
});

// 🧭 Navigation system
function setupNavbar() {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            showView(view);
            
            // 🔄 Update active button
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showView(viewName) {
    const calculator = document.getElementById('calculator-view');
    const clock = document.getElementById('clock-view');
    
    if (viewName === 'calculator') {
        if (calculator) calculator.style.display = 'block';
        if (clock) clock.style.display = 'none';
        if (calculator) calculator.classList.add('loaded');
    } else if (viewName === 'clock') {
        if (calculator) calculator.style.display = 'none';
        if (clock) clock.style.display = 'block';
        if (clock) clock.classList.add('loaded');
    }
}

// 🕐 Digital clock system
function setupClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    
    // ⏰ Get time components
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // 🔄 Convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    // 📝 Format time with leading zeros
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    // 🎯 Update time display with individual parts
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        const timeParts = timeDisplay.querySelectorAll('.time-part');
        const ampmElement = timeDisplay.querySelector('.ampm');
        
        if (timeParts.length >= 3) {
            timeParts[0].textContent = formattedHours;
            timeParts[1].textContent = formattedMinutes;
            timeParts[2].textContent = formattedSeconds;
        }
        
        if (ampmElement) {
            ampmElement.textContent = ampm;
        }
    }
    
    // 📅 Update date display
    const dateDisplay = document.getElementById('date-display');
    if (dateDisplay) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const formattedDate = now.toLocaleDateString('en-US', options);
        dateDisplay.textContent = formattedDate;
    }
}

// 🧮 Calculator functions
function WriteNumbers(num) {
    if (isError) {
        clearError();
    }
    
    const display = document.getElementById('answer');
    
    if (display.value === '0' && num !== '.') {
        display.value = num;
    } else {
        display.value += num;
    }
    
    updateLiveResult();
}

function clre() {
    if (isError) {
        clearError();
    }
    
    const display = document.getElementById('answer');
    display.value = '0';
    updateLiveResult();
}

function doAnser() {
    if (isError) {
        clearError();
        return;
    }
    
    const display = document.getElementById('answer');
    let expression = display.value;
    
    // 🔍 Check for empty expression
    if (!expression || expression === '0' || expression === '()') {
        display.value = '0';
        return;
    }
    
    try {
        // 🔄 Replace symbols for eval
        let jsExpression = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
        
        let result;
        
        // 📐 Handle square root
        if (jsExpression.includes('√')) {
            let innerExpression = jsExpression.replace('√', '');
            if (innerExpression) {
                let evaluated = eval(innerExpression);
                if (!isNaN(evaluated)) {
                    result = Math.sqrt(evaluated);
                }
            }
        }
        // 📏 Handle cube root
        else if (jsExpression.includes('∛')) {
            let innerExpression = jsExpression.replace('∛', '');
            if (innerExpression) {
                let evaluated = eval(innerExpression);
                if (!isNaN(evaluated)) {
                    result = Math.cbrt(evaluated);
                }
            }
        }
        // ⚡ Handle power
        else if (jsExpression.includes('^')) {
            let parts = jsExpression.split('^');
            if (parts.length === 2) {
                let base = parseFloat(parts[0]);
                let exponent = parseFloat(parts[1]);
                if (!isNaN(base) && !isNaN(exponent)) {
                    result = Math.pow(base, exponent);
                }
            }
        }
        // 🧮 Regular calculation
        else {
            result = eval(jsExpression);
        }
        
        // 📊 Display result
        if (result !== undefined && !isNaN(result)) {
            if (result === Infinity || result === -Infinity) {
                display.value = 'Infinity';
            } else {
                display.value = result;
            }
        } else {
            display.value = 'Error';
            isError = true;
        }
        
        updateLiveResult();
        
    } catch (e) {
        display.value = 'Error';
        isError = true;
        updateLiveResult();
    }
}

function getsquare() {
    if (isError) {
        clearError();
    }
    
    const display = document.getElementById('answer');
    
    if (!display.value.includes('√')) {
        display.value += '√';
    } else {
        display.value = display.value.replace('√', '');
    }
    
    updateLiveResult();
}

function getsquare3() {
    if (isError) {
        clearError();
    }
    
    const display = document.getElementById('answer');
    
    if (!display.value.includes('∛')) {
        display.value += '∛';
    } else {
        display.value = display.value.replace('∛', '');
    }
    
    updateLiveResult();
}

function delte() {
    if (isError) {
        clearError();
        return;
    }
    
    const display = document.getElementById('answer');
    let currentValue = display.value;
    
    if (currentValue.length === 1) {
        display.value = '0';
    } else {
        display.value = currentValue.slice(0, -1);
    }
    
    updateLiveResult();
}

function powr() {
    if (isError) {
        clearError();
    }
    
    const display = document.getElementById('answer');
    display.value += '^';
    updateLiveResult();
}

// 📊 Live result display system
function updateLiveResult() {
    const display = document.getElementById('answer');
    const resultDisplay = document.getElementById('result-display');
    let expression = display.value;
    
    // 🚫 Don't show result for simple numbers
    if (expression === '' || expression === '0' || !/[+\-×÷^√∛()]/.test(expression)) {
        resultDisplay.textContent = '';
        resultDisplay.classList.remove('show');
        return;
    }
    
    try {
        // 🔄 Convert symbols for evaluation
        let jsExpression = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
        
        let result;
        
        // 🎯 Handle special functions
        if (jsExpression.includes('√')) {
            let innerExpression = jsExpression.replace('√', '');
            if (innerExpression) {
                let evaluated = eval(innerExpression);
                if (!isNaN(evaluated)) {
                    result = Math.sqrt(evaluated);
                }
            }
        } else if (jsExpression.includes('∛')) {
            let innerExpression = jsExpression.replace('∛', '');
            if (innerExpression) {
                let evaluated = eval(innerExpression);
                if (!isNaN(evaluated)) {
                    result = Math.cbrt(evaluated);
                }
            }
        } else if (jsExpression.includes('^')) {
            let parts = jsExpression.split('^');
            if (parts.length === 2) {
                let base = parseFloat(parts[0]);
                let exponent = parseFloat(parts[1]);
                if (!isNaN(base) && !isNaN(exponent)) {
                    result = Math.pow(base, exponent);
                }
            }
        } else {
            result = eval(jsExpression);
        }
        
        // 🎉 Show result
        if (result !== undefined && !isNaN(result)) {
            if (result === Infinity || result === -Infinity) {
                resultDisplay.textContent = 'Infinity';
            } else {
                resultDisplay.textContent = result;
            }
            resultDisplay.classList.add('show');
        } else {
            resultDisplay.textContent = '';
            resultDisplay.classList.remove('show');
        }
        
    } catch (e) {
        resultDisplay.textContent = '';
        resultDisplay.classList.remove('show');
    }
}

// 🚨 Error handling system
function clearError() {
    isError = false;
    const display = document.getElementById('answer');
    display.value = '0';
    updateLiveResult();
}