var nuevo_html = '<div data-v-2d184876="" id="DeckForCars" class="mini-card-deck">';
var nuevo_html_SUV = "";
var HTMLmarcas_movil = "";
var HTMLtransmisicion_movil = "";
var HTMLcolor_movil = "";
var is_mobile = false;
var yaEntramosTransm = false;
var yaEntramosColor = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  is_mobile = true;
 }

 if(is_mobile){
  document.getElementById("VehicleMakeSelect").style.display='none';
  document.getElementById("appVersion").classList.remove('position-fixed');
  this.HTMLmarcas_movil = '<div data-v-4fa46acd="" class="card-body p-0 pb-3"><div data-v-2479578e="" id="VehicleMakeSelect2" class="col align-items-center" data-v-4fa46acd=""><div data-v-2479578e="" class="mini-card-deck"></div>';
  var fotoMarcas = ["mages/brands/chevrolet.png"];
  var nombreMarcas = ["chevrolet"]
  var numeroMarcas = nombreMarcas.length;
  this.CambiarHtmlMarcas(numeroMarcas, nombreMarcas, fotoMarcas);
  this.HTMLmarcas_movil += '</div>' + '</div>' + '</div>';
  document.getElementById("VehicleSelectCollapse").innerHTML = this.HTMLmarcas_movil;
  
 }


function modelosHTML(marca){
    if(marca == 'bmw'){
        numAutomoviles = 5;
        numSuv = 5;
        this.nuevo_html = '<div data-v-2d184876="" id="DeckForCars" class="mini-card-deck">';
        if(this.is_mobile){
          this.nuevo_html = '<div data-v-4fa46acd="" class="card-body p-0 pb-3">';
          +'<div data-v-2d184876="" id="DeckForCars" class="mini-card-deck">'
          +'<div data-v-2479578e="" id="VehicleMakeSelect" class="col align-items-center" data-v-4fa46acd="">';
        }
        this.nuevo_html_SUV = "";
        this.cambiarHtml(numAutomoviles, numSuv);
        document.getElementById("htmlAutomoviles").innerHTML = this.nuevo_html;
        document.getElementById("htmlCamionetas").innerHTML = this.nuevo_html_SUV;
    }else if(marca = 'chevrolet'){

        var modelos_marca_auto = ["Sail", "Spark GT", "Beat", "Onix sedan", "Onix", "Cruze", "Camaro six SS"];
        var precios_marca_auto = ["31.990.000", "33.990.000", "35.990.000", "45.290.000", "45.990.000", "65.990.000", "165.000.000"];
        var foto_auto = ["images/cars/sail.webp", "images/cars/sparkGt.webp", "images/cars/beat.webp", "images/cars/onixSedan.webp", "images/cars/onix.webp", "images/cars/cruze.webp", "images/cars/camaroSS.webp"];
        numAutomoviles = modelos_marca_auto.length;
        numSuv = 3;
        
        if(this.is_mobile){
          document.getElementById("WizardVehicleModelSelect").classList.add('show');
          document.getElementById("appVersion").classList.remove('position-fixed');
          this.nuevo_html = '<div data-v-4fa46acd="" class="card-body p-0 pb-3">'
          +'<div data-v-2479578e="" id="VehicleModelSelect" class="col" data-v-4fa46acd="">'
          +' <div data-v-2d184876="" class="row">'
            +'<div data-v-2d184876="" class="col">'
             + '<div data-v-2d184876="" class="ml-md-3 py-2">'
               + '<h3 data-v-2d184876="">Carros</h3>'
             + '</div>'
             +'<div data-v-2d184876="" class="d-flex">'
             +'<div data-v-2d184876="" id="DeckForCars" class="mini-card-deck">';
        }else{
          this.nuevo_html = '<div data-v-2d184876="" id="DeckForCars" class="mini-card-deck">';
        }
        
        this.nuevo_html_SUV = "";
        this.cambiarHtml(numAutomoviles, numSuv, modelos_marca_auto, precios_marca_auto, foto_auto);
        if(this.is_mobile == false){
          document.getElementById("htmlAutomoviles").innerHTML = this.nuevo_html;
        }else{
          document.getElementById("VehicleModelSelect").style.display='none';
          document.getElementById("WizardVehicleModelSelect").innerHTML = this.nuevo_html;
        }
        document.getElementById("htmlCamionetas").innerHTML = this.nuevo_html_SUV;
    }   
}





//HTML DE MODELO CARROS
function cambiarHtml(numAutomoviles, numSuv, modelos_marca_auto, precios_marca_auto, foto_auto){

    //MODELOS DE CARROS
    for(var i = 0; i < numAutomoviles; i++){
        this.nuevo_html +=  '<label data-v-2d184876="" for="model417" class="vehicle mini-card" onclick="escogerModelo('+"'"+modelos_marca_auto[i]+"'"+', '+"'"+foto_auto[i]+"'"+', '+"'"+precios_marca_auto[i]+"'"+');CambiarHtmlTransmision();">'
        +'<div data-v-2d184876="" class="model-name text-center">'+modelos_marca_auto[i]+'</div> '
      +'<picture data-v-3d61cc42="" data-v-2d184876="">'
          +'<img data-v-3d61cc42="" src="'+foto_auto[i]+'" class="opacity-100"> </picture> '
          +'<div data-v-2d184876="" class="d-flex justify-content-between align-items-center">'
           +' <small data-v-2d184876="">'+'MSRP'+'</small> '
           + '<div data-v-2d184876="" class="price">'+'$'+precios_marca_auto[i]+'*'+'</div>'
         + '</div> '
         + '<input data-v-2d184876="" id="model417" type="radio" name="model" class="radio-ninja" value="417">'
      + ' </label>';
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
    



    //MODELOS SUV
    if(numSuv >= 1){
        this.nuevo_html_SUV += '<div data-v-2d184876="" id="DeckForSUV/Vans" class="mini-card-deck">';
    }
    for(var j = 1; j < numSuv; j++){
        this.nuevo_html_SUV += '<label data-v-2d184876="" for="model588" class="vehicle mini-card" onclick="escogerModelo('+"'x1'"+');">'
        +'<div data-v-2d184876="" class="model-name text-center">2019 X1</div> '
       +' <picture data-v-3d61cc42="" data-v-2d184876="">'
          +'<img data-v-3d61cc42="" src="https://media.chromedata.com/MediaGallery/media/MjkzODk3Xk1lZGlhIEdhbGxlcnk/on5zQhPIJp7PK9lw_eD-p-GL8sFFSGLht7Rqj3bS2kPPDvX4X14CUVoC0X222lvX59FyjkARJF4/cc_2019BMS250005_01_640_A83.png" class="opacity-100"> </picture> '
          +'<div data-v-2d184876="" class="d-flex justify-content-between align-items-center">'
           + '<small data-v-2d184876="">MSRP</small> '
           + '<div data-v-2d184876="" class="price">$134.950.000*</div>'
          +'</div> '
         + '<input data-v-2d184876="" id="model588" type="radio" name="model" class="radio-ninja" value="588">'
       + '</label>';
    }
    //BOTON NO ENCUENTRO MI MODELO SUV
    if(numSuv >= 1){
        this.nuevo_html_SUV += '<div data-v-2d184876="" class="vehicle mini-card d-flex justify-content-center">'
        +'<a data-v-2d184876="" href="/join-a-carbucket/model-not-available" class="">'
         +'<label data-v-2d184876="" class="m-0" style="position: relative;" onclick="escogerModelo('+"'null'"+');">'
           +'<img data-v-2d184876="" src="images/wizard/transparent.svg"> '
          +' <div data-v-2d184876="" class="make-not-available text-dark">'
      +' ¿No Ves <br data-v-2d184876=""> Tu Modelo.'
                   + '</div>'
               + '</label>'
             +  ' </a>'
           + '</div> '
           + '</div>'
           + '</div>';
    }



    //SOLO MOVIL
    if(is_mobile){
      this.nuevo_html += '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
    }
}


function CambiarHtmlMarcas(numMarcas, nombresMarca, fotosMarca){
  for(var i=0; i < numMarcas; i++){
    HTMLmarcas_movil += '<label data-v-2479578e="" for="make9" class="mini-card" onclick="escogerMarca('+"'"+nombresMarca[i]+"'"+');modelosHTML('+"'"+nombresMarca[i]+"'"+');">'
      + '<picture data-v-d007eb68="" data-v-2479578e="">'
      +' <source data-v-d007eb68="" media="(min-width: 768px)" srcset="images/brands/chevrolet@2x.png">'
      + '<img data-v-d007eb68="" srcset="'+"'"+fotosMarca[i]+"'"+', images/brands/chevrolet@2x.png 2x" alt="Chevrolet" class="px-3">'
      + ' </picture>'
      +'<span data-v-2479578e="" class="make-name text-center font-weight-normal">'+"'"+nombresMarca[i]+"'"+'</span>'
      + '<input data-v-2479578e="" id="make9" type="radio" name="make" class="radio-ninja" value="9">'
      +'</label>';
  }
  HTMLmarcas_movil += '<div data-v-2479578e="" class="mini-card">'
      +'<a data-v-2479578e="" href="/join-a-carbucket/brand-not-available" class="">'
        +'<label data-v-2479578e="" class="m-0" style="position: relative;">'
         + '<img data-v-2479578e="" src="images/wizard/transparent.svg">'
          +'<div data-v-2479578e="" class="make-not-available text-dark">'
           + '¿No ves <br data-v-2479578e=""> tu marca?'
          +'</div>'
        +'</label>'
     + '</a>'
   + '</div>';
   
}

function CambiarHtmlTransmision(){
  if(this.is_mobile && !this.yaEntramosTransm){
    document.getElementById("TransmisionVehiculo").style.display='none';
    document.getElementById("WizardVehicleTransmissionSelect").classList.add('show');

    this.HTMLtransmisicion_movil += '<div data-v-4fa46acd="" class="card-body p-0 pb-3" >'
    + '<div id="TransmisionVehiculo" class="col" data-v-4fa46acd="">'
      + '<div class="row">'
      +'<div class="col col-lg-6">'
      +'<div class="mini-card-pair text-center">'
      +'<label data-value="automatic" class="mini-card" onclick="escogerTransmision('+"'automatico'"+');CambiarHtmlColor()">'
           + '<picture class="mb-3 p-1">'
             + '<img src="images/automatic.png" alt="">'
           + '</picture>'
           +   'Automatico'
         + '</label> '
          +'<label data-value="manual" class="mini-card" onclick="escogerTransmision('+"'manual'"+');CambiarHtmlColor()">'
           + '<picture class="mb-3 p-1">'
            + ' <img src="images/manual.png" alt="" style="height: 100%;">'
            +'</picture>'
            + ' Manual'
        + ' </label>'
        +'</div>' +'</div>'+'</div>'+'</div>'+'</div>';
        document.getElementById("WizardVehicleTransmissionSelect").innerHTML = this.HTMLtransmisicion_movil;
        this.yaEntramos = true;
        this.HTMLtransmisicion_movil = "";
  }
}

function CambiarHtmlColor(){
  if(this.is_mobile && !this.yaEntramosColor){
    document.getElementById("VehicleColorSelect").style.display='none';
    document.getElementById("WizardVehicleColorSelect").classList.add('show');

    this.HTMLcolor_movil += '<div data-v-4fa46acd="" class="card-body p-0 pb-3">'
      +'<div data-v-78b4db95="" class="col" data-v-4fa46acd="">'
       + '<div data-v-78b4db95="" class="row">'
        +'<div data-v-78b4db95="" class="col-12 col-xl-6">'
        +'<div data-v-78b4db95="" class="row justify-content-center align-items-center">'
         + '<div data-v-78b4db95="" class="col m-auto">'
          +  '<h4 data-v-78b4db95="">Color Primario</h4>'
           + '<select class="custom-select from-control form-control-sm" style="line-height:initial;" name="Color1" id="Color1">'
            +    '<option value="Gris Daytona Perla">Gris Daytona Perla</option>'
             +   '<option selected value=">Negro Metalico Mythos" >Negro Metalico Mythos</option>'
              +  '<option value="Metalico Plateado" >Metalico Plateado</option>'
               + '<option value="Blanco Glaciar Metalico" >Blanco Glaciar Metalico</option>'
           +' </select>'
           + '</div>' + '</div>' + '</div>';

    this.HTMLcolor_movil += '<div data-v-78b4db95="" class="col-12 col-xl-6">'
    +'<div data-v-78b4db95="" class="row justify-content-center align-items-center">'
      +'<div data-v-78b4db95="" class="col m-auto">'
           + '<h4 data-v-78b4db95="">Color Alternativo</h4>'
           + '<select class="custom-select from-control form-control-sm" style="line-height:initial;" name="Color2" id="Color2">'
            +    '<option value="Rojo Misano Perla">Rojo Misano Perla</option>'
             +   '<option selected value=">Metalico Plateado" >Metalico Plateado</option>'
              +  '<option value="Gris Daytona Perla" >Gris Daytona Perla</option>'
              + ' <option value="Blanco Glaciar Metalico" >Blanco Glaciar Metalico</option>'
            +'</select>'
            + '</div>' + '</div>' + '</div>'
            +'</div>' + '</div>' + '</div>';
            document.getElementById("WizardVehicleColorSelect").innerHTML = this.HTMLcolor_movil;
            this.HTMLcolor_movil = "";
            this.yaEntramosColor = true;
    }
}



