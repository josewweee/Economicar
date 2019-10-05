var userKey = localStorage.getItem('KEY');
console.log(userKey);
var SearchRef = firebase.database().ref("USUARIOS/" + userKey);
var nombre, apellido, telefono, ciudad, correo

SearchRef.orderByChild("id").on("child_added", function(snapshot) {
    nombre = snapshot.val().nombre;
    apellido = snapshot.val().apellido;
    telefono = snapshot.val().telefono;
    ciudad = snapshot.val().ciudad;
    correo = snapshot.val().correo;

    document.getElementById("nombreCompleto").value = nombre + " " +  apellido;
    document.getElementById("telefonoCelular").value = telefono;
    document.getElementById("Correo").value = correo;
   /*  } */
    
   });

   function GuardarCambios(){
       alert("AUN NO DISPONIBLE");
   }
