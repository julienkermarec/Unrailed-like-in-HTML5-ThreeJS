function Wagon() {
    const wagon = new THREE.Group();

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(40 * zoom, 60 * zoom, 4 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.black, flatShading: false }));
    main.position.z = 20 * zoom;
    main.castShadow = true;
    main.receiveShadow = true;

    let bords = [
        {
            w: 44,
            h: 8,
            d: 4,
            x: 0,
            y: 2,
            z: 30,
        }, {
            w: 44,
            h: 8,
            d: 4,
            x: 0,
            y: 2,
            z: -30,
        },
        {
            w: 4,
            h: 8,
            d: 60,
            x: 20,
            y: 2,
            z: 0,
        }, {
            w: 4,
            h: 8,
            d: 60,
            x: -20,
            y: 2,
            z: 0,
        }
    ]
    for (let bord of bords) {
        const ba = new THREE.Mesh(
            new THREE.BoxBufferGeometry(bord.w * zoom, bord.d * zoom, bord.h * zoom),
            new THREE.MeshPhongMaterial({ color: colors.rock, flatShading: true }));
        ba.castShadow = true;
        ba.receiveShadow = true;
        ba.position.x = bord.x * zoom;
        ba.position.z = bord.y * zoom;
        ba.position.y = bord.z * zoom;
        main.add(ba);
    }
    let ad = {
        w: 4,
        h: 4,
        d: 20,
        x: 0,
        y: 2,
        z: 41,
    };
    const attache = new THREE.Mesh(
        new THREE.BoxBufferGeometry(ad.w * zoom, ad.d * zoom, ad.h * zoom),
        new THREE.MeshPhongMaterial({ color: colors.gray, flatShading: true }));
    attache.castShadow = true;
    attache.receiveShadow = true;
    attache.position.x = ad.x * zoom;
    attache.position.z = ad.y * zoom;
    attache.position.y = ad.z * zoom;
    main.add(attache);

    let wheels = [
        {
            w: 6,
            h: 3,
            d: 12,
            x: 18,
            y: -19,
            z: -8,
        },
        {
            w: 6,
            h: 3,
            d: 12,
            x: 18,
            y: 19,
            z: -8,
        }
    ];
    for (let wh of wheels) {
        const wheel = new THREE.Mesh(
            new THREE.CylinderBufferGeometry(wh.w * zoom, wh.w / 3 * zoom, wh.h * zoom, wh.d * zoom),
            new THREE.MeshPhongMaterial({ color: colors.black, flatShading: true }));

        wheel.position.x = wh.x * zoom;
        wheel.position.y = wh.y * zoom;
        wheel.position.z = wh.z * zoom;
        wheel.rotation.z = Math.PI / 2;
        main.add(wheel);
    }
    wagon.add(main);

    return wagon;

}

function Train() {

    const wagon = new THREE.Group();

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(40 * zoom, 60 * zoom, 20 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.red, flatShading: false }));
    main.position.z = 30 * zoom;
    main.castShadow = true;
    main.receiveShadow = true;

    let bords = [
        {
            w: 44,
            h: 8,
            d: 4,
            x: 0,
            y: 2,
            z: 30,
        }, {
            w: 44,
            h: 8,
            d: 4,
            x: 0,
            y: 2,
            z: -30,
        },
        {
            w: 4,
            h: 8,
            d: 60,
            x: 20,
            y: 2,
            z: 0,
        }, {
            w: 4,
            h: 8,
            d: 60,
            x: -20,
            y: 2,
            z: 0,
        }
    ]
    for (let bord of bords) {
        const ba = new THREE.Mesh(
            new THREE.BoxBufferGeometry(bord.w * zoom, bord.d * zoom, bord.h * zoom),
            new THREE.MeshPhongMaterial({ color: colors.rock, flatShading: true }));
        ba.castShadow = true;
        ba.receiveShadow = true;
        ba.position.x = bord.x * zoom;
        ba.position.z = (bord.y - 10) * zoom;
        ba.position.y = bord.z * zoom;
        main.add(ba);
    }

    let wheels = [
        {
            w: 6,
            h: 3,
            d: 12,
            x: 18,
            y: -19,
            z: -8,
        },
        {
            w: 6,
            h: 3,
            d: 12,
            x: 18,
            y: 19,
            z: -8,
        }
    ];
    for (let wh of wheels) {
        const wheel = new THREE.Mesh(
            new THREE.CylinderBufferGeometry(wh.w * zoom, wh.w / 3 * zoom, wh.h * zoom, wh.d * zoom),
            new THREE.MeshPhongMaterial({ color: colors.black, flatShading: true }));

        wheel.position.x = wh.x * zoom;
        wheel.position.y = wh.y * zoom;
        wheel.position.z = (wh.z - 10) * zoom;
        wheel.rotation.z = Math.PI / 2;
        main.add(wheel);
    }

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33 * zoom, 24 * zoom, 24 * zoom),
        [
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carBackTexture }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carFrontTexture }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carRightSideTexture }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carLeftSideTexture }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }), // top
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }) // bottom
        ]);

    cabin.position.y = -14 * zoom;
    cabin.position.z = 21 * zoom;
    cabin.castShadow = true;
    cabin.receiveShadow = true;

    main.add(cabin);

    const noise = new THREE.Mesh(
        new THREE.CylinderBufferGeometry(7 * zoom, 4 * zoom, 15 * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.black, flatShading: true }));
    noise.castShadow = true;
    noise.receiveShadow = true;

    noise.position.y = 20 * zoom;
    noise.position.z = 16 * zoom;

    noise.rotation.x = Math.PI / 2;
    main.add(noise);

    wagon.add(main);

    return wagon;
}


function Car() {
    const car = new THREE.Group();
    const color = vechicleColors[Math.floor(Math.random() * vechicleColors.length)];

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60 * zoom, 30 * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color, flatShading: true }));

    main.position.z = 12 * zoom;
    main.castShadow = true;
    main.receiveShadow = true;
    car.add(main);

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33 * zoom, 24 * zoom, 12 * zoom),
        [
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carBackTexture }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carFrontTexture }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carRightSideTexture }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carLeftSideTexture }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }), // top
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }) // bottom
        ]);

    cabin.position.x = 6 * zoom;
    cabin.position.z = 25.5 * zoom;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    car.add(cabin);

    const frontWheel = new Wheel();
    frontWheel.position.x = -18 * zoom;
    car.add(frontWheel);

    const backWheel = new Wheel();
    backWheel.position.x = 18 * zoom;
    car.add(backWheel);

    car.castShadow = true;
    car.receiveShadow = false;

    return car;
}

function Rails() {
    const three = new THREE.Group();


    const createTraverses = () => new THREE.Mesh(
        new THREE.BoxBufferGeometry(40 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true }));

    const createRail = () => new THREE.Mesh(
        new THREE.BoxBufferGeometry(3 * zoom, 43 * zoom, 3 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.rock, flatShading: true }));

    for (let i = 1; i < 4; i++) {
        const middle = createTraverses();
        middle.receiveShadow = true;
        middle.castShadow = true;
        middle.position.x = 1 * zoom;
        middle.position.y = ((i * 14) - 26) * zoom;
        middle.position.z = 1 * zoom;
        three.add(middle);
    }

    const rail_left = createRail();
    rail_left.receiveShadow = true;
    rail_left.castShadow = true;
    rail_left.position.z = 5 * zoom;
    rail_left.position.x = -(positionWidth / 4) * zoom;
    three.add(rail_left);

    const rail_right = createRail();
    rail_right.position.x = (positionWidth / 3) * zoom;
    rail_right.receiveShadow = true;
    rail_right.castShadow = true;
    rail_right.position.z = 5 * zoom;
    three.add(rail_right);

    return three;
}


function Rock() {
    const rock = new THREE.Group();

    const rock_2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(20 * zoom, 20 * zoom, 20 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.rock, flatShading: true }));

    rock_2.position.x = 1 * zoom;
    rock_2.position.y = 10 * zoom;
    rock_2.position.z = 10 * zoom;
    rock_2.castShadow = true;
    rock_2.receiveShadow = true;
    rock.add(rock_2);

    const rock_1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(15 * zoom, 15 * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.rock, flatShading: true }));

    rock_1.position.x = 10 * zoom;
    rock_1.position.y = 5 * zoom;
    rock_1.position.z = 7.5 * zoom;
    rock_1.castShadow = true;
    rock_1.receiveShadow = true;
    rock.add(rock_1);
    let random_rotate = Math.floor(Math.random() * 90) - 45;

    rock.rotation.z = random_rotate * Math.PI / 180;
    return rock;
}

function Three() {
    const three = new THREE.Group();

    const trunk = new THREE.Mesh(
        new THREE.BoxBufferGeometry(10 * zoom, 10 * zoom, 10 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true }));

    trunk.position.z = 5 * zoom;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    three.add(trunk);

    const crown = new THREE.Mesh(
        new THREE.BoxBufferGeometry(15 * zoom, 15 * zoom, 15 * zoom),
        new THREE.MeshLambertMaterial({ color: 0x7aa21d, flatShading: true }));

    crown.position.z = 15 * zoom;
    crown.castShadow = true;
    crown.receiveShadow = false;
    three.add(crown);

    return three;
}

function Player() {
    const player = new THREE.Group();

    const body = new THREE.Mesh(
        new THREE.BoxBufferGeometry(playerSize * zoom, playerSize * zoom, 20 * zoom),
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }));

    body.position.z = 10 * zoom;
    body.castShadow = true;
    body.receiveShadow = true;
    player.add(body);

    const rowel = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 4 * zoom, 2 * zoom),
        new THREE.MeshLambertMaterial({ color: 0xF0619A, flatShading: true }));

    rowel.position.z = 21 * zoom;
    rowel.castShadow = true;
    rowel.receiveShadow = false;
    player.add(rowel);

    return player;
}

function Grass(index) {
    const grass = new THREE.Group();

    const createSection = color => new THREE.Mesh(
        new THREE.BoxBufferGeometry(boardWidth * zoom, positionWidth * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color }));
    const createWaterGrass = color => new THREE.Mesh(
        new THREE.BoxBufferGeometry((boardWidth * 0.6) * zoom, positionWidth * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color }));
    const createWater = color => new THREE.Mesh(
        new THREE.BoxBufferGeometry((boardWidth * 0.4) * zoom, positionWidth * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color }));

    if (index != 4 && index != 5) {
        let middle = createSection(0xbaf455);
        middle.receiveShadow = true;
        middle.position.z = -7 * zoom;
        grass.add(middle);
    }
    else {
        middle = createWaterGrass(0xbaf455);
        middle.receiveShadow = true;
        middle.position.z = -7 * zoom;
        middle.position.x = -(positionWidth * 2) * zoom;
        grass.add(middle);

        middle = createWater(0x6EFCEE);
        middle.receiveShadow = true;
        middle.position.x = (positionWidth * 3) * zoom;
        middle.position.z = -12 * zoom;
        grass.add(middle);
    }

    // console.log("new grass", index);
    let color = 0x414141;
    if (index == 4 || index == 5)
        color = 0x6EFCEE
    if (index == 0)
        color = 0xFFFFFF

    const ground = createSection(color);
    ground.position.x = ((boardWidth / 2) - 7) * zoom;
    ground.rotation.y = -90 * Math.PI / 180;
    ground.position.z = ((-boardWidth / 2) - 7) * zoom;
    ground.receiveShadow = false;
    grass.add(ground);

    if (index == -9) {
        const createGroundFirst = color => new THREE.Mesh(
            new THREE.BoxBufferGeometry(boardWidth * zoom, 1 * zoom, boardWidth / 2 * zoom),
            new THREE.MeshPhongMaterial({ color }));
        const ground_first = createGroundFirst(0xC4C4C4);
        ground_first.position.y = -positionWidth / 2 * zoom;
        ground_first.position.z = -(boardWidth / 4) * zoom;
        ground_first.receiveShadow = false;
        grass.add(ground_first);
    }
    console.log("index % 10", index, index % 10);
    if (index % 5 == 0) {

        var loader = new THREE.FontLoader();
        loader.load('helvetiker_regular.typeface.json', function (font) {
            var textGeometry = new THREE.TextGeometry(index + " m", {

                font: font,

                size: 20,
                height: 5,
                curveSegments: 12,

                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: true

            });
            var textMaterial = new THREE.MeshPhongMaterial(
                { color: 0xFFFFFF, specular: 0xFFFFFF }
            );
            if (index == 0) {
                textMaterial = new THREE.MeshPhongMaterial(
                    { color: 0x000000, specular: 0x000000 }
                );
            }

            var mesh = new THREE.Mesh(textGeometry, textMaterial);
            mesh.position.x = ((boardWidth / 2) - 1) * zoom;
            mesh.position.z = -25 * zoom;
            mesh.position.y = ((positionWidth * index) - 10) * zoom;

            mesh.rotation.z = 90 * Math.PI / 180;
            mesh.rotation.y = 90 * Math.PI / 180;
            // mesh.position.z = (-boardWidth / 2) * zoom;
            scene.add(mesh);
        });


    }

    return grass;
}

function Lane(index) {
    this.index = index;
    this.type = index <= 0 ? 'field' : laneTypes[Math.floor(Math.random() * laneTypes.length)];

    switch (this.type) {
        case 'field': {
            this.type = 'field';
            this.mesh = new Grass(index);
            const rails = new Rails();

            position = 7;
            rails.position.x = (position * positionWidth + positionWidth / 2) * zoom - boardWidth * zoom / 2;
            this.mesh.add(rails);

            break;
        }
        case 'rock': {
            this.mesh = new Grass(index);

            this.occupiedPositions = [];
            this.rocks = [1, 2].map(() => {
                const rock = new Rock();
                let position;
                do {
                    position = Math.floor(Math.random() * (columns - 6));
                } while (this.occupiedPositions.indexOf(position) !== -1);
                this.occupiedPositions.push(position);
                rock.position.x = (position * positionWidth + positionWidth / 2) * zoom - boardWidth * zoom / 2;
                this.mesh.add(rock);
                return rock;
            });
            break;
        }
        case 'forest': {
            this.mesh = new Grass(index);

            this.occupiedPositions = [];
            this.threes = [1, 2].map(() => {
                const three = new Three();
                let position;
                do {
                    position = Math.floor(Math.random() * (columns - 6));
                } while (this.occupiedPositions.indexOf(position) !== -1);
                this.occupiedPositions.push(position);
                three.position.x = (position * positionWidth + positionWidth / 2) * zoom - boardWidth * zoom / 2;
                this.mesh.add(three);
                return three;
            });
            break;
        }
        case 'car': {
            this.mesh = new Road();
            this.direction = Math.random() >= 0.5;

            const occupiedPositions = new Set();
            this.vechicles = [1, 2, 3].map(() => {
                const vechicle = new Train();
                let position;
                do {
                    position = Math.floor(Math.random() * columns / 2);
                } while (occupiedPositions.has(position));
                occupiedPositions.add(position);
                vechicle.position.x = (position * positionWidth * 2 + positionWidth / 2) * zoom - boardWidth * zoom / 2;
                if (!this.direction) vechicle.rotation.z = Math.PI;
                this.mesh.add(vechicle);
                return vechicle;
            });

            this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
            break;
        }
        case 'truck': {
            this.mesh = new Road();
            this.direction = Math.random() >= 0.5;

            const occupiedPositions = new Set();
            this.vechicles = [1, 2].map(() => {
                const vechicle = new Truck();
                let position;
                do {
                    position = Math.floor(Math.random() * columns / 3);
                } while (occupiedPositions.has(position));
                occupiedPositions.add(position);
                vechicle.position.x = (position * positionWidth * 3 + positionWidth / 2) * zoom - boardWidth * zoom / 2;
                if (!this.direction) vechicle.rotation.z = Math.PI;
                this.mesh.add(vechicle);
                return vechicle;
            });

            this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
            break;
        }
    }

}