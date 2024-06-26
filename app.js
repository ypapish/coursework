'use strict'
function getHistoryVal() {
  return document.getElementById("history-value").innerText;
}

function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}

function getOutput() {
  return document.getElementById("output-value").innerText;
}

function printOutput(num) {
  if (num === "") {
      document.getElementById("output-value").innerText = num;
  } 
  else {
      document.getElementById("output-value").innerText = getFormattedNumber(num);
  }         
} 

function getFormattedNumber(num) {
  if (num === "-") {
      return "";
  }
  const convertedNum = Number(num);
  const value = convertedNum.toLocaleString("en");
  return value;
}

function reverseNumberFormat (num) {
  const commaRegExp = /,/g;
  return Number(num.replace(commaRegExp, ''));
}

let operator = document.getElementsByClassName ("operator");
for (let index = 0; index < operator.length; index++) {
  operator[index].addEventListener("click", function() {
      if (this.id === "clear") {
          printHistory("");
          printOutput("");
      } 
      else if(this.id === "backspace") {
          let output = reverseNumberFormat(getOutput()).toString();
          if (output) {
              output = output.substr(0, output.length - 1);
              printOutput(output);
          }
      } 
      else {
          let output = getOutput();
          let history = getHistoryVal();
          if (output === "" && history !== "") {
              if (isNaN(history[history.length - 1])) {
                  history = history.substr(0, history.length - 1);
              }
          }
          if (output !== "" || history !== "") {
              output = output === "" ? output: reverseNumberFormat (output);
              history = history + output;
              if (this.id === "=") {
                  const result = eval(history);
                  printOutput(result);
                  printHistory("");
              } 
              else {
                  history = history + this.id;
                  printHistory(history);
                  printOutput("");
              }
          }
      }
  });
}

const buttonNumber = document.getElementsByClassName("number");
for (let btnNum = 0; btnNum < buttonNumber.length; btnNum++) {
  buttonNumber[btnNum].addEventListener("click", function() {
      let output = reverseNumberFormat(getOutput());
      if (!isNaN(output)) {
          output = output + this.id;
          printOutput(output);
      }
  });
}
