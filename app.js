//#region Golbal Variables
let LOB;
let metodoPago;
let ciudad;
let ciudadRawData;
let metodosPagoRawData;

let metodoPagoSeleccionado;
//#endregion

//#region Concatenation Variables
let txt_PaymentMethod;
let txt_City;

//#endregion

//#region DOM Gattering
/*const eaterButton = document.querySelector("#eaterBTN");
const riderButton = document.querySelector("#riderBTN");*/
const pagoButton = document.querySelector("#pagoBTN");
const ciudadButton = document.querySelector("#ciudadBTN");
const ciudadForm = document.querySelector("#ciudadForm");
const metodosPagoForm = document.querySelector("#metodoPagoForm");
const submitButton = document.querySelector("#submitBTN");
const countryListTextArea = document.querySelector("#ListaPaises");

//#endregion

//#region Buttons actions "Click"
/*
//EventListener Eater
eaterButton.addEventListener("click", n => {
    eaterButton.className = "eaterReady"
    riderButton.className = "riderBTN";
    }
    );


//EventListener Rider
riderButton.addEventListener("click", n => {
    eaterButton.className = "eaterBTN"
    riderButton.className = "riderReady";
    }
    );
*/

//#endregion

document.addEventListener("DOMContentLoaded", loadLists);


//#region FileRead/Write
async function fileReadCountries(){
    const fileContent = await fetch('ListaPaises.txt')
        .then(response => response.text())
        .then(text => ciudadRawData = text);
    let ciudadArray = ciudadRawData.split('\n');
    
    ciudadArray.forEach(element => {
        createInputElement(element, ciudadForm, 'rb_paises');
    });
    
   
}

async function fileReadPaymentMethods(){
    const fileContent2 = await fetch('MetodosPago.txt')
        .then(response => response.text())
        .then(text => metodosPagoRawData = text);
    let metodosPagoArray = metodosPagoRawData.split('\n');

    metodosPagoArray.forEach(element => {
        createInputElement(element, metodosPagoForm, 'rb_mp');
    });

    let inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.id = 'txt_PaymentMethodOther';
    
    metodoPago.appendChild(inputText);

}

//#endregion

function loadLists(){
    fileReadPaymentMethods();
    fileReadCountries();

}

function createInputElement(countryName, tagElement, rbname){
    let tempInput = document.createElement("input");
    tempInput.type = 'radio';
    tempInput.id= countryName;
    tempInput.value=countryName;
    tempInput.name= rbname;
    tempInput.addEventListener('change', ()=>
    seleccionRB(tagElement, countryName)
    );

    let labelTemp = document.createElement('label');
    labelTemp.htmlFor = countryName;
    
    labelTemp.appendChild(document.createTextNode(countryName));

    tagElement.appendChild(tempInput);
    tagElement.appendChild(labelTemp);
}

function selectionMetodosPago(){
    const rbs = document.querySelectorAll('input[name="rb_mp"');
    for(const rb of rbs ){
        rb.onclick = (e) => {
            console.log(e);
        }
        /*if(rb.checked){
            console.log(rb);
            break;
        }*/
    }

}

let radios = document.querySelectorAll('input[type=radio][name="rb_mp"]');
radios.forEach(radio => radio.addEventListener('change', ()=>
console.log('got it')

));


function seleccionRB(tagID, rbPressed){
    if(tagID === metodosPagoForm){
        tagID.parentNode.className='pagoBTNSelected';
        tagID.parentNode.childNodes[0].nodeValue=rbPressed;
        txt_PaymentMethod = rbPressed;
        console.log(rbPressed);
    }else if(tagID === ciudadForm){
        tagID.parentNode.className='pagoBTNSelected';
        tagID.parentNode.childNodes[0].nodeValue=rbPressed;
        txt_City = rbPressed;
        console.log(rbPressed);

    }
    
}

//let rb_metodoPago = document.querySelector('#paisesTextButton');


