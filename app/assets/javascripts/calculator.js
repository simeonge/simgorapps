//# Place all the behaviors and hooks related to the matching controller here.
//# All this logic will automatically be available in application.js.
//# You can use CoffeeScript in this file: http://coffeescript.org/

// Script implementing calculator functionalities

// Variables to hold buttons
var nums; // number buttons
var mems; // memory buttons
var input; // input box
var ops; // operators
var clrs; // clear buttons
var ent; // enter button
var dot; // point button

// Variables to implement functionality
var memory = 0; // current memory value
var oprnd1 = null, oprnd2 = null; // operands
var operator; // current operator
var result = 0; // result of operation
var inMode = true; // input in operand 1; false if in 2
var decimal = false; // true if dot button is pressed
// reset button when true allows calculation of expression on op button click (as opposed to enter)
// useful in a long expression (e.g. 5 * 3 + 4; 5*3 calculated when + button is pressed)
// when false, prevents multiple calculations of same expression
// i.e. prevents 5*3*3*3... when an op button is clicked more than once (e.g. - by mistake, then +)
var reset = true;

// Executes on page load
var ready = function() {
    // get buttons
    nums = document.getElementsByName("num"); // get num buttons
    mems = document.getElementsByName("mem"); // get memory buttons
    input = document.getElementById("in"); // get input box
    ops = document.getElementsByName("op"); // get op buttons
    clrs = document.getElementsByName("clr"); // get clear buttons
    ent = document.getElementById("ent"); // get enter button
    dot = document.getElementById("."); // get dot button

    addlis(nums); // add listeners
    updateIn(result); // initial update of input box
};

$(document).ready(ready); // for regular page load
$(document).on('page:load', ready); // for turbolink

// Add listeners
function addlis() {
    // add num listeners
    for (var i = 0; i < nums.length; i++) {
	nums[i].addEventListener("click", numhan, false);
    }

    // add mem listeners
    for (var i = 0; i < mems.length; i++) {
	mems[i].addEventListener("click", memhan, false);
    }

    // add ops listeners
    for (var i = 0; i < ops.length; i++) {
	ops[i].addEventListener("click", ophan, false);
    }

    // add clear btns listeners
    for (var i = 0; i < clrs.length; i++) {
	clrs[i].addEventListener("click", clrhan, false);
    }

    // add enter btn listener
    ent.addEventListener("click", enthan, false);

    // add dot listener
    dot.addEventListener("click", dothan, false);
};

// Handles number ntms click
function numhan() {
    var bt = document.getElementById(this.id); // get clicked button
    if (inMode) { // determine which operand to put input in
	if (String(oprnd1).length < 18) { // update only if there's space
	    // if op is null or 0, change it to the input, otherwise append
	    oprnd1 = oprnd1 == null || oprnd1 == "0" ? bt.innerHTML : oprnd1 + bt.innerHTML;
	}
	updateIn(oprnd1); // update input
    } else {
	if (String(oprnd2).length < 18) { // update only if there's space
	    oprnd2 = oprnd2 == null || oprnd2 == "0" ? bt.innerHTML : oprnd2 + bt.innerHTML;
	}
	updateIn(oprnd2); // update input
    }
    reset = true; // op button press after expression should perform calculation
};

// Handles memory btns click
function memhan() {
    var bt = document.getElementById(this.id); // get clicked button
    decimal = false;
    switch (bt.id) { // determine which button was pressed
    case "mc":
	memory = 0; // clear memory
	break;
    case "mr":
	updateIn(memory); // display memory
	if (inMode) { // put memory in op1 or 2
	    oprnd1 = memory;
	} else {
	    oprnd2 = memory;
	}
	break;
    case "ms":
	memory = input.value; // save input in memory
	break;
    case "m+":
	memory = +memory + +input.value; // add input to memory and put result in memory
	break;
    case "m-":
	memory -= input.value; // subtract input from memory and put result in memory
	break;
    }

    // indicate memory
    if (memory != 0) {
	document.getElementById("ind").style.backgroundColor = "green";
    } else {
	document.getElementById("ind").style.backgroundColor = "";
    }
};

// Handles clr btns click
function clrhan() {
    var bt = document.getElementById(this.id);
    if (bt.id == "ce") { // clear entry clears current entry in input box
	if (inMode) {
	    oprnd1 = 0;
	    updateIn(oprnd1); // update input box
	} else { // input in op2
	    oprnd2 = 0;
	    updateIn(oprnd2); // update input box
	}
    } else if (bt.id == "c") { // clear clears all entries for current op
	oprnd1 = null;
	oprnd2 = null;
	operator = undefined;
	inMode = true;
	result = 0;
	updateIn(result); // update input box
    }
    decimal = false;
    reset = true; // for calculation on op button click
};

// Handles dot btn click
function dothan() {
    var bt = document.getElementById(this.id); // get dot button
    // determine which op to update with decimal
    if (inMode && !decimal) { // allow only one decimal
	oprnd1 = oprnd1 == null || oprnd1 == 0 ? "0." : oprnd1 + ".";
	decimal = true;
	updateIn(oprnd1);
    } else if (!inMode && !decimal) { // allow only one decimal
	oprnd2 = oprnd2 == null || oprnd2 == 0 ? "0." : oprnd2 + ".";
	decimal = true;
	updateIn(oprnd2);
    }
    reset = true; // calculate on op button click
};

// Updates value displayed in input box
function updateIn(val) {
    input.value = String(val).length > 18 ? val.toExponential(10) : val;
};

// Handles op btns click
function ophan() {
    // perform operation inputted previously before enter; only once though
    if (reset) {
	if (inMode) { // do not calculate previous expr if this is the first op clicked
	    operator = undefined; // prevents calculation in operate function
	}
	enthan();
	reset = false; // prevent multiple calculations
    }
    operator = document.getElementById(this.id).innerHTML; // set operator to button clicked
    oprnd2 = null; // allow new input to go in op2
    inMode = false; // put input in operand 2
    decimal = false;
};

// Handles enter btn click
function enthan() {
    operate(); // performs operation and puts result in result
    reset = false; // op button click should not cause calculation
    decimal = false;
    oprnd1 = null; // input goes in op1
    inMode = true; // put input in oprnd1
    updateIn(result); // display result
};

// Performs calculation from what is contained in oprnd1, oprnd2 and operator; puts result in result
function operate() {
    oprnd1 = oprnd1 == null ? result : oprnd1; // to display 0 if enter is clicked wo input, or multiple enters
    oprnd2 = oprnd2 == null ? oprnd1 : oprnd2; // to do operation on op1 if no second op is input
    
    switch (operator) { // determine which operation to perform
    case "+":
	result = +oprnd1 + +oprnd2;
	break;
    case "-":
	result = oprnd1 - oprnd2;
	break;
    case "*":
	result = oprnd1 * oprnd2;
	break;
    case "/":
	result = oprnd1 / oprnd2;
	break;
    default:
	result = oprnd1; // to display op1 if no op button is pressed before enter
	break;
    }
};
