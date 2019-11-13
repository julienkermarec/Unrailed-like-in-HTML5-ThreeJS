/** VARIABLES */

counterDOM = document.getElementById('counter');
statsRocksDOM = document.getElementById('stats_rocks');
statsWoodsDOM = document.getElementById('stats_woods');
endDOM = document.getElementById('end');

scene = new THREE.Scene();
distance = 350;
camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 10000);

camera.rotation.x = 14 * Math.PI / 180;
camera.rotation.y = 45 * Math.PI / 180;
camera.rotation.z = 75 * Math.PI / 180;

// console.log("camera.rotation", camera.rotation);

initialCameraPositionY = -Math.tan(camera.rotation.x) * distance;
initialCameraPositionX = Math.tan(camera.rotation.y) * Math.sqrt(distance ** 2 + initialCameraPositionY ** 2);

zoom = 2;

playerSize = 12;

positionWidth = 20;
columns = 20;
boardWidth = positionWidth * columns;

stepTime = 150; // Miliseconds it takes for the player to take a step forward, backward, left or right

initialDirLightPositionX = 130;
initialDirLightPositionY = 100;

var stats;
var stock;
var user;
var player;
var player_pick;
var hache;
var pioche;
var lanes;
var train;
var train_position;
var train_length;
var train_counter;
var train_countdown;
var train_smoke;
var train_smoke_default;
var level_id = 0;
var level_distance = 0;
colors = {
    rail: 0x414141,
    rock: 0xaa825c,
    pierre: 0xaa825c,
    bois: 0x774a1c,
    sapin: 0x45be6f,
    metal: 0x474648,
    black: 0x000000,
    water: 0x00ffe0,
    white: 0xffffff,
    red: 0xff3333,
    wheel: 0x333333,
    blue: 0x078fff,
    gray: 0xcccccc,
    pink: 0xf274d6,
};
var counter = {
    b: 0,
    p: 0,
    r: 0
};
var started = false;
var currentLane;
var currentColumn;

var previousTimestamp;
var startMoving;
var direction;
var directions;
var moves;
var moves_players;
var stepStartTimestamp;

// laneTypes = ['forest', 'rock'];
var laneSpeeds = [2, 2.5, 3];
var vechicleColors = [0xa52523, 0xbdb638, 0x78b14b];
var threeHeights = [10];

generateLanes = () => [...Array(40).keys()].map(index => {
    lane = new Lane(index);
    lane.mesh.position.y = index * positionWidth * zoom;
    scene.add(lane.mesh);
    return lane;
}).filter(lane => lane.index >= 0);

generateTrain = () => {
    let train = new Train();
    train.position.x = (train_position[0] * positionWidth) * zoom;
    train.position.y = 6.8 * positionWidth * zoom;
    return train;
}
generateWagonWater = () => {
    let wwater = new Wagon('water');
    wwater.position.x = (9 * positionWidth) * zoom;
    wwater.position.y = 5.3 * positionWidth * zoom;

    return wwater;
}
generateWagonStock = () => {
    let wstock = new Wagon('stock');
    wstock.position.x = (9 * positionWidth) * zoom;
    wstock.position.y = 3.7 * positionWidth * zoom;


    wstockbois = new THREE.Group();
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


    wstockpierre = new THREE.Group();
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
generateWagonRails = () => {
    wrail = new Wagon('rail');
    wrail.position.x = (9 * positionWidth) * zoom;
    wrail.position.y = 2.1 * positionWidth * zoom;

    return wrail;
}

addLane = () => {
    index = lanes.length;
    lane = new Lane(index);
    lane.mesh.position.y = index * positionWidth * zoom;
    scene.add(lane.mesh);
    lanes.push(lane);
};
