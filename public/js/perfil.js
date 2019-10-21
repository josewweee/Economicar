var userKey = localStorage.getItem('KEY');
console.log(userKey);
var SearchRef = firebase.database().ref("USUARIOS/" + userKey+"/pedidos");
var nombre, apellido, telefono, ciudad, color1, color2, correo, marca, modelo, transmision
var html_vehiculos = "";
var arregloPedidos=[];
SearchRef.orderByChild("id").once("value").then((snapshot) =>{

    arregloPedidos.push(Object.values( snapshot.val() ));
    arregloPedidos = arregloPedidos[0];
    console.log(arregloPedidos);
    this.htmlVehiculos();
    /* console.log(arregloPedidos) */
    /* document.getElementById("nombreCarro").innerHTML = marca + " " +  modelo;
    document.getElementById("transmisionCarro").innerHTML = transmision;
    document.getElementById("colorCarro").innerHTML = color1 + '<p class="option-number"> Opción 1 </p>';
    document.getElementById("colorCarro_op2").innerHTML = color2 + '<p class="option-number"> Opción 2 </p>';
    document.getElementById("fotoOpcion1").src = foto;
    document.getElementById("fotoOpcion2").src = foto; */
    
   });

   function GuardarCambios(){
       alert("AUN NO DISPONIBLE");
   }


function htmlVehiculos() {
    var repeticiones = this.arregloPedidos.length;
    for (var i = 0; i < repeticiones; i++){
            var vehiculoActual = this.arregloPedidos[i].data;
                console.log(vehiculoActual.estado);
                this.html_vehiculos +='<div class="card-text" style="margin-bottom: 50px;">'
                +'<div class="row">'
                 + '<div class="col-12">'
                  +  '<dl style="text-align: center;">'
                  + '<span class="circle-with-text-outline" style="margin-left: 80%;">'+vehiculoActual.estado+'</span>'
                   +   '<dt class="key">Comprando:</dt>'
                    +  '<dd class="value" id="nombreCarro">'
                    + vehiculoActual.marca + " " + vehiculoActual.modelo
                     + '</dd>'
                    +'</dl>'
                 + '</div>'
                +'</div>'
                +'<div class="vehicle-img mx-auto pt-3">'
                 + '<div class="row text-center">'
                   + '<div class="col-6 col-md-4 mx-auto">'
                    +  '<figure>'
                     +   '<img id="fotoOpcion1" src="'+vehiculoActual.foto+'" class="img-fluid">'
                      +  '<figcaption class="color-name text-center" id="colorCarro">'
                       +   '<p class="option-number">'
                        +    vehiculoActual.version
                         + '</p>'
                       + '</figcaption>'
                      +'</figure>'
                    +'</div>'
                  +'</div>'
                +'</div>'
                +'<button type="button" class="btn btn-outline-primary btn-sm" data-toggle="collapse" data-target="#demo'+i+'" style="margin: auto; display: block;">Pasos a seguir</button>'
                  +'<div id="demo'+i+'" class="collapse">'
                  +'<h2 class="title" style="text-align:center;">Instrucciones</h2>'
                  +'<div class="row" style="text-align: left;">'
                    +'<ol>'
                      +'<li>'
                        +'El grupo terminara <strong class="text-underline">el último día del mes</strong> a las 11:59pm.'
                      +'</li>'
                      +'<li>'
                        +'Te mandaramos la informacion del concesionario ganador <strong class="text-underline">el dia 7 del nuevo mes</strong>'
                      +'</li>'
                      +'<li>'
                        +'Recibiras un correo que debes <strong class="text-underline">imprimir o mostrar en el concesionario </strong> el dia <strong'
                          +'class="text-underline">de la prueba de conducción</strong>'
                      +'</li>'
                      +'<li>'
                        +'Haz la prueba de conducción en el concesionario ganador '
                          +'<strong class="text-underline">desde el día 7</strong> Hasta el <strong class="text-underline">dia 14'
                          +'</strong> .Recuerda que no estas obligado a comprar el vehiculo.'
                      +'</li>'
                      +'<li>'
                        +'Califica el servicio del concesionario y tu experiencia general en economicar. al final del dia nos basamos en nuestra'
                        +'comunidad para mantener los concesionarios honestos.'
                      +'</li>'
                    +'</ol>'
                  +'</div>'
                  +'</div>'
                +'<hr>'
              +'</div>';
    }

    document.getElementById("listaVehiculos").innerHTML = this.html_vehiculos;
}