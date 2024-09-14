async function charactersFetchData() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const characters = await response.json();

    return characters;
  } catch (error) {
    console.error("API Hatası:" + error);
  }
}

const renderCharactes = (character) => {
  const section = document.getElementById("charactersSection");
  const container = document.createElement("div");
  container.className = "container";
  const row = document.createElement("div");
  row.className = "row";
  section.appendChild(container);
  container.appendChild(row);

  const charactersItems = character.map((character) => {
    const div = document.createElement("div");
    div.className = "card";

    const image = document.createElement("img");
    image.src = `${character.image}`;

    const title = document.createElement("h3");
    title.textContent = `${character.name}`;

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

    return div;
  });

  charactersItems.forEach((data) => {
    row.appendChild(data);
  });
};

charactersFetchData()
  .then((value) => {
    renderCharactes(value.results);
  })
  .catch((error) => {
    console.log(error);
  });
