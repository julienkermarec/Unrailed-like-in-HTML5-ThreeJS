function initaliseValues() {


    water_bucket_position = [11, 2];
    hache_position = [11, 3];
    axe_position = [11, 4];
    train_position = [9, 9];
    train_length = 7;
    train_counter = 0;
    train_countdown = 1000;
    currentLane = 7;
    currentColumn = 12;
    currentLane = 3;
    currentColumn = 8;
    level_id = 0;
    stock = {
        rails: 0,
        pierre: 0,
        bois: 0,
    }
    level_distance = levels[level_id][0].length;
    player_pick = [];

    previousTimestamp = null;

    startMoving = false;
    moves = [];
    directions = [];
    moves_players = [];

    player = new Player(currentLane, currentColumn);
    player.position.x = currentColumn * positionWidth * zoom;
    player.position.y = currentLane * positionWidth * zoom;
    scene.add(player);


    camera.position.y = initialCameraPositionY;
    camera.position.x = initialCameraPositionX;


    dirLight.position.x = initialDirLightPositionX;
    dirLight.position.y = initialDirLightPositionY;
    // dirLight.target = train;

    lanes = generateLanes();
    train = generateTrain();
    wwater = generateWagonWater();
    wstock = generateWagonStock();
    wrails = generateWagonRails();
    train_smoke = new Smoke();
    wwater_smoke = new Smoke();
    train_smoke_default = new Smoke();
    train.add(train_smoke);
    scene.add(train);
    wwater_smoke.position.y = - 20;
    wwater_smoke.visible = false;
    wwater.add(wwater_smoke);
    scene.add(wwater);
    scene.add(wstock);
    scene.add(wrails);

    menu.style.display = 'none';
    start();
};

renderer = new THREE.WebGLRenderer({
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
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
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
    // console.log("event.keyCode", event.keyCode);

    if (event.keyCode == '32') {
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
    pick_item = levels[level_id][currentColumn][currentLane][1];
    pick_item_nb = parseInt(levels[level_id][currentColumn][currentLane][2]);
    if (!(pick_item_nb >= 0))
        pick_item_nb = ' ';
    type_color = (pick_item == 'b' ? colors.bois : colors.metal);
    cell = getCell();
    drop_cell = levels[level_id][cell.column] && levels[level_id][cell.column] ? levels[level_id][cell.column][cell.lane] : null;
    update_player = false;
    console.log("cell", cell)
    console.log("player pick", player_pick)
    console.log("direction", direction)
    console.log("pick column", levels[level_id][currentColumn]);
    console.log("pick cell", levels[level_id][currentColumn][currentLane]);
    console.log("pick item", pick_item);
    console.log("pick_item_nb", pick_item_nb);
    console.log("drop_cell", drop_cell);

    need_to_drop = [];
    picked = false;

    // Si pick == axe ou pickaxe ou waterbucket
    if (pick_item == 'h' || pick_item == 'a' || pick_item == 'w') {
        console.log("pick == axe ou pickaxe ou waterbucket");
        need_to_drop = player_pick;
        lanes[currentLane].mesh.children[currentColumn].children.pop();
        levels[level_id][currentColumn][currentLane] = levels[level_id][currentColumn][currentLane].replaceAt(1, ' ');
        player_pick = [pick_item];
        update_player = true;
    }
    // Si pick == bois ou pierre
    else if (pick_item == 'b' || pick_item == 'p') {
        console.log("pick == bois ou pierre");
        // Disable pick if max length but enable pick & drop
        if (player_pick.length >= 3) {
            console.warn("cant pick more");
            picked = false;
            need_to_drop = player_pick;
        }
        else {
            console.warn("picked true");
            picked = true;
            need_to_drop = player_pick;
            if (pick_item_nb <= 3) {
                levels[level_id][currentColumn][currentLane] = levels[level_id][currentColumn][currentLane].replaceAt(1, " ");
                levels[level_id][currentColumn][currentLane] = levels[level_id][currentColumn][currentLane].replaceAt(2, " ");
            } else
                levels[level_id][currentColumn][currentLane] = levels[level_id][currentColumn][currentLane].replaceAt(2, (pick_item_nb - 3).toString());

            // player_pick = [pick_item];
            // lanes[currentLane].mesh.children[currentColumn].children.pop();
            for (let i = 0; i <= pick_item_nb && i < 3; i++) {
                player_pick.push(pick_item);
                lanes[currentLane].mesh.children[currentColumn].children.pop();
            }
        }
        update_player = true;
    }

    console.log("need_to_drop", need_to_drop);
    console.log("before drop", levels[level_id][currentColumn][currentLane]);

    console.log("drop_cell", drop_cell);
    console.log("player_pick", player_pick);
    // Si drop == waterGround
    if (drop_cell != null && drop_cell[0] == 'w' && player_pick.length > 0 && player_pick[0] == "b") {
        console.log("drop == waterGround");
        levels[level_id][cell.column][cell.lane] = levels[level_id][cell.column][cell.lane].replaceAt(0, 'x');
        let wg = new WaterGround();
        lanes[cell.lane].mesh.children[cell.column].add(wg);
        player_pick.shift();
        update_player = true;
    }
    // Si drop == wagon stock
    else if (drop_cell != null && drop_cell[2] == 's' && player_pick.length > 0) {
        console.log("drop == wagon stock");
        if (player_pick[0] == 'b') {
            index = 1;
            start_at = counter.b;
            can_drop = 6 - start_at;
        }
        if (player_pick[0] == 'p') {
            index = 2;
            start_at = counter.p;
            can_drop = 6 - start_at;
        }
        if (can_drop > 3)
            can_drop = player_pick.length;
        if (can_drop <= 0)
            can_drop = 6 - start_at;
        if (can_drop > 0) {
            type_color = player_pick[0] == 'b' ? colors.bois : colors.metal;
            if (can_drop > player_pick.length)
                can_drop = player_pick.length;
            for (let i = start_at; i < can_drop + start_at; i++) {
                wstock.children[index].children[i].visible = true;
                counter[player_pick[0]]++;
                player_pick.shift();
            }
            update_player = true;
            updateCounter();
        }
        update_player = true;
        console.log("counter after", JSON.parse(JSON.stringify(counter)));
        // train.children[1].children[5].visible = true;
    }
    // Si drop == wagon rails
    else if (drop_cell != null && drop_cell[2] == 'r' && player_pick.length == 0 && stock.rails > 0) {
        console.log("drop == wagon rails");
        player_pick = ['r', 'r', 'r'];
        update_player = true;
    }
    // Si drop == water bucket
    else if (drop_cell != null && ((pick_item == " " && player_pick.length > 0 && player_pick[0] == 'w') || need_to_drop[0] == "w")) {
        console.log("drop == water bucket");
        lanes[currentLane].mesh.children[currentColumn].add(new WaterBucket());
        levels[level_id][currentColumn][currentLane] = levels[level_id][currentColumn][currentLane].replaceAt(1, 'w');
        update_player = true;
        if (need_to_drop[0] != "w")
            player_pick = [];
    }
    // Si drop == hache
    else if (drop_cell != null && ((pick_item == " " && player_pick.length > 0 && player_pick[0] == 'h') || need_to_drop[0] == "h")) {
        console.log("drop == hache");
        lanes[currentLane].mesh.children[currentColumn].add(new Hache());
        levels[level_id][currentColumn][currentLane] = levels[level_id][currentColumn][currentLane].replaceAt(1, 'h');
        update_player = true;
        if (need_to_drop[0] != "h")
            player_pick = [];
    }
    // Si drop == axe
    else if (drop_cell != null && ((pick_item == " " && player_pick.length > 0 && player_pick[0] == 'a') || need_to_drop[0] == "a")) {
        console.log("drop == axe");
        lanes[currentLane].mesh.children[currentColumn].add(new Axe());
        levels[level_id][currentColumn][currentLane] = levels[level_id][currentColumn][currentLane].replaceAt(1, 'a');
        update_player = true;
        if (need_to_drop[0] != "a")
            player_pick = [];
    }
    // Si drop == bois ou pierre sur g / o / b
    else if (!picked && drop_cell != null && drop_cell[1] == " " && player_pick.length > 0 && (player_pick[0] == "b" || player_pick[0] == "p")) {
        console.log("drop == bois sur g / o / b", player_pick);
        //verification type different
        if (player_pick.length > 0 && player_pick[0] != levels[level_id][currentColumn][currentLane][1] && levels[level_id][currentColumn][currentLane][1] != " ") {
            console.warn('cant drop on diffrent type');
            type_color = (player_pick[0] == 'b' ? colors.bois : colors.metal);
        }
        else {
            levels[level_id][currentColumn][currentLane] = levels[level_id][currentColumn][currentLane].replaceAt(1, player_pick[0]);
            start_at = pick_item_nb > 0 ? pick_item_nb : 0;
            if (player_pick.length > 1)
                levels[level_id][currentColumn][currentLane] = levels[level_id][currentColumn][currentLane].replaceAt(2, (start_at + player_pick.length).toString());

            for (let i = start_at; i < (player_pick.length + start_at); i++) {
                if (player_pick[0] == 'b')
                    sb = new Stock('bois');
                else
                    sb = new Stock('metal');
                // console.log("add", player_pick[0]);
                sb.position.y = -25;
                sb.position.z = (i * 3) - 2;

                if (i % 2 !== 0) {
                    sb.rotation.z = Math.PI;
                    sb.position.x = positionWidth;
                    sb.position.y = -4;
                }
                lanes[currentLane].mesh.children[currentColumn].add(sb);
            }
            update_player = true;
            if (need_to_drop[0] != "b" || need_to_drop[0] != "p")
                player_pick = [];
        }
    }

    // console.log("after drop", levels[level_id][currentColumn][currentLane]);
    if (update_player == true) {
        console.log("update_player", update_player)
        console.log("player_pick", player_pick)
        console.log("type_color", type_color)
        // player.children[3].rotation.z = Math.PI / 2;

        if (player_pick.length > 0) {
            if (player_pick[0] == 'b' || player_pick[0] == 'p') {
                if (player_pick.length >= 1) {
                    player.children[2].children[2].visible = true;
                    player.children[2].children[3].visible = true;
                    player.children[2].children[2].material.color.setHex(type_color);
                    player.children[2].children[3].material.color.setHex(type_color);
                    player.children[2].children[4].visible = false;
                    player.children[2].children[5].visible = false;
                }
                if (player_pick.length >= 2) {
                    player.children[2].children[4].visible = true;
                    player.children[2].children[5].visible = true;
                    player.children[2].children[4].material.color.setHex(type_color);
                    player.children[2].children[5].material.color.setHex(type_color);
                    player.children[2].children[6].visible = false;
                    player.children[2].children[7].visible = false;
                }
                if (player_pick.length >= 3) {
                    player.children[2].children[6].visible = true;
                    player.children[2].children[7].visible = true;
                    player.children[2].children[6].material.color.setHex(type_color);
                    player.children[2].children[7].material.color.setHex(type_color);
                }
            }
            else if (player_pick[0] == 'r') {
                player.children[2].children[8].visible = true;
                player.children[2].children[9].visible = true;
                player.children[2].children[10].visible = true;
            }
            else if (player_pick[0] == 'w') {
                player.children[2].children[11].visible = true;
                player.children[2].children[12].visible = false;
                player.children[2].children[13].visible = false;
            }
            else if (player_pick[0] == 'h') {
                player.children[2].children[11].visible = false;
                player.children[2].children[12].visible = true;
                player.children[2].children[13].visible = false;
            }
            else if (player_pick[0] == 'a') {
                player.children[2].children[11].visible = false;
                player.children[2].children[13].visible = true;
                player.children[2].children[12].visible = false;
            }

            // BRAS TENDU
            player.children[2].children[1].rotation.x = Math.PI / 2;
            player.children[2].children[1].rotation.y = Math.PI / 2;
            player.children[2].children[1].position.x = 10;
            player.children[2].children[0].rotation.x = Math.PI / 2;
            player.children[2].children[0].rotation.y = Math.PI / 2;
            player.children[2].children[0].position.x = 10;

        }
        else if (player_pick.length == 0) {
            // BRAS BAISSE
            player.children[2].children[1].rotation.x = 0;
            player.children[2].children[1].rotation.y = 0;
            player.children[2].children[1].position.x = 0;
            player.children[2].children[0].rotation.x = 0;
            player.children[2].children[0].rotation.y = 0;
            player.children[2].children[0].position.x = 0;
            for (let i = 2; i <= 6; i = i + 2) {
                player.children[2].children[i].visible = false;
                player.children[2].children[i + 1].visible = false;
            }

            // Rails
            player.children[2].children[8].visible = false;
            player.children[2].children[9].visible = false;
            player.children[2].children[10].visible = false;
            // Water bucket
            player.children[2].children[11].visible = false;
            // Hache
            player.children[2].children[12].visible = false;
            // Axe
            player.children[2].children[13].visible = false;
        }

    }

    console.log("pick column after", levels[level_id][currentColumn]);
}

function getCell() {
    if (direction === 'forward') return { lane: currentLane + 1, column: currentColumn };
    if (direction === 'backward') return { lane: currentLane - 1, column: currentColumn };
    if (direction === 'left') return { lane: currentLane, column: currentColumn - 1 };
    if (direction === 'right') return { lane: currentLane, column: currentColumn + 1 };
}

function action() {
    if (!started)
        return;
    nextCell = getCell();
    if (nextCell.column < 0 || nextCell.column >= columns || nextCell.lane < 0)
        return;
    console.log("action nextCell", nextCell);
    console.log("action direction", direction);
    console.log("action", levels[level_id][nextCell.column][nextCell.lane]);
    if (levels[level_id][nextCell.column][nextCell.lane][1] == 't' && player_pick[0] == 'h')
        return cutForest(nextCell.column, nextCell.lane);
    if (levels[level_id][nextCell.column][nextCell.lane][1] == 'r' && player_pick[0] == 'a')
        return cutRock(nextCell.column, nextCell.lane);
    // if (counter.rocks < 10 || counter.woods < 10)
    //     return;
    // rails = new Rails();
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
    statsRocksDOM.innerHTML = counter.p;
    statsWoodsDOM.innerHTML = counter.b;
    counterDOM.innerHTML = counter.r;
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

    // players[userId] = new Player();
    // scene.add(players[userId]);


    // positionX = (2 * positionWidth + positionWidth / 2) * zoom;

    // players[userId].position.x = positionX; // initial player position is 0

}

function setDirections(next_direction) {
    action();
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
    finalPositions = moves.reduce((position, move) => {
        if (move === 'forward') return { lane: position.lane + 1, column: position.column };
        if (move === 'backward') return { lane: position.lane - 1, column: position.column };
        if (move === 'left') return { lane: position.lane, column: position.column - 1 };
        if (move === 'right') return { lane: position.lane, column: position.column + 1 };
    }, { lane: currentLane, column: currentColumn });
    // console.log("-------");
    // console.log("direction", direction);
    // console.log("direction", direction);

    can_walk_ground = ['e', 'w']
    can_walk_addon = ['t', 'r', 'm', 's', 'd'];//, 'w', 'a', 'h']; // tree / rock / metal / station / disable / waterbucket / axe / hache
    can_walk_train = ['r', 's', 't', 'w']; // rails / stock / train / water

    if (direction === 'forward') {
        if (finalPositions.lane + 1 >= level_distance) {
            return setDirections('forward');
        }
        else {
            // console.log("next cell", levels[level_id][finalPositions.column][finalPositions.lane + 1]);
            if (can_walk_ground.indexOf(levels[level_id][finalPositions.column][finalPositions.lane + 1][0]) !== -1)
                return setDirections('forward');
            if (can_walk_addon.indexOf(levels[level_id][finalPositions.column][finalPositions.lane + 1][1]) !== -1)
                return setDirections('forward');
            if (can_walk_train.indexOf(levels[level_id][finalPositions.column][finalPositions.lane + 1][2]) !== -1)
                return setDirections('forward');
            if (!stepStartTimestamp)
                startMoving = true;
            addLane();
        }
    } else if (direction === 'backward') {
        if (finalPositions.lane <= 0) {
            return setDirections('backward');
        }
        else {
            console.log("next cell", levels[level_id][finalPositions.column][finalPositions.lane - 1]);
            if (can_walk_ground.indexOf(levels[level_id][finalPositions.column][finalPositions.lane - 1][0]) !== -1)
                return setDirections('backward');
            if (can_walk_addon.indexOf(levels[level_id][finalPositions.column][finalPositions.lane - 1][1]) !== -1)
                return setDirections('backward');
            if (can_walk_train.indexOf(levels[level_id][finalPositions.column][finalPositions.lane - 1][2]) !== -1)
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
            if (can_walk_train.indexOf(levels[level_id][finalPositions.column - 1][finalPositions.lane][2]) !== -1)
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
            if (can_walk_train.indexOf(levels[level_id][finalPositions.column + 1][finalPositions.lane][2]) !== -1)
                return setDirections('right');
            if (!stepStartTimestamp) startMoving = true;
        }
    }

    // console.log("dirLight.position.x", dirLight.position.x);
    // console.log("dirLight.position.y", dirLight.position.y);
    if (userId == null) {
        moves.push(direction);
    }
}

function animate(timestamp) {
    requestAnimationFrame(animate);

    if (!previousTimestamp) previousTimestamp = timestamp;
    delta = timestamp - previousTimestamp;
    previousTimestamp = timestamp;

    dirLight.position.x = initialDirLightPositionX;
    // console.log("camera.position.y", camera.position.y);
    if (started && train_countdown <= - 1) {
        // console.log("train_counter", train_counter);
        if (train_counter >= positionWidth * zoom) {
            for (let i = train_position[1] - train_length; i <= train_position[1]; i++) {
                j = train_position[1] - i;
                // console.log("j", j);
                // console.log("i", i);
                if (j <= 1)
                    levels[level_id][train_position[0]][i] = 'glt';
                else if (j <= 2)
                    levels[level_id][train_position[0]][i] = 'glw';
                else if (j <= 4)
                    levels[level_id][train_position[0]][i] = 'gls';
                else if (j <= 6)
                    levels[level_id][train_position[0]][i] = 'glr';
                else if (j == 7)
                    levels[level_id][train_position[0]][i] = 'gl'

            }
            y = train_position[1];
            y++;
            train_position = [train_position[0], y];
            train_counter = 0;
            // console.log(" levels[level_id][train_position[" + train_position[0] + "]]", levels[level_id][train_position[0]]);
            // console.log("train_position", train_position);
        }

        train_counter += 1 / 100 * delta;
        train.position.y += 1 / 100 * delta;
        wwater.position.y += 1 / 100 * delta;
        wstock.position.y += 1 / 100 * delta;
        wrails.position.y += 1 / 100 * delta;
        if (wwater.children[0].children[0].scale.z > 0) {
            wwater.children[0].children[0].scale.z -= 0.0002;
        }
        else {
            train_smoke.children[0].material.color.setHex(colors.red);
            wwater_smoke.children[0].material.color.setHex(colors.red);
            wwater_smoke.visible = true;
            if (wwater.children[0].children[0].visible == true) {
                wwater.children[0].children[0].visible = false;
                train_smoke.children[0].material.opacity = 0.99;
            }
        }

        let timing_smoke = 3000;
        if (wwater.children[0].children[0].visible == false) {
            timing_smoke = 9000;
        }

        // console.log("wwater.children[0].children[0].scale.z", wwater.children[0].children[0].scale.z);

        train_smoke.position.z += 1 / 500 * delta;
        train_smoke.position.y -= 1 / 100 * delta;
        train_smoke.scale.x += 1 / 4000 * delta;
        train_smoke.scale.y += 1 / 4000 * delta;
        train_smoke.scale.z += 1 / 4000 * delta;
        train_smoke.children[0].material.opacity -= 1 / timing_smoke * delta;
        if (wwater.children[0].children[0].visible == false) {

            wwater_smoke.position.z += 1 / 500 * delta;
            wwater_smoke.position.y -= 1 / 100 * delta;
            wwater_smoke.scale.x += 1 / 4000 * delta;
            wwater_smoke.scale.y += 1 / 4000 * delta;
            wwater_smoke.scale.z += 1 / 4000 * delta;
            wwater_smoke.children[0].material.opacity -= 1 / timing_smoke * delta;
        }
        // console.log("train_smoke.children[0].material.opacity", train_smoke.children[0].material.opacity);
        if (train_smoke.children[0].material.opacity < 0) {
            // console.log("train_smoke_default", train_smoke_default);
            train_smoke.children[0].material.opacity = 0.99;
            train_smoke.position.z = train_smoke_default.position.z;
            train_smoke.scale.z = train_smoke_default.scale.z;
            train_smoke.scale.y = train_smoke_default.scale.y;
            train_smoke.scale.x = train_smoke_default.scale.x;
            train_smoke.position.y = train_smoke_default.position.y;

            if (wwater.children[0].children[0].visible == false) {
                wwater_smoke.children[0].material.opacity = 0.99;
                wwater_smoke.position.z = train_smoke_default.position.z;
                wwater_smoke.scale.z = train_smoke_default.scale.z;
                wwater_smoke.scale.y = train_smoke_default.scale.y;
                wwater_smoke.scale.x = train_smoke_default.scale.x;
                wwater_smoke.position.y = -20;
            }
        }



        camera.position.y += 1 / 100 * delta;

        // scene.translateY(1 / 100 * delta * -1);
    }
    else if (train_countdown > -1) {
        train_countdown -= 1;

        // console.log("train_countdown", train_countdown);
        if (Number.isInteger(train_countdown / 100)) {
            if (train_countdown / 100 > 0) {
                train.children[train_countdown / 100 + 1].visible = true;

                if (train_countdown / 100 < 10) {
                    train.children[train_countdown / 100 + 2].visible = false;
                }
            }
            else {
                train.children[train_countdown / 100 + 1].visible = false;
                train.children[train_countdown / 100 + 2].visible = false;
            }
        }
    }

    if (startMoving) {
        stepStartTimestamp = timestamp;
        startMoving = false;
    }

    if (stepStartTimestamp) {
        moveDeltaTime = timestamp - stepStartTimestamp;
        moveDeltaDistance = Math.min(moveDeltaTime / stepTime, 1) * positionWidth * zoom;
        jumpDeltaDistance = Math.sin(Math.min(moveDeltaTime / stepTime, 1) * Math.PI) * 8 * zoom;
        // console.log("moves[0]", moves[0]);
        switch (moves[0]) {
            case 'forward': {
                positionY = currentLane * positionWidth * zoom + moveDeltaDistance;
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
                positionX = (currentColumn * positionWidth) * zoom - moveDeltaDistance;
                // dirLight.position.x = initialDirLightPositionX + positionX;
                player.position.x = positionX; // initial player position is 0
                player.position.z = jumpDeltaDistance;
                player.rotation.z = Math.PI;
                break;
            }
            case 'right': {
                positionX = (currentColumn * positionWidth) * zoom + moveDeltaDistance;
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
    //     playerMinX = player.position.x - playerSize * zoom / 2;
    //     playerMaxX = player.position.x + playerSize * zoom / 2;
    //     vechicleLength = { car: 60, truck: 105 }[lanes[currentLane].type];
    //     lanes[currentLane].vechicles.forEach(vechicle => {
    //         carMinX = vechicle.position.x - vechicleLength * zoom / 2;
    //         carMaxX = vechicle.position.x + vechicleLength * zoom / 2;
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
    initialCameraPositionY += 400;
    initialCameraPositionX += 300;
    camera.position.y = initialCameraPositionX;
    camera.position.x = initialCameraPositionY;
    camera.position.z = distance;

    currentLane = 3;
    currentColumn = columns / 2;

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

window.addEventListener("DOMContentLoaded", (event) => {
    init();
    initaliseValues();
    updateCounter();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    window.scene = scene;
    window.THREE = THREE;
});

