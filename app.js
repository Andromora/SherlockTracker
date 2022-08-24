//#region Golbal Variables
let LOB;
let metodoPagoSeleccion;
let ciudadSeleccion;
let productoSeleccion;
let binSeleccion = 'N/A';
let ajusteFareSeleccion = 'N/A';
let ajusteMonedaSeleccion = 'N/A';
let miscMontoSeleccion = 'N/A';
let miscMonedaSeleccion = 'N/A';
let reglaSeleccion = 'N/A';
let submitActivation = 0;
let dbRawData;


let dbProductos = 'https://sherlock-project-5a8eb-default-rtdb.firebaseio.com/producto.json';
let dbPaises = 'https://sherlock-project-5a8eb-default-rtdb.firebaseio.com/ciudad.json';
let dbMetodosPago = 'https://sherlock-project-5a8eb-default-rtdb.firebaseio.com/metodosPago.json';
let dbCurrency = 'https://sherlock-project-5a8eb-default-rtdb.firebaseio.com/currency';

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
                    //confirmCheckBox();
                }
            }else {
                console.log('pagina cargo completamente');
                loadElements();
                //confirmCheckBox();
            }
        },2000
    );
};

function confirmCheckBox(){
    let countcbSelection = document.getElementsByClassName('_css-fJmKOk').length;
    let cbSelection = document.getElementsByClassName('_css-fJmKOk');
    
    let bandera = 1;
    console.log(countcbSelection);
    console.log(cbSelection[1]);
    do{
        cbSelection[bandera].addEventListener('change', ()=>{
            //alert('Selecciono la opcion');
            setTimeout(loadElements, 3000);
        });
        bandera ++;
    }while(bandera <= countcbSelection);
}


async function loadElements(){

    let originDIV = document.getElementsByClassName('_css-dnPEvs')[0];
    let firstChildOrigin = document.getElementsByClassName('_css-aNItu')[1];
    let sidePanel = document.getElementsByClassName('_css-laIMNJ')[0]; //This element is for removing the focus that not allow to write in the text box and textarea.
   // let sherlockTextArea = document.getElementsByClassName('_css-fqyxNi')[3]; //_css-glQrDZ _css-glQrDZ

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
    botonOtros.appendChild(document.createTextNode("Otros"));

    let botonNotas = document.createElement('button');
    botonNotas.className="NotasBTN";
    botonNotas.id="NotasBTN";
    botonNotas.addEventListener("mouseenter", removingFocusEvent);
    botonNotas.appendChild(document.createTextNode("Notas"));

    let botonSubmit = document.createElement('button');
    botonSubmit.className="submitBTN";
    botonSubmit.id="submitBTN";
    botonSubmit.addEventListener('click', printInfoSherlockArea);
    botonSubmit.appendChild(document.createTextNode("Submit"));

    //#endregion

    //#region Llenado de Forms
    let formProducto = document.createElement('form');
    formProducto.className="ciudadDropDown";
    formProducto.id="productoForm";
        
    await retrieveData(dbProductos);

    dbRawData.forEach(element => {
        createInputElement(element, formProducto, 'uberProducts');
    });
    
    let formMPago = document.createElement('form');
    formMPago.className="ciudadDropDown";
    formMPago.id="metodoPagoForm";
    

    await retrieveData(dbMetodosPago);

    dbRawData.forEach(element => {
        createInputElement(element, formMPago, 'metodoDePago');
    });

    let formPaises = document.createElement('form');
    formPaises.className="ciudadDropDown";
    formPaises.id="paisesForm";
       
    await retrieveData(dbPaises);

    dbRawData.forEach(element => {
        createInputElement(element, formPaises, 'listaPaises');
    });

    //#endregion
    
    //#region Bin
    let formBin = document.createElement('form');
        formBin.className = "BinDropDown";
        formBin.id = 'BinForm';
    let binInput = document.createElement('input');
        binInput.type = 'radio';
        binInput.id = 'enLista';
        binInput.name = 'binInfo';
        binInput.addEventListener('change', ()=>{
            binSeleccion = 'En Lista';
        })
    formBin.appendChild(binInput);
    let binLabel = document.createElement('label');
        binLabel.htmlFor = 'enLista';
        binLabel.innerText = "En Lista";
    formBin.appendChild(binLabel);

    let binInput2 = document.createElement('input');
        binInput2.type = 'radio';
        binInput2.id = 'noListado';
        binInput2.name = 'binInfo';
        binInput2.addEventListener('change', ()=>{
            binSeleccion = 'No Listado';
        })
    formBin.appendChild(binInput2);
    let binLabel2 = document.createElement('label');
        binLabel2.htmlFor = 'noListado';
        binLabel2.innerText = "No Listado";
    formBin.appendChild(binLabel2);
    formBin.appendChild(document.createElement('p'));
        let BinInputText = document.createElement('input');
        BinInputText.type = 'text';
        BinInputText.id ="BinTextBox";
    formBin.appendChild(BinInputText);
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

         /*   let ajusteMyscMoneda = document.createElement('h3');
            ajusteMyscMoneda.innerText = 'Moneda';
        

            let formMyscMoneda = document.createElement('form');
            formMyscMoneda.className="ciudadDropDown";
            formMyscMoneda.id="myscMoneda";
            await retrieveData(dbCurrency);

            dbRawData.forEach(element => {
            createInputElement(element, formMyscMoneda, 'myscPaymentMoneda');
            });

        ajusteMyscMoneda.appendChild(formMyscMoneda);
        AjusteDiv.appendChild(ajusteMyscMoneda);*/

    





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
        notasTxtArea.className = "TextAreaIN";
        notasTxtArea.id = "textAreaInternalNotes";
        notasTxtArea.addEventListener('click', validarInput);
        notasTxtArea.cols = "30";
        notasTxtArea.rows = '10';
        //#endregion
    

    //Appends to General Buttons
    botonBin.appendChild(formBin);
    botonProducto.appendChild(formProducto);
    botonMPago.appendChild(formMPago);
    botonCiudad.appendChild(formPaises);
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
    
    

    function validarInput(){
        notasTxtArea.className ='TextAreaIN';
    }
    
    //ID Name = name of the Button, this would refer as the shown in the Label TAG
    //tagElement = Is where the Input element will append as Child
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
    
    function seleccionRB(tagID, rbPressed){
        if(tagID === formProducto){
            tagID.parentNode.className='pagoBTNSelected';
            tagID.parentNode.childNodes[0].nodeValue=rbPressed;
            console.log(rbPressed);
            productoSeleccion = rbPressed;
            submitActivation ++;
            activationSubmitBTN();
        }else if(tagID === formMPago){
            tagID.parentNode.className='pagoBTNSelected';
            tagID.parentNode.childNodes[0].nodeValue=rbPressed;
            console.log(rbPressed);
            metodoPagoSeleccion = rbPressed;
            submitActivation ++;
            activationSubmitBTN();
        }else if(tagID === formPaises){
            tagID.parentNode.className='pagoBTNSelected';
            tagID.parentNode.childNodes[0].nodeValue=rbPressed;
            console.log(rbPressed);
            ciudadSeleccion = rbPressed;
            submitActivation ++;
            activationSubmitBTN();
        }
        
    }
    
    function activationSubmitBTN(){
        if(submitActivation === 3){
            botonSubmit.className = "submitReady";
        }
    }
    
    function printInfoSherlockArea(){

        if(BinInputText.value != ''){
            binSeleccion += '|' + BinInputText.value;
            alert(BinInputText.value);
        }
        
        let sherlockTextArea = document.getElementsByClassName('_css-glQrDZ')[0];
   
        sherlockTextArea.innerHTML = 'CRT | {' + productoSeleccion + ':' + binSeleccion  + ':' + ciudadSeleccion + ':' +  metodoPagoSeleccion + ':' + ajusteFareSeleccion + '|' + ajusteMonedaSeleccion + ':' + reglaSeleccion + ':' + miscMontoSeleccion + '|' + miscMonedaSeleccion + ':' + notasTxtArea.value + ':' + 'More info about this note on the following Splash: https://docs.google.com/document/d/1w-tpeoQ2RElxIRLJBVrvAl9v8jR0ka4OFtrlAtFAYpU/edit' + '}';
        
        sherlockTextArea.value = 'CRT | {' + productoSeleccion + ':' + binSeleccion  + ':' + ciudadSeleccion + ':' +  metodoPagoSeleccion + ':' + ajusteFareSeleccion + '|' + ajusteMonedaSeleccion + ':' + reglaSeleccion + ':' + miscMontoSeleccion + '|' + miscMonedaSeleccion + ':' + notasTxtArea.value + ':' + 'More info about this note on the following Splash: https://docs.google.com/document/d/1w-tpeoQ2RElxIRLJBVrvAl9v8jR0ka4OFtrlAtFAYpU/edit' + '}';

        binSeleccion = 'N/A';
        ajusteFareSeleccion = 'N/A';
        ajusteMonedaSeleccion = 'N/A';
        miscMontoSeleccion = 'N/A';
        miscMonedaSeleccion = 'N/A';
        reglaSeleccion = 'N/A';
        submitActivation = 0;

    }

    function removingFocusEvent(){
        
        
        console.log(sidePanel);
        sidePanel.removeEventListener('focus');
    }
}


//This method is for gathering the data from the server.
async function retrieveData(dbLink){
    console.log("We are working on your task")

    
    try {
        const rawDataBase = await fetch(dbLink);
        
        if(rawDataBase.status === 200){
            console.log("Status 200")
            const datos = await rawDataBase.json();
            dbRawData = datos;
        }else if(rawDataBase.status === 401){
            console.log("The key is not correct");
        }else if(rawDataBase.status === 404){
            console.log("The Data Table code is not correct");
        }else {
            console.log("There was an Unknown Error");
        }
        
    } catch (error) {
        console.log("We were not able to catch your Data Base"); 
    }

        
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


