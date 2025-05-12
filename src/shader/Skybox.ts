import { DataTexture, EquirectangularReflectionMapping, Scene } from "three";
import { EXRLoader } from "three/examples/jsm/Addons.js";

export const renderSkyBox = (scene: Scene) => {
  const exrLoader = new EXRLoader();

  exrLoader.load(
    "../../public/skybox/day_light.exr",
    (data: DataTexture, texData: object) => {
      data.mapping = EquirectangularReflectionMapping;
      scene.environment = data;
      scene.background = data;
    }
  );
};
