


/* var pantallaActual = 'VehicleMakeSelect'; */
var pantallaActual = 'VistaLocacion';
var contP
var ventanaMarca = false, ventanaModelo = false, ventanaTransmision = false, ventanaColor = false;
console.log( window.location.href);
var datos = {
    marca: '',
    modelo: '',
    transmision: '',
    color: 'Color De Prueba',
    ciudad: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    foto: '',
    precio: ''
}; 
var datosAnteriores = JSON.parse(localStorage.getItem('DATOS'));
localStorage.removeItem('DATOS');
console.log("-> " + datosAnteriores);

function escogerMarca(marcaVehiculo){
    if(this.ventanaMarca == false){
        var VistaModelo = document.getElementById('VehicleModelSelect');
        var VistaMarca = document.getElementById('VehicleMakeSelect');
        var Label_index_actual = document.getElementById('number1');
        var Label_index_siguiente = document.getElementById('number2');
        VistaMarca.style.display = 'none';
        VistaModelo.style.display = 'block';
        this.pantallaActual = 'VehicleModelSelect';
        
    //cambio de botones
        Label_index_actual.classList.remove('active');
        Label_index_siguiente.classList.add('active');
        this.iluminarSiguienteBoton("WizardVehicleMakeSelectToggle","WizardVehicleModelSelectToggle");

        this.datos.marca = marcaVehiculo;
        console.log(this.datos.marca)
        this.ventanaMarca = true;
    }
}

function escogerModelo(modeloVehiculo, fotoVehiculo, precioVehiculo){
    if(this.ventanaModelo == false){
        this.datos.modelo = modeloVehiculo;
        this.datos.foto = fotoVehiculo;
        this.datos.precio = precioVehiculo;
        console.log(datos.modelo);

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
            break;
        case 'registro':
            break;
        default:
            break;
    }

    if(this.pantallaActual == "VistaConfirmacion"){
        document.getElementById("fotoConfirmacion").src = this.datosAnteriores.foto;
        document.getElementById("ModeloConfirmacion").innerHTML = this.datosAnteriores.marca + " " + this.datosAnteriores.modelo;
        document.getElementById("PrecioConfirmacion").innerHTML = 'Precio inicial ' + this.datosAnteriores.precio;
    }

}


function irAddressAndReview(){
    /* this.saveInfo(this.datos, 'leads'); */
    console.log(this.datos);
    console.log(this.person);
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
        console.log(refLeads);
        refLeads.push({
            data
        });
    }else if(tipo == 'usuario'){
        var refUsers = firebase.database().ref("USUARIOS");
        console.log(refUsers);
        refUsers.push({
            data
        }).then((snap) => {
            var key = snap.key 
            localStorage.setItem('KEY', key);
            console.log(key);
            window.location.href= "perfil.html";
         });
    }
    
}
