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

        divX.innerHTML=`<div class="card h-100">
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
        contentData.innerHTML=(`<div class="alert alert-info w-100 text-center"> Campo de texto vacio, ingresa una busqueda</div>`);
        return
    }else{
 let url = `https://newsapi.org/v2/everything?q=${noticiaBusqueda}&sortBy=popularity&apiKey=6f0e8a814397413e8e73e358737159ed`;         
        if (inputFechaInicio.value) {
            url += `&from=${inputFechaInicio.value}`;
        }
        if (inputFechaFin.value) {
            url += `&to=${inputFechaFin.value}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        contentData.innerHTML = "";
        if (data.articles.length === 0) {
            contentData.innerHTML = `<div class="alert alert-info w-100 text-center">
                                        No se encontraron noticias para "${noticiaBusqueda}" en el rango de fechas seleccionado.
                                     </div>`;
            return;
        }

    data.articles.forEach(element => {
        const imagenSegura = element.urlToImage || 'https://www.csam.unam.mx/static/images/imagen-no-disponible.jpg';
        const divX = document.createElement("div");
        divX.classList.add("col-md-6");

        divX.innerHTML = `<div class="card h-100">
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