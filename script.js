// 🎨 Styling the body
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
document.body.style.backgroundColor = '#1a1d23';
document.body.style.minHeight = '100vh';
document.body.style.boxSizing = 'border-box';
document.body.style.overflowX = 'hidden';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';

// 🏗️ Building the calculator structure
let calculator = document.createElement('div');
let calculatorName = document.createElement('div');
let display = document.createElement('input');
let buttonsContainer = document.createElement('div');
let copyright = document.createElement('div');

// 🔗 Connecting calculator elements
calculator.appendChild(calculatorName);
calculator.appendChild(display);
calculator.appendChild(buttonsContainer);
calculator.appendChild(copyright);

// 📍 Putting calculator on the page
document.body.appendChild(calculator);

// 🎨 Styling the calculator name
calculatorName.textContent = 'Dark Calculator Pro';
calculatorName.style.color = '#ffffff';
calculatorName.style.fontSize = '24px';
calculatorName.style.fontWeight = '700';
calculatorName.style.textAlign = 'center';
calculatorName.style.marginBottom = '20px';
calculatorName.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
calculatorName.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.5)';

// 🎨 Styling the calculator container
calculator.style.backgroundColor = '#282c34';
calculator.style.borderRadius = '15px';
calculator.style.padding = '25px';
calculator.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
calculator.style.border = '1px solid #3a3f4b';
calculator.style.minWidth = '320px';
calculator.style.position = 'relative';
calculator.style.overflow = 'hidden';

// 🎨 Styling the display
display.type = 'text';
display.id = 'answer';
display.readOnly = true;
display.style.backgroundColor = '#1a1d23';
display.style.borderRadius = '12px';
display.style.padding = '20px';
display.style.marginBottom = '25px';
display.style.border = '1px solid #3a3f4b';
display.style.minHeight = '50px';
display.style.width = '100%';
display.style.boxSizing = 'border-box';
display.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3)';
display.style.position = 'relative';
display.style.fontSize = '28px';
display.style.fontWeight = '600';
display.style.fontFamily = 'monospace';
display.style.color = '#ffffff';
display.style.textAlign = 'left';
display.value = '0';

// 🎨 Styling the buttons container
buttonsContainer.style.display = 'grid';
buttonsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
buttonsContainer.style.gap = '12px';
buttonsContainer.style.marginTop = '8px';

// 📝 Calculator button data
let buttonData = [
    { text: 'CE', type: 'clear' },
    { text: '⌫', type: 'backspace' },
    { text: '%', type: 'percent' },
    { text: '/', type: 'operator' },
    
    { text: '7', type: 'number' },
    { text: '8', type: 'number' },
    { text: '9', type: 'number' },
    { text: '*', type: 'operator' },
    
    { text: '4', type: 'number' },
    { text: '5', type: 'number' },
    { text: '6', type: 'number' },
    { text: '-', type: 'operator' },
    
    { text: '1', type: 'number' },
    { text: '2', type: 'number' },
    { text: '3', type: 'number' },
    { text: '+', type: 'operator' },
    
    { text: '0', type: 'number', colspan: 2 },
    { text: '.', type: 'decimal' },
    { text: '=', type: 'equals' },
    
    { text: '√', type: 'sqrt' },
    { text: '∛', type: 'cbrt' },
    { text: '(', type: 'bracket' },
    { text: ')', type: 'bracket' }
];

// 🎯 Calculator state variables
let IsPower = 0;
let Powr1 = 0;
let Powr2 = 0;

// 🃏 Creating calculator buttons function
function createButton(buttonInfo) {
    let button = document.createElement('button');
    let buttonText = document.createTextNode(buttonInfo.text);
    
    button.appendChild(buttonText);
    buttonsContainer.appendChild(button);
    
    // 🎨 Styling the button
if (buttonInfo.type === 'operator' || buttonInfo.type === 'equals' || buttonInfo.type === 'clear' || buttonInfo.type === 'sqrt' || buttonInfo.type === 'cbrt' || buttonInfo.type === 'power') {
    button.style.backgroundColor = '#2c3e50';
    button.style.border = '1px solid #34495e';
} else {
    button.style.backgroundColor = '#34495e';
    button.style.border = '1px solid #3a3f4b';
}

button.style.color = '#ffffff';
button.style.borderRadius = '12px';
button.style.padding = '16px 12px';
button.style.fontSize = '18px';
button.style.fontWeight = '600';
button.style.cursor = 'pointer';
button.style.transition = 'all 0.3s ease';
button.style.fontFamily = 'inherit';
button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
button.style.position = 'relative';
button.style.overflow = 'hidden';
button.style.minHeight = '45px';
button.style.display = 'flex';
button.style.alignItems = 'center';
button.style.justifyContent = 'center';

// 🔧 Setting grid column span for wide buttons
if (buttonInfo.colspan) {
    button.style.gridColumn = `span ${buttonInfo.colspan}`;
}
    
    // 🎭 Adding hover effects
    button.addEventListener('mouseenter', function() {
        if (buttonInfo.type === 'operator' || buttonInfo.type === 'equals' || buttonInfo.type === 'clear' || buttonInfo.type === 'sqrt' || buttonInfo.type === 'cbrt' || buttonInfo.type === 'power') {
            button.style.backgroundColor = '#34495e';
        } else {
            button.style.backgroundColor = '#3a3f4b';
        }
        button.style.transform = 'translateY(-2px) scale(1.05)';
        button.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
    });
    
    button.addEventListener('mouseleave', function() {
        if (buttonInfo.type === 'operator' || buttonInfo.type === 'equals' || buttonInfo.type === 'clear' || buttonInfo.type === 'sqrt' || buttonInfo.type === 'cbrt' || buttonInfo.type === 'power') {
            button.style.backgroundColor = '#2c3e50';
        } else {
            button.style.backgroundColor = '#34495e';
        }
        button.style.transform = 'translateY(0) scale(1)';
        button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });
    
    // 🎯 Adding click functionality
    button.addEventListener('click', function() {
        handleButtonClick(buttonInfo.type, buttonInfo.text);
    });
}

// 🔄 Creating all buttons
buttonData.forEach(createButton);

// 🧮 Calculator logic functions (using your simpler approach)
function handleButtonClick(type, value) {
    switch(type) {
        case 'number':
            WriteNumbers(value);
            break;
        case 'decimal':
            WriteNumbers(value);
            break;
        case 'operator':
            WriteNumbers(value);
            break;
        case 'equals':
            doAnser();
            break;
        case 'clear':
            clre();
            break;
        case 'bracket':
            WriteNumbers(value);
            break;
        case 'sqrt':
            getsquare();
            break;
        case 'cbrt':
            getsquare3();
            break;
        case 'backspace':
            delte();
            break;
        case 'power':
            powr();
            break;
        case 'percent':
            WriteNumbers('/100');
            break;
    }
}

function WriteNumbers(val) {
    if (display.value === '0' && val !== '.') {
        display.value = val;
    } else {
        display.value += val;
    }
}

function clre() {
    display.value = '0';
}

function doAnser() {
    if (IsPower == 1) {
        var vararr = display.value.split("^");
        Powr1 = vararr[0];
        Powr2 = vararr[1];
        var PowrRslt = 1;
        for (var i = 1; i <= Powr2; i++) {
            PowrRslt *= Powr1;
        }
        display.value = PowrRslt;
    } else if (display.value.includes('√')) {
        // Handle square root calculation with complex expressions
        var expression = display.value.replace('√', '');
        if (expression) {
            try {
                // First evaluate the expression inside the square root
                var evaluatedExpression = eval(expression);
                if (!isNaN(evaluatedExpression)) {
                    var result = Math.sqrt(evaluatedExpression);
                    display.value = result;
                }
            } catch (e) {
                // If evaluation fails, keep the original
                display.value = display.value;
            }
        }
    } else if (display.value.includes('∛')) {
        // Handle cube root calculation with complex expressions
        var expression = display.value.replace('∛', '');
        if (expression) {
            try {
                // First evaluate the expression inside the cube root
                var evaluatedExpression = eval(expression);
                if (!isNaN(evaluatedExpression)) {
                    var result = Math.cbrt(evaluatedExpression);
                    display.value = result;
                }
            } catch (e) {
                // If evaluation fails, keep the original
                display.value = display.value;
            }
        }
    } else {
        var anser = display.value;
        try {
            // Check if the expression is just empty brackets or invalid
            if (anser === '()' || anser === '' || anser === '0') {
                display.value = '0';
            } else {
                var result = eval(anser);
                if (isNaN(result) || !isFinite(result)) {
                    display.value = 'Error';
                } else {
                    display.value = result;
                }
            }
        } catch (e) {
            display.value = 'Error';
        }
    }
    IsPower = 0;
}

function getsquare() {
    // Check if display already has √ symbol
    if (display.value.includes('√')) {
        // Extract the number after √ and calculate
        var number = display.value.replace('√', '');
        if (number && !isNaN(number)) {
            var result = Math.sqrt(parseFloat(number));
            display.value = result;
        }
    } else {
        // Add √ symbol to display
        display.value = '√';
    }
}

function getsquare3() {
    // Check if display already has ∛ symbol
    if (display.value.includes('∛')) {
        // Extract the number after ∛ and calculate
        var number = display.value.replace('∛', '');
        if (number && !isNaN(number)) {
            var result = Math.cbrt(parseFloat(number));
            display.value = result;
        }
    } else {
        // Add ∛ symbol to display
        display.value = '∛';
    }
}

function delte() {
    var inptArry = display.value;
    var rslt = "";
    for (var i = 0; i < inptArry.length - 1; i++) {
        rslt += inptArry[i];
    }
    display.value = rslt;
}

function powr() {
    IsPower = 1;
    display.value += "^";
}

// 🎨 Styling the copyright
copyright.textContent = '© 2025 All Rights Reserved - Alhussien Hazem';
copyright.style.color = '#95a5a6';
copyright.style.fontSize = '12px';
copyright.style.textAlign = 'center';
copyright.style.marginTop = '20px';
copyright.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
copyright.style.opacity = '0.8';
copyright.style.fontWeight = '400';

// ✨ Adding a subtle animation on page load
window.addEventListener('load', function() {
    calculator.style.opacity = '0';
    calculator.style.transform = 'translateY(20px) scale(0.95)';
    calculator.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        calculator.style.opacity = '1';
        calculator.style.transform = 'translateY(0) scale(1)';
    }, 100);
});