import { main } from "../wailsjs/go/models";
import { LoadUserData, SaveUserData } from "../wailsjs/go/main/App";

export let data = new main.UserData();

export function loadData() {
  LoadUserData().then((loaded) => {
    data = loaded;
    updateStyle();
  });
}

export function saveData() {
  SaveUserData(data);
  updateStyle();
}

export function updateStyle() {
  document.documentElement.style.setProperty("--accent", data.AccentColor);
  document.documentElement.style.setProperty(
    "--accent-hover",
    data.AccentHover,
  );
}
