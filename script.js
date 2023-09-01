class Calculator {

    // string previousOperandTextElement;
    // string opcurrentOperandTextElement;
    // string currentOperand;  c++ comparion
    // previousOperand
    constructor(previousOperandTextElement,currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    appendNumber(number) {
        if (number == "." && this.currentOperand.includes(".")) return;

        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    compute(){
        let computation;
        const prev= parseFloat(this.previousOperand);
        const current= parseFloat(this.currentOperand);

        switch(this.operation){
            case "+":
                computation=prev+current;
                break;
            case "-":
                computation=prev-current;
                break;
            case "*":
                computation=prev*current;
                break;
            case "÷":
                computation=prev/current;
                break;
            default:
                return;
                    
        }
        this.currentOperand = computation;
        this.previousOperand="";
        this.operation="";

    }
    clear(){
        this.currentOperand="";
        this.previousOperand="";
        this.operation=undefined;
        this.updateDisplay();
    }
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1);
    }
    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";

    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split(".")[0]);
        const decimalDigit = stringNumber.split(".")[1];
        let integerDisplay ;
          if(isNaN(integerDigit))integerDisplay="";
          else{
            integerDisplay = integerDigit;//.toLocaleString("en", { maximumSignificantDigits: 0 });
          }
        
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`;
        } else {
            return integerDisplay;
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand) + " " + this.operation;
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}

// console.log("devvart");

const numberButtons = document.querySelectorAll("[data-number]");
// console.log(numberButtons);
const operationButtons = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");
// console.log(numberButtons);
// console.log(operationButtons);

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
allClearButton.addEventListener("click",()=>{
    console.log(3);
   calculator.clear();
})
equalsButton.addEventListener("click",()=>{
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click",()=>{
    calculator.delete();
    calculator.updateDisplay();
})