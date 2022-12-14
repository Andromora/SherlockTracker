//#region Golbal Variables
let isActive = true;
let LOB;
let metodoPagoSeleccion;
let ciudadSeleccion;
let productoSeleccion;
let binSeleccion = 'N/A';
let binNumber = 'N/A';
let ajusteFareSeleccion = 'N/A';
let ajusteAjustadoASelection = 'N/A';
let miscMontoSeleccion = 'N/A';
let miscTripUUIDSelection = 'N/A';
let MonedaSeleccion = 'N/A';
let reglaSeleccion = 'N/A';
let metodoDePagoOtherSelection = 'N/A';
let submitActivation = 0;
let dbRawData;


let dbProductos = 'https://sherlock-project-5a8eb-default-rtdb.firebaseio.com/producto.json';
let dbPaises = 'https://sherlock-project-5a8eb-default-rtdb.firebaseio.com/ciudad.json';
let dbMetodosPago = 'https://sherlock-project-5a8eb-default-rtdb.firebaseio.com/metodosPago.json';
let dbCurrency = ['ARS','BOB','BRL','CLP','COP','CRC','DOP','GTQ','HNL','MXM','PEN','PYG','TTD','USD','UYU','VEB'];


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
        },1000
    );
};
/*
async function confirmCheckBox(){
    let countcbSelection = document.getElementsByClassName('_css-fJmKOk').length;
    let cbSelection = document.getElementsByClassName('_css-fJmKOk');
    let checkBoxOutside = document.getElementsByClassName('_css-fFDkEg');
    //let checkBoxOutside = document.getElementsByClassName('_css-bnzDDb _css-PKJb');
    
    let bandera = 1;
    
    do{
        
        cbSelection[bandera].addEventListener('change', ()=>{
            //alert(bandera);
            if(isActive){
                loadElements();
            }
        });
        console.log(checkBoxOutside[bandera-1]);
        checkBoxOutside[bandera-1].addEventListener('click', ()=>{
            
            if(isActive){
                //setTimeout(loadElements, 200);
                loadElements();
            }
        });
    
        bandera ++;
    }while(bandera <= countcbSelection);
}
*/

async function loadElements(){
    isActive = false;
    let originDIV = document.getElementsByClassName('_css-dnPEvs')[0];
    let firstChildOrigin = document.getElementsByClassName('_css-aNItu')[1];
    //let sidePanel = document.getElementsByClassName('_css-laIMNJ')[0]; //This element is for removing the focus that not allow to write in the text box and textarea.

    //#region  Creacion de Contenido HTML
    //Div general
    let divGeneral = document.createElement('div');
    divGeneral.className="container";
    divGeneral.id="generalContainer";

    //#region Creacion Botones Generales
    let botonProducto = document.createElement('button');
    botonProducto.className="generalBTN";
    botonProducto.id="productoBTN";
    botonProducto.addEventListener('focusin', (event)=>{
        event.stopImmediatePropagation();
        event.stopPropagation();
    });

    botonProducto.addEventListener('focusout', (event)=>{
        event.stopImmediatePropagation();
        event.stopPropagation();
    });
    botonProducto.appendChild(document.createTextNode("Producto"));

    let botonMPago = document.createElement('button');
    botonMPago.className="generalBTN";
    botonMPago.id="pagoBTN";
    botonMPago.addEventListener('focusin', (event)=>{
        event.stopImmediatePropagation();
        event.stopPropagation();
    });

    botonMPago.addEventListener('focusout', (event)=>{
        event.stopImmediatePropagation();
        event.stopPropagation();
    });
    botonMPago.appendChild(document.createTextNode("M.Pago"));

    let botonCiudad = document.createElement('button');
    botonCiudad.className="generalBTN";
    botonCiudad.id="ciudadBTN";
    botonCiudad.addEventListener('focusin', (event)=>{
        event.stopImmediatePropagation();
        event.stopPropagation();
    });

    botonCiudad.addEventListener('focusout', (event)=>{
        event.stopImmediatePropagation();
        event.stopPropagation();
    });
    botonCiudad.appendChild(document.createTextNode("Ciudad"));
    
    let botonBin = document.createElement('button');
    botonBin.className="generalBTN";
    botonBin.id="binBTN";
    botonBin.addEventListener('focusin', (event)=>{
        event.stopImmediatePropagation();
        event.stopPropagation();
    });

    botonBin.addEventListener('focusout', (event)=>{
        event.stopImmediatePropagation();
        event.stopPropagation();
    });
    /*botonBin.addEventListener('click', ()=>{
        //alert("tome por la madre");
    });*/
    botonBin.appendChild(document.createTextNode("Bin"));
    
    let botonOtros = document.createElement('button');
    botonOtros.className="generalBTN";
    botonOtros.id="OtrosBTN";
    botonOtros.addEventListener('focusin', (event)=>{
        event.stopImmediatePropagation();
        event.stopPropagation();
    });

    botonOtros.addEventListener('focusout', (event)=>{
        event.stopImmediatePropagation();
        event.stopPropagation();
    });
    botonOtros.appendChild(document.createTextNode("Otros"));

    let botonNotas = document.createElement('button');
    botonNotas.className="NotasBTN";
    botonNotas.id="NotasBTN";
    botonNotas.addEventListener("mouseenter", removingFocusEvent);
    botonNotas.addEventListener("click", removingFocusEvent);
    botonNotas.appendChild(document.createTextNode("Notas"));

    let botonSubmit = document.createElement('button');
    botonSubmit.className="submitBTN";
    botonSubmit.id="submitBTN";
    botonSubmit.addEventListener('click', printInfoSherlockArea);
    botonSubmit.appendChild(document.createTextNode("Submit"));

    //#endregion

    //#region Llenado de Forms

    //Form de Producto
    let formProducto = document.createElement('form');
    formProducto.className="ciudadDropDown";
    formProducto.id="productoForm";
        
    await retrieveData(dbProductos);

    dbRawData.forEach(element => {
        createInputElement(element, formProducto, 'uberProducts');
    });
    
    //Form Metodos de Pago
    let formMPago = document.createElement('form');
    formMPago.className="ciudadDropDown";
    formMPago.id="metodoPagoForm";
    formMPago.appendChild(document.createElement('p'));
    let otherPaymentInput = document.createElement('input');
        otherPaymentInput.type = 'text';
        otherPaymentInput.placeholder = 'Otro M??todo Pago';
    formMPago.appendChild(otherPaymentInput);

    await retrieveData(dbMetodosPago);

    dbRawData.forEach(element => {
        createInputElement(element, formMPago, 'metodoDePago');
    });

    //Form de Ciudad
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

    let binNA = document.createElement('input');
        binNA.type = 'radio';
        binNA.id = 'binNA';
        binNA.name = 'binInfo';
        binNA.addEventListener('change', ()=>{
            binSeleccion = 'N/A';
            submitActivation ++;
            activationSubmitBTN();
            botonBin.className = "pagoBTNSelected";
        })
    formBin.appendChild(binNA);
    let binLabelNA = document.createElement('label');
        binLabelNA.htmlFor = 'binNA';
        binLabelNA.innerText = "N/A";
    formBin.appendChild(binLabelNA);

    let binInput = document.createElement('input');
        binInput.type = 'radio';
        binInput.id = 'enLista';
        binInput.name = 'binInfo';
        binInput.addEventListener('change', ()=>{
            submitActivation ++;
            binSeleccion = 'En Lista';
            activationSubmitBTN()
            
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
            submitActivation ++;
            binSeleccion = 'No Listado';
            activationSubmitBTN()
            
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
            AjusteInput.placeholder = "Act. Fare (Antes del Ajuste)";
        AjusteDiv.appendChild(AjusteInput);
            let AjusteInput2 = document.createElement('input');
            AjusteInput2.type = 'text';
            AjusteInput2.id ="ajustadoA";
            AjusteInput2.placeholder = "Ajustado A";
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
        MiscPaymentDiv.className = "ajuste";
            let MiscDivH3 = document.createElement('h3');
            MiscDivH3.innerText = "Misc Payment";
        MiscPaymentDiv.appendChild(MiscDivH3);
            let MiscInput = document.createElement('input');
            MiscInput.type = 'text';
            MiscInput.id ="miscMonto";
            MiscInput.placeholder = "Monto";
        MiscPaymentDiv.appendChild(MiscInput);
    //formMOtros.appendChild(MiscPaymentDiv);

    //formMOtros.appendChild(document.createElement('p'));
        //let MiscTripDiv = document.createElement('div');
        //MiscTripDiv.className = "MiscPayment";
            let MiscTripInput = document.createElement('input');
            MiscTripInput.type = 'text';
            MiscTripInput.id ="miscMonto";
            MiscTripInput.placeholder = "Trip UUID";
            MiscPaymentDiv.appendChild(MiscTripInput);
    formMOtros.appendChild(MiscPaymentDiv);

    formMOtros.appendChild(document.createElement('p'));
        let monedaSubDIV = document.createElement('div');
        monedaSubDIV.className = 'subDivNone';

        let MonedaDiv = document.createElement('div');
        MonedaDiv.className =   "ajuste monedaDiv";
            let MonedaH3 = document.createElement('h3');
            MonedaH3.innerText = "Moneda";
            MonedaH3.addEventListener('click', ()=>{
                if (monedaSubDIV.className === 'subDivNone'){
                    monedaSubDIV.className = 'subDiv';
                }else{
                    monedaSubDIV.className = 'subDivNone';
                }
            });
        MonedaDiv.appendChild(MonedaH3);

        dbCurrency.forEach(e =>{
            createInputElement(e, monedaSubDIV, 'moneda');
        });
        MonedaDiv.appendChild(monedaSubDIV);
    formMOtros.appendChild(MonedaDiv);

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
        notasTxtArea.addEventListener('focusin', (event)=>{
            event.stopImmediatePropagation();
            event.stopPropagation();
        });
        notasTxtArea.addEventListener('focusout', (event)=>{
            event.stopImmediatePropagation();
            event.stopPropagation();
        });
        notasTxtArea.cols = "30";
        notasTxtArea.rows = '10';

        //#endregion
    
    //#region Appends
    //Appends to General Buttons
    botonNotas.appendChild(notasTxtArea);
    botonBin.appendChild(formBin);
    botonProducto.appendChild(formProducto);
    botonMPago.appendChild(formMPago);
    botonCiudad.appendChild(formPaises);
    botonOtros.appendChild(formMOtros);
    
    

    //Appends General
    divGeneral.appendChild(botonNotas);
    divGeneral.appendChild(botonProducto);
    divGeneral.appendChild(botonMPago);
    divGeneral.appendChild(botonCiudad);
    divGeneral.appendChild(botonBin);
    divGeneral.appendChild(botonOtros);
    divGeneral.appendChild(botonSubmit);

    //Append DOM
    originDIV.insertBefore(divGeneral, firstChildOrigin);
    //#endregion
    
    //#region RadioButtons Creation

    //ID Name = name of the Button, this would refer as the shown in the Label TAG
    //tagElement = Is where the Input element will append as Child
    //rbname = Is the name in commun for the whole radiobuttons interaction.
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
            //console.log(rbPressed);
            productoSeleccion = rbPressed;
            submitActivation ++;
            activationSubmitBTN();
        }else if(tagID === formMPago){
            tagID.parentNode.className='pagoBTNSelected';
            tagID.parentNode.childNodes[0].nodeValue=rbPressed;
            //console.log(rbPressed);
            metodoPagoSeleccion = rbPressed;
            submitActivation ++;
            activationSubmitBTN();
        }else if(tagID === formPaises){
            tagID.parentNode.className='pagoBTNSelected';
            tagID.parentNode.childNodes[0].nodeValue=rbPressed;
            //console.log(rbPressed);
            ciudadSeleccion = rbPressed;
            submitActivation ++;
            activationSubmitBTN();
        }else if(tagID === monedaSubDIV){
            MonedaH3.innerText = rbPressed;
            MonedaSeleccion = rbPressed;
            monedaSubDIV.className = 'subDivNone';
        }
        
    }
    //#endregion
    
    //#endregion

    //#endregion

    //#region Text Validation
    function validarInput(texto){
        
        if(texto.match(/\|/)){
            alert("El s??mbolo PIPE ( | ) no es permitido");
            return false;
        }else if(texto.match(/\:/)){
            alert("El s??mbolo DOS PUNTOS ( : ) no es permitido");
            return false;
        }else if(texto.match(/(\{|\})/)){
            alert("El s??mbolo de CORCHETE ( {} ) no es permitido");
            return false;
        }else{
            return true;
        }
        
    }

    function collectText(){
        
        if(BinInputText.value != ''){
            if (validarInput(BinInputText.value)){
                binSeleccion += '|' + BinInputText.value;
                
            }else{
                binSeleccion += '|N/A'
                return false;
            }
        }

        if(MiscInput.value != ''){
            if (validarInput(MiscInput.value)){
                miscMontoSeleccion = MiscInput.value;
                
            }else{
                return false;
            }   
        }

        if(AjusteInput.value != ''){
            if(validarInput(AjusteInput.value)){
                ajusteFareSeleccion = AjusteInput.value;
                
            }else{
                return false;
            } 
        }
        
        if(AjusteInput2.value != ''){
            if(validarInput(AjusteInput2.value)){
                ajusteAjustadoASelection = AjusteInput2.value;
                
            }else{
                return false;
            } 
        }

        if(reglaInput.value != ''){
            if(validarInput(reglaInput.value)){
                reglaSeleccion = reglaInput.value;
                
            }else{
                return false;
            }
        }

        if(notasTxtArea.value != ''){
            if(validarInput(notasTxtArea.value)){

            }else{
                return false;
            }
        }

        if(MiscTripInput.value != ''){
            if(validarInput(MiscTripInput.value)){
                miscTripUUIDSelection = MiscTripInput.value;
            }else{
                return false;
            }
        }

        if(otherPaymentInput.value != ''){
            if(validarInput(otherPaymentInput.value)){
                metodoPagoSeleccion += "|" + otherPaymentInput.value;
            }else{
                metodoPagoSeleccion += "|N/A";
                return false;
            }
        }

        return true;
    }
    //#endregion

    //#region Functions
    
    function activationSubmitBTN(){
        if(submitActivation === 4){
            botonSubmit.className = "submitReady";
        }else{
            botonSubmit.className = "submitBTN";
        }
    }
    
    function printInfoSherlockArea(){
        
        if (collectText()){
            //let sherlockTextArea = document.getElementsByClassName('_css-glQrDZ')[0];
   
            // sherlockTextArea.innerHTML = 'CRT | {' + productoSeleccion + ':' + binSeleccion  + ':' + ciudadSeleccion + ':' +  metodoPagoSeleccion + ':' + ajusteFareSeleccion + '|' + ajusteAjustadoASelection + '|' + MonedaSeleccion + ':' + reglaSeleccion + ':' + miscMontoSeleccion + '|' + MonedaSeleccion + ':' + notasTxtArea.value + ':' + 'More info about this note on the following Splash: https://uberkb.lightning.force.com/articles/es_MX/Knowledge/Verificaci??n-de-notas-internas-por-el-equipo-de-CRT-en-Sherlock' + '}';
            
            // sherlockTextArea.value = 'CRT | {' + productoSeleccion + ':' + binSeleccion  + ':' + ciudadSeleccion + ':' +  metodoPagoSeleccion + ':' + ajusteFareSeleccion + '|' + ajusteAjustadoASelection + '|' + MonedaSeleccion + ':' + reglaSeleccion + ':' + miscMontoSeleccion + '|' + MonedaSeleccion + ':' + notasTxtArea.value + ':' + 'More info about this note on the following Splash: https://uberkb.lightning.force.com/articles/es_MX/Knowledge/Verificaci??n-de-notas-internas-por-el-equipo-de-CRT-en-Sherlock' + '}';

            let textToClipBoard = 'CRT | {' + productoSeleccion + ':' + binSeleccion + ':' + ciudadSeleccion + ':' +  metodoPagoSeleccion + ':' + ajusteFareSeleccion + '|' + ajusteAjustadoASelection + '|' + MonedaSeleccion + ':' + reglaSeleccion + ':' + miscTripUUIDSelection + '|' + miscMontoSeleccion + '|' + MonedaSeleccion + ':' + notasTxtArea.value + ':' + 'More info about this note on the following Splash: https://uberkb.lightning.force.com/articles/es_MX/Knowledge/Verificaci??n-de-notas-internas-por-el-equipo-de-CRT-en-Sherlock' + '}';


            navigator.clipboard.writeText(textToClipBoard);

            alert('Notas Listas y Copiadas. \nAhora ve al cuadro de Notas de Sherlock, y pegalas con el comando Ctrl + V');


            binSeleccion = 'N/A';
            ajusteFareSeleccion = 'N/A';
            miscMontoSeleccion = 'N/A';
            MonedaSeleccion = 'N/A';
            reglaSeleccion = 'N/A';
            
            submitActivation = 0;
            isActive = true;
            divGeneral.remove();
            loadElements();
            //checkSherlockStatement();
          
        }



    }

    //Reverse all the buttons to original status for the next interaction
    /*let resolvedBTN = document.getElementsByClassName('_css-lajzqQ')[0];
    resolvedBTN.addEventListener('click', ()=>{
        alert('Se accedi?? al boton');
        // activationSubmitBTN();
        // botonProducto.className="generalBTN";
        // botonProducto.appendChild(document.createTextNode("Producto"));
        // botonMPago.className="generalBTN";
        // botonMPago.appendChild(document.createTextNode("M.Pago"));
        // botonCiudad.className="generalBTN";
        // botonCiudad.appendChild(document.createTextNode("Ciudad"));
        // botonBin.className="generalBTN";
        // notasTxtArea.value = '';
    });
*/
    function removingFocusEvent(){

        let textArea = document.getElementsByClassName('_css-glQrDZ')[0];

        textArea.addEventListener('focusin', (event)=>{
            event.stopImmediatePropagation();
            event.stopPropagation();
        });
        textArea.addEventListener('focusout', (event)=>{
            event.stopImmediatePropagation();
            event.stopPropagation();
        });
        

    }
    //#endregion
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


