//MODIFICAMOS EL HTML CON LA INFO DE LA BASE DE DATOS
var datos, datos2;
var htmlCarros = '';
var baseDeDatos = firebase.database().ref('GRUPOS');
var DBmarcas = firebase.database().ref('VEHICULOS/marcas');
var arregloMarcasDB = [];
DBmarcas.on('value', function(snapshot) {
    datos2 = snapshot.val();
    arregloMarcasDB = Object.values(datos2);
    this.VerCarros()
});


//VEMOS TODOS LOS CARROS DE LA BASE DE DATOS Y CAMBIAMOS EL HTML
function VerCarros(){
    baseDeDatos.on('value', function(snapshot) {
        datos = snapshot.val();
        var arregloDatos = Object.values(datos);
        arregloDatos = arregloDatos.filter(x => x.tipoVehiculo.includes("carro"));
        htmlCarros = '';
        var arregloMarcasAgregadas = [];
        for(var i=0; i < arregloDatos.length; i++){
            var marca = arregloDatos[i].marca;
            arregloMarcasAgregadas.filter(x => x == marca);
            if ( arregloMarcasAgregadas.length < 1 ){
                var grupo = arregloDatos.filter(x => x.marca.includes( marca ) );
                var pedidos = Object.values( grupo[0].infoPedidos );
                var contPedidos = pedidos.length;
                var datosMarca = arregloMarcasDB.find(x => x.nombre.includes(marca) );
                arregloMarcasAgregadas.push(marca);
                htmlCarros += '<div class="row  text-center">'
                + '<div class="col-md-12">'
                +' <div class="card shadow">'
                    + '<div class="card-body">'
                        + ' <div class="row">'
                        +'<hr>'
                           + '<div class="col-md-3 text-center border-right">'
                                +'<img src="'+datosMarca.foto+'" style="width: 80%;">'
                            + '</div>'
                            + '<div class="col-md-6 border-right" style="padding-top:70px;">'
                            +    '<h5 class="text-uppercase text-primary ">'+contPedidos+'  Medellín</h5>'
                            +    '<button type="button" class="btn btn-outline-primary btn-sm" data-toggle="collapse" data-target="#demo'+i+'">Ver Pedidos</button>'
                            +   '<div id="demo'+i+'" class="collapse">'
                            +   '<br>'
                            +   '<h2 class="title">Pedidos</h2>';
                            for (var j=0; j < pedidos.length; j++){
                                htmlCarros +='<div class="row" style="text-align: left;">'
                                +            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'
                                +                '<ul style="display:block; text-align: center;">'
                                +                    '<li>'
                                +                       '<img srcset="'+pedidos[j].data.foto+'" class="fotoPedidoSubasta" style="width:50%;">'
                                +                    '</li>'                                      
                                +                    '<li>'
                                +                       '<strong>Modelo:  </strong>' + pedidos[j].data.modelo
                                +                    '</li>'
                                +                    '<li>'
                                +                        '<strong>Color:  </strong>' + pedidos[j].data.color1
                                +                    '</li>'
                                +                    '<li>'
                                +                      '<strong>Combustible:  </strong>' + pedidos[j].data.gas
                                +                    '</li>'
                                +                    '<li>'
                                +                      '<strong>Año:  </strong>' + pedidos[j].data.año
                                +                    '</li>'                                                           
                                +                '</ul>'
                                +            '</div>'
                                +        '</div>';
                            }

                            htmlCarros +='</div>'
                            + '</div>'
                            + '<div class="col-md-3" style="padding-top:70px;">'
                            +    '<div class="form-group border border-warning">'
                            +        '<input type="text" id="valorPuja'+i+'" class="form-control" placeholder="Tu Valor De Venta">'
                            +   ' </div>'
                            +    '<h3>' +Number(arregloDatos[i].precio).toLocaleString('es', {useGrouping:true}) +'</h3>'
                            +    '<div class="sub-row">'
                             +        '<button type="button" class="btn btn-success" onclick="RevisarPuja('+"'"+arregloDatos[i].id+"'"+','+i+')"><i class="fa fa-check"></i>Pujar</button>'
                            +    '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div>';
            }
        }
        document.getElementById("listaVehiculos").innerHTML = htmlCarros;
    });
}


//PASAMOS EL HTML A MOTOS Y FILTRAMOS LOS VEHICULOS
function VerMotos(){
    baseDeDatos.on('value', function(snapshot) {
        datos = snapshot.val();
        var arregloDatos = Object.values(datos);
        arregloDatos = arregloDatos.filter(x => x.tipoVehiculo.includes("moto"));
        htmlCarros = '';
        var arregloMarcasAgregadas = [];
        for(var i=0; i < arregloDatos.length; i++){
            var marca = arregloDatos[i].marca;
            arregloMarcasAgregadas.filter(x => x == marca);
            if ( arregloMarcasAgregadas.length < 1 ){
                var grupo = arregloDatos.filter(x => x.marca.includes( marca ) );
                var pedidos = Object.values( grupo[0].infoPedidos );
                var contPedidos = pedidos.length;
                var datosMarca = arregloMarcasDB.find(x => x.nombre.includes(marca) );
                arregloMarcasAgregadas.push(marca);
                htmlCarros += '<div class="row  text-center">'
                + '<div class="col-md-12">'
                +' <div class="card shadow">'
                    + '<div class="card-body">'
                        + ' <div class="row">'
                        +'<hr>'
                           + '<div class="col-md-3 text-center border-right">'
                                +'<img src="'+datosMarca.foto+'" style="width: 80%;">'
                            + '</div>'
                            + '<div class="col-md-6 border-right" style="padding-top:70px;">'
                            +    '<h5 class="text-uppercase text-primary ">'+contPedidos+'  Medellín</h5>'
                            +    '<button type="button" class="btn btn-outline-primary btn-sm" data-toggle="collapse" data-target="#demo'+i+'">Ver Pedidos</button>'
                            +   '<div id="demo'+i+'" class="collapse">'
                            +   '<br>'
                            +   '<h2 class="title">Pedidos</h2>';
                            for (var j=0; j < pedidos.length; j++){
                                htmlCarros +='<div class="row" style="text-align: left;">'
                                +            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'
                                +                '<ul style="display:block; text-align: center;">'
                                +                    '<li>'
                                +                       '<img srcset="'+pedidos[j].data.foto+'" class="fotoPedidoSubasta" style="width:50%;">'
                                +                    '</li>'                                      
                                +                    '<li>'
                                +                       '<strong>Modelo:  </strong>' + pedidos[j].data.modelo
                                +                    '</li>'
                                +                    '<li>'
                                +                        '<strong>Color:  </strong>' + pedidos[j].data.color1
                                +                    '</li>'
                                +                    '<li>'
                                +                      '<strong>Combustible:  </strong>' + pedidos[j].data.gas
                                +                    '</li>'
                                +                    '<li>'
                                +                      '<strong>Año:  </strong>' + pedidos[j].data.año
                                +                    '</li>'                                                           
                                +                '</ul>'
                                +            '</div>'
                                +        '</div>';
                            }

                            htmlCarros +='</div>'
                            + '</div>'
                            + '<div class="col-md-3" style="padding-top:70px;">'
                            +    '<div class="form-group border border-warning">'
                            +        '<input type="text" id="valorPuja'+i+'" class="form-control" placeholder="Tu Valor De Venta">'
                            +   ' </div>'
                            +    '<h3>' +parseInt(arregloDatos[i].precio).toLocaleString('es', {useGrouping:true}) +'</h3>'
                            +    '<div class="sub-row">'
                             +        '<button type="button" class="btn btn-success" onclick="RevisarPuja('+"'"+arregloDatos[i].id+"'"+','+i+')"><i class="fa fa-check"></i>Pujar</button>'
                            +    '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div>';
            }
        }
        document.getElementById("listaVehiculos").innerHTML = htmlCarros;
    });
}


//ACA REVISAMOS QUE LA PUJA SEA MAYOR Y LA ENVIAMOS A LA BASE DE DATOS
function RevisarPuja(key,i){
    var valorPuja = document.getElementById("valorPuja"+i).value;
    valorPuja = parseInt(valorPuja);
    var rutaDb = firebase.database().ref('GRUPOS').child(key);
    rutaDb.on('value', function(snapshot) {
        info = snapshot.val();
        var MaximaPuja = parseInt(info.precio);
        if(valorPuja < MaximaPuja){
            EnviarValorPuja(key, valorPuja);
        }
    });  
}

function EnviarValorPuja(key, valorPuja){
    var rutaDb = firebase.database().ref('GRUPOS').child(key);
    rutaDb.update({
        precio: valorPuja
    });
}

//MOVEMOS EL TAMAÑO DEL LOGO DEL NAV BAR Y OTRAS COSAS SI ESTAMOS EN MOVIL

var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    isMobile = true;
   }
if(isMobile){
    var logoNavBar = document.getElementById("logoNavBar");
    logoNavBar.style.margin = '10px';

    var a_logoNavBar = document.getElementById("hreflogoNavBar");
    a_logoNavBar.style.cssFloat = 'initial';
}
