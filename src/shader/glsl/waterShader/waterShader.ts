import {
  Clock,
  Color,
  Mesh,
  PlaneGeometry,
  RawShaderMaterial,
  Scene,
} from "three";
import vertexShader from "./vertexShader.glsl";
import fragmentShader from "./fragmentShader.glsl";
import { GUI } from "dat.gui";

export const renderWater = (scene: Scene) => {
  const planeGeometry = new PlaneGeometry(500, 500, 100, 100);
  const shaderMaterial = new RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      color: { value: new Color(1.0, 1.0, 1.0) },
      uWaveHeight: { value: 10 },
      uWaveLength: { value: 0.19 },
      uTime: { value: 1 },
      uFogColor: { value: new Color(0.7, 0.7, 0.7) },
      uFogDensity: { value: 1.2 },
    },
  });

  const gui = new GUI();

  gui
    .add(shaderMaterial.uniforms.uWaveHeight, "value", 1.0, 10.0)
    .name("Wave Height");
  gui
    .add(shaderMaterial.uniforms.uWaveLength, "value", 0.1, 1.0)
    .name("Wave Length");
  // Create a local color variable for GUI binding
  const colorController = {
    color: `#${shaderMaterial.uniforms.color.value.getHexString()}`,
    uFogColor: `#${shaderMaterial.uniforms.uFogColor.value.getHexString()}`,
  };

  // Add color controller and update shaderMaterial's color
  gui
    .addColor(colorController, "color")
    .name("Water Color")
    .onChange((value: string) => {
      shaderMaterial.uniforms.color.value.set(value); // Update the uniform color
    });

  gui
    .addColor(colorController, "color")
    .name("Fog Color")
    .onChange((value: string) => {
      shaderMaterial.uniforms.uFogColor.value.set(value); // Update the uniform color
    });

  const clock = new Clock();

  const handleAnim = () => {
    shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
    window.requestAnimationFrame(handleAnim);
  };

  // window.addEventListener("click", () => {
  //   shaderMaterial.uniforms.color.value = new Color(
  //     Math.random(),
  //     Math.random(),
  //     Math.random()
  //   );
  // });

  handleAnim();

  const planeMash = new Mesh(planeGeometry, shaderMaterial);

  planeMash.rotateX(-Math.PI / 2);

  scene.add(planeMash);
};
