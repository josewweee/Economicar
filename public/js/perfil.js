var userKey = localStorage.getItem('KEY');
console.log(userKey);
var SearchRef = firebase.database().ref("USUARIOS/" + userKey+"/pedidos");
var nombre, apellido, telefono, ciudad, color1, color2, correo, marca, modelo, transmision
var html_vehiculos = "";
var arregloPedidos=[];
SearchRef.orderByChild("id").once("value").then((snapshot) =>{
   /*  nombre = snapshot.val().nombre;
    apellido = snapshot.val().apellido;
    telefono = snapshot.val().telefono;
    ciudad = snapshot.val().ciudad; 
    correo = snapshot.val().correo;*/

    /* color1 = snapshot.val().color1;
    color2 = snapshot.val().color2; */
    
   /*  marca = snapshot.val().marca;
    modelo = snapshot.val().modelo;
    transmision = snapshot.val().transmision;
    foto = snapshot.val().foto;
    precio = snapshot.val().precio; */
    arregloPedidos.push(Object.values( snapshot.val() ));
    arregloPedidos = arregloPedidos[0];
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
    console.log(repeticiones);
    for (var i = 0; i < repeticiones; i++){
            var vehiculoActual = this.arregloPedidos[i].data;
                console.log(this.arregloPedidos[i].data.apellido);
                this.html_vehiculos +='<div class="card-text" style="margin-bottom: 50px;">'
                +'<div class="row">'
                 + '<div class="col-12">'
                  +  '<dl style="text-align: center;">'
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
                        +    vehiculoActual.transmision
                         + '</p>'
                       + '</figcaption>'
                      +'</figure>'
                    +'</div>'
                  +'</div>'
                +'</div>'
              +'</div>';
    }

    document.getElementById("listaVehiculos").innerHTML = this.html_vehiculos;
}