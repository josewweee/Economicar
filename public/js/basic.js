
var firebaseAuth = firebase.auth();
var password;
var is_mobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    is_mobile = true;
   }
var pantallaActual = 'VistaLocacion';
var contP
var ventanaMarca = false, ventanaModelo = false, ventanaTransmision = false, ventanaColor = false;
console.log( window.location.href);
var datos = {
    marca: '',
    modelo: '',
    transmision: '',
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
    entregaCarro: ''
}; 
var datosAnteriores = JSON.parse(localStorage.getItem('DATOS'));
localStorage.removeItem('DATOS');

//VERSION MOVIL?
this.CambiarHtmlCiudad();

function escogerMarca(marcaVehiculo){
    if(this.ventanaMarca == false){
        var VistaModelo = document.getElementById('VehicleModelSelect');
        var VistaMarca = document.getElementById('VehicleMakeSelect');
        var Label_index_actual = document.getElementById('number1');
        var Label_index_siguiente = document.getElementById('number2');
        VistaMarca.style.display = 'none';
        if(is_mobile){document.getElementById('VehicleMakeSelect2').style.display = 'none';}
        VistaModelo.style.display = 'block';
        this.pantallaActual = 'VehicleModelSelect';
        
    //cambio de botones
        Label_index_actual.classList.remove('active');
        Label_index_siguiente.classList.add('active');
        this.iluminarSiguienteBoton("WizardVehicleMakeSelectToggle","WizardVehicleModelSelectToggle");

        this.datos.marca = marcaVehiculo;
        this.ventanaMarca = true;
    }
}

function escogerModelo(modeloVehiculo, fotoVehiculo, precioVehiculo){
    if(this.ventanaModelo == false){
        this.datos.modelo = modeloVehiculo;
        this.datos.foto = fotoVehiculo;
        this.datos.precio = precioVehiculo;

        var VistaTransmision = document.getElementById('TransmisionVehiculo');
        var VistaMarca = document.getElementById('VehicleModelSelect');
        var Label_index_actual = document.getElementById('number2');
        var Label_index_siguiente = document.getElementById('number3');
        VistaMarca.style.display = 'none';
        VistaTransmision.style.display = 'block';
        this.pantallaActual = 'TransmisionVehiculo';

        //cambio de botones
        Label_index_actual.classList.remove('active');
        Label_index_siguiente.classList.add('active');
        this.iluminarSiguienteBoton("WizardVehicleModelSelectToggle","WizardVehicleTransmissionSelectToggle");
        this.ventanaModelo = true;
    }
}

function escogerTransmision(transimision){
    if(this.ventanaTransmision == false){
        var VistaColor = document.getElementById('VehicleColorSelect');
        var VistaTransmision = document.getElementById('TransmisionVehiculo');
        var botonFinalizarProceso = document.getElementById('CompleteStep');
        var Label_index_actual = document.getElementById('number3');
        var Label_index_siguiente = document.getElementById('number4');

        //cambio de botones
        Label_index_actual.classList.remove('active');
        Label_index_siguiente.classList.add('active');
        this.iluminarSiguienteBoton("WizardVehicleTransmissionSelectToggle","WizardVehicleColorSelectToggle");

        VistaTransmision.style.display = 'none';
        VistaColor.style.display = 'block';
        this.pantallaActual = 'VehicleColorSelect';
        botonFinalizarProceso.disabled = false;
        botonFinalizarProceso.classList.remove('btn-secondary');
        botonFinalizarProceso.classList.toggle('btn-primary');
        this.datos.transmision = transimision;
        this.ventanaTransmision = true;
    }

}

function irVista(VistaDestino_STR, btnActual_STR, btnSiguiente_STR, lblNumeroActual, lblNumeroSiguiente, nombreValor){
    var VistaActual = document.getElementById(this.pantallaActual);
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

   
    if(this.pantallaActual == "VistaRegistro"){
        var botonFinalizarProceso = document.getElementById('CompleteStep');
        botonFinalizarProceso.disabled = false;
        botonFinalizarProceso.classList.remove('btn-secondary');
        botonFinalizarProceso.classList.toggle('btn-primary');
    }

    switch (nombreValor) {
        case 'ciudad':
            this.datosAnteriores.ciudad = document.getElementById('InputCiudad').value;
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
       document.getElementById("fotoConfirmacion").src = this.datosAnteriores.foto;
        document.getElementById("ModeloConfirmacion").innerHTML = this.datosAnteriores.marca + " " + this.datosAnteriores.modelo;
        document.getElementById("PrecioConfirmacion").innerHTML = 'Precio inicial ' + this.datosAnteriores.precio;
        this.CambiarHtmlDatos();
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
    this.datosAnteriores.nombre = document.getElementById('InputNombre').value;
    this.datosAnteriores.apellido = document.getElementById('InputApellido').value;
    this.datosAnteriores.correo = document.getElementById('InputCorreo').value;
    this.datosAnteriores.telefono = document.getElementById('InputTelefono').value;
    localStorage.removeItem('DATOS');
    saveInfo(this.datosAnteriores, 'usuario');
}

function iluminarSiguienteBoton(idbotonActual_STR, idbotonSiguiente_STR){
    var botonActual = document.getElementById(idbotonActual_STR);
    var botonSiguiente = document.getElementById(idbotonSiguiente_STR);


    botonActual.style.opacity = '0.5';
    botonSiguiente.style.opacity = '1';
}

//FUNCTION TO SAVE INFO IN DB
function saveInfo(data,tipo){
    if(tipo == 'leads'){
        var refLeads = firebase.database().ref("LEADS");
        refLeads.push({
            data
        });
    }else if(tipo == 'usuario'){
        var refUsers = firebase.database().ref("USUARIOS");
        console.log(refUsers);
        refUsers.push({
            correo: data.correo,
            data
        }).then((snap) => {
            var key = snap.key 
            localStorage.setItem('KEY', key);
            this.password =  (Math.floor(Math.random() * (999999 - 100000)) + 100000).toString();
            firebaseAuth.createUserWithEmailAndPassword(this.datosAnteriores.correo, this.password).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;

				if (errorCode === 'auth/wrong-password') {
			        alert('Contraseña equivocada.');
			        errores = true;
			        return;
			    } else {
			    	errores = true;
			        alert(errorMessage);
			        return;
			    }
			});
        }).then((snap) => {
            this.alert("Tu contraseña es: " + this.password + "Te enviaremos a tu correo la contraseña");
            this.EnviarEmail('registro');
            window.location.href= "perfil.html";
        
        });
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

function LogOut(){
    firebase.auth().signOut().then(function() {
        var key = "";
        localStorage.setItem("KEY", key);
        window.location.href="index.html";
  }, function(error) {
    
  });
}

function EnviarEmail(tipo){
    
    if(tipo == 'registro'){
        var correo = (this.datosAnteriores.correo).toString();
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "economicar024@gmail.com",
            Password : "6efa2bba-38e7-452c-908c-bd8e8216e0ab",
            To : correo,
            From : "economicar024@gmail.com",
            Subject : "Contraseña ECONOMICAR",
            Body : "Tu datos de www.economicar.com, son, USUARIO: "+ correo + " contraseña: " + this.password + " ¡Felicidades!"
        }).then(
          message => alert(message)
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
