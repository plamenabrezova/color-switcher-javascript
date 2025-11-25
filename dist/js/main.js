const initApp = () => {
  localStorage.clear();
  if (!localStorage.getItem("mode")) {
    initAppWithEmptyLocalStorage();
  }

  applyColorsOnScreen();

  changeAppMode();
  changeColorValues();
};

const initAppWithEmptyLocalStorage = () => {
  localStorage.setItem("mode", "color_flipper");
  setLocalStorageColors(generateRandomColor);
};

const setLocalStorageColors = (generateNextValue) => {
  localStorage.setItem("current_color", generateNextValue());
  localStorage.setItem("next_color", generateNextValue());
};

const applyColorsOnScreen = () => {
  const mainElement = document.getElementById("main");
  mainElement.style.backgroundColor = `${localStorage.getItem(
    "current_color"
  )}`;

  changeSectionContent(
    ".current-color__value",
    localStorage.getItem("current_color")
  );
  changeSectionContent(
    ".next-color__value",
    localStorage.getItem("next_color")
  );
};

const changeSectionContent = (elementClass, color) => {
  const element = document.querySelector(elementClass);
  element.textContent = color;
  element.style.color = color;
};

const changeAppMode = () => {
  const modeButtons = document.getElementById("nav");
  modeButtons.addEventListener("click", (event) => {
    if (event.target.id !== localStorage.getItem("mode")) {
      localStorage.setItem("mode", event.target.id);
      setColorsInLocalStorage();
      applyColorsOnScreen();
    }
  });
};

const setColorsInLocalStorage = () => {
  if (localStorage.getItem("mode") === "color_flipper") {
    setLocalStorageColors(generateRandomColor);
  } else {
    setLocalStorageColors(generateRandomHexColorCode);
  }
};

const changeColorValues = () => {
  const changeBtn = document.getElementById("change-mode");
  changeBtn.addEventListener("click", () => {
    if (localStorage.getItem("mode") === "color_flipper") {
      changeColorValuesInLocalStorage(generateRandomColor);
      applyColorsOnScreen();
    } else {
      changeColorValuesInLocalStorage(generateRandomHexColorCode);
      applyColorsOnScreen();
    }
  });
};

const changeColorValuesInLocalStorage = (generateNextValue) => {
  localStorage.setItem("current_color", localStorage.getItem("next_color"));
  localStorage.setItem("next_color", generateNextValue());
};

const FLIPPER_COLORS = [
  "#F7C8E0",
  "#DFFFD8",
  "#B4E4FF",
  "#95BDFF",
  "#B9F3E4",
  "#EA8FEA",
  "#FFAACF",
  "#F6E6C2",
  "#B5F1CC",
  "#E5FDD1",
  "#C9F4AA",
  "#FCC2FC",
  "#6096B4",
  "#93BFCF",
  "#BDCDD6",
  "#EEE9DA",
  "#AAE3E2",
  "#D9ACF5",
  "#FFCEFE",
  "#FDEBED",
];

const HEX_REF = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

const generateRandomColor = () => {
  return FLIPPER_COLORS[Math.floor(Math.random() * FLIPPER_COLORS.length)];
};

const generateRandomHexColorCode = () => {
  const result = [];

  for (let i = 0; i < 6; i++) {
    result.push(HEX_REF[Math.floor(Math.random() * 16)]);
  }

  return "#" + result.join("");
};

document.addEventListener("DOMContentLoaded", initApp);
