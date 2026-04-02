const submitButton = document.querySelector(".submit-button");
const dialog = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
const image = document.querySelector(".result-image");

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
      "x-rapidapi-key": "API_KEY",
      "x-rapidapi-host": "website-screenshot6.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();
    console.log(result);
    image.src = result.screenshotUrl;
    dialog.showModal();
  } catch (error) {
    console.error(error);
  }
});

closeButton.addEventListener("click", () => {
  dialog.close();
});
