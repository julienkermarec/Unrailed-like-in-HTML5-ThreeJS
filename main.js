const initaliseValues = () => {

    lanes = generateLanes();
    train = generateTrain();
    scene.add(train);

    currentLane = 7;
    currentColumn = 12;
    level_id = 0;

    previousTimestamp = null;

    startMoving = false;
    moves = [];
    moves_players = [];
    stepStartTimestamp;

    player.position.x = currentColumn * positionWidth * zoom;
    player.position.y = currentLane * positionWidth * zoom;
    players = [];

    camera.position.y = initialCameraPositionY;
    camera.position.x = initialCameraPositionX;


    dirLight.position.x = initialDirLightPositionX;
    dirLight.position.y = initialDirLightPositionY;
    // dirLight.target = train;
};


const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

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

function action() {
    if (!started)
        return;
    const finalPositions = moves.reduce((position, move) => {
        if (move === 'forward') return { lane: position.lane + 1, column: position.column };
        if (move === 'backward') return { lane: position.lane - 1, column: position.column };
        if (move === 'left') return { lane: position.lane, column: position.column - 1 };
        if (move === 'right') return { lane: position.lane, column: position.column + 1 };
    }, { lane: currentLane, column: currentColumn });
    console.log("action finalPositions", finalPositions);
    console.log("action counter.rails", counter.rails + 1);
    if (finalPositions.column != 7 || finalPositions.lane !== (counter.rails + 1))
        return;

    if (counter.rocks < 10 || counter.woods < 10)
        return;
    const rails = new Rails();
    let position_x = finalPositions.column;
    console.log("rails.position", rails.position);
    rails.position.x = (position_x * positionWidth + positionWidth / 2) * zoom - boardWidth * zoom / 2;
    rails.position.y = (finalPositions.lane * positionWidth * zoom);

    console.log("rails.position after", rails.position);
    rails.updateMatrix();
    rails.matrixAutoUpdate = false;
    setTimeout(() => {
        scene.add(rails);
        counter.rails++;
        counter.rocks -= 10;
        counter.woods -= 10;
        updateCounter();
    }, 0, 20);
    // console.log(lanes[finalPositions.lane]);

    // scene.add(rails);
}

function updateCounter() {
    statsRocksDOM.innerHTML = counter.rocks;
    statsWoodsDOM.innerHTML = counter.woods;
    counterDOM.innerHTML = counter.rails;
}
function cutForest(actualPosition, direction) {
    if (!started)
        return;
    let finalPosition = {};
    if (direction == 'forward')
        finalPosition = { lane: actualPosition.lane + 1, column: actualPosition.column, index: null };
    if (direction == 'backward')
        finalPosition = { lane: actualPosition.lane - 1, column: actualPosition.column, index: null };
    if (direction == 'left')
        finalPosition = { lane: actualPosition.lane, column: actualPosition.column - 1, index: null };
    if (direction == 'right')
        finalPosition = { lane: actualPosition.lane, column: actualPosition.column + 1, index: null };

    finalPosition.index = lanes[finalPosition.lane].occupiedPositions.indexOf(finalPosition.column);

    console.log("lanes[finalPosition.lane]", lanes[finalPosition.lane]);
    if (lanes[finalPosition.lane].threes[finalPosition.index].position.z <= -45) {
        delete lanes[finalPosition.lane].occupiedPositions[finalPosition.index];
        return;
    }

    lanes[finalPosition.lane].threes[finalPosition.index].position.z--;
    counter.woods++;
    updateCounter();
    return;
}
function cutRock(actualPosition, direction) {
    if (!started)
        return;
    let finalPosition = {};
    if (direction == 'forward')
        finalPosition = { lane: actualPosition.lane + 1, column: actualPosition.column, index: null };
    if (direction == 'backward')
        finalPosition = { lane: actualPosition.lane - 1, column: actualPosition.column, index: null };
    if (direction == 'left')
        finalPosition = { lane: actualPosition.lane, column: actualPosition.column - 1, index: null };
    if (direction == 'right')
        finalPosition = { lane: actualPosition.lane, column: actualPosition.column + 1, index: null };

    finalPosition.index = lanes[finalPosition.lane].occupiedPositions.indexOf(finalPosition.column);
    if (lanes[finalPosition.lane].rocks[finalPosition.index].position.z <= -40) {
        delete lanes[finalPosition.lane].occupiedPositions[finalPosition.index];
        return;
    }

    lanes[finalPosition.lane].rocks[finalPosition.index].position.z--;
    counter.rocks++;
    updateCounter();
    return;
}

function addPlayer(userId) {

    players[userId] = new Player();
    scene.add(players[userId]);


    // const positionX = (2 * positionWidth + positionWidth / 2) * zoom;

    // players[userId].position.x = positionX; // initial player position is 0

}
function move(direction, userId = null) {
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
    console.log("finalPositions.lane", finalPositions.lane);
    console.log("direction", direction);

    if (direction === 'forward') {
        if (finalPositions.lane < 0) {
            if (!stepStartTimestamp) { startMoving = true; }
        }
        else {
            if (lanes[finalPositions.lane + 1].type === 'forest' && lanes[finalPositions.lane + 1].occupiedPositions.indexOf(finalPositions.column) !== -1)
                return cutForest(finalPositions, 'forward');
            if (lanes[finalPositions.lane + 1].type === 'rock' && lanes[finalPositions.lane + 1].occupiedPositions.indexOf(finalPositions.column) !== -1)
                return cutRock(finalPositions, 'forward');
            if (!stepStartTimestamp) startMoving = true;
            addLane();
        }
    } else
        if (direction === 'backward') {
            // console.log("finalPositions.lane", finalPositions.lane);
            // console.log("lanes[finalPositions.lane - 1].type", lanes[finalPositions.lane - 1].type);
            if (finalPositions.lane < -8)
                return;
            else if (finalPositions.lane <= 0) {
                if (!stepStartTimestamp) { startMoving = true; }
            }
            else {
                console.log("lanes", lanes);
                console.log("finalPositions.lane", finalPositions.lane);
                if (lanes[finalPositions.lane - 1].type === 'forest' && lanes[finalPositions.lane - 1].occupiedPositions.indexOf(finalPositions.column) !== -1)
                    return cutForest(finalPositions, 'backward');
                if (lanes[finalPositions.lane - 1].type === 'rock' && lanes[finalPositions.lane - 1].occupiedPositions.indexOf(finalPositions.column) !== -1)
                    return cutRock(finalPositions, 'backward');
                if (!stepStartTimestamp)
                    startMoving = true;
            }
        } else
            if (direction === 'left') {
                if (finalPositions.column === 0) return;
                if (finalPositions.lane < 0) {
                    if (!stepStartTimestamp) { startMoving = true; }
                }
                else {
                    if (lanes[finalPositions.lane].type === 'forest' && lanes[finalPositions.lane].occupiedPositions.indexOf(finalPositions.column - 1) !== -1)
                        return cutForest(finalPositions, 'left');
                    if (lanes[finalPositions.lane].type === 'rock' && lanes[finalPositions.lane].occupiedPositions.indexOf(finalPositions.column - 1) !== -1)
                        return cutRock(finalPositions, 'left');
                    if (!stepStartTimestamp) startMoving = true;
                }
            } else
                if (direction === 'right') {
                    if (finalPositions.column === columns - 1) return;
                    if (finalPositions.lane < 0) {
                        if (!stepStartTimestamp) { startMoving = true; }
                    }
                    else {
                        if (lanes[finalPositions.lane].type === 'forest' && lanes[finalPositions.lane].occupiedPositions.indexOf(finalPositions.column + 1) !== -1)
                            return cutForest(finalPositions, 'right');
                        if (lanes[finalPositions.lane].type === 'rock' && lanes[finalPositions.lane].occupiedPositions.indexOf(finalPositions.column + 1) !== -1)
                            return cutRock(finalPositions, 'right');
                        if (!stepStartTimestamp) startMoving = true;
                    }
                }

    console.log("dirLight.position.x", dirLight.position.x);
    console.log("dirLight.position.y", dirLight.position.y);
    if (userId == null)
        moves.push(direction);
}

function animate(timestamp) {
    requestAnimationFrame(animate);

    if (!previousTimestamp) previousTimestamp = timestamp;
    const delta = timestamp - previousTimestamp;
    previousTimestamp = timestamp;

    dirLight.position.x = initialDirLightPositionX;
    // console.log("camera.position.y", camera.position.y);
    if (started) {
        // console.log("move train", train);
        train.position.y += 1 / 100 * delta;
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
                break;
            }
            case 'backward': {
                positionY = currentLane * positionWidth * zoom - moveDeltaDistance
                // dirLight.position.y = initialDirLightPositionY + positionY;
                player.position.y = positionY;
                player.position.z = jumpDeltaDistance;
                break;
            }
            case 'left': {
                const positionX = (currentColumn * positionWidth) * zoom - moveDeltaDistance;
                // dirLight.position.x = initialDirLightPositionX + positionX;
                player.position.x = positionX; // initial player position is 0
                player.position.z = jumpDeltaDistance;
                break;
            }
            case 'right': {
                const positionX = (currentColumn * positionWidth) * zoom + moveDeltaDistance;
                // dirLight.position.x = initialDirLightPositionX + positionX;
                player.position.x = positionX;
                player.position.z = jumpDeltaDistance;
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
}


function start() {
    started = true;
    console.log("start");
}

function init() {

    // initialCameraPositionX += (currentColumn * positionWidth) * zoom;
    initialCameraPositionY += 100;
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

    // var helper = new THREE.CameraHelper( dirLight.shadow.camera );
    // var helper = new THREE.CameraHelper( camera );
    // scene.add(helper)

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