/* Variables */
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Event Listner
eventListener();
function eventListener(){
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweet )

    // Cuando el documento este listo
    document.addEventListener("DOMContentLoaded",()=>{
        tweets = JSON.parse( localStorage.getItem("tweets")) || [];
        crearHTML();
    })
}

// Funciones
function agregarTweet(e){
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector("#tweet").value;

    // Validacion

    if(tweet == ""){
        mostrarError("Un mensaje no puede ir vacio");
        return; // Evita que se ejecuta mas linea de código
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }
    
        // Añadiendo al arreglo de tweets
    tweets = [...tweets, tweetObj];
    
    // Una vez crear el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
    
}

// Mostar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");
    const contenido = document.querySelector("#contenido");
    const error3 = document.querySelector(".error");


    if(!error3){
        // Insrtar en el contenido
        contenido.appendChild(mensajeError);
    }

    // Elimina la alerta despues de 3seg
    setTimeout(()=>{
        mensajeError.remove();
    },3000)
}

// Muestra un listado de los tweets
function crearHTML(){
    limpiarHTML();
    if(tweets.length > 0){
        tweets.forEach( tweet =>{
            // Agrega un boton de eliminar
            const bntEliminar = document.createElement("a");
            bntEliminar.classList.add("borrar-tweet");
            bntEliminar.textContent = "X";

            // Añadir la funcion de eliminar
            bntEliminar.onclick = ()=>{
                borrarTweet(tweet.id);
            }

            // Crear el HTML   
            const li = document.createElement("li");
            
            // añadir el texto
            li.textContent = tweet.tweet;

            // Asignar el botón
            li.appendChild(bntEliminar);

            // insertar el html
            listaTweets.appendChild(li);
        })
    }
    
    sincronizarStorage();
}

// Agrega los Tweets actuales a Local Storage
function sincronizarStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets))
}

// Eliminar un Tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id )
    crearHTML();
}

function limpiarHTML(id){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }    
}




