import {
  AmbientLight,
  ColorRepresentation,
  DirectionalLight,
  Scene,
} from "three";

export const setupAmbientLight = (
  scene: Scene,
  color: ColorRepresentation,
  intensity: number
) => {
  const ambinet = new AmbientLight(color, intensity);
  scene.add(ambinet);
};

export const setupSunLight = (
  scene: Scene,
  color: ColorRepresentation,
  intensity: number
) => {
  const directionLight = new DirectionalLight(color, intensity);
  directionLight.position.set(10, 20, 15);
  directionLight.castShadow = true;
  scene.add(directionLight);
};
