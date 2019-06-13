var userKey = localStorage.getItem('KEY');
console.log(userKey);
var SearchRef = firebase.database().ref("USUARIOS/" + userKey);
var nombre, apellido, telefono, ciudad, color1, color2, correo, marca, modelo, transmision

SearchRef.orderByChild("id").on("child_added", function(snapshot) {
    nombre = snapshot.val().nombre;
    apellido = snapshot.val().apellido;
    telefono = snapshot.val().telefono;
    ciudad = snapshot.val().ciudad;
    color1 = snapshot.val().color1;
    color2 = snapshot.val().color2;
    correo = snapshot.val().correo;
    marca = snapshot.val().marca;
    modelo = snapshot.val().modelo;
    transmision = snapshot.val().transmision;
    foto = snapshot.val().foto;
    precio = snapshot.val().precio;

    if(document.getElementById("perfil") != null){
        document.getElementById("nombreCarro").innerHTML = marca + " " +  modelo;
        document.getElementById("transmisionCarro").innerHTML = transmision;
        document.getElementById("colorCarro").innerHTML = color1 + '<p class="option-number"> Opción 1 </p>';
        document.getElementById("colorCarro_op2").innerHTML = color2 + '<p class="option-number"> Opción 2 </p>';
        document.getElementById("fotoOpcion1").src = foto;
        document.getElementById("fotoOpcion2").src = foto;
    }else if(document.getElementById("configuracion") != null){
        document.getElementById("nombreCompleto").value = nombre + " " +  apellido;
        document.getElementById("telefonoCelular").value = telefono;
        document.getElementById("Correo").value = correo;
    }
    
   });

   function GuardarCambios(){
       alert("AUN NO DISPONIBLE");
   }
