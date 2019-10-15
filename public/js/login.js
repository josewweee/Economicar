var firebaseAuth = firebase.auth();
var firebaseRef = firebase.database().ref("USUARIOS");
var loggeado = (localStorage.getItem("KEY") != undefined && localStorage.getItem("KEY").length > 2) ? true : false;
if(loggeado){
  if(document.getElementById('login') != null){
    document.getElementById('login').innerHTML = '<button class="btn btn-outline-light btn-sm text-capitalize rounded-pill" type="submit" onclick="CerrarSesion()">CerrarSesión</button>'
  }
}else{
  if(document.getElementById('login') != null){
    document.getElementById('login').innerHTML = '<a href="login.html">Iniciar Sesión</a>';
  }
}


function IniciarSeccion(){
	var email = document.getElementById('inputEmail').value;   
	var password = document.getElementById("inputPassword").value;
  var errores = false;


	firebaseAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  //MANEJO DE ERRORES="
	  if (errorCode === 'auth/wrong-password'){
            errores = true;
            alert('Contraseña equivocada.');
            return;
          } else if (errorCode === 'auth/user-not-found'){
            errores = true;
            alert('Usuario no encontrado.');
            return;

      	  } else if(errorCode === 'auth/invalid-email'){
            errores = true;
      	  	alert('Email invalido.');
      	  	return;

      	  } else if(errorCode === 'auth/user-disabled'){
            errores = true;
      	  	alert('Usuario bloqueado.');
      	  	return;

      	  }else{
            errores = true;
      	  	//alert(errorMessage);
      	  	/* return; */
            }
	})

  if(errores == false){
    setTimeout(function() {
      console.log("hora de buscar");
      firebaseRef.orderByChild('correo').equalTo(email).on("child_added", function(snapshot) {
          var key = snapshot.key;
          localStorage.setItem("KEY", key);
          console.log("entramos");
          window.location.href="perfil.html";
      });
    }, 1000);
  }
   
}

function CerrarSesion(){
  localStorage.setItem("KEY", undefined);
  window.location.href="index.html";
}

/* 843512 */