import { main } from "../wailsjs/go/models";
import { LoadUserData, SaveUserData } from "../wailsjs/go/main/App";
import { reactive } from "vue";

export let data = reactive(new main.UserData());

export function loadData() {
  LoadUserData().then((loaded) => {
    data = reactive(loaded);
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
