
function Player(current_y = null, current_x = null) {
    const player = new THREE.Group();


    //head
    var head = new THREE.Mesh(
        new THREE.BoxGeometry(20, 22, 19),
        new THREE.MeshLambertMaterial({ color: "#ff0000", shading: THREE.FlatShading })
    );
    head.position.z = 70;
    head.castShadow = true;
    head.receiveShadow = false;


    var eyel = new THREE.Mesh(
        new THREE.BoxGeometry(1, 4, 7),
        new THREE.MeshLambertMaterial({ color: "#ffffff", shading: THREE.FlatShading })
    );
    eyel.position.z = 5;
    eyel.position.x = 10;
    eyel.position.y = -5;

    var eyer = new THREE.Mesh(
        new THREE.BoxGeometry(1, 4, 7),
        new THREE.MeshLambertMaterial({ color: "#ffffff", shading: THREE.FlatShading })
    );
    eyer.position.z = 5;
    eyer.position.x = 10;
    eyer.position.y = 5;

    head.add(eyel);
    head.add(eyer);

    // neck
    var neck = new THREE.Mesh(
        new THREE.BoxGeometry(18, 20, 4),
        new THREE.MeshLambertMaterial({ color: 0xe0bea5, shading: THREE.FlatShading })
    );
    neck.position.z = 60;
    neck.castShadow = true;
    neck.receiveShadow = false;

    // BODY
    const body = new THREE.Mesh(
        new THREE.BoxBufferGeometry(positionWidth / 3 * zoom, positionWidth / 2 * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }));
    body.position.z = 20 * zoom;
    body.castShadow = true;
    body.receiveShadow = false;

    //HANDS 
    const handl = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 4 * zoom, 12 * zoom),
        new THREE.MeshPhongMaterial({ color: 0xe0bea5, flatShading: true }));
    handl.position.z = 0 * zoom;
    handl.position.y = -6 * zoom;
    handl.castShadow = true;
    handl.receiveShadow = false;

    const handr = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 4 * zoom, 12 * zoom),
        new THREE.MeshPhongMaterial({ color: 0xe0bea5, flatShading: true }));
    handr.position.z = 0 * zoom;
    handr.position.y = 6 * zoom;
    handr.castShadow = true;
    handr.receiveShadow = false;

    const pick11 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 15 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: "black", flatShading: true }));
    pick11.position.x = 7 * zoom;
    pick11.position.z = 5 * zoom;
    pick11.position.y = 0 * zoom;
    pick11.position.y = 0 * zoom;
    pick11.castShadow = true;
    pick11.receiveShadow = false;
    pick11.visible = false;

    const pick12 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 15 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: "black", flatShading: true }));
    pick12.position.x = 14 * zoom;
    pick12.position.z = 5 * zoom;
    pick12.position.y = 0 * zoom;
    pick12.castShadow = true;
    pick12.receiveShadow = false;
    pick12.visible = false;

    const pick21 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(15 * zoom, 4 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: "red", flatShading: true }));
    pick21.position.x = 11 * zoom;
    pick21.position.z = 7 * zoom;
    pick21.position.y = 4 * zoom;
    pick21.castShadow = true;
    pick21.receiveShadow = false;
    pick21.visible = false;

    const pick22 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(15 * zoom, 4 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: "red", flatShading: true }));
    pick22.position.x = 11 * zoom;
    pick22.position.z = 7 * zoom;
    pick22.position.y = -4 * zoom;
    pick22.castShadow = true;
    pick22.receiveShadow = false;
    pick22.visible = false;

    const pick31 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 15 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: "blue", flatShading: true }));
    pick31.position.x = 7 * zoom;
    pick31.position.z = 9 * zoom;
    pick31.position.y = 0 * zoom;
    pick31.castShadow = true;
    pick31.receiveShadow = false;
    pick31.visible = false;

    const pick32 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 15 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: "blue", flatShading: true }));
    pick32.position.x = 14 * zoom;
    pick32.position.z = 9 * zoom;
    pick32.position.y = 0 * zoom;
    pick32.castShadow = true;
    pick32.receiveShadow = false;
    pick32.visible = false;

    body.add(handl);
    body.add(handr);
    body.add(pick11);
    body.add(pick12);
    body.add(pick21);
    body.add(pick22);
    body.add(pick31);
    body.add(pick32);

    // PIEDS
    const piedsl = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3 * zoom, 3 * zoom, 12 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x755b0b, flatShading: true }));
    piedsl.position.z = 6 * zoom;
    piedsl.position.y = 3 * zoom;
    piedsl.castShadow = true;
    piedsl.receiveShadow = true;


    const piedsr = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3 * zoom, 3 * zoom, 12 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x755b0b, flatShading: true }));
    piedsr.position.z = 6 * zoom;
    piedsr.position.y = -3 * zoom;
    piedsr.castShadow = true;
    piedsr.receiveShadow = true;


    player.position.x = current_x * positionWidth * zoom;
    player.position.y = current_y * positionWidth * zoom;

    player.add(head);
    player.add(neck);
    player.add(body);
    player.add(piedsl);
    player.add(piedsr);

    const rowel = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 4 * zoom, 2 * zoom),
        new THREE.MeshLambertMaterial({ color: 0xF0619A, flatShading: true }));

    rowel.position.z = 21 * zoom;
    rowel.castShadow = true;
    rowel.receiveShadow = false;
    player.add(rowel);

    return player;
}

function WaterGround() {
    const waterground = new THREE.Group();

    let bords = [
        {
            w: positionWidth + 2,
            h: 4,
            d: 2,
            x: 0,
            y: positionWidth - 2,
        },
        {
            w: positionWidth + 2,
            h: 4,
            d: 2,
            x: 0,
            y: -positionWidth + 2,
        },
        {
            w: 2,
            h: 4,
            d: positionWidth,
            x: -positionWidth / 2,
            y: 0,
        }, {
            w: 2,
            h: 4,
            d: positionWidth,
            x: positionWidth / 2,
            y: 0,
        }
    ]
    for (let bord of bords) {
        const ba = new THREE.Mesh(
            new THREE.BoxBufferGeometry(bord.w * zoom, bord.d * zoom, bord.h * zoom),
            new THREE.MeshPhongMaterial({ color: colors.rail, flatShading: true }));
        ba.castShadow = true;
        ba.receiveShadow = true;
        ba.position.x = bord.x * zoom;
        ba.position.z = -3;
        ba.position.y = bord.y;
        waterground.add(ba);
    }

    const ba = new THREE.Mesh(
        new THREE.BoxBufferGeometry(positionWidth * zoom, 2 * zoom, 4 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.rail, flatShading: true }));
    ba.castShadow = true;
    ba.receiveShadow = true;
    ba.position.x = 0;
    ba.position.z = -3;
    ba.position.y = 0;
    ba.rotation.z = Math.PI / 1.3;
    waterground.add(ba);

    return waterground;
}
function Wagon(type) {
    p = positionWidth * 1.5;
    if (type == 'train') {
        size = 15;
        color = 'red';
        bords_height = 4;
        bords_color = colors.rail;
    }
    else if (type == 'stock') {
        size = 2;
        color = 'black';
        bords_height = 12;
        bords_color = '#8D6842';
    }
    else {
        size = 2;
        color = 'black';
        bords_height = 4;
        bords_color = colors.rail;

        if (type == 'rail') {
            p = positionWidth * 1;
        }
    }
    const wagon = new THREE.Group();

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry((positionWidth - 2) * zoom, p * zoom, size * zoom),
        new THREE.MeshPhongMaterial({ color: colors[color], flatShading: false }));
    main.position.z = (7 + size / 2) * zoom;
    main.castShadow = true;
    main.receiveShadow = true;

    let bords = [
        {
            w: 20,
            h: bords_height,
            d: 2,
            x: 0,
            y: 1,
            z: p / 2,
        }, {
            w: 20,
            h: bords_height,
            d: 2,
            x: 0,
            y: 1,
            z: -(p / 2),
        },
        {
            w: 2,
            h: bords_height,
            d: p,
            x: 9,
            y: 1,
            z: 0,
        }, {
            w: 2,
            h: bords_height,
            d: p,
            x: -9,
            y: 1,
            z: 0,
        }
    ]
    for (let bord of bords) {
        const ba = new THREE.Mesh(
            new THREE.BoxBufferGeometry(bord.w * zoom, bord.d * zoom, bord.h * zoom),
            new THREE.MeshPhongMaterial({ color: bords_color, flatShading: true }));
        ba.castShadow = true;
        ba.receiveShadow = true;
        ba.position.x = bord.x * zoom;
        ba.position.z = (-(size / 2) + (bords_height / 2)) * zoom;
        ba.position.y = bord.z * zoom;
        main.add(ba);
    }
    let ad = {
        w: 2,
        h: 2,
        d: 10,
        x: 0,
        y: 1,
        z: p / 2 + 5,
    };
    if (color != 'red') {
        const attache = new THREE.Mesh(
            new THREE.BoxBufferGeometry(ad.w * zoom, ad.d * zoom, ad.h * zoom),
            new THREE.MeshPhongMaterial({ color: colors.gray, flatShading: true }));
        attache.castShadow = true;
        attache.receiveShadow = true;
        attache.position.x = ad.x * zoom;
        attache.position.z = ad.y * zoom;
        attache.position.y = (0 + ad.z) * zoom;
        main.add(attache);
    }

    let wheels = [
        {
            w: 3,
            h: 1.5,
            d: 6,
            x: 10,
            y: -9.5,
            z: -6,
        },
        {
            w: 3,
            h: 1.5,
            d: 6,
            x: 10,
            y: 9.5,
            z: -6,
        }
    ];
    for (let wh of wheels) {
        const wheel = new THREE.Mesh(
            new THREE.CylinderBufferGeometry(wh.w * zoom, wh.w / 3 * zoom, wh.h * zoom, wh.d * zoom),
            new THREE.MeshPhongMaterial({ color: colors.black, flatShading: true }));

        wheel.position.x = wh.x * zoom;
        wheel.position.y = wh.y * zoom;
        wheel.position.z = (-(size / 2) - 1) * zoom;
        wheel.rotation.z = Math.PI / 2;
        main.add(wheel);
    }
    wagon.add(main);

    return wagon;

}
function Smoke() {

    const smoke = new THREE.Group();

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(positionWidth / 8 * zoom, positionWidth / 8 * zoom, positionWidth / 8 * zoom),
        new THREE.MeshPhongMaterial({ opacity: 0.99, transparent: true, color: 0xffffff, flatShading: false }));

    main.position.y = 10 * zoom;
    main.position.z = 28 * zoom;
    smoke.add(main);

    return smoke;
}
function Train() {

    const wagon = new THREE.Group();

    const main = new Wagon('train');
    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry((positionWidth - 2) * zoom, (positionWidth - 4) * zoom, positionWidth / 2 * zoom),
        [
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carBackTexture }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carFrontTexture }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carRightSideTexture }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carLeftSideTexture }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }), // top
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }) // bottom
        ]);

    cabin.position.y = -((positionWidth - 6) / 2) * zoom;
    cabin.position.z = 27 * zoom;
    cabin.castShadow = true;
    cabin.receiveShadow = true;

    main.add(cabin);

    const noise = new THREE.Mesh(
        new THREE.CylinderBufferGeometry(3 * zoom, 2 * zoom, 11 * zoom, 11 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.black, flatShading: true }));
    noise.castShadow = true;
    noise.receiveShadow = true;

    noise.position.y = 10 * zoom;
    noise.position.z = 25 * zoom;

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
        new THREE.BoxBufferGeometry(positionWidth * zoom, 3 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true }));

    const createRail = () => new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, positionWidth * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.rail, flatShading: true }));

    for (let i = 0; i < 3; i++) {
        const middle = createTraverses();
        middle.receiveShadow = true;
        middle.castShadow = true;
        middle.position.x = 1 * zoom;
        middle.position.y = ((7 * i) - 8) * zoom;
        middle.position.z = 1 * zoom;
        three.add(middle);
    }

    const rail_left = createRail();
    rail_left.receiveShadow = true;
    rail_left.castShadow = true;
    rail_left.position.z = 2 * zoom;
    rail_left.position.x = ((-(positionWidth / 2)) + 5) * zoom;
    three.add(rail_left);

    const rail_right = createRail();
    rail_right.position.x = ((positionWidth / 2) - 2) * zoom;
    rail_right.receiveShadow = true;
    rail_right.castShadow = true;
    rail_right.position.z = 2 * zoom;
    three.add(rail_right);

    return three;
}


function Rock() {
    const rock = new THREE.Group();


    const trunk = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true }));

    trunk.position.z = 2.5 * zoom;
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    const trunk2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true }));

    trunk2.position.z = 2.5 * zoom;
    trunk2.castShadow = true;
    trunk2.receiveShadow = true;
    rock.add(trunk);
    rock.add(trunk2);

    height = (positionWidth / 2 + Math.floor(Math.random() * 20)) / 3 * zoom;
    this.adefault_position = height;
    console.log("rock height", height);
    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(positionWidth * zoom, positionWidth * zoom, height * zoom),
        new THREE.MeshPhongMaterial({ color: colors.rock, flatShading: true }));

    main.position.x = 0 * zoom;
    main.position.y = 0 * zoom;
    main.position.z = height / 2 * zoom;
    main.castShadow = true;
    main.receiveShadow = true;
    rock.add(main);

    // const rock_1 = new THREE.Mesh(
    //     new THREE.BoxBufferGeometry(15 * zoom, 15 * zoom, 15 * zoom),
    //     new THREE.MeshPhongMaterial({ color: colors.rock, flatShading: true }));

    // rock_1.position.x = 10 * zoom;
    // rock_1.position.y = 5 * zoom;
    // rock_1.position.z = 7.5 * zoom;
    // rock_1.castShadow = true;
    // rock_1.receiveShadow = true;
    // rock.add(rock_1);
    // let random_rotate = Math.floor(Math.random() * 90) - 45;

    // rock.rotation.z = random_rotate * Math.PI / 180;
    return rock;
}

function Metal() {
    const rock = new THREE.Group();

    height = (positionWidth / 1.6 + Math.floor(Math.random() * 20)) / 3 * zoom;
    this.adefault_position = height;
    const rock_2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(positionWidth / 1.6 * zoom, positionWidth / 1.6 * zoom, height * zoom),
        new THREE.MeshPhongMaterial({ color: colors.metal, flatShading: true }));

    rock_2.position.x = 0 * zoom;
    rock_2.position.y = 0 * zoom;
    rock_2.position.z = height / 2 * zoom;
    rock_2.castShadow = true;
    rock_2.receiveShadow = true;
    rock.add(rock_2);

    const rock_1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(10 * zoom, 10 * zoom, 10 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.metal, flatShading: true }));

    rock_1.position.x = 3 * zoom;
    rock_1.position.y = 3 * zoom;
    rock_1.position.z = height / 1.6 * zoom;
    rock_1.castShadow = true;
    rock_1.receiveShadow = true;
    rock.add(rock_1);
    let random_rotate = Math.floor(Math.random() * 90) - 45;

    rock.rotation.z = random_rotate * Math.PI / 180;
    return rock;
}

function Arbre() {
    const arbre = new THREE.Group();

    const trunk = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true }));

    trunk.position.z = 2.5 * zoom;
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    const trunk2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true }));

    trunk2.position.z = 2.5 * zoom;
    trunk2.castShadow = true;
    trunk2.receiveShadow = true;
    arbre.add(trunk);
    arbre.add(trunk2);


    const body = new THREE.Group();
    let rotation = Math.floor(Math.random() * 180) + 1;
    body.rotation.z = rotation * Math.PI / 180;
    // Petit cube
    const cube1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(9 * zoom, 9 * zoom, 9 * zoom),
        new THREE.MeshLambertMaterial({ color: 0x9cff00, flatShading: true }));

    cube1.position.z = 12 * zoom;
    cube1.position.x = 3 * zoom;
    cube1.position.y = -3 * zoom;
    cube1.castShadow = true;
    cube1.receiveShadow = false;
    body.add(cube1);

    // Grand cube
    const cube2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(11 * zoom, 11 * zoom, 11 * zoom),
        new THREE.MeshLambertMaterial({ color: 0x9cff00, flatShading: true }));

    cube2.position.z = 14 * zoom;
    cube2.position.x = -3 * zoom;
    cube2.position.y = 3 * zoom;
    cube2.castShadow = true;
    cube2.receiveShadow = false;
    body.add(cube2);

    arbre.add(body);
    return arbre;
}
function Sapin() {
    const arbre = new THREE.Group();

    const trunk = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true }));

    trunk.position.z = 2.5 * zoom;
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    const trunk2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true }));

    trunk2.position.z = 2.5 * zoom;
    trunk2.castShadow = true;
    trunk2.receiveShadow = true;
    arbre.add(trunk);
    arbre.add(trunk2);


    const body = new THREE.Group();
    let rotation = Math.floor(Math.random() * 180) + 1;
    body.rotation.z = rotation * Math.PI / 180;
    // Petit cube
    const cube1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(6 * zoom, 6 * zoom, 6 * zoom),
        new THREE.MeshLambertMaterial({ color: 0x45be6f, flatShading: true }));

    cube1.position.z = 16 * zoom;
    cube1.castShadow = true;
    cube1.receiveShadow = false;
    body.add(cube1);

    // Grand cube
    const cube2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(11 * zoom, 11 * zoom, 6 * zoom),
        new THREE.MeshLambertMaterial({ color: 0x45be6f, flatShading: true }));

    cube2.position.z = 10 * zoom;
    cube2.castShadow = true;
    cube2.receiveShadow = false;
    body.add(cube2);

    arbre.add(body);
    return arbre;
}

function Station() {
    const station = new THREE.Group();

    const center = new THREE.Mesh(
        new THREE.BoxBufferGeometry(positionWidth * zoom, positionWidth * 3 * zoom, positionWidth * 1.5 * zoom),
        [
            new THREE.MeshPhongMaterial({ color: 0x705341, flatShading: true, map: stationBackTexture }),
            new THREE.MeshPhongMaterial({ color: 0x705341, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: 0x705341, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: 0x705341, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: 0x705341, flatShading: true }), // top
            new THREE.MeshPhongMaterial({ color: 0x705341, flatShading: true }) // bottom
        ]);
    center.position.z = positionWidth * 1.5 / 2 * zoom;
    center.castShadow = true;
    center.receiveShadow = true;
    const plafond = new THREE.Mesh(
        new THREE.BoxBufferGeometry((positionWidth - 4) * zoom, (positionWidth * 3 - 4) * zoom, 4 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x5acaa4, flatShading: true }));

    plafond.position.z = (positionWidth * 1.5 + 2) * zoom;
    plafond.castShadow = true;
    plafond.receiveShadow = true;

    const grenier = new THREE.Mesh(
        new THREE.BoxBufferGeometry((positionWidth - 4) * zoom, positionWidth * zoom, positionWidth * zoom),
        new THREE.MeshPhongMaterial({ color: 0x705341, flatShading: true })
    );

    grenier.position.z = (positionWidth * 2 + 4) * zoom;
    grenier.castShadow = true;
    grenier.receiveShadow = true;

    const gplafond = new THREE.Mesh(
        new THREE.BoxBufferGeometry((positionWidth - 4) * zoom, (positionWidth - 4) * zoom, 4 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x5acaa4, flatShading: true }));

    gplafond.position.z = (positionWidth * 3 - 4) * zoom;
    gplafond.castShadow = true;
    gplafond.receiveShadow = true;

    station.add(center);
    station.add(plafond);
    station.add(grenier);
    station.add(gplafond);

    return station;
}

function Cell(data) {
    let color = 0x000000;
    // console.log("data", data);
    this.name = "cell" + data;
    let type = data[0];
    let addon = data[1] ? data[1] : null;
    let height = 15;
    if (type == 'g') // gazon
        color = 0xaeef47;
    if (type == 'h') // herbe
        color = 0xfff14b;
    if (type == 'o') // Orange
        color = 0xff5b3c;
    if (type == 'b') // Brown
        color = 0xaa5252;
    if (type == 'r') // Rock
        color = 0xe28b6d;
    if (type == 'm') // Metal
        color = 0xe906c6c;
    if (type == 'w' || type == 'x') // Water
        color = 0x00ffe0;

    const cellg = new THREE.Group();

    cell = new THREE.Mesh(
        new THREE.BoxBufferGeometry(positionWidth * zoom, positionWidth * zoom, height * zoom),
        new THREE.MeshPhongMaterial({ color: color }));
    cell.castShadow = true;
    cell.receiveShadow = true;
    cell.position.x = 0;

    let default_z = 15;
    if (type == 'w' || type == 'x')
        default_z = 20;

    cell.position.z = ((height / 2) - default_z) * zoom;
    // if (type == 'w')
    //     cell.position.z = -12.5 * zoom;
    // if (type == 'r')
    //     cell.position.z = height/2 * zoom;
    // else
    //     cell.position.z = -7.5 * zoom;

    cellg.add(cell);
    if (type == 'x') {
        this.addon = new WaterGround();
        cellg.add(this.addon);
    }
    if (addon != null) {
        if (addon == 't') {
            if (type == 'g')
                this.addon = new Arbre();
            if (type == 'o')
                this.addon = new Arbre();
            if (type == 'b')
                this.addon = new Sapin();
            cellg.add(this.addon);
        }
        if (addon == 'l') {
            this.addon = new Rails();
            cellg.add(this.addon);
        }
        if (addon == 'r') {
            this.addon = new Rock();
            cellg.add(this.addon);
        }
        if (addon == 'm') {
            this.addon = new Metal();
            cellg.add(this.addon);
        }
        if (addon == 's') {
            this.addon = new Station();
            cellg.add(this.addon);
        }
    }


    return cellg;
}
function Grass(index) {
    const grass = new THREE.Group();

    const createSection = color => new THREE.Mesh(
        new THREE.BoxBufferGeometry(boardWidth * zoom, positionWidth * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color: (index % 2) == 0 ? 0x000000 : 0xffffff }));
    const createWaterGrass = color => new THREE.Mesh(
        new THREE.BoxBufferGeometry((boardWidth * 0.6) * zoom, positionWidth * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color }));
    const createWater = color => new THREE.Mesh(
        new THREE.BoxBufferGeometry((boardWidth * 0.4) * zoom, positionWidth * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color }));

    if (index != 4 && index != 5) {
        for (let i = 0; i < columns; i++) {
            let middle = new THREE.Mesh(
                new THREE.BoxBufferGeometry(positionWidth * zoom, positionWidth * zoom, 15 * zoom),
                new THREE.MeshPhongMaterial({ color: (i % 2) == 0 ? 0x000000 : 0xffff00 }));
            middle.receiveShadow = true;
            middle.position.z = -7 * zoom;
            middle.position.x = i * positionWidth * zoom,
                grass.add(middle);
        }
    }
    else {
        middle = createWaterGrass(0xbaf455);
        middle.receiveShadow = true;
        middle.position.z = -7 * zoom;
        middle.position.x = 2.5 * positionWidth * zoom;
        grass.add(middle);

        middle = createWater(0x6EFCEE);
        middle.receiveShadow = true;
        middle.position.x = 7.5 * positionWidth * zoom;
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
        ground_first.position.z = 1 * zoom;
        ground_first.receiveShadow = false;
        // grass.add(ground_first);
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
    cells = [];
    this.mesh = new THREE.Group();
    this.name = "lane_" + index;
    // this.type = index <= 0 ? 'field' : laneTypes[Math.floor(Math.random() * laneTypes.length)];
    // console.log("levels", levels);
    // console.log("level_id", level_id);
    for (let i = 0; i < levels[level_id].length; i++) {
        if (levels[level_id][i][index] && levels[level_id][i][index] != 'e') {
            cells[i] = new Cell(levels[level_id][i][index]);
            cells[i].position.x = positionWidth * i * zoom;
            this.mesh.add(cells[i]);
        }
    }
    this.cells = cells;
}