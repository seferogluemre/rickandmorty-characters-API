async function charactersFetchData() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const characters = await response.json();

    return characters;
  } catch (error) {
    console.error("API Hatası:" + error);
  }
}

const selectOptionRender = (character) => {
  const status = character.map((data) => data.status);
  const unique = [...new Set(status)];
  let label;
  const select = document.getElementById("select-option");
  select.innerHTML = ` <option value="All">Tüm Karakterler</option>`;

  unique.map((statusData) => {
    switch (statusData) {
      case "Alive":
        label = "Yaşayanlar";
        break;

      case "Dead":
        label = "Yaşamayanlar";
        break;

      case "unknown":
        label = "Bilinmeyenler";
        break;

      default:
        label = statusData;
    }
    select.innerHTML += `<option value="${statusData}">${label}</option>`;
  });
};

// FİLTRELEME İŞLEMİ --------------
const filteredByStatus = (event, character) => {
  if (event === "All") {
    return character;
  }

  return character.filter((data) => data.status === event);
};

const handleChangeFilter = (event, characters) => {
  const selectedValue = event.target.value;
  const filtered = filteredByStatus(selectedValue, characters);
  renderCharacters(filtered);
};

const initStatusFiltered = (characters) => {
  const select = document.getElementById("select-option");

  select.addEventListener("change", (event) => {
    handleChangeFilter(event, characters);
  });
};
// -------------------------------

const renderCharacters = (character) => {
  const section = document.getElementById("charactersSection");
  section.innerHTML = "";
  const container = document.createElement("div");
  container.className = "container";
  const row = document.createElement("div");
  row.className = "row";
  section.appendChild(container);
  container.appendChild(row);

  character.forEach((character) => {
    const div = document.createElement("div");
    div.className = "card";

    const image = document.createElement("img");
    image.src = `${character.image}`;

    const title = document.createElement("h3");
    title.textContent = `${character.name}`;

    const speciesParagraph = document.createElement("p");
    speciesParagraph.className = "speciesParagraph";

    if (character.species == "Human") {
      speciesParagraph.textContent = "Karakter : İnsan";
    } else if (character.species == "Alien") {
      speciesParagraph.textContent = "Karakter : Yabancı";
    } else if (character.species == "Robot") {
      speciesParagraph.textContent = "Karakter : Robot";
    }

    const statusParagraph = document.createElement("p");
    statusParagraph.className = "aliveStatus";

    const status = character.status;
    const uniqueStatus = [...new Set(status)];

    // Karakterin durumuna göre kontrol yap
    if (character.status === "Dead") {
      statusParagraph.textContent = "Karakter Yaşamıyor";
      statusParagraph.classList.add("statusDead");
    } else if (character.status === "unknown") {
      statusParagraph.textContent = "Bilinmiyor";
      statusParagraph.classList.add("statusUnknown");
    } else if (character.status === "Alive") {
      statusParagraph.textContent = "Karakter Yaşıyor";
    }

    div.appendChild(image);
    div.appendChild(title);
    div.appendChild(statusParagraph);
    div.appendChild(speciesParagraph);

    row.appendChild(div);
  });
};

charactersFetchData()
  .then((value) => {
    renderCharacters(value.results);
    selectOptionRender(value.results);
    initStatusFiltered(value.results);
  })
  .catch((error) => {
    console.log(error);
  });
