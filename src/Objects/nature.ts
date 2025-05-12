import {
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3DEventMap,
  Scene,
  TextureLoader,
  Vector3,
} from "three";
import { FBXLoader, GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

export const loadTrees = (scene: Scene) => {
  const fbxLoader = new FBXLoader();
  fbxLoader.setPath("./nature/FBX/");

  const names = [
    "CommonTree_Dead",
    "CommonTree",
    "BirchTree",
    "BirchTree_Dead",
    "Willow",
    "Willow_Dead",
    "PineTree",
  ];

  for (let i = 0; i < 100; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const index = Math.floor(Math.random() * 5) + 1;

    fbxLoader.load(
      `${name}_${index}.fbx`,
      (data: Group<Object3DEventMap>) => {
        data.scale.set(0.05, 0.05, 0.05);

        const x = Math.random() * 100 - 50;
        const z = Math.random() * 100 - 50;

        data.position.set(x, 3.0, z);
        data.visible = true;
        data.traverse((child) => {
          if (child instanceof Mesh) {
            child.visible = true;
            child.material.transparent = false;
            child.material.opacity = 1;
            child.castShadow = false;
            child.receiveShadow = false;
            child.material.polygonOffset = false;
          }
        });
        data.name = `${name}_${index}`;
        scene.add(data);
      },
      undefined,
      (error: any) => {
        console.error(`Error loading ${name}_${index}.fbx:`, error);
      }
    );
  }
};

export const loadCloud = (scene: Scene) => {
  const gltfLoader = new GLTFLoader();
  gltfLoader.setPath("./nature2/GLTF/");

  const name = "Cloud";

  for (let i = 0; i < 15; i++) {
    const index = Math.floor(Math.random() * 3) + 1;

    gltfLoader.load(
      `${name}${index}.glb`,
      (data) => {
        const cloud = data.scene;

        cloud.position.set(
          Math.random() * 180 - 80,
          Math.random() * 50 + 50,
          Math.random() * 180 - 80
        );

        cloud.scale.set(5, 5, 5);

        scene.add(cloud);
      },
      undefined,
      (error) => {
        console.error(`Error loading ${name}${index}.glb:`, error);
      }
    );
  }
};

export const loadTable = (scene: Scene) => {
  const fbxLoader = new FBXLoader();
  fbxLoader.setPath("./table/");

  const textureLoader = new TextureLoader();
  textureLoader.setPath("./table/textures/");

  const texture = {
    baseColor: textureLoader.load("export_3_id_DefaultMaterial_BaseColor.png"),
    aoMap: textureLoader.load("export_3_id_DefaultMaterial_Metallic.png"),
    normalMap: textureLoader.load("export_3_id_DefaultMaterial_Normal.png"),
    roughnessMap: textureLoader.load(
      "export_3_id_DefaultMaterial_Roughness.png"
    ),
  };

  fbxLoader.load(
    "Final_pivot_ground.FBX",
    (object: Group<Object3DEventMap>) => {
      object.scale.set(0.005, 0.005, 0.005);
      object.position.set(0, 3, 0);
      object.name = "Final_pivot_ground";

      object.traverse((child) => {
        if (child instanceof Mesh) {
          child.material = new MeshStandardMaterial({
            aoMap: texture.aoMap,
            roughnessMap: texture.roughnessMap,
            map: texture.baseColor,
            normalMap: texture.normalMap,
          });
        }
      });

      scene.add(object);
    }
  );
};

export const loadBillBoard = (scene: Scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.setPath("./billboard/");

  gltfLoader.load("scene.gltf", (object: GLTF) => {
    object.scene.position.set(-40, 3.0, -13);
    object.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = new MeshStandardMaterial({
          map: (child.material as any).map,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(object.scene);
  });
};

export const loadRock = (scene: Scene) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.setPath("./rocks/");

  gltfLoader.load("scene.gltf", (object: GLTF) => {
    scene.add(object.scene);
  });
};
