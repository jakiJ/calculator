//find all button

let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.operation');
let back = document.getElementById('back');
let ce = document.getElementById('ce');
let display = document.getElementById('display');
let dot = document.querySelector('.dot');
let negative = document.querySelector('.negative');
let sqrt = document.querySelector('.sqrt');

let memoryNumber = 0;
let newNumber = false;
let memoryOperation = '';

//clean

back.onclick = function () {
    display.value = display.value.substring(0, display.value.length -1);
}

ce.onclick = function () {
    display.value = "";
    memoryNumber = 0;
}

//number

const pushNumber = (num) => {
    if (newNumber) {
        display.value = num;
        newNumber = false;
    } else {
        display.value += num;
    }
}


for (let number of numbers) {
    number.onclick = function () {
        pushNumber(number.textContent)
    };
}


//dots

dot.onclick = function () {
    let localMemory = display.value;

    if (newNumber) {
        localMemory = '0.'
        newNumber = false;
    } else {
        if (localMemory.indexOf('.') === -1) {
            localMemory += '.';
        }
        display.value = localMemory;
    }
}

//sqrt

// sqrt.onclick = function () {
//     console.log('click')
//     let localMemory = display.value;
//     memoryNumber += Math.sqrt(+localMemory);
//     display.value = memoryNumber;
// }

//operation


const pushOperation = (opr) => {
    let localMemory = display.value;


    if (newNumber && memoryOperation !== '=' ) {
        display.value = memoryNumber;
    } else {
        newNumber = true;
        if (memoryOperation === '+') {
            memoryNumber += +localMemory;
        } else if (memoryOperation === '-') {
            memoryNumber -= +localMemory;
        } else if (memoryOperation === '*') {
            memoryNumber *= +localMemory;
        } else if (memoryOperation === '/') {
            memoryNumber /= +localMemory;
        } else if (memoryOperation === '%') {
            memoryNumber = (+localMemory * memoryNumber) / 100;
        } else if (memoryOperation == '√') {
            memoryNumber += Math.sqrt(+localMemory);
        } else {
            memoryNumber = +localMemory;
        }
    }

         //round

    if (memoryNumber !== Math.floor(memoryNumber)) {
        let str = String(memoryNumber);
        let index = str.split('').indexOf('.');
		let round = 1;

		while(str[++index] == '0') {
			round++;
		}

        display.value = memoryNumber.toFixed(round);

    } else {
        display.value = memoryNumber;
    }
    memoryOperation = opr;
}

for (let operation of operations) {
    operation.onclick = function () {
        pushOperation(operation.textContent);

    }
}

//negative

negative.onclick = function () {
    let localMemory = display.value;

    if (display.value === '0' || newNumber) {
        localMemory = '-';
        newNumber = false;
    } else {
        localMemory = +display.value * (-1);
    }
    display.value = localMemory;
}


