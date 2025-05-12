import { renderWorld } from "./render";
import "./style.css";

const worldCanvas = document.querySelector<HTMLCanvasElement>("#worldCanvas");

renderWorld(worldCanvas);
