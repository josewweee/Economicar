var firebaseAuth = firebase.auth();
var firebaseRef = firebase.database().ref("USUARIOS");
var loggeado = (localStorage.getItem("KEY") != 'null' && localStorage.getItem("KEY").length > 2) ? true : false;
console.log(loggeado + " " +  localStorage.getItem("KEY"));

if(loggeado){
  console.log(document.getElementById('login'));
  if(document.getElementById('login') != null){
    document.getElementById('login').innerHTML = '<a href="perfil.html">Mi Cuenta</a>';
  }
}else{
  console.log(document.getElementById('login'));
  if(document.getElementById('login') != null){
    document.getElementById('login').innerHTML = '<a href="login.html">Iniciar Sesión</a>';
  }
}


function IniciarSeccion(){
	var email = document.getElementById('inputEmail').value;   
	var password = document.getElementById("inputPassword").value;

  firebaseRef.orderByChild('correo').equalTo(email).on("child_added", function(snapshot) {
    console.log(password);
    console.log(snapshot.val().clave);
    if(snapshot.val().clave == password.toString()){
      var key = snapshot.key;
      localStorage.setItem("KEY", key);
      window.location.href="perfil.html";
    }else{
      password.innerHTML = "";
      alert("contraseña erronea");
    }
  });
   
}

function CerrarSesion(){
  localStorage.setItem("KEY", null);
  window.location.href="index.html";
}

/* 843512 */