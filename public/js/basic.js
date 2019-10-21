
var password;
var loggeado = (localStorage.getItem('KEY') != undefined) && (localStorage.getItem("KEY").length > 2) ? true : false
var is_mobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    is_mobile = true;
   }
var pantallaActual = 'VistaLocacion';
var contP
var ventanaMarca = false, ventanaModelo = false, ventanaTransmision = false, ventanaColor = false;
console.log( window.location.href);
var datos = {
    vehiculo: '',
    marca: '',
    modelo: '',
    version: '',
    color1: '',
    color2: '',
    ciudad: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    foto: '',
    precio: '',
    tipoCliente: '',
    financiamiento: '',
    entregaCarro: '',
    idVehiculo: '',
    estado: 1
}; 
var datosAnteriores = JSON.parse(localStorage.getItem('DATOS'));
localStorage.removeItem('DATOS');

//VERSION MOVIL?
this.CambiarHtmlCiudad();


function irVista(VistaActual_STR, VistaDestino_STR, btnActual_STR, btnSiguiente_STR, lblNumeroActual, lblNumeroSiguiente, nombreValor, datos){
    
    if( VistaActual_STR != 'VehicleColorSelect' ) {
        var VistaActual = document.getElementById(VistaActual_STR);
        var VistaDestino = document.getElementById(VistaDestino_STR);
        var Label_index_actual = document.getElementById(lblNumeroActual);
        var Label_index_siguiente = document.getElementById(lblNumeroSiguiente);


        VistaActual.style.display = 'none';
        VistaDestino.style.display = 'block';
        this.pantallaActual = VistaDestino_STR;
    
        //cambio de botones
        Label_index_actual.classList.remove('active');
        Label_index_siguiente.classList.add('active');
        this.iluminarSiguienteBoton(btnActual_STR, btnSiguiente_STR);
    }
    

    switch (VistaActual_STR) {
        case 'seleccionVehiculo':
            this.datos.vehiculo = datos[0];
            break;
        case 'VehicleMakeSelect':
            this.datos.marca = datos[0];
            break;
        case 'VehicleModelSelect':
            this.datos.modelo = datos[0];
            this.datos.foto = datos[1];
            this.datos.precio = datos[2];
            this.datos.id = datos[3];
            break;
        case 'TransmisionVehiculo':
            this.datos.version = datos[0];

            var botonFinalizarProceso = document.getElementById('CompleteStep');
            botonFinalizarProceso.disabled = false;
            botonFinalizarProceso.classList.remove('btn-secondary');
            botonFinalizarProceso.classList.toggle('btn-final');
            break;
        case 'VehicleColorSelect':
            var color = document.getElementById('Color1');
            this.datos.color1 = color.options[color.selectedIndex].value;
            color = document.getElementById('Color2');
            this.datos.color2 = color.options[color.selectedIndex].value;

            localStorage.setItem('DATOS', JSON.stringify(this.datos));

            window.location.href= "adressAndReview.html";
            this.pantallaActual = "RebatesLocation";
            break;
        default:
            break;
    }

    
   
    if(this.pantallaActual == "VistaRegistro"){
        var botonFinalizarProceso = document.getElementById('CompleteStep');
        botonFinalizarProceso.disabled = false;
        botonFinalizarProceso.classList.remove('btn-secondary');
        botonFinalizarProceso.classList.toggle('btn-final');
    }

    switch (nombreValor) {
        case 'ciudad':
            this.datosAnteriores.ciudad = document.getElementById('InputCiudad').value;
            document.getElementById('navPrincipal').style.display = 'block'
            this.CambiarHtmlInfoAdicional();
            break;
        case 'registro':
            break;
        case 'info':
                var tiempo = document.getElementById('TiempoEspera');
                this.datosAnteriores.tipoCliente = tiempo.options[tiempo.selectedIndex].value;
                var _financiamiento = document.getElementById('TipoFinanciamiento');
                this.datosAnteriores.financiamiento = _financiamiento.options[_financiamiento.selectedIndex].value;
                var _pagoCarro = document.getElementById('PagoCarro');
                this.datosAnteriores.entregaCarro = _pagoCarro.options[_pagoCarro.selectedIndex].value;
                this.CambiarHtmlConfirmacion();
            break;
        default:
            break;
    }

    if(this.pantallaActual == "VistaConfirmacion"){
        console.log(this.datosAnteriores);
        document.getElementById("fotoConfirmacion").src = this.datosAnteriores.foto;
        document.getElementById("ModeloConfirmacion").innerHTML = this.datosAnteriores.marca + " " + this.datosAnteriores.modelo;
        document.getElementById("PrecioConfirmacion").innerHTML = 'Precio inicial ' + this.datosAnteriores.precio;
        

        if(loggeado) {
            var botonFinalizarProceso = document.getElementById('CompleteStep');
            document.getElementById('botonConfirmar').style.display = 'none';

            var botonDatosContacto = document.getElementById('WizardRebatesSelectToggle');
            botonDatosContacto.setAttribute('style', 'display:none !important');
            var ref = localStorage.getItem('KEY');
            var refUser = firebase.database().ref("USUARIOS/"+ref);
            refUser.once('value').then((snapshot) =>{          
                this.datosAnteriores.nombre = snapshot.val().nombre;
                this.datosAnteriores.apellido = snapshot.val().apellido;
                this.datosAnteriores.correo = snapshot.val().correo;
                this.datosAnteriores.telefono = snapshot.val().telefono;
                
              }).then(
                botonFinalizarProceso.disabled = false,
                botonFinalizarProceso.classList.remove('btn-secondary'),
                botonFinalizarProceso.classList.toggle('btn-final')
              );
        }else{
            this.CambiarHtmlDatos();
        }
    }

}


function irAddressAndReview(){
    var color = document.getElementById('Color1');
    this.datos.color1 = color.options[color.selectedIndex].value;
    color = document.getElementById('Color2');
    this.datos.color2 = color.options[color.selectedIndex].value;
    localStorage.setItem('DATOS', JSON.stringify(this.datos));
    window.location.href= "adressAndReview.html";
    this.pantallaActual = "RebatesLocation";
}

function irPerfil(){
    if(!loggeado){
        this.datosAnteriores.nombre = document.getElementById('InputNombre').value;
        this.datosAnteriores.apellido = document.getElementById('InputApellido').value;
        this.datosAnteriores.correo = document.getElementById('InputCorreo').value;
        this.datosAnteriores.telefono = document.getElementById('InputTelefono').value;
    }
    localStorage.removeItem('DATOS');
    saveInfo(this.datosAnteriores, 'usuario');
}

function iluminarSiguienteBoton(idbotonActual_STR, idbotonSiguiente_STR){
    var botonActual = document.getElementById(idbotonActual_STR);
    var botonSiguiente = document.getElementById(idbotonSiguiente_STR);


    botonActual.style.opacity = '0.5';
    botonSiguiente.style.opacity = '1';
}


//GUARDAMOS LA INFO EN LA DB, ESTO DEBE SER UNA FIREBASE FUNCTION PROXIMAMENTE.
function saveInfo(data,tipo){
    if(tipo == 'leads'){
        var refLeads = firebase.database().ref("LEADS");
        refLeads.push({
            data
        });
    }else if(tipo == 'usuario'){
        //bloqueamos toda la UI
        document.getElementById("loader").style.display = "block";
        $('body').append('<div id="over" style="position: absolute;top:0;left:0;width: 100%;height:100%;z-index:2;opacity:0.4;filter: alpha(opacity = 50)"></div>');
        //AGREGAMOS EL PEDIDO AL GRUPO DE PEDIDOS.
        var nuevoGrupo = true;
        var precioGrupo = 0;
        var marca = data.marca;
        var tipoVehiculo = data.vehiculo;
        var time = new Date();
        var key;
        var fecha =  String(time.getMonth() + 1).padStart(2, '0') + '/'+ time.getFullYear();
        var DBgrupos = firebase.database().ref("GRUPOS");
        DBgrupos.orderByChild("marca").equalTo(marca).on("child_added", function(snapshot) {
            key = snapshot.key;
            if(snapshot.val().fecha == fecha){
                if(snapshot.val().tipoVehiculo == tipoVehiculo){
                    console.log("agregando a grupo...");
                    precioGrupo = snapshot.val().precio;
                    DBgrupos.child(key+'/infoPedidos').push({
                        data
                    }).then(
                        nuevoGrupo = false
                    );
                }
            }
          });

          //REGISTRAMOS AL USUARIO O LE AGREGAMOS EL PEDIDO SI YA ESTA REGISTRADO
        if(loggeado){
            var ref = localStorage.getItem('KEY');
            var refUsers = firebase.database().ref("USUARIOS/"+ref+"/pedidos");
            refUsers.push({
                data
            });
        }else{
            var refUsers = firebase.database().ref("USUARIOS");
            this.password = data.telefono;
            refUsers.push({
                clave: data.telefono,
                ciudad: data.ciudad,
                correo: data.correo,
                nombre: data.nombre,
                apellido: data.apellido,
                telefono: data.telefono,
                tipoCliente: data.tipoCliente,
                financiamiento: data.financiamiento,
                entregaCarro: data.entregaCarro,
                data
            }).then((snap) => {
                var key = snap.key 
                localStorage.setItem('KEY', key);
                loggeado = true;
            });
        }

          setTimeout(function() { 
            if(nuevoGrupo){
                console.log("creando grupo...");
                DBgrupos.push({
                    tipoGrupo: "nuevo",
                    tipoVehiculo: tipoVehiculo,
                    marca: marca,
                    fecha: fecha,
                    precio: data.precio,
                }).then((snap) => {
                    DBgrupos.child(snap.key).update({
                        id: snap.key
                    })
                });
                marca = "";
                fecha = "";
                tipoVehiculo = "";
            }else{
                var nuevoPrecio = parseInt(data.precio) + parseInt(precioGrupo);
                DBgrupos.child(key).update({
                    precio: nuevoPrecio
                });
            }
            //desbloqueamos la UI
            document.getElementById("loader").style.display = "none";
            $("#over").remove();
            window.location.href= "perfil.html";
           }, 5000);
    }
    
}

function CambiarHtmlCiudad(){
    if(this.is_mobile){
        if(document.getElementById("WizardRebatesLocationToggle")){
            document.getElementById("appVersion").classList.remove('position-fixed');
            document.getElementById("WizardRebatesLocation_").removeAttribute("hidden");
            var HTMLciudad = document.getElementById('VistaLocacion');
            document.getElementById("VistaLocacion").style.display='none';
            document.getElementById("WizardRebatesLocation_").innerHTML = '<div id="VistaLocacion" incentives="" selected="selected" value="" class="col" style="display: block;">' 
            + HTMLciudad.innerHTML;
        }
    }
}

function CambiarHtmlInfoAdicional(){
    if(this.is_mobile){
        if(document.getElementById("WizardInfo")){
            document.getElementById("WizardInfoSelect_").removeAttribute("hidden");
            document.getElementById("colInfo").removeAttribute("class");
            document.getElementById("colInfo").classList.add("col");
            document.getElementById("WizardInfoSelect").classList.add("show");

            var HTMLinfo = document.getElementById('VistaInfo');
            document.getElementById("VistaInfo").style.display='none';
            document.getElementById("WizardInfoSelect_").innerHTML = '<div id="VistaInfo" incentives="" selected="selected" value="" class="col" style="display: block;">' 
            + HTMLinfo.innerHTML;
        }
    }
}

function CambiarHtmlConfirmacion(){
    if(this.is_mobile){
        if(document.getElementById("WizardRebatesPurchaseType")){
            document.getElementById("WizardRebatesPurchaseType_").removeAttribute("hidden");
            document.getElementById("colConf").removeAttribute("class");
            document.getElementById("colConf").classList.add("col");
            document.getElementById("WizardRebatesPurchaseType").classList.add("show");

            var HTMLconf = document.getElementById('VistaConfirmacion');
            document.getElementById("VistaConfirmacion").style.display='none';
            document.getElementById("WizardRebatesPurchaseType_").innerHTML = '<div id="VistaConfirmacion" incentives="" selected="selected" value="" class="col" style="display: block;">' 
            + HTMLconf.innerHTML;
        }
    }
}

function CambiarHtmlDatos(){
    if(this.is_mobile){
        if(document.getElementById("WizardRebatesSelect")){
            document.getElementById("WizardRebatesSelect_").removeAttribute("hidden");
            document.getElementById("colRegistro").removeAttribute("class");
            document.getElementById("colRegistro").classList.add("col");
            document.getElementById("WizardRebatesSelect").classList.add("show");

            var HTMLRegistro = document.getElementById('VistaRegistro');
            document.getElementById("VistaRegistro").style.display='none';
            document.getElementById("WizardRebatesSelect_").innerHTML = '<div id="VistaRegistro" incentives="" selected="selected" value="" class="col" style="display: block;">' 
            + HTMLRegistro.innerHTML;
        }
    }
}


function EnviarEmail(tipo){
    
    if(tipo == 'registro'){
        var correo = (document.getElementById("InputCorreo").value).toString();
        console.log("correo a enviar: " + correo);
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "economicar024@gmail.com",
            Password : "6efa2bba-38e7-452c-908c-bd8e8216e0ab",
            To : correo,
            From : "economicar024@gmail.com",
            Subject : "Contraseña ECONOMICAR",
            Body : "Tu datos de www.economicar.com, son, USUARIO: "+ correo + " contraseña: " + this.password + " ¡Felicidades!"
        }).then(
         /*  message => alert(message) */
         /* message => this.irPerfil() */
        );
    }else if(tipo == 'contactanos'){
        var correo = document.getElementById("correoContacto").value;
        console.log(correo);
        var telefono = document.getElementById("telefonoContacto").value;
        console.log(telefono);
        var mensaje = document.getElementById("msg").value;
        console.log(mensaje);
        var subjectHTML = document.getElementById("subject");
        var subject = subjectHTML.options[subjectHTML.selectedIndex].value;
        console.log(subject);
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "economicar024@gmail.com",
            Password : "6efa2bba-38e7-452c-908c-bd8e8216e0ab",
            To : "economicar024@gmail.com",
            From : "economicar024@gmail.com",
            Subject : subject,
            Body : mensaje + "; MI TELEFONO ES: " + telefono + "; MI CORREO ES:" + correo
        }).then(
          message => alert(message)
        );
    }
    
}

/** MODAL CUANDO EL USUARIO SE REGISTRA **/

var span = document.getElementsByClassName("close")[0];

function abrirModal() {
    var correo = document.getElementById("InputCorreo").value;
    var telefono = document.getElementById("InputTelefono").value;
    document.getElementById("clave").innerText = datosAnteriores.telefono;
    if(telefono.length > 4 || correo.length > 4){
        document.getElementById("myModal").style.display = "block";
        this.EnviarEmail('registro');
    }
    
}

function cerrarModal() {
/*     document.getElementById("myModal").style.display = "none"; */
    this.irPerfil();
}
window.onclick = function(event) {
  if (event.target ==  document.getElementById("myModal")) {
/*     document.getElementById("myModal").style.display = "none"; */
    this.irPerfil();
  }
}

function Terminado(){
    this.irPerfil();
}

function DesplegarMenuNavBar(){
    var attr = document.getElementById('listaNavBar').attributes;
    if(attr['aria-hidden'].value == "true"){
        document.getElementById("MenuNavBar").classList.remove('slicknav_collapsed');
        document.getElementById("MenuNavBar").classList.add("slicknav_open");
    
        document.getElementById("listaNavBar").setAttribute("aria-hidden", "false");
        document.getElementById("listaNavBar").style.display = 'block';

        if(document.getElementById("PantallaPrincipal")){
            document.getElementById("PantallaPrincipal").style.marginTop = '340px';
        }else{
            document.getElementById("PantallaPrincipalPerfil").style.marginTop = '430px';
        }

    }else{
        document.getElementById("MenuNavBar").classList.remove("slicknav_open");
        document.getElementById("MenuNavBar").classList.add('slicknav_collapsed');
    
        document.getElementById("listaNavBar").setAttribute("aria-hidden", "true");
        document.getElementById("listaNavBar").style.display = 'none';

        if(document.getElementById("PantallaPrincipal")){
            document.getElementById("PantallaPrincipal").style.marginTop= '150px';
        }else{
            document.getElementById("PantallaPrincipalPerfil").style.marginTop = '200px';
        }
    }
}
