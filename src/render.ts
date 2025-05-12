import {
  Color,
  FogExp2,
  Group,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { setupAmbientLight, setupSunLight } from "./shader/Lighting";
import { renderGround } from "./Objects/ground";
import { renderSkyBox } from "./shader/Skybox";
import { loadPlayerModel } from "./Objects/player";
import { playerController } from "./scripts/playerController";
import { renderWater } from "./shader/glsl/waterShader/waterShader";
import {
  loadBillBoard,
  loadCloud,
  loadRock,
  loadTable,
  loadTrees,
} from "./Objects/nature";

export const renderWorld = async (canvas: HTMLCanvasElement | null) => {
  if (canvas) {
    const renderer = new WebGLRenderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    const scene = new Scene();

    scene.fog = new FogExp2(new Color(0.7, 0.7, 0.7), 0.01);

    const aspectRatio = window.innerWidth / window.innerHeight;

    const camera = new PerspectiveCamera(75, aspectRatio, 1, 1000);

    renderSkyBox(scene);

    setupAmbientLight(scene, 0xff6b4a, 0.1);
    setupSunLight(scene, 0xffc3b5, 1);
    renderGround(scene);
    loadCloud(scene);
    loadTrees(scene);
    loadTable(scene);
    loadBillBoard(scene);

    const player: any = await loadPlayerModel(scene);

    if (player) {
      playerController(
        scene,
        {
          player: {
            scene: player.player.scene,
            animations: player.player.animations,
          },
        },
        camera
      );
    }

    renderWater(scene);

    const onWindowResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", onWindowResize);

    const animate = () => {
      window.requestAnimationFrame(animate);
      //orbitControls.update();
      renderer.render(scene, camera);
    };

    animate();
  }
};
