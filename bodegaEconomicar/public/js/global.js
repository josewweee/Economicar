const firebaseConfig = {
    apiKey: "AIzaSyAz1tIwS_HtercIG11J6kqaQRKr3tuOvKk",
    authDomain: "economicar-35842.firebaseapp.com",
    databaseURL: "https://economicar-35842.firebaseio.com",
    projectId: "economicar-35842",
    storageBucket: "economicar-35842.appspot.com",
    messagingSenderId: "653235722078",
    appId: "1:653235722078:web:83ad1127577355df"
  };
firebase.initializeApp(firebaseConfig);
const storageService = firebase.storage();
const storageRef = storageService.ref();
var Database;
var accion = 'inicio';
let imagenPrincipal;
var rutaFotos = '';

var marcasCarro = '<option value="chevrolet">Chevrolet</option><option value="renault">Renault</option>'
                 + '<option value="mazda">Mazda</option><option value="nissan">Nissan</option>';
var marcasMoto = '<option value="suzuki">Suzuki</option><option value="akt">AKT</option>'
                + '<option value="honda">Honda</option><option value="yamaha">Yamaha</option>';

function CambiarPantallas(accion){
    switch (accion) {
        case 'carro':
            rutaFotos = 'carros';
            this.accion = 'carro';
            Database = firebase.database().ref("VEHICULOS/carros");
            document.getElementById("registroVehiculos").style.display = 'block';
            document.getElementById("pantallaInicio").style.display = 'none';
            document.getElementById("formularioRegistroVehiculos").style.display = 'block';
            document.getElementById("datosMarca").style.display = 'none';
            document.getElementById("agregarFormColor").style.display = 'block';
            document.getElementById("titulo").innerHTML = "Registro Carros";
            document.getElementById("marca").innerHTML = this.marcasCarro;
            /* document.getElementById("gasDiesel").disabled = false;
            document.getElementById("lblGasDiesel").style = 'opacity: 1';
            document.getElementById("gasAmbas").disabled = false;
            document.getElementById("lblGasAmbas").style = 'opacity: 1'; */
            break;
        case 'moto':
            rutaFotos = 'motos';
            this.accion = 'moto';
            Database = firebase.database().ref("VEHICULOS/motos");
            document.getElementById("registroVehiculos").style.display = 'block';
            document.getElementById("pantallaInicio").style.display = 'none';
            document.getElementById("formularioRegistroVehiculos").style.display = 'block';
            document.getElementById("datosMarca").style.display = 'none';
            document.getElementById("agregarFormColor").style.display = 'block';
            document.getElementById("titulo").innerHTML = "Registro Motos";
            document.getElementById("marca").innerHTML = this.marcasMoto;
            /* document.getElementById("gasDiesel").disabled = true;
            document.getElementById("lblGasDiesel").style = 'opacity: 0.5';
            document.getElementById("gasAmbas").disabled = true;
            document.getElementById("lblGasAmbas").style = 'opacity: 0.5'; */
            
            break;
        case 'marca':
            rutaFotos = 'marcas';
            this.accion = 'marca';
            Database = firebase.database().ref("VEHICULOS/marcas");
            document.getElementById("registroVehiculos").style.display = 'block';
            document.getElementById("pantallaInicio").style.display = 'none';
            document.getElementById("agregarFormColor").style.display = 'none';
            document.getElementById("formularioRegistroVehiculos").style.display = 'none';
            document.getElementById("datosMarca").style.display = 'flex';
            document.getElementById("titulo").innerHTML = "Registro Marcas";
            break;
        case 'inicio':
            this.accion = 'inicio';
            document.getElementById("registroVehiculos").style.display = 'none';
            document.getElementById("pantallaInicio").style.display = 'block';
            document.getElementById("datosMarca").style.display = 'none';
            document.getElementById("titulo").innerHTML = "Selecciona Una Opción";
            break;
        default:
            break;
    }
}


//TOMAMOS LA FOTO DE LA DROP ZONE
Dropzone.options.foto = {
    url: '/post', // esto es obligatorio pero no sirve pa nada
    transformFile: function(file, done) {
        imagenPrincipal = file;
    }
};

// SECCION DE MANEJO DE COLORES Y FOTOS DE COLORES ----------------------------------
let arregloFotosColores = [];
let arregloColores = [];
let arregloCodigoColores = [];
var color, codigoColor, imagenColor;
var formColorActual = 0;
Dropzone.options.fotoColor = {
    url: '/post', // esto es obligatorio pero no sirve pa nada
    transformFile: function(file, done) {
        imagenColor = file;
        color = document.getElementById("color").value;
        codigoColor = document.getElementById("codigoColor").value;
        arregloColores.push(color);
        arregloCodigoColores.push(codigoColor);
        document.getElementById("fotoColor").id = "z" + formColorActual.toString();
        document.getElementById("color").id = "x" + formColorActual.toString();
        document.getElementById("codigoColor").id = "y" + formColorActual.toString();
        arregloFotosColores.push(imagenColor);
    }
};


function agregarPlantillaColor (){
    formColorActual++;
    var formColor = 'inputColores' + formColorActual.toString();
    document.getElementById(formColor).style.display = "block";
}

function borrarPlantillasColor(e) {
    var idImgSelector = '#z0';
    Dropzone.forElement(idImgSelector).removeAllFiles(true);

    document.getElementById("x0").value = "";
    document.getElementById("y0").value = "";
    for(var i=e; i == 1; i--){
        var formColor = 'inputColores' + formColorActual.toString();
        document.getElementById(formColor).style.display = "none";
        idImgSelector = '#z' + e.toString();
        console.log(idImgSelector);
        Dropzone.forElement(idImgSelector).removeAllFiles(true);
        document.getElementById('x'+e.toString()).value = "";
        document.getElementById('y'+e.toString()).value = "";
    }
}

// SECCION DE MANEJO DE VERSIONES Y FOTOS DE VERSIONES ----------------------------------
let arregloFotosVersiones = [];
let arregloNombreVersiones = [];
var nombreVersion, imagenVersion;
var formVersionActual = 0;
Dropzone.options.fotoVersion = {
    url: '/post', // esto es obligatorio pero no sirve pa nada
    transformFile: function(file, done) {
        imagenVersion = file;
        nombreVersion = document.getElementById("nombreVersion").value;
        document.getElementById("fotoVersion").id = "a" + formVersionActual.toString();
        document.getElementById("nombreVersion").id = "b" + formVersionActual.toString();
        arregloFotosVersiones.push(imagenVersion);
        arregloNombreVersiones.push(nombreVersion);
    }
};


function agregarPlantillaVersion (){
    formVersionActual++;
    var formVersion = 'inputVersion' + formVersionActual.toString();
    document.getElementById(formVersion).style.display = "block";
}

function borrarPlantillasVersion(e) {
    var idImgSelector = '#a0';
    Dropzone.forElement(idImgSelector).removeAllFiles(true);

    document.getElementById("b0").value = "";
    for(var i=e; i == 1; i--){
        var formVersion = 'inputVersion' + formColorActual.toString();
        document.getElementById(formVersion).style.display = "none";
        idImgSelector = '#a' + e.toString();
        console.log(idImgSelector);
        Dropzone.forElement(idImgSelector).removeAllFiles(true);
        document.getElementById('b'+e.toString()).value = "";
    }
}

function Registrar() {
    //montamos la imagen a firebase
    const uploadTask = storageRef.child(`${rutaFotos}/${imagenPrincipal.name}`).put(imagenPrincipal);
    //seguimiento de la imagen
    uploadTask.on('state_changed', function(snapshot){
       
    }, function(error) {
        // Handle unsuccessful uploads
    }, function() {
        // HACER ESTO SI LA FOTO SE MONTO CORRECTAMENTE
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                var foto  = downloadURL;
                if(this.accion != 'marca'){
                    var e = document.getElementById("marcaV");
                    var marca = e.options[e.selectedIndex].value;
                    var tipoVehiculo = document.getElementById("tipoVehiculoV").value;
                    var modelo = document.getElementById("modelo").value;
                    var año = document.getElementById("año").value;
                    var precio = parseInt(document.getElementById("precio").value);
            
                    Database.push({
                        marca: marca,
                        modelo: modelo,
                        año: año,
                        precio: precio,
                        versiones: '',
                        tipoVehiculo: tipoVehiculo,
                        color: '',
                        id: '',
                        foto: foto
                    }).then((snap) => {
                        var key = snap.key;
                        Database.child(key).update({'id': key}); //actualizamos el registro con el id
                        this.getColores(marca, key);
                        this.getVersiones(marca, key);
                        document.getElementById("marcaV").value = "";
                        document.getElementById("modelo").value = "";
                        document.getElementById("año").value = "";
                        document.getElementById("precio").value = "";
                        document.getElementById("color").value = "";
                        document.getElementById("tipoVehiculoV").value = "";
                        this.arregloFotosColores = [];
                        this.arregloColores = [];
                        this.arregloCodigoColores = [];
                        this.borrarPlantillasColor(this.formColorActual);
                        this.formVersionActual = 0;
                        this.arregloFotosVersiones = [];
                        this.arregloNombreVersiones = [];
                        this.borrarPlantillasVersion(this.formVersionActual);
                        this.formVersionActual = 0;
                        Dropzone.forElement('#foto').removeAllFiles(true);
                        /* Dropzone.forElement('#z').removeAllFiles(true); */
                        
                        alert("PENTAKILL");
                    });
                    }else{
                        var marca = document.getElementById("marcaM").value;
                        var tipoVehiculo = document.getElementById("tipoVehiculoM").value;
                        Database.push({
                            nombre: marca,
                            foto: foto,
                            vehiculo: tipoVehiculo
                        
                        }).then((snap) => {
                            document.getElementById("marcaM").value = "";
                            document.getElementById("tipoVehiculoM").value = "";
                            Dropzone.forElement('#foto').removeAllFiles(true);
                            alert("PENTAKILL");
                        });
                    }
            });
    });
}

function getColores (marca,id){
    var objetoFinal = [];
    var kk = 0;
    for ( var k=0; k < arregloFotosColores.length;k++ ){
        storageRef.child(`${rutaFotos}/${marca}/${arregloFotosColores[kk].name}`).put(arregloFotosColores[kk]).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
                objetoFinal.push({
                    nombre: arregloColores[kk],
                    codigo: arregloCodigoColores[kk],
                    foto: downloadURL
                });
                kk++;
                Database.child(id).update({'color': objetoFinal});
                if (kk == arregloFotosColores.length){
                    //location.reload();
                    console.log("colores full");
                }
            });
        });
    }
}


function getVersiones (marca,id){
    var objetoFinal = [];
    var kk = 0;
    for ( var k=0; k < arregloFotosVersiones.length;k++ ){
        storageRef.child(`${rutaFotos}/${marca}/${arregloFotosVersiones[kk].name}`).put(arregloFotosVersiones[kk]).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
                objetoFinal.push({
                    nombreVersion: arregloNombreVersiones[kk],
                    foto: downloadURL
                });
                kk++;
                Database.child(id).update({'versiones': objetoFinal});
                if (kk == arregloFotosVersiones.length){
                    //location.reload();
                    console.log("versiones full");
                }
            });
        });
    }
}



// asi se monta una magen sin el dropzone

/* document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);

let selectedFile;
 function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
}

function handleFileUploadSubmit(e) {
    const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile);
    uploadTask.on('state_changed', (snapshot) => {
        
    // Observe state change events such as progress, pause, and resume
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    }, () => {
       // Do something once upload is complete
       console.log('success');
    });
  } */
























(function ($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });
    
        var myCalendar = $('.js-datepicker');
        var isClick = 0;
    
        $(window).on('click',function(){
            isClick = 0;
        });
    
        $(myCalendar).on('apply.daterangepicker',function(ev, picker){
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));
    
        });
    
        $('.js-btn-calendar').on('click',function(e){
            e.stopPropagation();
    
            if(isClick === 1) isClick = 0;
            else if(isClick === 0) isClick = 1;
    
            if (isClick === 1) {
                myCalendar.focus();
            }
        });
    
        $(myCalendar).on('click',function(e){
            e.stopPropagation();
            isClick = 1;
        });
    
        $('.daterangepicker').on('click',function(e){
            e.stopPropagation();
        });
    
    
    } catch(er) {console.log(er);}
    /*[ Select 2 Config ]
        ===========================================================*/
    
    try {
        var selectSimple = $('.js-select-simple');
    
        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });
    
    } catch (err) {
        console.log(err);
    }
    

})(jQuery);