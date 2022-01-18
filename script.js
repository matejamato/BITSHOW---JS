const container = document.querySelector(".container");
let input = document.querySelector("input");
let ul = document.querySelector("ul");
let watchLista = document.querySelector(".watchlist");
let oLista = document.querySelector(".olista");
let wL = document.querySelector("#wl");
let watchList = [];

function dodajUWathcList(data) {
  const deleteLi = document.querySelectorAll("li");
  deleteLi.forEach((e) => e.remove());
  const filtrirani = data.filter((elem, index) => {
    return data.indexOf(elem) == index;
  });
  // console.log(filtrirani)
  filtrirani.forEach((e) => {
    const li = document.createElement("li");
    const deleteListItem = document.createElement("button");
    deleteListItem.textContent = "x";
    li.textContent = e;

    deleteListItem.addEventListener("click", () => {
      deleteListItem.remove();
      li.remove();
      watchList.pop(data);
    });

    li.appendChild(deleteListItem);
    oLista.appendChild(li);
  });
}

function createLayout(data) {
  // console.log(data);
  data.slice(0, 50).map((elem) => {
    // console.log(e)
    const card = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h3");
    const button = document.createElement("button");
    img.setAttribute("src", elem.image.medium);
    title.textContent = elem.name;
    button.textContent = "Add to Watch List";

    button.addEventListener("click", () => {
      // watchList = []
      watchList.push(elem.name);
      // console.log(watchList)
      dodajUWathcList(watchList);
      console.log(watchList);
      // const li = document.createElement("li");
      // li.textContent = e.name;
      // oLista.appendChild(li);

      // const removebutton = document.createElement("button");
      // removebutton.textContent = "x";
      // oLista.appendChild(removebutton);

      // removebutton.addEventListener("click", () => {
      //   li.remove();
      //   removebutton.remove();
      // });
    });

    img.addEventListener("click", () => {
      sessionStorage.setItem("showid", e.id);
      window.open("./indexdva.html");
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(button);
    container.appendChild(card);
  });
}

function findShows(data) {
  console.log(data);
  const deleteLi = document.querySelectorAll("li");
  deleteLi.forEach((e) => {
    e.remove();
  });
  data.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = element.show.name;
    ul.appendChild(li);

    li.addEventListener("click", () => {
      sessionStorage.setItem("showid", element.show.id);
      window.open("./indexdva.html");
    });
  });
}

function fetchSearch() {
  fetch(" https://api.tvmaze.com/search/shows?q=" + input.value)
    .then((res) => res.json())
    .then((data) => findShows(data));
}

function fetchData() {
  fetch("https://api.tvmaze.com/shows")
    .then((res) => res.json())
    .then((data) => createLayout(data));
}

window.addEventListener("load", () => {
  fetchData();
});
window.addEventListener("keyup", () => {
  fetchSearch();
});

wL.addEventListener("click", () => {
  oLista.classList.toggle("show");
});
