class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case 'xʸ':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    percent() {
        this.currentOperand = parseFloat(this.currentOperand) / 100;
    }

    sqrt() {
        this.currentOperand = Math.sqrt(parseFloat(this.currentOperand));
    }

    square() {
        this.currentOperand = Math.pow(parseFloat(this.currentOperand), 2);
    }

    sin() {
        this.currentOperand = Math.sin(parseFloat(this.currentOperand) * (Math.PI / 180));
    }

    cos() {
        this.currentOperand = Math.cos(parseFloat(this.currentOperand) * (Math.PI / 180));
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-action="calculate"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const clearButton = document.querySelector('[data-action="clear"]');
const percentButton = document.querySelector('[data-action="percent"]');
const sqrtButton = document.querySelector('[data-action="sqrt"]');
const squareButton = document.querySelector('[data-action="square"]');
const powerButton = document.querySelector('[data-action="power"]');
const sinButton = document.querySelector('[data-action="sin"]');
const cosButton = document.querySelector('[data-action="cos"]');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

percentButton.addEventListener('click', () => {
    calculator.percent();
    calculator.updateDisplay();
});

sqrtButton.addEventListener('click', () => {
    calculator.sqrt();
    calculator.updateDisplay();
});

squareButton.addEventListener('click', () => {
    calculator.square();
    calculator.updateDisplay();
});

powerButton.addEventListener('click', () => {
    calculator.chooseOperation('xʸ');
    calculator.updateDisplay();
});

sinButton.addEventListener('click', () => {
    calculator.sin();
    calculator.updateDisplay();
});

cosButton.addEventListener('click', () => {
    calculator.cos();
    calculator.updateDisplay();
});

document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        calculator.appendNumber(event.key);
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        calculator.chooseOperation(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculator.compute();
    } else if (event.key === 'Backspace') {
        calculator.delete();
    } else if (event.key === 'Escape') {
        calculator.clear();
    } else if (event.key === '%') {
        calculator.percent();
    }
    calculator.updateDisplay();
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});
