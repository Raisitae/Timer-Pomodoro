//Se crea la clase PomodoroEstudio y la clase CompletadoEstudio que construyen nuestros pomodoros
class PomodoroEstudio {
  constructor(nombre, duracion, imagen) {
    this.nombre = nombre;
    this.duracion = duracion;
    this.imagen = imagen;
  }
  bio() {
    console.log(
      `Este pomodoro se llama "${this.nombre}" y es de tantos ${this.duracion} minutos`
    );
  }
}

class CompletadoEstudio {
  constructor(cantidad) {
    this.cantidad = cantidad;
  }
}

//Se crean dos arrays para contener a los objetos creados por los constructores

listaPomodoroDefault = [];

listaPomodoro = [];

pomodorosCompletados = [];

let pomodoro1 = new PomodoroEstudio("Pomodoro promedio", 25, "2");
pomodoro1.bio();
console.log(pomodoro1);
listaPomodoroDefault.push(pomodoro1);

let pomodoro2 = new PomodoroEstudio("Pomodoro corto", 15, "1");
pomodoro2.bio();
console.log(pomodoro2);
listaPomodoroDefault.push(pomodoro2);

//Se programan las funciones de cargar y guardar los pomodoros del local storage, esto sirve para que el usuario pueda luego seleccionar que
//pomodoro quiere elegir del array de pomodoros.

function guardarPomodoros() {
  localStorage.setItem("pomodoros", JSON.stringify(listaPomodoro));
}

function cargarPomodoros() {
  listaPomodoro = JSON.parse(localStorage.getItem("pomodoros")) || [];
}

cargarPomodoros();

//Se programan las funciones de cargar y guardar los pomodoros completados del local storage, esto sirve para informar al usuario de su progreso
function cargarPomodorosCompletados() {
  pomodorosCompletados = JSON.parse(localStorage.getItem("completados")) || [];
}

cargarPomodorosCompletados();

function guardarPomodorosCompletados() {
  localStorage.setItem("completados", JSON.stringify(pomodorosCompletados));
}

//Botón enviar. Envía la información que el usuario escribe en los form pero no acciona el temporizador.

let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);

function cerrarMenu() {
  document.getElementById("input").checked = false;
}
//se valida el formulario y se muestra el tiempo indicado por el usuario

function validarFormulario(e) {
  e.preventDefault();
  let formulario = e.target;
  console.log(formulario.querySelector("#nombre").value);
  console.log(formulario.querySelector("#min").value);

  let nuevoPomodoro = new PomodoroEstudio(
    formulario.querySelector("#nombre").value,
    formulario.querySelector("#min").value,
    Math.floor(Math.random() * 4)
  );
  console.log(nuevoPomodoro);
  listaPomodoro.push(nuevoPomodoro);
  let pomodoroEstMin = nuevoPomodoro.duracion;
  let tiempo = pomodoroEstMin * 60;
  let min = Math.floor(tiempo / 60);
  let seg = tiempo % 60;
  seg = seg < 10 ? "0" + seg : seg;
  min = min < 10 ? "0" + min : min;
  document.getElementById("displayReloj").textContent = `${min}:${seg}`;
  tarjeta();
  guardarPomodoros();
  cerrarMenu();
}

//Mostrar por cada uno de los pomodoros de una tarjeta y un botón
//Permitir cargar los pomodoros desde las tarjetas
//JQUERY

function tarjeta() {
  $("#contenedor-pomodoro").empty();
  for (const pomo of listaPomodoroDefault)
    $("#contenedor-pomodoro").append(`
      <div id="tarjeta-pomodoro">
        <img class="img__tomate" id="tomate" src="img/${pomo.imagen}.png">
        <h5>Pomodoro:</h5>
        <p> <br> Nombre: <br> ${pomo.nombre}</p>
        <p class="tiempo" data-number> <br> Tiempo: ${pomo.duracion}</p>
        <button class="submitLista" data-number="${pomo.duracion}">Elegir</button>
      </div>
     `);

  for (const pomo of listaPomodoro)
    $("#contenedor-pomodoro").append(`
      <div id="tarjeta-pomodoro">
        <img class="img__tomate" id="tomate" src="img/${pomo.imagen}.png">
        <h5>Pomodoro:</h5>
        <p> <br> Nombre: <br> ${pomo.nombre}</p>
        <p class="tiempo" data-number> <br> Tiempo: ${pomo.duracion}</p>
        <button class="submitLista" data-number="${pomo.duracion}">Elegir</button>
      </div>
     `);

  $(".submitLista").click(function (e) {
    e.preventDefault();
    let tiempobot = Number($(this).data("number"));
    let pomodoroEstMin = tiempobot;
    let tiempo = pomodoroEstMin * 60;
    let min = Math.floor(tiempo / 60);
    let seg = tiempo % 60;
    seg = seg < 10 ? "0" + seg : seg;
    min = min < 10 ? "0" + min : min;
    document.getElementById("displayReloj").textContent = `${min}:${seg}`;
    $("#min").attr("value", tiempobot);
    //se reescribe el tiempo del input para que el cronometro todavia funcione
  });
}

tarjeta();

function completadoPopUp() {
  $(".popUp").slideDown(1500, function () {
    $(".popUp").slideUp(1000);
  });
}

//Borrar Local Storage

let botonBorrar = document.getElementById("delete");

botonBorrar.onclick = (e) => {
  e.preventDefault();
  localStorage.clear();
  listaPomodoro.splice(0);
  tarjeta();
};

//Botón descanso

let descanso = document.getElementById("Pausa");
descanso.onclick = () => {
  let pomodoroEstMin = 5;
  let tiempo = pomodoroEstMin * 60;
  let min = Math.floor(tiempo / 60);
  let seg = tiempo % 60;
  seg = seg < 10 ? "0" + seg : seg;
  min = min < 10 ? "0" + min : min;
  document.getElementById("displayReloj").textContent = `${min}:${seg}`;
  $("#min").attr("value", 5);
};

// Función pausa

let pausado = false;
let pausa = document.getElementById("stp");
pausa.onclick = (e) => {
  e.preventDefault();
  pausado = !pausado;
  console.log(pausado);
};

// Función reinicio

let reiniciar = false;
let reinicio = document.getElementById("rst");
reinicio.onclick = (e) => {
  e.preventDefault();
  location.reload();
};

//Botón estudio -> también reinicia
let estudio = document.getElementById("Estudio");
estudio.onclick = (e) => {
  location.reload();
};

//Botón comenzar; ejecuta el temporizador

let comenzar = document.getElementById("strt");
comenzar.onclick = () => {
  let pomodoroEstMin = document.querySelector("#min").value;
  let tiempo = pomodoroEstMin * 60;
  let temporizador = setInterval(update, 1000);
  listaPomodoro.pop();

  function update() {
    if (pausado) {
      temporizador = tiempoactual;
      clearInterval(temporizador);
    } else {
      tiempoactual = tiempo;
      let min = Math.floor(tiempo / 60);
      let seg = tiempo % 60;
      seg = seg < 10 ? "0" + seg : seg;
      min = min < 10 ? "0" + min : min;
      document.getElementById("displayReloj").textContent = `${min}:${seg}`;
      tiempo--;
      min == 0 && seg == 0 ? clearInterval(temporizador) : temporizador;
      if (min == 0 && seg == 0) {
        //creamos un nuevo pomodoro completado y lo guardamos en el array
        let pom1 = new CompletadoEstudio(1);
        pomodorosCompletados.push(pom1);

        $(".div__estudio-pausa-descanso").append(
          '<h3 style="display: none; padding: 20px 0px; z-index:3; position:absolute; margin:auto; text-alignment:center; background-color: #ffb7d0; left: 0; right: 0; width: 40vw; height: fit-content ; font:arial; font-color: black;" class="popUp"> Ha completado un pomodoro </h3>'
        );
        guardarPomodorosCompletados();
        //mostramos al usuario la cantidad de pomodoros completados
        /*let parrafo2 = document.createElement("p");
        parrafo2.innerHTML = `<h3>Ha completado un total de ${pomodorosCompletados.length} pomodoro/s</h3>`;
        document.body.appendChild(parrafo2);*/
        completadoPopUp();
        //si es el primer pomodoro que se completa, el usuario recibe una felicitacion
        if (pomodorosCompletados.length == 1) {
          let parrafo = document.createElement("p");
          parrafo.innerHTML =
            "<h3>¡Felicidades, ha terminado su primer pomodoro!</h3>";
          document.body.appendChild(parrafo);
        }
      }
    }
  }
};
