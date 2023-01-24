import React from "react";

//Main component
function App() {  
  const [expression, setExpression] = React.useState("0");
  
  const initialize = () => {
    setExpression("0");
  }
  
  const display = (symbol) => {
    //This section handles input validation
    //if the maximum amount of digits was exceeded, the user must clear the calculator before using it again
    if(expression === "max digits"){
      return;
    }
    //start by shaving off the leading zero (this needs to be set as default to satisfy project conditions)
    //and check to make sure the user isn't starting with an operator (except minus)
    if(expression[0] === "0"){
      if(/[/*+]/.test(symbol)){
        return;
      } else {
        setExpression("");
      }
    }
    if(expression.length > 0){
      //check to make sure a number doesn't have leading zeros
      if(/0/.test(symbol)){
        //if directly before this zero was a symbol add the zero,
        //otherwise check to make sure this zero preceeded by another digit
        //or a decimal point
        if(!/[/*+-]/.test(expression[expression.length-1])){
        for(let i = expression.length-1; i >= 0; i--){
          if(/[1-9\.]/.test(expression[i])){
            break;  
          } else if(/[/*+-]/.test(expression[i])){
            return;
          }
        }
      }
    }
      //if the previous symbol and the current symbol (except minus) are both operators, replace the previous one with the new one
      if(/[/*+]/.test(symbol) && /[/*+-]/.test(expression[expression.length-1])){
        setExpression(expression.slice(0, -1)); 
        //also check another place back for another operator in case a minus was entered between them
        if(/[/*+-]/.test(expression[expression.length-1]) && /[/*+-]/.test(expression[expression.length-2])){
           setExpression(expression.slice(0, -2)); 
        }
      }
      //check to make sure there's no more than 1 decimal point per number
      if(/\./.test(symbol)){
        for(let i = expression.length-1; i >= 0; i--){
          if(/\./.test(expression[i])){ //if another . is found, return out of the function so that it's ignored
            return;
          } else if(/[/*+-]/.test(expression[i])){
            break;  
          }
        }
      }
      //check to make sure there's no more than two minus symbols in a row
      if(expression[expression.length-1] === '-' && /-/.test(symbol)){
        return;
      }
    } 
    //after running through all the checks, finally set the expression
    setExpression(previous => previous + symbol);
    //after pressing '=' upon entering the next keypress clear the display so that it only shows the newest total
    if(expression[expression.length-1] === '='){ 
      if(/[0-9.]/.test(symbol)){
        setExpression(symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  }  
  
  const calculate = () => {
    let answer = eval(expression);
    answer = String(answer);
    if(answer.length + 1 > 11){
      //if there's a decimal, remove the extra digits after the decimal point
      if(answer.includes('.')){
        answer = answer.slice(0, 10);
        setExpression(answer);
      }
      //otherwise it's a non-decimal number and we want to not show it because that would be innacurate
      else{
        setExpression("max digits");
      }
      return;
    }
    setExpression(answer);
  }
  
  return (
    <div className="container">
      <div className="calculator">
        <div>
          <div className="outer-div">
            <div id="display">{expression}</div>
          </div>
        </div>
        <Buttons initialize={initialize} display={display} calculate={calculate} />
      </div>
    </div>
  ); 
}

//Calculator Component
const Buttons = ({ initialize, display, calculate }) => {
  return (
    <div className="button-wrapper">
      <button id="clear" onClick={() => initialize()}>AC</button>
      <button id="divide" onClick={() => display("/")} value="/">/</button>
      <button id="multiply" onClick={() => display("*")} value="*">X</button>
      <button id="seven" onClick={() => display("7")} value="7">7</button>
      <button id="eight" onClick={() => display("8")} value="8">8</button>
      <button id="nine" onClick={() => display("9")} value="9">9</button>
      <button id="subtract" onClick={() => display("-")} value="-">-</button>
      <button id="four" onClick={() => display("4")} value="4">4</button>
      <button id="five" onClick={() => display("5")} value="5">5</button>
      <button id="six" onClick={() => display("6")} value="6">6</button>
      <button id="add" onClick={() => display("+")} value="+">+</button>
      <button id="one" onClick={() => display("1")} value="1">1</button>
      <button id="two" onClick={() => display("2")} value="2">2</button>
      <button id="three" onClick={() => display("3")} value="3">3</button>
      <button id="equals" onClick={calculate} value="=">=</button>
      <button id="zero" onClick={() => display("0")} value="0">0</button>
      <button id="decimal" onClick={() => display(".")} value=".">.</button>   
    </div> 
  )
}

export default App;
