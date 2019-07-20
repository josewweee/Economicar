var firebaseAuth = firebase.auth();
var firebaseRef = firebase.database().ref("USUARIOS");

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

/* 843512 */