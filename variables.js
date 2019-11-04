
const counterDOM = document.getElementById('counter');
const statsRocksDOM = document.getElementById('stats_rocks');
const statsWoodsDOM = document.getElementById('stats_woods');
const endDOM = document.getElementById('end');

const scene = new THREE.Scene();
const distance = 500;
const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 10000);

camera.rotation.x = 24 * Math.PI / 180;
camera.rotation.y = 40 * Math.PI / 180;
camera.rotation.z = 60 * Math.PI / 180;

console.log("camera.rotation", camera.rotation);

let initialCameraPositionY = -Math.tan(camera.rotation.x) * distance;
let initialCameraPositionX = Math.tan(camera.rotation.y) * Math.sqrt(distance ** 2 + initialCameraPositionY ** 2);

const zoom = 2;

const playerSize = 12;

const positionWidth = 20;
const columns = 20;
const boardWidth = positionWidth * columns;

const stepTime = 150; // Miliseconds it takes for the player to take a step forward, backward, left or right

const initialDirLightPositionX = 130;
const initialDirLightPositionY = 100;

var stats;
let player;
let player_pick;
let hache;
let pioche;
let lanes;
let train;
let train_position;
let train_length;
let train_counter;
let train_smoke;
let train_smoke_default;
let level_id = 0;
let colors = {
    rail: 0x414141,
    rock: 0xe28b6d,
    metal: 0xe906c6c,
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
let direction;
let directions;
let moves;
let moves_players;
let stepStartTimestamp;

// const laneTypes = ['forest', 'rock'];
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
const carLeftSideTexture = new Texture(110, 40, [{ x: 10, y: 10, w: 40, h: 30 }, { x: 60, y: 10, w: 40, h: 30 }]);

const stationFrontTexture = new Texture(30, 30, [{ x: 15, y: 0, w: 10, h: 30 }]);
const stationBackTexture = new Texture(30, 60, [{ x: 8, y: 3, w: 27, h: 16 }, { x: 5, y: 21, w: 27, h: 18 }, { x: 8, y: 41, w: 27, h: 16 }]);
const stationLeftSideTexture = new Texture(25, 30, [{ x: 10, y: 0, w: 50, h: 30 }, { x: 70, y: 0, w: 30, h: 30 }]);
const stationRightSideTexture = new Texture(25, 30, [{ x: 0, y: 5, w: 10, h: 10 }]);

const generateLanes = () => [...Array(40).keys()].map(index => {
    const lane = new Lane(index);
    lane.mesh.position.y = index * positionWidth * zoom;
    scene.add(lane.mesh);
    return lane;
}).filter(lane => lane.index >= 0);

const generateTrain = () => {
    let train = new Train();
    train.position.x = (9 * positionWidth) * zoom;
    train.position.y = 5.5 * positionWidth * zoom;

    let wagon = new Wagon('stock');
    wagon.position.y = -2 * positionWidth * zoom;
    train.add(wagon);

    wagon2 = new Wagon('rail');
    wagon2.position.y = -3.7 * positionWidth * zoom;
    train.add(wagon2);
    // train.scale(0.1, 0.1, 0.1);

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
