import { Mesh, MeshStandardMaterial, PlaneGeometry, Scene } from "three";

export const renderGround = (scene: Scene) => {
  const planeGeometry = new PlaneGeometry(100, 100, 50, 50);
  const planeMaterial = new MeshStandardMaterial({
    color: 0x3fb55f,
    metalness: 0.1,
    fog: true,
  });

  const planeMash = new Mesh(planeGeometry, planeMaterial);

  planeMash.position.y = 3.0;

  planeMash.receiveShadow = true;
  planeMash.name = "ground";
  planeMash.rotateX(-Math.PI / 2);

  scene.add(planeMash);
};
