import {
  Group,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector3,
  Mesh,
  Object3D,
  AnimationMixer,
  Clock,
  LoopRepeat,
} from "three";

export const playerController = (
  scene: Scene,
  player: { player: { scene: Object3D; animations: any[] } },
  camera: PerspectiveCamera
) => {
  const currentPosition = new Vector3();
  const currentLookat = new Vector3();
  const rotationSpeed = 0.02;
  const moveSpeed = 0.1;
  const lerpFactor = 0.1;
  const keysPressed: Record<string, boolean> = {};
  const rayCaster = new Raycaster();
  const direction = new Vector3();
  const nextPosition = new Vector3();
  const clock = new Clock();
  let isWalking = false;
  let isCollision = false;
  // Animation Mixer
  const animationMixer = new AnimationMixer(player.player.scene);
  const runAnimation = player.player.animations?.[4];

  // Tree Objects
  const treeNames = new Set([
    "CommonTree",
    "BirchTree",
    "Willow",
    "PineTree",
    "Final",
  ]);
  const treeObjects: Object3D[] = scene.children.filter(
    (obj) =>
      obj instanceof Group && obj.name && treeNames.has(obj.name.split("_")[0])
  );

  // Keyboard Events
  const onKeyDown = (e: KeyboardEvent) =>
    (keysPressed[e.key.toLowerCase()] = true);
  const onKeyUp = (e: KeyboardEvent) =>
    (keysPressed[e.key.toLowerCase()] = false);

  function calculateIdealOffset() {
    return new Vector3(0, 3, -5)
      .applyQuaternion(player.player.scene.quaternion)
      .add(player.player.scene.position);
  }

  function calculateIdealLookat() {
    return player.player.scene.position
      .clone()
      .add(
        new Vector3(0, 3, 6).applyQuaternion(player.player.scene.quaternion)
      );
  }

  const updateCamera = () => {
    currentPosition.lerp(calculateIdealOffset(), lerpFactor);
    currentLookat.lerp(calculateIdealLookat(), lerpFactor);
    camera.position.copy(currentPosition);
    camera.lookAt(currentLookat);
    camera.up.set(0, 1, 0);
  };

  const checkCollision = (nextPos: Vector3) => {
    rayCaster.set(nextPos, direction.set(0, -1, 0)); // Check downward
    const intersects = rayCaster.intersectObjects(treeObjects, true);

    return intersects.some((hit) => {
      const objName = hit.object.name?.split("_")[0];
      return hit.object instanceof Mesh && treeNames.has(objName);
    });
  };

  const handleMovement = () => {
    nextPosition.copy(player.player.scene.position);
    player.player.scene.getWorldDirection(direction);

    if (keysPressed["w"]) nextPosition.addScaledVector(direction, moveSpeed);
    if (keysPressed["s"]) nextPosition.addScaledVector(direction, -moveSpeed);

    isCollision = checkCollision(nextPosition);

    if (!isCollision) {
      player.player.scene.position.copy(nextPosition);
    }

    if (keysPressed["a"]) player.player.scene.rotateY(rotationSpeed);
    if (keysPressed["d"]) player.player.scene.rotateY(-rotationSpeed);
  };

  const playRunAnim = () => {
    if (!runAnimation) return;

    const action = animationMixer.clipAction(runAnimation);

    if (keysPressed["w"]) {
      if (isCollision) action.paused = true;
      if (!isWalking) {
        action.play();
        action.setLoop(LoopRepeat, Infinity);
        action.paused = false;
        isWalking = true;
        action.time = moveSpeed;
      }
    } else {
      action.paused = true;
      isWalking = false;
    }
  };

  const animate = () => {
    const delta = clock.getDelta();
    handleMovement();
    playRunAnim();
    animationMixer.update(delta);
    updateCamera();
    requestAnimationFrame(animate);
  };

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  animate();

  // Cleanup event listeners when needed
  return () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  };
};
