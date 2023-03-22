import LightTheme from "./LightTheme";
import DarkTheme from "./DarkTheme";
import {Theme} from "@mui/material";

const themes = [
    LightTheme,
    DarkTheme
]

export default function ThemeSwitcher(theme:  | number): Theme {
    return themes[theme];
}