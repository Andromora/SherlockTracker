//#region Golbal Variables
let LOB;
let metodoPago;
let ciudad;
let ciudadRawData;
let metodosPagoRawData;
let productoRawData;

let metodoPagoSeleccionado;
//#endregion

checkSherlockStatement();

function checkSherlockStatement(){
    setTimeout(
        function(){
            let x= document.getElementsByClassName('_css-gCxvQt');
            let y= document.getElementsByClassName('_css-glsKCT');

            if(x==null){
                if(y==null){
                    checkSherlockStatement();
                }else{
                    console.log('pagina cargo');
                    loadElements();
                }
            }else {
                console.log('pagina cargo completamente');
                loadElements();
            }
        },2000
    );
};

function loadElements(){

    let originDIV = document.getElementsByClassName('_css-dnPEvs')[0];
    let firstChildOrigin = document.getElementsByClassName('_css-aNItu')[1];
        
    /*originDIV.style.background = "black";*/

    //Creacion de Contenido HTML
    //Div general
    let divGeneral = document.createElement('div');
    divGeneral.className="container";
    divGeneral.id="generalContainer";

    //#region Creacion Botones Generales
    let botonProducto = document.createElement('button');
    botonProducto.className="generalBTN";
    botonProducto.id="productoBTN";
    botonProducto.appendChild(document.createTextNode("Producto"));

    let botonMPago = document.createElement('button');
    botonMPago.className="generalBTN";
    botonMPago.id="pagoBTN";
    botonMPago.appendChild(document.createTextNode("M.Pago"));

    let botonCiudad = document.createElement('button');
    botonCiudad.className="generalBTN";
    botonCiudad.id="ciudadBTN";
    botonCiudad.appendChild(document.createTextNode("Ciudad"));
    
    let botonBin = document.createElement('button');
    botonBin.className="generalBTN";
    botonBin.id="binBTN";
    botonBin.appendChild(document.createTextNode("Bin"));
    
    let botonOtros = document.createElement('button');
    botonOtros.className="generalBTN";
    botonOtros.id="OtrosBTN";
    botonOtros.appendChild(document.createTextNode("Otors"));

    let botonNotas = document.createElement('button');
    botonNotas.className="NotasBTN";
    botonNotas.id="NotasBTN";
    botonNotas.appendChild(document.createTextNode("Notas"));

    let botonSubmit = document.createElement('button');
    botonSubmit.className="submitBTN";
    botonSubmit.id="submitBTN";
    botonSubmit.appendChild(document.createTextNode("Submit"));
    //#endregion

    //Creacion Forms
        //MetodosPago
    let formMPago = document.createElement('form');
        formMPago.className="ciudadDropDown";
        formMPago.id="metodoPagoForm";
        fileReadPaymentMethods();

        //#region Bin
    let formBin = document.createElement('form');
        formBin.className = "BinDropDown";
        formBin.id = 'BinForm';
    let binInput = document.createElement('input');
        binInput.type = 'radio';
        binInput.id = 'enLista';
        binInput.name = 'binInfo';
    formBin.appendChild(binInput);
    let binLabel = document.createElement('label');
        binLabel.htmlFor = 'enLista';
        binLabel.innerText = "En Lista";
    formBin.appendChild(binLabel);

    let binInput2 = document.createElement('input');
        binInput2.type = 'radio';
        binInput2.id = 'noListado';
        binInput2.name = 'binInfo';
    formBin.appendChild(binInput2);
    let binLabel2 = document.createElement('label');
        binLabel2.htmlFor = 'noListado';
        binLabel2.innerText = "En noListado";
    formBin.appendChild(binLabel2);
    formBin.appendChild(document.createElement('p'));
        let BinInput = document.createElement('input');
        BinInput.type = 'text';
        BinInput.id ="BinTextBox";
    formBin.appendChild(BinInput);
        //#endregion

        //#region otros
    let formMOtros = document.createElement('form');
    formMOtros.className = "otrosDropDown";
    formMOtros.id = "otrosForm";
    formMOtros.appendChild(document.createElement('p'));
        let AjusteDiv = document.createElement('div');
        AjusteDiv.className =   "ajuste";
            let AjusteH3 = document.createElement('h3');
            AjusteH3.innerText = "Ajuste";
        AjusteDiv.appendChild(AjusteH3);
            let AjusteInput = document.createElement('input');
            AjusteInput.type = 'text';
            AjusteInput.id ="ajusteMonto";
            AjusteInput.placeholder = "Fare";
        AjusteDiv.appendChild(AjusteInput);
            let AjusteInput2 = document.createElement('input');
            AjusteInput2.type = 'text';
            AjusteInput2.id ="ajusteMoneda";
            AjusteInput2.placeholder = "Moneda";
        AjusteDiv.appendChild(AjusteInput2);
    formMOtros.appendChild(AjusteDiv);
    
    formMOtros.appendChild(document.createElement('p'));
        let MiscPaymentDiv = document.createElement('div');
        MiscPaymentDiv.className = "MiscPayment";
            let MiscDivH3 = document.createElement('h3');
            MiscDivH3.innerText = "Misc Payment";
        MiscPaymentDiv.appendChild(MiscDivH3);
            let MiscInput = document.createElement('input');
            MiscInput.type = 'text';
            MiscInput.id ="miscMonto";
            MiscInput.placeholder = "Monto";
        MiscPaymentDiv.appendChild(MiscInput);
            let MiscInput2 = document.createElement('input');
            MiscInput2.type = 'text';
            MiscInput2.id ="miscMoneda";
            MiscInput2.placeholder = "Moneda";
        MiscPaymentDiv.appendChild(MiscInput2);
    formMOtros.appendChild(MiscPaymentDiv);

    formMOtros.appendChild(document.createElement('p'));
        let reglaDiv = document.createElement('div');
        reglaDiv.className = "regla";
            let reglaDivH3 = document.createElement('h3');
            reglaDivH3.innerText = "Regla";
        reglaDiv.appendChild(reglaDivH3);
            let reglaInput = document.createElement('input');
            reglaInput.type = 'text';
            reglaInput.id ="regla";
            reglaInput.placeholder = "Regla";
        reglaDiv.appendChild(reglaInput);
    formMOtros.appendChild(reglaDiv);
        //#endregion

        //#region notas
    let notasTxtArea = document.createElement('textarea');
        notasTxtArea.className = "TextArea";
        notasTxtArea.id = "textAreaNotes";
        notasTxtArea.cols = "30";
        notasTxtArea.rows = '10';
        //#endregion
    

    //Appends to General Buttons
    botonBin.appendChild(formBin);
    botonMPago.appendChild(formMPago);
    botonOtros.appendChild(formMOtros);
    botonNotas.appendChild(notasTxtArea);
    

    //Appends General
    divGeneral.appendChild(botonProducto);
    divGeneral.appendChild(botonMPago);
    divGeneral.appendChild(botonCiudad);
    divGeneral.appendChild(botonBin);
    divGeneral.appendChild(botonOtros);
    divGeneral.appendChild(botonNotas);
    divGeneral.appendChild(botonSubmit);

    //Append DOM
    originDIV.insertBefore(divGeneral, firstChildOrigin);
    
    
    
    async function fileReadPaymentMethods(){
        const fileContent2 = await fetch('MetodosPago.txt')
            .then(response => response.text())
            .then(text => metodosPagoRawData = text);
        let metodosPagoArray = metodosPagoRawData.split('\n');
    
        metodosPagoArray.forEach(element => {
            createInputElement(element, formMPago, 'rb_mp');
        });
    
        let inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.id = 'txt_PaymentMethodOther';
        
        formMPago.appendChild(inputText);
    
    }

    function createInputElement(IDName, tagElement, rbname){
        let tempInput = document.createElement("input");
        tempInput.type = 'radio';
        tempInput.id= IDName;
        tempInput.value=IDName;
        tempInput.name= rbname;
        tempInput.addEventListener('change', ()=>
        seleccionRB(tagElement, IDName)
        );
    
        let labelTemp = document.createElement('label');
        labelTemp.htmlFor = IDName;
        
        labelTemp.appendChild(document.createTextNode(IDName));
    
        tagElement.appendChild(tempInput);
        tagElement.appendChild(labelTemp);
    }
    
    /*
    fileReadPaymentMethods();
    fileReadCountries();
    fileReadProducts();
    //loadOnPage();

    
    //#region Concatenation Variables
    let txt_PaymentMethod;
    let txt_City;

    
    //#endregion

    //#region DOM Gattering
    /*const eaterButton = document.querySelector("#eaterBTN");
    const riderButton = document.querySelector("#riderBTN");
    const productoButton = document.querySelector('#productoBTN');
    const pagoButton = document.querySelector("#pagoBTN");
    const ciudadButton = document.querySelector("#ciudadBTN");
    const productoForm = document.querySelector('#productoForm');
    const ciudadForm = document.querySelector("#ciudadForm");
    const metodosPagoForm = document.querySelector("#metodoPagoForm");
    const submitButton = document.querySelector("#submitBTN");
    const countryListTextArea = document.querySelector("#ListaPaises");
    const generalContainer = document.querySelector('#generalContainer');*/
    //#endregion

    //#region Accessing Sherlock Page
   /* function loadOnPage(){
        
        
        var elementoAfter = document.getElementsByClassName('css-leASAL')[0];

        origin.insertBefore(generalContainer, elementoAfter);
    }*/



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

    //document.addEventListener("DOMContentLoaded", loadLists);
    
}


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

async function fileReadProducts(){
    const fileContent = await fetch('Producto.txt')
        .then(response => response.text())
        .then(text => productoRawData = text);
    let productoArray = productoRawData.split('\n');
    
    productoArray.forEach(element => {
        createInputElement(element, productoForm, 'rb_productos');
    });
    

}

//#endregion

//Input element creation with RadioButtons
function createInputElement(IDName, tagElement, rbname){
    let tempInput = document.createElement("input");
    tempInput.type = 'radio';
    tempInput.id= IDName;
    tempInput.value=IDName;
    tempInput.name= rbname;
    tempInput.addEventListener('change', ()=>
    seleccionRB(tagElement, IDName)
    );

    let labelTemp = document.createElement('label');
    labelTemp.htmlFor = IDName;
    
    labelTemp.appendChild(document.createTextNode(IDName));

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

