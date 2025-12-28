const display = document.querySelector('.js-result-equation-display');

let equation = '';

function handleNumber(value) {
  if (value === '0' || value === '00') {
    const lastChar = equation.at(-1);
    const lastNumber = equation.split(/[\+\-\*\/]/).pop();

    if (equation === '' || '+-/*'.includes(lastChar)) {
    equation += '0';
    return;
    }

    if (Number(lastNumber) === 0 && !(lastNumber.includes('.'))) {
      return;
    }
  }

  equation += value;
}

function handleDecimal() {
  if (equation === '') {
    equation = '0.'
    return
  }
  
  const lastChar = equation.at(-1);
  if ('+-/*'.includes(lastChar)) {
    equation += '0.'
    return;
  }
    
  const lastNumber = equation.split(/[\+\-\*\/]/).pop();
  if (lastNumber.includes('.')) {
    return;
  }
  equation += '.'
}

function handleOperator(value) {
  const lastChar = equation.at(-1)

  if (equation === '' && (value === '+' || value === '-')) {
    equation += value;
    return;
  }

  if ('/*'.includes(lastChar) && (value === '+' || value === '-')) {
    equation += value
    return;
  }

  if ('+-/*.'.includes(lastChar)) {
    return;
  }

  if (equation === '') return
  equation += value
}

function handleCommand(value) {
  switch (value) {
    case 'clear':
      equation = '';
      display.innerHTML = '';
      break;
    case 'delete':
      equation = equation.slice(0, -1)
      display.innerHTML = equation;
      if (!equation.length) display.innerHTML = '';
      break;
    case 'solve':
      evaluateResult();
      break;
  }
}

function evaluateResult() {
  const lastChar = equation.at(-1);
  const secondLastChar = equation.at(-2);

  if ('+-/*.'.includes(lastChar)) {
    equation = equation.slice(0, -1);
    if ('+-/*.'.includes(secondLastChar)) {
      equation = equation.slice(0, -1);
    }
  }
  
  if (equation) {
    equation = Number(eval(equation).toFixed(5)) ;
    display.innerHTML = equation;
    equation = '';
  }
}

const inputButtons = document.querySelectorAll('.input-button');

inputButtons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    const type = button.dataset.type;

    switch(type) {
      case 'number':
        handleNumber(value);
        display.innerHTML = equation;
        break;
      case 'decimal':
        handleDecimal();
        display.innerHTML = equation;
        break;
      case 'operator':
        handleOperator(value);
        display.innerHTML = equation;
        break;
      case 'command':
        handleCommand(value);
        break;
    }
  });
});