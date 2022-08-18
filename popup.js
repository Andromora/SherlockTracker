/*import 'FileSaver.js';*/

//#region Variables Globales
let TAProductoRawData;
let TAMetodoPagoRawData;
let TAPaisesRawData;

let dbProductos = 'https://sherlock-project-5a8eb-default-rtdb.firebaseio.com/producto.json';
let dbPaises = 'https://sherlock-project-5a8eb-default-rtdb.firebaseio.com/ciudad.json';
let dbMetodosPago = 'https://sherlock-project-5a8eb-default-rtdb.firebaseio.com/metodosPago.json';

//#endregion


//#region Acceso Documento
let TAProducto = document.querySelector('#TAProducto');
let TAMetodoPago = document.querySelector('#TAMetodoPago');
let TAPaises = document.querySelector('#TAPaises');
let BtnProducto = document.querySelector('#BtnProducto');
let BtnMetodoPago = document.querySelector('#BtnMetodoPago');
let BtnPaises = document.querySelector('#BtnPaises');

//#endregion

//#region Llenado TextArea
async function fileRead(fileName, globalVariable, TextAreaPrint){
    const fileContent2 = await fetch(fileName)
        .then(response => response.text())
        .then(text => globalVariable = text);
    TextAreaPrint.value = globalVariable;
}

//#endregion

document.addEventListener("DOMContentLoaded", loadLists);

function loadLists(){
    /*fileRead('Producto.txt', TAProductoRawData, TAProducto);
    fileRead('MetodosPago.txt', TAMetodoPagoRawData, TAMetodoPago);
    fileRead('ListaPaises.txt', TAPaisesRawData, TAPaises);*/
    retrieveData(TAProducto, dbProductos);
    
}

//#region Traer info de la base de datos
BtnProducto.addEventListener('click', retrieveData);


function retrieveData(loadingList, dbLink){
    console.log("We are working on your task");

    chrome.storage.sync.get('datosProductos', function(data){
        TAProductoRawData = data.datosProductos;});
    
        console.log("this is the contect of the raw data: " + TAProductoRawData);
    
    if( TAProductoRawData === undefined){
        console.log("Donwloading the list");

        const getDataBase = async () => {
            try {
                const rawDataBase = await fetch(dbLink);
                
                if(rawDataBase.status === 200){
                    console.log("Status 200")
                    const datos = await rawDataBase.json();
                    let stringConcatenado = '';
                    for(i = 0; i< datos.length; i++){
                        //console.log(datos[i]);
                        stringConcatenado = stringConcatenado + datos[i] + "\n";
                    }
                    //TAProducto.value = stringConcatenado;
                    storeLocally(stringConcatenado);
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
    
        getDataBase();
        
    }else {
        console.log("Unable to Download");
    }
        
}

function storeLocally(datos){
    chrome.storage.sync.set({'datosProductos': datos}, function(){
        alert("Success Data Storage");
    });
    
    chrome.storage.sync.get('datos', function(data){
        TAProducto.value = data.datos;
    });
    
    //datos.forEach(element => {
        
}

//#endregion