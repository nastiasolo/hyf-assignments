const submitButton = document.querySelector(".submit-button");
const dialog = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

let currentScreenshotUrl = null;

const image = document.querySelector(".result-image");
const saveButton = document.querySelector(".save-button");

const cardsContainer = document.querySelector(".cards-container");
const cardsTitle = document.querySelector(".cards-title");

function toggleTitleVisibility() {
  if (cardsContainer.children.length > 0) {
    cardsTitle.style.display = "block";
  } else {
    cardsTitle.style.display = "none";
  }
}

async function loadCards() {
  try {
    const res = await fetch(
      "https://crudcrud.com/api/API_KEY_CRUD/screenshots",
    );
    const data = await res.json();

    data.forEach((item) => {
      const card = new ScreenshotCard({
        id: item._id,
        imageUrl: item.imageUrl,
        container: cardsContainer,
      });

      card.render();
    });
  } catch (error) {
    console.log(error);
  }
}

loadCards();

class ScreenshotCard {
  constructor({ id, imageUrl, container }) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.container = container;
  }

  render() {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = this.imageUrl;
    img.classList.add("card-image");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      this.handleDelete(card);
    });

    card.append(img, deleteBtn);
    this.container.prepend(card);

    toggleTitleVisibility();
  }

  async handleDelete(cardElement) {
    try {
      await fetch(
        `https://crudcrud.com/api/API_KEY_CRUD/screenshots/${this.id}`,
        {
          method: "DELETE",
        },
      );

      cardElement.remove();
      toggleTitleVisibility();
    } catch (error) {
      console.error(error);
    }
  }
}

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  let userUrl = document.querySelector(".url-input").value;
  console.log(userUrl);

  if (!userUrl.startsWith("http")) {
    userUrl = "https://" + userUrl;
  }

  const apiUrl = `https://website-screenshot6.p.rapidapi.com/screenshot?url=${encodeURIComponent(userUrl)}&width=1920&height=1080`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "API_KEY_RAPID",
      "x-rapidapi-host": "website-screenshot6.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();
    console.log(result);
    currentScreenshotUrl = result.screenshotUrl;
    image.src = result.screenshotUrl;
    dialog.showModal();
  } catch (error) {
    console.error(error);
  }
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

saveButton.addEventListener("click", async () => {
  try {
    if (!currentScreenshotUrl) {
      console.log("No screenshot");
      return;
    }

    console.log("Saving:", currentScreenshotUrl);

    const response = await fetch(
      "https://crudcrud.com/api/API_KEY_CRUD/screenshots",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: currentScreenshotUrl,
        }),
      },
    );

    if (!response.ok) {
      const text = await response.text();
      console.error(text);
      throw new Error("API ERROR");
    }

    const data = await response.json();

    const card = new ScreenshotCard({
      id: data._id,
      imageUrl: data.imageUrl,
      container: cardsContainer,
    });

    card.render();

    dialog.close();
  } catch (error) {
    console.error(error);
  }
});
