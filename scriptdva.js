const container = document.querySelector(".containerdva");
const baza = document.querySelector(".baza")
const sezoneiglumci = document.querySelector(".sezoneiglumci")
const sezone = document.querySelector(".sezone")
const glumci = document.querySelector(".glumci")
const title = document.querySelector("h1")
const divSlika = document.querySelector(".slika")
const listasezone = document.querySelector(".sezone ul")
const listaglumaca = document.querySelector(".glumci ul")
const finalniDetalji = document.querySelector(".details")

const id = sessionStorage.getItem("showid");

function renderShow(data) {
  title.textContent = data.name;
 
  const slika = document.createElement("img")
  const text = document.createElement('p')
  slika.setAttribute("src", data.image.medium);
  divSlika.appendChild(slika)
  baza.appendChild(divSlika)
  container.appendChild(title);
  container.appendChild(baza)
  const showDetails = document.createElement("h3")
  showDetails.textContent="Show Details"
  finalniDetalji.appendChild(showDetails)
  text.innerHTML=data.summary
  finalniDetalji.appendChild(text)
  
  container.appendChild(finalniDetalji)

}

function showSeasons(data) {
  console.log(data);
const brojSezona = document.createElement("h3")
brojSezona.textContent="Seasons (" + data.length + ")"

data.forEach(e=>{
    const li = document.createElement("li")
    li.textContent =e.premiereDate + " - " + e.endDate
    listasezone.appendChild(li)
    
})

sezone.append(brojSezona)
sezone.appendChild(listasezone)
sezoneiglumci.appendChild(sezone)
baza.appendChild(sezoneiglumci)

}

function showCast (data){
    console.log(data)
    const brojGlumaca = document.createElement("h3")
    brojGlumaca.textContent= "Cast"
    data.forEach(e=>{
        const li = document.createElement("li")
        li.textContent = e.person.name
        listaglumaca.appendChild(li)
    })
    glumci.appendChild(brojGlumaca)
    glumci.appendChild(listaglumaca)
    sezoneiglumci.appendChild(glumci)
    baza.appendChild(sezoneiglumci)
}

function fetchSeasons() {
  fetch("https://api.tvmaze.com/shows/" + id + "/seasons")
    .then((res) => res.json())
    .then((data) => showSeasons(data));
}

function fetchCast () {
    fetch("https://api.tvmaze.com/shows/" + id + "/cast")
    .then((res) => res.json())
    .then((data) => showCast(data));
}

function fetchSingleShow() {
  fetch("https://api.tvmaze.com/shows/" + id)
    .then((res) => res.json())
    .then((data) => renderShow(data));
}

window.addEventListener("load", () => {
  fetchSingleShow();
  fetchSeasons();
  fetchCast();
})

