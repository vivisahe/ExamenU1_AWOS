const contentData = document.getElementById("contentData");
const btnBuscar = document.getElementById("btnBuscar");
const inputBuscador = document.getElementById("inputBuscar");
const inputFechaInicio = document.getElementById("fecha_inicio");
const inputFechaFin = document.getElementById("fecha_fin");


const obtenerNoticia = async()=>{
const response = await fetch("https://newsapi.org/v2/everything?q=news&sortBy=publishedAt&apiKey=6f0e8a814397413e8e73e358737159ed");    console.log(response)
    const data = await response.json();
    console.log(data);
    contentData.innerHTML=" ";
    data.articles.forEach(element => {
            const imagenSegura = element.urlToImage || 'https://www.csam.unam.mx/static/images/imagen-no-disponible.jpg';
        const divX = document.createElement("div");
        divX.classList.add("col-md-6");

        divX.innerHTML=`<div class="card" style="width: 30rem;">
                        <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.source.name}</p>
                        <img src="${imagenSegura}" class="card-img-top">
                        <p class="card-text"> ${element.description}</p>
                        <p class="card-text"> ${element.publishedAt}</p>
                        <a href="${element.url}" class="card-link" target="_blank">Detalles</a>
                     </div>
                     </div>`;
    contentData.appendChild(divX);
})
}

const buscarNoticia = async(event) => {
    if (event) event.preventDefault();
    const noticiaBusqueda = inputBuscador.value;
    if(noticiaBusqueda == ""){
        contentData.innerHTML=("Campo de texto vacio, ingresa una busqueda");
        return
    }else{
         const response = await fetch(`https://newsapi.org/v2/everything?q=${noticiaBusqueda}&apiKey=6f0e8a814397413e8e73e358737159ed`);
    const data = await response.json();
    console.log("Datos encontrados:", data);
    contentData.innerHTML = ""; 

    data.articles.forEach(element => {
        const imagenSegura = element.urlToImage || 'https://www.csam.unam.mx/static/images/imagen-no-disponible.jpg';
        const divX = document.createElement("div");
        divX.classList.add("col-md-6");

        divX.innerHTML = `<div class="card" style="width: 30rem;">
                            <div class="card-body">
                                <h5 class="card-title">${element.title}</h5>
                                <p class="card-text"> ${element.source.name}</p>
                                <img src="${imagenSegura}" class="card-img-top">
                                <p class="card-text"> ${element.description}</p>
                                <p class="card-text"> ${element.publishedAt}</p>
                                <a href="${element.url}" class="card-link" target="_blank">Detalles</a>
                            </div>
                         </div>`;
        contentData.appendChild(divX);
    });
    }
        
    }

btnBuscar.addEventListener("click", buscarNoticia);
obtenerNoticia();