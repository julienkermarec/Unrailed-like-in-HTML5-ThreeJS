
const counterDOM = document.getElementById('counter');
const statsRocksDOM = document.getElementById('stats_rocks');
const statsWoodsDOM = document.getElementById('stats_woods');
const endDOM = document.getElementById('end');

const scene = new THREE.Scene();
const distance = 350;
const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 10000);

camera.rotation.x = 14 * Math.PI / 180;
camera.rotation.y = 45 * Math.PI / 180;
camera.rotation.z = 75 * Math.PI / 180;

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
var stock;
let player;
let player_pick;
let hache;
let pioche;
let lanes;
let train;
let train_position;
let train_length;
let train_counter;
let train_countdown;
let train_smoke;
let train_smoke_default;
let level_id = 0;
let level_distance = 0;
let colors = {
    rail: 0x414141,
    rock: 0xaa825c,
    pierre: 0xaa825c,
    bois: 0x774a1c,
    sapin: 0x45be6f,
    metal: 0x474648,
    black: 0x000000,
    water: 0x00ffe0,
    red: 0xff3333,
    wheel: 0x333333,
    blue: 0x078fff,
    gray: 0xcccccc,
    pink: 0xf274d6,
};
let counter = {
    b: 0,
    p: 0,
    r: 0
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

function Texture(color, width, height, rects) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.fillStyle = '#FFF';
    context.fillRect(0, 0, width, height);
    context.fillStyle = color;
    rects.forEach(rect => {
        context.fillRect(rect.x, rect.y, rect.w, rect.h);
    });
    return new THREE.CanvasTexture(canvas);
}

const generateLanes = () => [...Array(40).keys()].map(index => {
    const lane = new Lane(index);
    lane.mesh.position.y = index * positionWidth * zoom;
    scene.add(lane.mesh);
    return lane;
}).filter(lane => lane.index >= 0);

const generateTrain = () => {
    let train = new Train();
    train.position.x = (train_position[0] * positionWidth) * zoom;
    train.position.y = 6.8 * positionWidth * zoom;
    return train;
}
const generateWagonWater = () => {
    let wwater = new Wagon('water');
    wwater.position.x = (9 * positionWidth) * zoom;
    wwater.position.y = 5.3 * positionWidth * zoom;

    return wwater;
}
const generateWagonStock = () => {
    let wstock = new Wagon('stock');
    wstock.position.x = (9 * positionWidth) * zoom;
    wstock.position.y = 3.7 * positionWidth * zoom;


    const wstockbois = new THREE.Group();
    for (let i = 0; i < 6; i++) {
        let stock_bois = new Stock('bois');
        stock_bois.position.z = 28;
        stock_bois.position.y = 33 - (i * 5);
        stock_bois.position.x = 20;
        stock_bois.rotation.z = Math.PI;
        stock_bois.rotation.x = Math.PI / 2;
        stock_bois.visible = false;
        wstockbois.add(stock_bois);
    }


    const wstockpierre = new THREE.Group();
    for (let i = 0; i < 6; i++) {
        let stock_pierre = new Stock('metal');
        stock_pierre.position.z = 28;
        stock_pierre.position.y = -24 + (i * 5);
        stock_pierre.position.x = 20;
        stock_pierre.rotation.z = Math.PI;
        stock_pierre.rotation.x = Math.PI / 2;
        stock_pierre.visible = false;
        wstockpierre.add(stock_pierre);
    }
    wstock.add(wstockbois);
    wstock.add(wstockpierre);

    return wstock;
}
const generateWagonRails = () => {
    wrail = new Wagon('rail');
    wrail.position.x = (9 * positionWidth) * zoom;
    wrail.position.y = 2.1 * positionWidth * zoom;

    return wrail;
}

const addLane = () => {
    const index = lanes.length;
    const lane = new Lane(index);
    lane.mesh.position.y = index * positionWidth * zoom;
    scene.add(lane.mesh);
    lanes.push(lane);
};
