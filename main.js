const initaliseValues = () => {

    lanes = generateLanes();
    train = generateTrain();
    train_smoke_default = new Smoke();
    train_smoke = new Smoke();
    train.add(train_smoke);
    // console.log(train_smoke);
    scene.add(train);

    menu.style.display = 'none';
    start();
    currentLane = 7;
    currentColumn = 12;
    currentLane = 3;
    currentColumn = 8;
    level_id = 0;
    player_pick = [];

    previousTimestamp = null;

    startMoving = false;
    moves = [];
    directions = [];
    moves_players = [];
    stepStartTimestamp;

    player.position.x = currentColumn * positionWidth * zoom;
    player.position.y = currentLane * positionWidth * zoom;
    players = [];

    camera.position.y = initialCameraPositionY;
    camera.position.x = initialCameraPositionX;


    // dirLight.position.z = 180;
    // dirLight.target = train;
    // dirLight.position.x = initialDirLightPositionX;
    // dirLight.position.y = initialDirLightPositionY;
    // dirLight.position.y = initialDirLightPositionY;
};

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

function createStats() {
    var stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0';
    stats.domElement.style.top = '0';

    return stats;
}

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

document.addEventListener("DOMContentLoaded", function () {
    var scale = 'scale(1)';
    document.body.style.zoom = (window.innerWidth / window.outerWidth);
    document.body.style.webkitTransform = scale;    // Chrome, Opera, Safari
    document.body.style.msTransform = scale;       // IE 9
    document.body.style.transform = scale;     // General
});

document.querySelector("#retry").addEventListener("click", () => {
    lanes.forEach(lane => scene.remove(lane.mesh));
    initaliseValues();
    endDOM.style.visibility = 'hidden';
});

document.addEventListener('mousewheel', (data) => {
    console.log("mousewheel", data);
    if (data.deltaY > 0)
        camera.zoom -= 0.01;
    else
        camera.zoom += 0.01;
    camera.updateProjectionMatrix();
}, false);

document.getElementById('forward').addEventListener("click", () => move('left'));

document.getElementById('backward').addEventListener("click", () => move('right'));

document.getElementById('left').addEventListener("click", () => move('backward'));

document.getElementById('right').addEventListener("click", () => move('forward'));

window.addEventListener("keydown", event => {
    console.log("event.keyCode", event.keyCode);
    if (event.keyCode == '32') {
        action();
    }
    else if (event.keyCode == '16') {
        pick();
    }
    else if (event.keyCode == '38') {
        // up arrow
        // move('forward');
        move('left');
    } else if (event.keyCode == '40') {
        // down arrow
        // move('backward');
        move('right');
    } else if (event.keyCode == '37') {
        // left arrow
        // move('left');
        move('backward');
    } else if (event.keyCode == '39') {
        // right arrow
        // move('right');
        move('forward');
    }
});

function pick() {
    console.log("pick", levels[level_id][currentColumn][currentLane]);
    if (!started)
        return;
    type = levels[level_id][currentColumn][currentLane][1];
    type_color = (type == 'b' ? 0xaa5252 : colors.metal);
    if (type == 'b' || type == 'p') {
        if (player_pick.length >= 3 || player_pick.length > 0 && player_pick[0] != type)
            return;
        levels[level_id][currentColumn][currentLane] = levels[level_id][currentColumn][currentLane][0];
        lanes[currentLane].mesh.children[currentColumn].children[1].position.z = -45;
        player_pick.push('type');
        console.log("player pick", player)
        // player.children[3].rotation.z = Math.PI / 2;
        // BRAS PICK
        player.children[2].children[1].rotation.x = Math.PI / 2;
        player.children[2].children[1].rotation.y = Math.PI / 2;
        player.children[2].children[1].position.x = 10;
        player.children[2].children[0].rotation.x = Math.PI / 2;
        player.children[2].children[0].rotation.y = Math.PI / 2;
        player.children[2].children[0].position.x = 10;
        if (player_pick.length == 1) {
            player.children[2].children[2].visible = true;
            player.children[2].children[3].visible = true;
            player.children[2].children[2].material.color.setHex(type_color);
            player.children[2].children[3].material.color.setHex(type_color);
        }
        if (player_pick.length == 2) {
            player.children[2].children[4].visible = true;
            player.children[2].children[5].visible = true;
            player.children[2].children[4].material.color.setHex(type_color);
            player.children[2].children[5].material.color.setHex(type_color);
        }
        if (player_pick.length == 3) {
            player.children[2].children[6].visible = true;
            player.children[2].children[7].visible = true;
            player.children[2].children[6].material.color.setHex(type_color);
            player.children[2].children[7].material.color.setHex(type_color);
        }
    }
}

function action() {
    if (!started)
        return;

    function getCell() {
        if (direction === 'forward') return { lane: currentLane + 1, column: currentColumn };
        if (direction === 'backward') return { lane: currentLane - 1, column: currentColumn };
        if (direction === 'left') return { lane: currentLane, column: currentColumn - 1 };
        if (direction === 'right') return { lane: currentLane, column: currentColumn + 1 };
    }
    nextCell = getCell();
    if (nextCell.column < 0 || nextCell.column >= columns || nextCell.lane < 0)
        return;
    console.log("action nextCell", nextCell);
    console.log("action direction", direction);
    console.log("action", levels[level_id][nextCell.column][nextCell.lane]);
    if (levels[level_id][nextCell.column][nextCell.lane][1] == 't')
        return cutForest(nextCell.column, nextCell.lane);
    if (levels[level_id][nextCell.column][nextCell.lane][1] == 'r')
        return cutRock(nextCell.column, nextCell.lane);
    // if (counter.rocks < 10 || counter.woods < 10)
    //     return;
    // const rails = new Rails();
    // let position_x = finalPositions.column;
    // console.log("rails.position", rails.position);
    // rails.position.x = (position_x * positionWidth + positionWidth / 2) * zoom - boardWidth * zoom / 2;
    // rails.position.y = (finalPositions.lane * positionWidth * zoom);

    // console.log("rails.position after", rails.position);
    // rails.updateMatrix();
    // rails.matrixAutoUpdate = false;
    // setTimeout(() => {
    //     scene.add(rails);
    //     counter.rails++;
    //     counter.rocks -= 10;
    //     counter.woods -= 10;
    //     updateCounter();
    // }, 0, 20);
    // console.log(lanes[finalPositions.lane]);

    // scene.add(rails);
}

function updateCounter() {
    statsRocksDOM.innerHTML = counter.rocks;
    statsWoodsDOM.innerHTML = counter.woods;
    counterDOM.innerHTML = counter.rails;
}
function cutForest(column, lane) {
    console.log("cutForest currentColumn", currentColumn, column);
    console.log("cutForest currentLane", currentLane, lane);
    if (!started)
        return;
    console.log("lanes[lane].mesh.children[column].children[1].position.z ", lanes[lane].mesh.children[column].children[1].position.z);
    console.log("levels[level_id][column][lane]", levels[level_id][column][lane]);
    if (lanes[lane].mesh.children[column].children[1].position.z > -34) {
        lanes[lane].mesh.children[column].children[1].position.z -= 7;
        updateCounter();
    }
    else {
        lanes[lane].mesh.children[column].children[1].position.z = -40;
        levels[level_id][column][lane] = levels[level_id][column][lane][0] + 'b';
        lanes[lane].mesh.children[column].children[1].children[0].position.z = 42;
        lanes[lane].mesh.children[column].children[1].children[0].position.y = 4;
        lanes[lane].mesh.children[column].children[1].children[0].scale.x = 2.5;
        lanes[lane].mesh.children[column].children[1].children[0].scale.z = 0.3;
        lanes[lane].mesh.children[column].children[1].children[1].position.z = 42;
        lanes[lane].mesh.children[column].children[1].children[1].position.y = -9;
        lanes[lane].mesh.children[column].children[1].children[1].scale.x = 2.5;
        lanes[lane].mesh.children[column].children[1].children[1].scale.z = 0.3;
        lanes[lane].mesh.children[column].children[1].children[2].scale.z = 0.1;
        lanes[lane].mesh.children[column].children[1].children[2].scale.x = 0.1;
        lanes[lane].mesh.children[column].children[1].children[2].scale.y = 0.1;
        // lanes[lane].mesh.children[column].children[1].children[1].scale.x = 3;
    }
    return;
}
function cutRock(column, lane) {
    console.log("cutForest currentColumn", currentColumn, column);
    console.log("cutForest currentLane", currentLane, lane);
    if (!started)
        return;
    console.log("lanes[lane].mesh.children[column].children[1].position.z ", lanes[lane].mesh.children[column].children[1].position.z);
    console.log("levels[level_id][column][lane]", levels[level_id][column][lane]);
    if (lanes[lane].mesh.children[column].children[1].position.z > -34) {
        lanes[lane].mesh.children[column].children[1].position.z -= 7;
        updateCounter();
    }
    else {
        lanes[lane].mesh.children[column].children[1].position.z = -40;
        levels[level_id][column][lane] = levels[level_id][column][lane][0] + 'p';
        lanes[lane].mesh.children[column].children[1].children[0].position.z = 42;
        lanes[lane].mesh.children[column].children[1].children[0].position.y = 4;
        lanes[lane].mesh.children[column].children[1].children[0].scale.x = 2.5;
        lanes[lane].mesh.children[column].children[1].children[0].scale.z = 0.3;
        lanes[lane].mesh.children[column].children[1].children[1].position.z = 42;
        lanes[lane].mesh.children[column].children[1].children[1].position.y = -9;
        lanes[lane].mesh.children[column].children[1].children[1].scale.x = 2.5;
        lanes[lane].mesh.children[column].children[1].children[1].scale.z = 0.3;
        lanes[lane].mesh.children[column].children[1].children[2].scale.z = 0.1;
        lanes[lane].mesh.children[column].children[1].children[2].scale.x = 0.1;
        lanes[lane].mesh.children[column].children[1].children[2].scale.y = 0.1;
        // lanes[lane].mesh.children[column].children[1].children[1].scale.x = 3;
    }
    return;
}

function addPlayer(userId) {

    players[userId] = new Player();
    scene.add(players[userId]);


    // const positionX = (2 * positionWidth + positionWidth / 2) * zoom;

    // players[userId].position.x = positionX; // initial player position is 0

}

function setDirections(next_direction) {
    directions.push(next_direction)
}
function move(pdirection, userId = null) {
    direction = pdirection;
    if (channel) {
        if (userId == null) {
            channel.send({ 'type': 'move', 'direction': direction });
        }
        else {
            return moves_players.push({ userId: userId, direction: direction });
        }
    }
    const finalPositions = moves.reduce((position, move) => {
        if (move === 'forward') return { lane: position.lane + 1, column: position.column };
        if (move === 'backward') return { lane: position.lane - 1, column: position.column };
        if (move === 'left') return { lane: position.lane, column: position.column - 1 };
        if (move === 'right') return { lane: position.lane, column: position.column + 1 };
    }, { lane: currentLane, column: currentColumn });
    console.log("-------");
    console.log("direction", direction);
    console.log("direction", direction);

    can_walk_ground = ['e', 'w']
    can_walk_addon = ['t', 'r', 'm', 's', 'd'];

    if (direction === 'forward') {
        if (finalPositions.lane < 0) {
            if (!stepStartTimestamp) { startMoving = true; }
        }
        else {
            console.log("next cell", levels[level_id][finalPositions.column][finalPositions.lane + 1]);
            if (can_walk_ground.indexOf(levels[level_id][finalPositions.column][finalPositions.lane + 1][0]) !== -1)
                return setDirections('forward');
            if (can_walk_addon.indexOf(levels[level_id][finalPositions.column][finalPositions.lane + 1][1]) !== -1)
                return setDirections('forward');
            if (!stepStartTimestamp)
                startMoving = true;
            addLane();
        }
    } else if (direction === 'backward') {
        if (finalPositions.lane <= 0) {
            if (!stepStartTimestamp) { startMoving = true; }
        }
        else {
            console.log("next cell", levels[level_id][finalPositions.column][finalPositions.lane - 1]);
            if (can_walk_ground.indexOf(levels[level_id][finalPositions.column][finalPositions.lane - 1][0]) !== -1)
                return setDirections('backward');
            if (can_walk_addon.indexOf(levels[level_id][finalPositions.column][finalPositions.lane - 1][1]) !== -1)
                return setDirections('backward');
            if (!stepStartTimestamp)
                startMoving = true;
        }
    } else if (direction === 'left') {
        if (finalPositions.column === 0) return;
        if (finalPositions.lane < 0) {
            if (!stepStartTimestamp) { startMoving = true; }
        }
        else {
            console.log("next cell", levels[level_id][finalPositions.column - 1][finalPositions.lane]);
            if (can_walk_ground.indexOf(levels[level_id][finalPositions.column - 1][finalPositions.lane][0]) !== -1)
                return setDirections('left');
            if (can_walk_addon.indexOf(levels[level_id][finalPositions.column - 1][finalPositions.lane][1]) !== -1)
                return setDirections('left');
            if (!stepStartTimestamp) startMoving = true;
        }
    } else if (direction === 'right') {
        if (finalPositions.column === columns - 1) return;
        if (finalPositions.lane < 0) {
            if (!stepStartTimestamp) { startMoving = true; }
        }
        else {
            console.log("next cell", levels[level_id][finalPositions.column + 1][finalPositions.lane]);
            if (can_walk_ground.indexOf(levels[level_id][finalPositions.column + 1][finalPositions.lane][0]) !== -1)
                return setDirections('right');
            if (can_walk_addon.indexOf(levels[level_id][finalPositions.column + 1][finalPositions.lane][1]) !== -1)
                return setDirections('right');
            if (!stepStartTimestamp) startMoving = true;
        }
    }

    console.log("dirLight.position.x", dirLight.position.x);
    console.log("dirLight.position.y", dirLight.position.y);
    if (userId == null) {
        moves.push(direction);
    }
}

function animate(timestamp) {
    requestAnimationFrame(animate);

    if (!previousTimestamp) previousTimestamp = timestamp;
    const delta = timestamp - previousTimestamp;
    previousTimestamp = timestamp;

    // dirLight.position.x = initialDirLightPositionX;
    // dirLight.position.x = initialDirLightPositionX;
    // console.log("camera.position.y", camera.position.y);
    if (started) {
        // console.log("move train", train);
        //Position du train
        train.position.y += 1 / 100 * delta;
        // dirLight.position.x = train.position.x + initialDirLightPositionX;
        // dirLight.position.y = train.position.y + initialDirLightPositionY;
        // dirLight.position.z = 400;
        // dirLight.rotation.y = Math.PI / 2;
        // dirLight.rotation.x = Math.PI / 4;

        // Fumée du train
        if (train_smoke != null) {

            train_smoke.position.z += 1 / 500 * delta;
            train_smoke.position.y -= 1 / 100 * delta;
            train_smoke.scale.x += 1 / 4000 * delta;
            train_smoke.scale.y += 1 / 4000 * delta;
            train_smoke.scale.z += 1 / 4000 * delta;
            train_smoke.children[0].material.opacity -= 1 / 3000 * delta;
            // console.log("train_smoke.children[0].material.opacity", train_smoke.children[0].material.opacity);
            if (train_smoke.children[0].material.opacity < 0) {
                // console.log("train_smoke_default", train_smoke_default);
                train_smoke.children[0].material.opacity = 0.99;
                train_smoke.position.z = train_smoke_default.position.z;
                train_smoke.position.y = train_smoke_default.position.y;
                train_smoke.scale.x = train_smoke_default.scale.x;
                train_smoke.scale.y = train_smoke_default.scale.y;
                train_smoke.scale.z = train_smoke_default.scale.z;
            }
        }

        camera.position.y += 1 / 100 * delta;
    }

    if (startMoving) {
        stepStartTimestamp = timestamp;
        startMoving = false;
    }

    if (stepStartTimestamp) {
        const moveDeltaTime = timestamp - stepStartTimestamp;
        const moveDeltaDistance = Math.min(moveDeltaTime / stepTime, 1) * positionWidth * zoom;
        const jumpDeltaDistance = Math.sin(Math.min(moveDeltaTime / stepTime, 1) * Math.PI) * 8 * zoom;
        // console.log("moves[0]", moves[0]);
        switch (moves[0]) {
            case 'forward': {
                const positionY = currentLane * positionWidth * zoom + moveDeltaDistance;
                // dirLight.position.y = initialDirLightPositionY + positionY;
                player.position.y = positionY;
                player.position.z = jumpDeltaDistance;
                player.rotation.z = Math.PI / 2;
                break;
            }
            case 'backward': {
                positionY = currentLane * positionWidth * zoom - moveDeltaDistance
                // dirLight.position.y = initialDirLightPositionY + positionY;
                player.position.y = positionY;
                player.position.z = jumpDeltaDistance;
                player.rotation.z = -Math.PI / 2;
                break;
            }
            case 'left': {
                const positionX = (currentColumn * positionWidth) * zoom - moveDeltaDistance;
                // dirLight.position.x = initialDirLightPositionX + positionX;
                player.position.x = positionX; // initial player position is 0
                player.position.z = jumpDeltaDistance;
                player.rotation.z = Math.PI;
                break;
            }
            case 'right': {
                const positionX = (currentColumn * positionWidth) * zoom + moveDeltaDistance;
                // dirLight.position.x = initialDirLightPositionX + positionX;
                player.position.x = positionX;
                player.position.z = jumpDeltaDistance;
                player.rotation.z = 0;
                break;
            }
        }
        // console.log("moves_players", moves_players);
        // Players move
        // let counter = 0;
        // for (let move_data of moves_players) {
        let move_data = moves_players[0];
        // counter++;
        if (move_data != null) {
            // console.log("move_data", move_data);
            // console.log("players[move_data.userId]", players[move_data.userId]);
            switch (move_data.direction) {
                case 'forward': {
                    players[move_data.userId].position.y += positionWidth * zoom + moveDeltaDistance;
                    players[move_data.userId].position.z = jumpDeltaDistance;
                    break;
                }
                case 'backward': {
                    players[move_data.userId].position.y -= positionWidth * zoom + moveDeltaDistance;
                    players[move_data.userId].position.z = jumpDeltaDistance;
                    break;
                }
                case 'left': {
                    players[move_data.userId].position.x -= positionWidth * zoom + moveDeltaDistance;
                    players[move_data.userId].position.z = jumpDeltaDistance;
                    break;
                }
                case 'right': {
                    players[move_data.userId].position.x += positionWidth * zoom + moveDeltaDistance;
                    players[move_data.userId].position.z = jumpDeltaDistance;
                    break;
                }
            }

            moves_players.shift();
        }
        // }

        // Once a step has ended
        if (moveDeltaTime > stepTime) {
            switch (moves[0]) {
                case 'forward': {
                    currentLane++;
                    break;
                }
                case 'backward': {
                    currentLane--;
                    break;
                }
                case 'left': {
                    currentColumn--;
                    break;
                }
                case 'right': {
                    currentColumn++;
                    break;
                }
            }
            moves.shift();
            // If more steps are to be taken then restart counter otherwise stop stepping
            stepStartTimestamp = moves.length === 0 ? null : timestamp;
        }
    }
    else {


        if (directions[0] != null) {
            console.log("directions[0]", directions[0]);
            switch (directions[0]) {
                case 'forward': {
                    player.rotation.z = Math.PI / 2;
                    break;
                }
                case 'backward': {
                    player.rotation.z = -Math.PI / 2;
                    break;
                }
                case 'left': {
                    player.rotation.z = Math.PI;
                    break;
                }
                case 'right': {
                    player.rotation.z = 0;
                    break;
                }
            }
            directions.shift();
        }
    }

    // if (lanes[currentLane].type === 'car' || lanes[currentLane].type === 'truck') {
    //     const playerMinX = player.position.x - playerSize * zoom / 2;
    //     const playerMaxX = player.position.x + playerSize * zoom / 2;
    //     const vechicleLength = { car: 60, truck: 105 }[lanes[currentLane].type];
    //     lanes[currentLane].vechicles.forEach(vechicle => {
    //         const carMinX = vechicle.position.x - vechicleLength * zoom / 2;
    //         const carMaxX = vechicle.position.x + vechicleLength * zoom / 2;
    //         if (playerMaxX > carMinX && playerMinX < carMaxX) {
    //             endDOM.style.visibility = 'visible';
    //         }
    //     });

    // }
    renderer.render(scene, camera);
    stats.update();
}


function start() {
    started = true;
    console.log("start");
}

function init() {

    stats = createStats();
    document.body.appendChild(stats.domElement);

    // initialCameraPositionX += (currentColumn * positionWidth) * zoom;
    initialCameraPositionY += 600;
    initialCameraPositionX += 300;
    camera.position.y = initialCameraPositionX;
    camera.position.x = initialCameraPositionY;
    camera.position.z = distance;

    currentLane = 3;
    currentColumn = columns / 2;
    player = new Player(currentLane, currentColumn);
    scene.add(player);


    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    scene.add(hemiLight);

    dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(initialDirLightPositionX, initialDirLightPositionY, 400);
    dirLight.castShadow = true;
    scene.add(dirLight);

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    var d = 800;
    dirLight.shadow.camera.left = d;
    dirLight.shadow.camera.right = -d;
    dirLight.shadow.camera.top = -d;
    dirLight.shadow.camera.bottom = d;

    var helper = new THREE.CameraHelper(dirLight.shadow.camera);
    // var helper = new THREE.CameraHelper(camera);
    scene.add(helper)

    backLight = new THREE.DirectionalLight(0x000000, .4);
    backLight.position.set(200, 200, 50);
    backLight.castShadow = true;
}

init();
initaliseValues();
updateCounter();
renderer.render(scene, camera);
requestAnimationFrame(animate);


window.scene = scene;
window.THREE = THREE;