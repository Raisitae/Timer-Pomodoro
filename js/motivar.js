//Se crea un array para guardar la información que obtendremos de un archivo JSON estático
frasesAjax = [];
let botonMotivar = document.getElementById("motivar");

//con llamada ajax llamamos al archivo JSON y guardamos la información en el array
function ajax() {
  $(() => {
    const datos = "../data/data.json";
    $.getJSON(datos, function (respuesta, estado) {
      if (estado === "success") {
        let misFrases = respuesta;
        for (const frase of misFrases) {
          frasesAjax.push(frase);
        }
      }
    });
  });
}

ajax();

//Se programa la función de elegir una frase random y mostrarla con animación jquery
function fraseRandom() {
  let frase = frasesAjax[Math.floor(Math.random() * frasesAjax.length)];
  $(".div__estudio-pausa-descanso").append(
    `<h3 style="display: none; padding: 2vw; z-index:4; position:absolute; margin:auto; justify-content: center; text-align:center; background-color: rgb(206, 255, 206); left: 0; right: 0; bottom: 50vh; width: 60vw; height: fit-content; font-family:rubik; font-color: black;" class="h3__fraseRandom"> <br> <i>${frase.frase}</i> <br> <br> ${frase.autor} <br> <br>  </h3>`
  );
  fraseRandomToggle();

  function fraseRandomToggle() {
    $(".h3__fraseRandom").fadeIn(1000).delay(5000).fadeOut(1000);
  }
}

//deshabilitamos el botón mientras se muestra la animación jquery
function demorar() {
  botonMotivar.disabled = true;
  setTimeout(function () {
    botonMotivar.disabled = false;
  }, 7000);
}

//Se borra la frase del html para que no se agreguen de forma indefinida elementos al DOM
function borrarFrase() {
  setTimeout(function () {
    $(".h3__fraseRandom").remove();
  }, 7000);
}

//Al activar el botón se ejecuta la función fraseRandom
botonMotivar.onclick = () => {
  alert("prueba");
  demorar();
  fraseRandom();
  borrarFrase();
};
