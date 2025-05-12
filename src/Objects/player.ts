import { Scene } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

export const loadPlayerModel = async (scene: Scene) => {
  const modelLoader = new GLTFLoader();

  return await new Promise((reslove, reject) => {
    modelLoader.load(
      "../../public/model/player/scene.gltf",
      (data: GLTF) => {
        scene.add(data.scene);
        data.scene.position.y = 3.0;
        reslove({ player: data });
      },
      undefined,
      (err: unknown) => {
        reject(err);
      }
    );
  });
};
