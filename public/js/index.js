// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function CalcularDescuento(){
  var ValorBase = document.getElementById('inputPrecioVehiculo').value;
  var PorcentajeDescuento = 0.06;
  var Resultado = document.getElementById('inputDescuentoObtenido');
  var ResultadoProcentual = document.getElementById('lblDescuento');
  Resultado.value = (ValorBase * PorcentajeDescuento);
  ResultadoProcentual.innerHTML = '6%';
}

//MODAL DEL VIDEO
$('#modal1').on('hidden.bs.modal', function (e) {
  // do something...
  $('#modal1 iframe').attr("src", $("#modal1 iframe").attr("src"));
});

$('#modal6').on('hidden.bs.modal', function (e) {
  // do something...
  $('#modal6 iframe').attr("src", $("#modal6 iframe").attr("src"));
});

$('#modal4').on('hidden.bs.modal', function (e) {
  // do something...
  $('#modal4 iframe').attr("src", $("#modal4 iframe").attr("src"));
});