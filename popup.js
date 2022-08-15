/*import 'FileSaver.js';*/

//#region Variables Globales
let TAProductoRawData;
let TAMetodoPagoRawData;
let TAPaisesRawData;

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
    fileRead('Producto.txt', TAProductoRawData, TAProducto);
    fileRead('MetodosPago.txt', TAMetodoPagoRawData, TAMetodoPago);
    fileRead('ListaPaises.txt', TAPaisesRawData, TAPaises);
    
}

//#region Acciones de los botones
BtnProducto.addEventListener('click', saveDocumnet);

function saveDocumnet(){
    /*var FileSaver = require('file-server');*/
    let blob = new Blob ([TAProducto.value], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "dynamic.txt");
    

    /*
        const a = document.createElement('a');
        const file = new Blob(["content"], {type: 'text/plain'});
        
        a.href= URL.createObjectURL(file);
        a.saveAs = 'filename.txt';
        a.click();
      
        URL.revokeObjectURL(a.href);

    let texto = TAProducto;
    texto.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('hola Mundo'));

    texto.setAttribute('download', 'test.txt');
*/
    console.log('llego');
    
    
}
//#endregion