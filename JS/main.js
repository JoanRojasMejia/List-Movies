let textoDigitado = document.getElementById("title");
let numberDigitado = document.getElementById("year");
let botonAgregar = document.getElementById("boton");
let ulPadre = document.getElementById("ulPadre");

let listas = [];

function cargarListas(){

    if ( localStorage.getItem("listas") !== null){
        
        let datosUsuario = localStorage.getItem("listas");

        listas = JSON.parse(datosUsuario);

        listas.forEach((lista) => agregarListaDom(lista));
    }

};


function eliminarLista(evento){
    
    let iconoBorrar = evento.target;
    let liBorrar = iconoBorrar.parentElement;

    liBorrar.remove();

    let numero = iconoBorrar.getAttribute("numero");

    listas = listas.filter((lista) => lista.id != numero);

    let datosUsuario = JSON.stringify(listas);

    localStorage.setItem("listas", datosUsuario);
    
}


function agregarListaDom(lista){

    let li = document.createElement("li");
    li.classList.add("second");

    let span1 = document.createElement("span");
    let span2 = document.createElement("span");

    span1.textContent = lista.texto;
    span2.textContent = lista.year;

    let icono = document.createElement("i");
    icono.classList.add("far");
    icono.classList.add("fa-trash-alt");

    icono.addEventListener("click", eliminarLista);

    icono.setAttribute("numero", lista.id);

    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(icono);

    ulPadre.appendChild(li);

}


function agregar(evento){
    
    evento.preventDefault();
    
    const texto = textoDigitado.value;
    const year = numberDigitado.value;

    const nuevaLista = {
        id: Date.now(),
        texto: texto,
        year: year,
    };

    agregarListaDom(nuevaLista);

    listas.push(nuevaLista);

    let datosUsuario = JSON.stringify(listas);

    localStorage.setItem("listas", datosUsuario);
    
    textoDigitado.value = "";
    numberDigitado.value = "";
    textoDigitado.focus();

}

botonAgregar.addEventListener("click", agregar);

cargarListas();
