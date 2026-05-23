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

  document.body.classList.remove(
    "light",
    "dark",
    "midnight",
    "black-hole",
    "nullscapes",
    "kocmoc",
  );

  let theme = data.Theme;

  if (theme === "system") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  console.log(theme);
  if (["light", "dark", "black-hole", "nullscapes", "kocmoc"].includes(theme)) {
    document.body.classList.add(theme);
  } else {
    document.body.classList.add("dark");
  }
}
