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
/* var storageRef = firebase.storage().ref(); */
var Database;
var accion = 'marca';
switch (accion) {
    case 'carro':
        Database = firebase.database().ref("VEHICULOS/carros");
        document.getElementById("titulo").innerHTML = "Registro Carros";
        break;
    case 'moto':
        Database = firebase.database().ref("VEHICULOS/motos");
        document.getElementById("gasDiesel").disabled = true;
        document.getElementById("lblGasDiesel").style = 'opacity: 0.5';
        document.getElementById("gasAmbas").disabled = true;
        document.getElementById("lblGasAmbas").style = 'opacity: 0.5';
        document.getElementById("titulo").innerHTML = "Registro Motos";
        break;
    case 'marca':
        Database = firebase.database().ref("VEHICULOS/marcas");
        document.getElementById("formularioRegistroVehiculos").style.display = 'none';
        document.getElementById("datosMarca").style.display = 'flex';
        document.getElementById("titulo").innerHTML = "Registro Marcas";
        break;
    default:
        break;
}




function Registrar() {
    var marca = document.getElementById("marca").value;
    var tipoVehiculo = document.getElementById("tipoVehiculo").value;
    var foto = document.getElementById("foto").value;
    if(this.accion != 'marca'){
        var modelo = document.getElementById("modelo").value;
        var año = document.getElementById("año").value;
        var precio = document.getElementById("precio").value;
        var color = document.getElementById("color").value;
        var combustible = document.querySelector('input[name="gas"]:checked').value;
        var transmision = document.querySelector('input[name="transmision"]:checked').value;


        Database.push({
            marca: marca,
            modelo: modelo,
            año: año,
            precio: precio,
            combustible: combustible,
            transmision: transmision,
            tipoVehiculo: tipoVehiculo,
            color: color,
            id: '',
            foto: ''
        }).then((snap) => {
            var key = snap.key;
            Database.child(key).update({'id': key});

            document.getElementById("marca").value = "";
            document.getElementById("modelo").value = "";
            document.getElementById("año").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("color").value = "";
            document.getElementById("tipoVehiculo").value = "";


            alert("Pentakill");
        });
    }else{
        Database.push({
            marca: marca,
            foto: foto,
            tipoVehiculo: tipoVehiculo
           
        }).then((snap) => {
            document.getElementById("marca").value = "";
            document.getElementById("tipoVehiculo").value = "";
            alert("Pentakill");
        });
    }

}



Dropzone.options.foto = {
    url: '/post',
    transformFile: function(file, done) {
        var image = new Image();
        image.src = URL.createObjectURL(file);
        console.log(image);
        console.log("-----");
        console.log(file);
    }
};






















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