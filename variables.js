
const counterDOM = document.getElementById('counter');
const statsRocksDOM = document.getElementById('stats_rocks');
const statsWoodsDOM = document.getElementById('stats_woods');
const endDOM = document.getElementById('end');

const scene = new THREE.Scene();
const distance = 500;
const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 10000);

camera.rotation.x = 27 * Math.PI / 180;
camera.rotation.y = 60 * Math.PI / 180;
camera.rotation.z = 60 * Math.PI / 180;

console.log("camera.rotation", camera.rotation);

const initialCameraPositionY = -Math.tan(camera.rotation.x) * distance;
const initialCameraPositionX = Math.tan(camera.rotation.y) * Math.sqrt(distance ** 2 + initialCameraPositionY ** 2);
camera.position.y = initialCameraPositionX;
camera.position.x = initialCameraPositionY;
camera.position.z = distance;

const zoom = 2;

const playerSize = 15;

const positionWidth = 42;
const columns = 10;
const boardWidth = positionWidth * columns;

const stepTime = 200; // Miliseconds it takes for the player to take a step forward, backward, left or right

const initialDirLightPositionX = 50;
const initialDirLightPositionY = 70;
let lanes;
let train;
let colors = {
    rock: 0x414141,
    black: 0x000000,
    red: 0xff3333,
    wheel: 0x333333,
    blue: 0x0000ff,
    gray: 0xcccccc,
};
let counter = {
    rails: 0,
    rocks: 10,
    woods: 10
};
let started = false;
let currentLane;
let currentColumn;

let previousTimestamp;
let startMoving;
let moves;
let stepStartTimestamp;

const laneTypes = ['forest', 'rock'];
const laneSpeeds = [2, 2.5, 3];
const vechicleColors = [0xa52523, 0xbdb638, 0x78b14b];
const threeHeights = [10];

function Texture(width, height, rects) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "rgba(0,0,0,0.6)";
    rects.forEach(rect => {
        context.fillRect(rect.x, rect.y, rect.w, rect.h);
    });
    return new THREE.CanvasTexture(canvas);
}


const carFrontTexture = new Texture(40, 80, [{ x: 0, y: 10, w: 30, h: 60 }]);
const carBackTexture = new Texture(40, 80, [{ x: 10, y: 10, w: 30, h: 60 }]);
const carRightSideTexture = new Texture(110, 40, [{ x: 10, y: 0, w: 50, h: 30 }, { x: 70, y: 0, w: 30, h: 30 }]);
const carLeftSideTexture = new Texture(110, 40, [{ x: 10, y: 10, w: 50, h: 30 }, { x: 70, y: 10, w: 30, h: 30 }]);

const truckFrontTexture = new Texture(30, 30, [{ x: 15, y: 0, w: 10, h: 30 }]);
const truckRightSideTexture = new Texture(25, 30, [{ x: 0, y: 15, w: 10, h: 10 }]);
const truckLeftSideTexture = new Texture(25, 30, [{ x: 0, y: 5, w: 10, h: 10 }]);

const generateLanes = () => [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => {
    const lane = new Lane(index);
    lane.mesh.position.y = index * positionWidth * zoom;
    scene.add(lane.mesh);
    return lane;
}).filter(lane => lane.index >= 0);

const generateTrain = () => {
    let train = new Train();
    train.position.x = (position * positionWidth + positionWidth / 2) * zoom - boardWidth * zoom / 2;
    train.position.y = -2 * positionWidth * zoom;

    let wagon = new Wagon();
    wagon.position.y = -2 * positionWidth * zoom;
    train.add(wagon);

    wagon2 = new Wagon();
    wagon2.position.y = -4 * positionWidth * zoom;
    train.add(wagon2);

    scene.add(train);

    // let car = new Car();

    // car.position.x = (position * positionWidth + positionWidth / 2) * zoom - boardWidth * zoom / 2;
    // car.position.y = 0 * positionWidth * zoom;
    // car.rotation.z = - (Math.PI / 2);
    // scene.add(car);

    return train;
}

const addLane = () => {
    const index = lanes.length;
    const lane = new Lane(index);
    lane.mesh.position.y = index * positionWidth * zoom;
    scene.add(lane.mesh);
    lanes.push(lane);
};
