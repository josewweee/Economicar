var nuevo_html = '<div data-v-2d184876="" id="DeckForCars" class="mini-card-deck">';
var nuevo_html_SUV = "";

function modelosHTML(marca){
   
    if(marca == 'bmw'){
        numAutomoviles = 5;
        numSuv = 5;
        this.nuevo_html = '<div data-v-2d184876="" id="DeckForCars" class="mini-card-deck">';
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
        this.nuevo_html = '<div data-v-2d184876="" id="DeckForCars" class="mini-card-deck">';
        this.nuevo_html_SUV = "";
        this.cambiarHtml(numAutomoviles, numSuv, modelos_marca_auto, precios_marca_auto, foto_auto);
        document.getElementById("htmlAutomoviles").innerHTML = this.nuevo_html;
        document.getElementById("htmlCamionetas").innerHTML = this.nuevo_html_SUV;
    }   
}

function cambiarHtml(numAutomoviles, numSuv, modelos_marca_auto, precios_marca_auto, foto_auto){
    for(var i = 0; i < numAutomoviles; i++){
        this.nuevo_html +=  '<label data-v-2d184876="" for="model417" class="vehicle mini-card" onclick="escogerModelo('+"'"+modelos_marca_auto[i]+"'"+', '+"'"+foto_auto[i]+"'"+', '+"'"+precios_marca_auto[i]+"'"+');">'
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
    this.nuevo_html += '<div data-v-2d184876="" class="vehicle mini-card d-flex justify-content-center">'
    +'<a data-v-2d184876="" href="/join-a-carbucket/model-not-available" class="">'
      +'<label data-v-2d184876="" class="m-0" style="position: relative;" onclick="escogerModelo('+"'null'"+');">'
       + '<img data-v-2d184876="" src="images/wizard/transparent.svg"> '
       + '<div data-v-2d184876="" class="make-not-available text-dark">'
       + '¿No Ves <br data-v-2d184876=""> Tu Modelo?.'
       + '</div>'
       + '</label>'
       + '</a>'
       + '</div>' 
        +'</div>'
       + '</div>';

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
}