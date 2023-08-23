const inputslider=document.querySelector("[data-lengthSlider]");

const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-paswordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#UpperCase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#Numbers");
const symbolsCheck = document.querySelector("#Symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".GenerateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password="";
let passwordLength=10;
let checkCount=0;
     handleslider();
     setIndecator("#ccc");
//password length decide
function handleslider(){
inputslider.value=passwordLength;
lengthDisplay.innerText=passwordLength;

}

function setIndecator(color) {
    indicator.style.backgroundColor=color;

}


function getRndInteger(min ,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase()
{
   return String.fromCharCode( getRndInteger(97,123));

}
function generateUpperCase()
{
   return String.fromCharCode( getRndInteger(65,91));

}
function generateSymbol(){
const random= getRndInteger(0,symbols.length);
return symbols.charAt(random);
}

 function calstrength(){
    let hasupper=false;
    let haslower=false;
    let hasSym=false;
    let hasNum=false;

    if(uppercaseCheck.checked)
    hasupper=true;
    if(lowercaseCheck.checked)
    haslower=true;
    if(symbolsCheck.checked)
    hasSym=false;

    if(numbersCheck.checked)
    hasNum=false;

    if(hasupper && haslower && (hasNum || hasSym) && passwordLength>=8){
        setIndecator("#0f0");
    } else if((haslower || haslower) && (hasNum || hasSym) && passwordLength>=6){
        setIndecator("#ff0");
    } else{
        setIndecator("#f00");
    }
 }

 async function copycontent(){
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
         copyMsg.innerText="copied";

  }
  catch(e){
     copyMsg.innerText="failed";
  }
    
  copyMsg.classList.add("active");
  setTimeout(()=>{
    copyMsg.classList.remove("active")
  },2000);

 }

function shufflePassword(array){

    //fisher yates method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach(el =>(str+=el) );
    return str;
        
    
}
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
      if(checkbox.checked)
      checkCount++;
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleslider();
    }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})
 inputslider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleslider();
 })

 copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copycontent();
    }
 })

 generateBtn.addEventListener('click',()=>{
    if(checkCount==0)
    return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleslider();
    }
    console.log("Starting the Journey");

    password="";

    let funcarr=[];
    if(uppercaseCheck.checked){
        funcarr.push(generateUpperCase);

    }
    if(lowercaseCheck.checked){
        funcarr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funcarr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcarr.push(generateSymbol);
    }

    for(let i=0;i<funcarr.length;i++){
        password+=funcarr[i]();
    }

    for(let i=0;i<passwordLength-funcarr.length;i++){
        let randIndex=getRndInteger(0,funcarr.length);
        console.log("randIndex" + randIndex);
        password+=funcarr[randIndex]();
    }
    password=shufflePassword(Array.from(password));
    passwordDisplay.value=password;
    calstrength();
 });