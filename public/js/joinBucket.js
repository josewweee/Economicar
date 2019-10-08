var nuevo_html ="";
var nuevo_html_SUV = "";
var HTMLvehiculos_movil = "";
var HTMLmarcas_movil = "";
var HTMLtransmisicion_movil = "";
var HTMLcolor_movil = "";
var is_mobile = false;
var yaEntramosTransm = false;
var yaEntramosColor = false;
var arregloCarros = [];
var arregloMotos = [];
var arregloMarcas = [];
var arregloVehiculos = [];
var vehiculoActual;
var SearchRef;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  is_mobile = true;
 }

 if(is_mobile){
  document.getElementById("seleccionVehiculo").style.display='none';
  document.getElementById("appVersion").classList.remove('position-fixed');
  this.HTMLvehiculos_movil = '<div data-v-4fa46acd="" class="card-body p-0 pb-3"><div data-v-2479578e="" id="seleccionVehiculo" class="col align-items-center" data-v-4fa46acd=""><div data-v-2479578e="" class="mini-card-deck">';
  this.CambiarHtmlVehiculos();
  this.HTMLvehiculos_movil += '</div>' + '</div>' + '</div>';
  document.getElementById("seleccionarVehiculoCollapse").innerHTML = this.HTMLvehiculos_movil;
  
 }


//TOMAMOS LA INFORMACION DE LA BASE DE DATOS
$('body').append('<div id="over" style="position: absolute;top:0;left:0;width: 100%;height:100%;z-index:2;opacity:0.4;filter: alpha(opacity = 50)"></div>');

SearchRef = firebase.database().ref("VEHICULOS/motos");
SearchRef.orderByChild("id").on("child_added", function(snapshot) {
  this.arregloMotos.push( snapshot.val() );
});

SearchRef = firebase.database().ref("VEHICULOS/marcas");
SearchRef.orderByChild("id").on("child_added", function(snapshot) {
  this.arregloMarcas.push( snapshot.val() );
});

SearchRef = firebase.database().ref("VEHICULOS/carros");
SearchRef.orderByChild("id").on("child_added", function(snapshot) {
  this.arregloCarros.push( snapshot.val() );
  //eliminamos el loader
  document.getElementById("loader").style.display = "none";
  $("#over").remove();
});



//HTML DE MODELO CARROS
function ModelosHTML(marca, tipo){
  var arregloMarcas, tipos, foto_auto;
  if ( tipo == 'carros' ) {
    arregloMarcas = this.arregloCarros.filter( x => x.marca == marca );
    this.arregloVehiculos = arregloMarcas;
    tipos = [];
    for(var m=0; m < arregloMarcas.length; m++) { tipos.push(arregloMarcas[m].tipoVehiculo); }

     /*  var modelos_marca_auto = ["Sail", "Spark GT", "Beat", "Onix sedan", "Onix", "Cruze", "Camaro six SS"];
      var precios_marca_auto = ["31.990.000", "33.990.000", "35.990.000", "45.290.000", "45.990.000", "65.990.000", "165.000.000"]; */
      foto_auto = ["images/cars/sail.webp", "images/cars/sparkGt.webp", "images/cars/beat.webp", "images/cars/onixSedan.webp", "images/cars/onix.webp", "images/cars/cruze.webp", "images/cars/camaroSS.webp"];
    } else {
      arregloMarcas = this.arregloMotos.filter( x => x.marca == marca );
      this.arregloVehiculos = arregloMarcas;
      tipos = [];
      for(var u=0; u < arregloMarcas.length; u++) { tipos.push(arregloMarcas[u].tipoVehiculo); }
      /* var modelos_marca_auto = ["Dream Neo 110", "CB 110 SDT", "CD 110 DLX", "CB 125F", "CB 160F", "CB 160F TD", "CB 160F DLX"];
      var precios_marca_auto = ["3.899.000", "4.190.000", "4.390.000", "4.590.000", "6.690.000", "7.350.000", "8.999.000"]; */
      foto_auto = ["images/motos/dreamNeo110Honda.png", "images/motos/cb110Sdt.png", "images/motos/cb110dlx.png", "images/motos/cb125f.png", "images/motos/cb160fstd.png", "images/motos/cb160fdlx.png", "images/motos/cb190r.png"];
    }
    if(this.is_mobile){
      document.getElementById("WizardVehicleModelSelect").classList.add('show');
      document.getElementById("appVersion").classList.remove('position-fixed');
      this.nuevo_html = '<div class="card-body p-0 pb-3">'
      +'<div id="VehicleModelSelect" class="col" data-v-4fa46acd="">'
      +' <div class="row">'
        +'<div class="col">'
         +'<div>'
         +'<div id="DeckForCars" class="mini-card-deck">';
    }else{
      this.nuevo_html = '<div data-v-2d184876="" id="DeckForCars" class="mini-card-deck">';
  }


  for (var k = 0; k< tipos.length; k++) {
    var vehiculos = arregloMarcas;
    //mayuscula inicial
    var textoTipos = tipos[k].charAt(0).toUpperCase() + tipos[k].slice(1)
    this.nuevo_html += '<div class="ml-md-3 py-2"><h3>'+textoTipos+'</h3></div>';
    this.nuevo_html += '<div data-v-2d184876="" id="DeckForCars" class="mini-card-deck">';

    var filtroVehiculos = vehiculos.filter(x => x.tipoVehiculo == tipos[k]);
    var modelos_marca_auto = [];
    for(var j=0; j < filtroVehiculos.length; j++) { modelos_marca_auto.push(filtroVehiculos[j].modelo); }
    var precios_marca_auto = [];
    for(var p=0; p < filtroVehiculos.length; p++) { precios_marca_auto.push( filtroVehiculos[p].precio ); }
    var id_autos = [];
    for(var l=0; l < filtroVehiculos.length; l++) { id_autos.push( filtroVehiculos[l].id ); }
    /* var foto_auto = [];
    for(var i=0; i < filtroVehiculos.length; i++) { foto_auto.push( filtroVehiculos[i].foto ); } */
    /*var foto_auto = ["images/cars/sail.webp", "images/cars/sparkGt.webp", "images/cars/beat.webp", "images/cars/onixSedan.webp", "images/cars/onix.webp", "images/cars/cruze.webp", "images/cars/camaroSS.webp"]; */

    //MODELOS DE CARROS
    for(var i = 0; i < modelos_marca_auto.length; i++){
      var id = filtroVehiculos[i].id;
      this.nuevo_html +=  '<label class="vehicle mini-card" onclick="irVista( '+"'"+'VehicleModelSelect'+"'" +', '+"'"+'TransmisionVehiculo'+"'" +', '+"'"+'botonModelo'+"'" +', '+"'"+'botonTransmision'+"'" +', '+"'"+'number2'+"'" +', '+"'"+'number3'+"'" +', '+'null'+', [ '+"'"+modelos_marca_auto[i]+"'" +','+ "'"+foto_auto[i]+"'"+','+ "'"+precios_marca_auto[i]+"'"+','+ "'"+id_autos[i]+"'"+']);CambiarHtmlTransmision('+"'"+id+"'"+');">'
      +'<div class="model-name text-center">'+modelos_marca_auto[i]+'</div> '
    +'<picture data-v-3d61cc42="" data-v-2d184876="">'
        +'<img data-v-3d61cc42="" src="'+foto_auto[i]+'" class="opacity-100"> </picture> '
        +'<div data-v-2d184876="" class="d-flex justify-content-between align-items-center">'
         +' <small data-v-2d184876="">'+'MSRP'+'</small> '
         + '<div data-v-2d184876="" class="price">'+'$'+precios_marca_auto[i]+'*'+'</div>'
       + '</div>'
    + '</label>';
  }
  //BOTON DE NO ENCUENTRO MI MARCA
  this.nuevo_html += '<div data-v-2d184876="" class="vehicle mini-card d-flex justify-content-center">'
    +'<label data-v-2d184876="" class="m-0" style="position: relative;">'
     + '<img data-v-2d184876="" src="images/wizard/transparent.svg"> '
     + '<div data-v-2d184876="" class="make-not-available text-dark">'
     + '¿No Ves <br data-v-2d184876=""> Tu Modelo?.'
     + '</div>'
     + '</label>'
     + '</div>' 
      +'</div>'
     + '</div>';
  }

    //SOLO MOVIL
    if(is_mobile){
      this.nuevo_html += '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
    }

    if(this.is_mobile == false){
      document.getElementById("htmlAutomoviles").innerHTML = this.nuevo_html;
    }else{
      document.getElementById("VehicleModelSelect").style.display='none';
      document.getElementById("WizardVehicleModelSelect").innerHTML = this.nuevo_html;
    }
}


function CambiarHtmlVehiculos(){
  HTMLvehiculos_movil += '<div id="loader" style="display: block;"></div>'
  + '<label class="mini-card" onclick="irVista( '+"'"+'seleccionVehiculo'+"'" +', '+"'"+'VehicleMakeSelect'+"'" +', '+"'"+'botonVehiculo'+"'" +', '+"'"+'botonMarca'+"'" +', '+"'"+'number0'+"'" +', '+"'"+'number1'+"'" +', '+'seleccionVehiculo'+', [  '+"'"+'motos'+"'" +' ]);CambiarHtmlMarcas( '+"'"+'motos'+"'" +')">'
  + '<picture>'
   +  '<source media="(min-width: 768px)" srcset="images/seleccionMotos.png">'
   +  '<img srcset="images/seleccionMotos.png, images/seleccionMotos.png"'
   +    'alt="Motos" class="px-3" style="padding-top: 30px;">'
  + '</picture>'
  + '<span class="make-name text-center font-weight-normal">Motos</span>'
+' </label>'
 +'<label class="mini-card" onclick="irVista( '+"'"+'seleccionVehiculo'+"'" +', '+"'"+'VehicleMakeSelect'+"'" +', '+"'"+'botonVehiculo'+"'" +', '+"'"+'botonMarca'+"'" +', '+"'"+'number0'+"'" +', '+"'"+'number1'+"'" +', '+'seleccionVehiculo'+', [  '+"'"+'carros'+"'" +' ]);CambiarHtmlMarcas( '+"'"+'carros'+"'" +')">'
  + '<picture>'
   +  '<source media="(min-width: 768px)" srcset="images/seleccionCarros.png">'
   +  '<img srcset="images/seleccionCarros.png, images/seleccionCarros.png"'
   +    'alt="Motos" class="px-3" style="padding-top: 30px;">'
  + '</picture>'
  + '<span class="make-name text-center font-weight-normal">Carros</span>'
+' </label>';
   
}

function CambiarHtmlMarcas(vehiculo){
  if( is_mobile ){
      document.getElementById("VehicleMakeSelect").style.display='none';
      document.getElementById("VehicleSelectCollapse").classList.add('show');
      this.HTMLmarcas_movil = '<div class="card-body p-0 pb-3"><div id="VehicleMakeSelect" class="col align-items-center"><div class="mini-card-deck">';
  }else{
    this.HTMLmarcas_movil = '<div class="mini-card-deck">';
  }

      if ( vehiculo == 'carros' ) 
      {
        //FILTRAMOS SOLO LAS MARCAS DE CARROS
        var arregloMarcas = this.arregloMarcas.filter( x => x.vehiculo == "carros" );
        var fotoMarcas = [];
        for(var i=0; i < arregloMarcas.length; i++) { fotoMarcas.push(arregloMarcas[i].foto); }
        var nombreMarcas = [];
        for(var i=0; i < arregloMarcas.length; i++) { nombreMarcas.push( arregloMarcas[i].nombre ); }
    
        for(var i=0; i < fotoMarcas.length; i++){
          HTMLmarcas_movil += '<label class="mini-card" onclick="irVista( '+"'"+'VehicleMakeSelect'+"'" +', '+"'"+'VehicleModelSelect'+"'" +', '+"'"+'botonMarca'+"'" +', '+"'"+'botonModelo'+"'" +', '+"'"+'number1'+"'" +', '+"'"+'number2'+"'" +', '+'null'+', [ '+"'"+nombreMarcas[i]+"'"+' ]);ModelosHTML('+"'"+nombreMarcas[i]+"'"+', '+"'"+'carros'+"'" +');">'
            + '<picture data-v-d007eb68="" data-v-2479578e="">'
            +' <source data-v-d007eb68="" media="(min-width: 768px)" srcset="images/brands/chevrolet@2x.png">'
            + '<img data-v-d007eb68="" srcset="'+"'"+fotoMarcas[i]+"'"+', images/brands/chevrolet@2x.png 2x" alt="Chevrolet" class="px-3">'
            + ' </picture>'
            +'<span data-v-2479578e="" class="make-name text-center font-weight-normal">'+nombreMarcas[i]+'</span>'
            +'</label>';
        }
        HTMLmarcas_movil += '<div data-v-2479578e="" class="mini-card">'
            +'<a data-v-2479578e="" href="" class="">'
              +'<label data-v-2479578e="" class="m-0" style="position: relative;">'
              + '<img data-v-2479578e="" src="images/wizard/transparent.svg">'
                +'<div data-v-2479578e="" class="make-not-available text-dark">'
                + '¿No ves <br data-v-2479578e=""> tu marca?'
                +'</div>'
              +'</label>'
          + '</a>'
        + '</div>';
      }else {
        //FILTRAMOS SOLO LAS MARCAS DE MOTOS
        var arregloMarcas = this.arregloMarcas.filter( x => x.vehiculo == "motos" );
        var fotoMarcas = [];
        for(var i=0; i < arregloMarcas.length; i++) { fotoMarcas.push(arregloMarcas[i].foto); }
        var nombreMarcas = [];
        for(var i=0; i < arregloMarcas.length; i++) { nombreMarcas.push( arregloMarcas[i].nombre ); }

        for(var i=0; i < fotoMarcas.length; i++){
          HTMLmarcas_movil += '<label class="mini-card" onclick="irVista( '+"'"+'VehicleMakeSelect'+"'" +', '+"'"+'VehicleModelSelect'+"'" +', '+"'"+'botonMarca'+"'" +', '+"'"+'botonModelo'+"'" +', '+"'"+'number1'+"'" +', '+"'"+'number2'+"'" +', '+'null'+', [ '+"'"+nombreMarcas[i]+"'"+' ]);ModelosHTML('+"'"+nombreMarcas[i]+"'"+', '+"'"+'motos'+"'" +');">'
            + '<picture data-v-d007eb68="" data-v-2479578e="">'
            +' <source data-v-d007eb68="" media="(min-width: 768px)" srcset="images/brands/hondaMoto.png">'
            + '<img data-v-d007eb68="" srcset="'+"'"+fotoMarcas[i]+"'"+', images/brands/hondaMoto.png 2x" alt="HOnda" class="px-3">'
            + ' </picture>'
            +'<span data-v-2479578e="" class="make-name text-center font-weight-normal">'+nombreMarcas[i]+'</span>'
            +'</label>';
        }
        HTMLmarcas_movil += '<div data-v-2479578e="" class="mini-card">'
            +'<a data-v-2479578e="" href="" class="">'
              +'<label data-v-2479578e="" class="m-0" style="position: relative;">'
              + '<img data-v-2479578e="" src="images/wizard/transparent.svg">'
                +'<div data-v-2479578e="" class="make-not-available text-dark">'
                + '¿No ves <br data-v-2479578e=""> tu marca?'
                +'</div>'
              +'</label>'
          + '</a>'
        + '</div>';
      }
      this.HTMLmarcas_movil += '</div>' + '</div>' + '</div>';
      if( is_mobile ){
        document.getElementById("VehicleSelectCollapse").innerHTML = this.HTMLmarcas_movil;
      }else{
        document.getElementById("VehicleMakeSelect").innerHTML = this.HTMLmarcas_movil;
      }
  }
   

function CambiarHtmlTransmision(id){

  var automatico = false;
  var mecanico = false;
  this.vehiculoActual = this.arregloVehiculos.filter(x => x.id == id);
  console.log(this.vehiculoActual);
  var vehiculoActual = (this.vehiculoActual[0].transmision).toString();
  
 /*  var index = vehiculos.map(function (img) { return img.id; }).indexOf(id); */
  if ( vehiculoActual.includes("automatic") ) { automatico = true;}
  if ( vehiculoActual.includes("manual") ) { mecanico = true;}

  if(this.is_mobile && !this.yaEntramosTransm){
    document.getElementById("TransmisionVehiculo").style.display='none';
    document.getElementById("WizardVehicleTransmissionSelect").classList.add('show');

    this.HTMLtransmisicion_movil += '<div class="card-body p-0 pb-3" >'
    + '<div id="TransmisionVehiculo" class="col" >'
      + '<div class="row">'
      +'<div class="col col-lg-6">'
      +'<div class="mini-card-pair text-center">';
      if( automatico ){
        this.HTMLtransmisicion_movil +='<label data-value="automatic" class="mini-card" onclick="irVista( '+"'"+'TransmisionVehiculo'+"'" +', '+"'"+'VehicleColorSelect'+"'" +', '+"'"+'botonTransmision'+"'" +', '+"'"+'botonColor'+"'" +', '+"'"+'number3'+"'" +', '+"'"+'number4'+"'" +', '+'null'+', [ '+"'"+'automatico'+"'" +' ]);CambiarHtmlColor()">'
           + '<picture class="mb-3 p-1">'
             + '<img src="images/automatic.png" alt="">'
           + '</picture>'
           +   'Automatico'
      +'</label>';
      }
      
      if ( mecanico ) {
        this.HTMLtransmisicion_movil +='<label data-value="manual" class="mini-card" onclick="irVista( '+"'"+'TransmisionVehiculo'+"'" +', '+"'"+'VehicleColorSelect'+"'" +', '+"'"+'botonTransmision'+"'" +', '+"'"+'botonColor'+"'" +', '+"'"+'number3'+"'" +', '+"'"+'number4'+"'" +', '+'null'+', [ '+"'"+'manual'+"'" +' ]);CambiarHtmlColor()">'
           + '<picture class="mb-3 p-1">'
            + ' <img src="images/manual.png" alt="" style="height: 100%;">'
            +'</picture>'
            + ' Manual'
      +'</label>';
      }
      
        +'</div>' +'</div>'+'</div>'+'</div>'+'</div>';
        document.getElementById("WizardVehicleTransmissionSelect").innerHTML = this.HTMLtransmisicion_movil;
        this.yaEntramosTransm = true;
        this.HTMLtransmisicion_movil = "";
  }else if ( !this.yaEntramosTransm ) {
    var htmlTransmision = "";
    if( automatico ){
      htmlTransmision +='<label data-value="automatic" class="mini-card" onclick="irVista( '+"'"+'TransmisionVehiculo'+"'" +', '+"'"+'VehicleColorSelect'+"'" +', '+"'"+'botonTransmision'+"'" +', '+"'"+'botonColor'+"'" +', '+"'"+'number3'+"'" +', '+"'"+'number4'+"'" +', '+'null'+', [ '+"'"+'automatico'+"'" +' ]);CambiarHtmlColor()">'
         + '<picture class="mb-3 p-1">'
           + '<img src="images/automatic.png" alt="">'
         + '</picture>'
         +   'Automatico'
          +'</label>';
    }
    
    if ( mecanico ) {
      htmlTransmision +='<label data-value="manual" class="mini-card" onclick="irVista( '+"'"+'TransmisionVehiculo'+"'" +', '+"'"+'VehicleColorSelect'+"'" +', '+"'"+'botonTransmision'+"'" +', '+"'"+'botonColor'+"'" +', '+"'"+'number3'+"'" +', '+"'"+'number4'+"'" +', '+'null'+', [ '+"'"+'manual'+"'" +' ]);CambiarHtmlColor()">'
         + '<picture class="mb-3 p-1">'
          + ' <img src="images/manual.png" alt="" style="height: 100%;">'
          +'</picture>'
          + ' Manual'
    +'</label>';
    }

    document.getElementById("htmlTransmision").innerHTML = htmlTransmision;
    this.yaEntramosTransm = true;
    htmlTransmision = "";
  }
}

function CambiarHtmlColor(){
  var vehiculoActual = this.vehiculoActual[0].color;
  console.log(vehiculoActual);
  if(this.is_mobile && !this.yaEntramosColor){
    document.getElementById("VehicleColorSelect").style.display='none';
    document.getElementById("WizardVehicleColorSelect").classList.add('show');

    this.HTMLcolor_movil += '<div data-v-4fa46acd="" class="card-body p-0 pb-3">'
    + '<div data-v-78b4db95="" class="col" data-v-4fa46acd="">'
    + '<div data-v-78b4db95="" class="row">'
    + '<div data-v-78b4db95="" class="col-12 col-xl-6">'
    + '<div data-v-78b4db95="" class="row justify-content-center align-items-center">'
    + '<div data-v-78b4db95="" class="col m-auto">'
    + '<h4 data-v-78b4db95="">Color Primario</h4>'
    + '<select class="custom-select from-control form-control-sm" style="line-height:initial;" name="Color1" id="Color1">'
    + '<option selected value="'+vehiculoActual[0].nombre+'">'+vehiculoActual[0].nombre+'</option>';
    for(var i=1; i < vehiculoActual.length; i++){
      this.HTMLcolor_movil += '<option value="'+vehiculoActual[i].nombre+'">'+vehiculoActual[i].nombre+'</option>';
    }
    this.HTMLcolor_movil +=' </select>'
    + '</div>' + '</div>' + '</div>';

    this.HTMLcolor_movil += '<div data-v-78b4db95="" class="col-12 col-xl-6">'
    +'<div data-v-78b4db95="" class="row justify-content-center align-items-center">'
    +'<div data-v-78b4db95="" class="col m-auto">'
    + '<h4 data-v-78b4db95="">Color Alternativo</h4>'
    + '<select class="custom-select from-control form-control-sm" style="line-height:initial;" name="Color2" id="Color2">'
    + '<option selected value="'+vehiculoActual[0].nombre+'">'+vehiculoActual[0].nombre+'</option>';
    for(var i=1; i < vehiculoActual.length; i++){
      this.HTMLcolor_movil += '<option value="'+vehiculoActual[i].nombre+'">'+vehiculoActual[i].nombre+'</option>';
    }
    this.HTMLcolor_movil +='</select>'
    + '</div>' + '</div>' + '</div>'
    +'</div>' + '</div>' + '</div>';
    document.getElementById("WizardVehicleColorSelect").innerHTML = this.HTMLcolor_movil;
    this.HTMLcolor_movil = "";
    this.yaEntramosColor = true;
  }
}



