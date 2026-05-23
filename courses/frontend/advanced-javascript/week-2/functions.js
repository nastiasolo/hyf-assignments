window.addEventListener("load", (event) => {
  setTimeout(() => {
    console.log("Called after 2.5 seconds");
  }, 2500);
});

function stringWithDelay(delay, stringToLog) {
  setTimeout(() => {
    console.log(stringToLog);
  }, delay * 1000);
}

stringWithDelay(5, "Hello World");

const delayBtn = document.querySelector(".delay-click-button");

delayBtn.addEventListener("click", () => {
  stringWithDelay(5, "Called after 5 seconds");
});

const earthLogger = () => {
  console.log("Earth");
};

const saturnLogger = () => {
  console.log("Saturn");
};

function planetLogFunction(func) {
  func();
}

planetLogFunction(earthLogger);
planetLogFunction(saturnLogger);

const locationBtn = document.querySelector(".location-button");
const body = document.querySelector("body");
const mapContainer = document.querySelector(".map-container");

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);

  mapContainer.innerHTML = `
          <gmp-map
            center="${crd.latitude},${crd.longitude}"
            zoom="10"
            map-id="DEMO_MAP_ID"
            style="height: 500px"></gmp-map>
  `;
}

locationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(success);
});

function runAfterDelay(delay, callback) {
  setTimeout(() => {
    callback();
  }, delay * 1000);
}

runAfterDelay(7, earthLogger);

document.addEventListener("dblclick", () => {
  console.log("double click!");
});

function jokeCreator(shouldTellFunnyJoke, logFunnyJoke, logBadJoke) {
  if (shouldTellFunnyJoke) {
    logFunnyJoke();
  } else {
    logBadJoke;
  }
}
