import React, { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import KeyPad from "./components/KeyPad/KeyPad";

import moon from './Icons/moon.jpg';
import sun from './Icons/sun.png';

import './App.css';

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {

  const [isDarkMode,setIsDarkMode]=useState(JSON.parse(localStorage.getItem("mode"))|| false);
  const [expression,setExpression]=useState("");
  const [result,setResult]=useState("0.00");
  const [history,setHistory]=useState(JSON.parse(localStorage.getItem("history"))||[]);

  const handleKeyPress=(keyCode,key)=>{
    if(!keyCode)
      return;

    if(!usedKeyCodes.includes(keyCode))
      return;

    if(numbers.includes(key)){
      if(key==="0"){
        if(expression.length===0)
          return;
      }
      calculateResult(expression+key);
      setExpression(expression+key);
    }

    else if(operators.includes(key)){
      if(!expression)return
      const lastchar=expression.slice(-1);
      if(operators.includes(lastchar))return;
      if(lastchar==='.')return
      setExpression(expression+key);
    }

    else if(key==='.'){
      if(!expression)return;
      const lastchar=expression.slice(-1);
      if(!numbers.includes(lastchar))return;
      setExpression(expression+key);
    }

    else if(keyCode===8){
      if(!expression)return
      calculateResult(expression.slice(0,-1));
      setExpression(expression.slice(0,-1));
    }

    else if(keyCode===13){
      if(!expression)return
      calculateResult(expression);
      var temphist=[...history];
      if(temphist.length===10)
        temphist=temphist.splice(0,1);
      temphist.push(expression);
      setHistory(temphist);
    }
  }

  const calculateResult=(exp)=>{
    if (!exp) {
      setResult("0.00");
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

    const res = eval(exp).toFixed(2) + "";
    setResult(res);
  }

  useEffect(()=>{localStorage.setItem("mode",JSON.stringify(isDarkMode))},[isDarkMode]);
  useEffect(()=>{localStorage.setItem("history",JSON.stringify(history))},[history]);

  return (
    <div className="app" tabIndex="0" onKeyDown={(event)=>handleKeyPress(event.keyCode,event.key)}  data-theme={isDarkMode?"dark":""}>
      <div className="app_calculator">
        <div className="app_calculator_navbar">
          <div className="app_calculator_navbar_toggle" onClick={()=>setIsDarkMode(!isDarkMode)}>
            <div className={`app_calculator_navbar_toggle_circle ${isDarkMode?"app_calculator_navbar_toggle_circle_active":""}`} />
          </div>
          <img src={isDarkMode?moon:sun} alt=""></img>
        </div>
        <Header expression={expression} result={result} history={history}/>
        <KeyPad handleKeyPress={handleKeyPress}/>
      </div>
    </div>
  );
}

export default App;
