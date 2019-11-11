/** OBJECTS */
function Texture(color, width, height, rects = []) {
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");
    context.fillStyle = '#FFF';
    context.fillRect(0, 0, width, height);
    context.fillStyle = color;
    rects.forEach(rect => {
        context.fillRect(rect.x, rect.y, rect.w, rect.h);
    });
    return new THREE.CanvasTexture(canvas);
}


function WaterBucket() {

    wbg = new THREE.Group();

    wb = new THREE.Mesh(
        new THREE.BoxBufferGeometry(positionWidth - 4 / 2 * zoom, positionWidth - 4 / 2 * zoom, positionWidth / 4 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.water, flatShading: true }));
    wb.position.z = (positionWidth) / 4 * zoom;
    wbg.add(wb);


    infoTexture = new Texture('#00ffe0', positionWidth * zoom * 2, positionWidth * zoom * 2, [
        { x: 0, y: 0, w: 10, h: positionWidth * zoom * 2 },
        { x: 0, y: 0, w: positionWidth * zoom * 2, h: 10 },
        { x: positionWidth * zoom * 2 - 10, y: 0, w: 10, h: positionWidth * zoom * 2 },
        { x: 0, y: positionWidth * zoom * 2 - 10, w: positionWidth * zoom * 2, h: 10 },
        { x: 25, y: 20, w: 10, h: positionWidth * zoom * 2 - 40 },
    ]);

    wbi = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, positionWidth / 1.5 * zoom, positionWidth / 1.5 * zoom),
        [
            new THREE.MeshPhongMaterial({ color: '#FFF', flatShading: true, map: infoTexture }),
            new THREE.MeshPhongMaterial({ color: colors.water, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: colors.water, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: colors.water, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: colors.water, flatShading: true }), // top
            new THREE.MeshPhongMaterial({ color: colors.water, flatShading: true }) // bottom
        ]);
    wbi.position.z = positionWidth * zoom;
    wbi.position.x = -positionWidth / 2 * zoom;
    wbg.add(wbi);

    let bords = [
        {
            w: positionWidth / 2,
            h: positionWidth / 2,
            d: 2,
            x: 0,
            y: -10,
        },
        {
            w: positionWidth / 2,
            h: positionWidth / 2,
            d: 2,
            x: 0,
            y: +10,
        },
        {
            w: 2,
            h: positionWidth / 2,
            d: positionWidth / 2,
            x: -4,
            y: 0,
        }, {
            w: 2,
            h: positionWidth / 2,
            d: positionWidth / 2,
            x: 4,
            y: 0,
        }
    ]
    for (let bord of bords) {
        ba = new THREE.Mesh(
            new THREE.BoxBufferGeometry(bord.w * zoom, bord.d * zoom, bord.h * zoom),
            new THREE.MeshPhongMaterial({ color: colors.bois, flatShading: true }));
        ba.castShadow = true;
        ba.receiveShadow = true;
        ba.position.x = bord.x * zoom;
        ba.position.z = bord.h / 2 + 2 * zoom;
        ba.position.y = bord.y;
        wbg.add(ba);
    }

    return wbg;
}

function Player(current_y = null, current_x = null) {
    playerg = new THREE.Group();


    //head
    var head = new THREE.Mesh(
        new THREE.BoxGeometry(20, 22, 19),
        new THREE.MeshLambertMaterial({ color: "#ff0000", flatShading: true })
    );
    head.position.z = 70;
    head.castShadow = true;
    head.receiveShadow = false;


    var eyel = new THREE.Mesh(
        new THREE.BoxGeometry(1, 4, 7),
        new THREE.MeshLambertMaterial({ color: "#ffffff", flatShading: true })
    );
    eyel.position.z = 5;
    eyel.position.x = 10;
    eyel.position.y = -5;

    var eyer = new THREE.Mesh(
        new THREE.BoxGeometry(1, 4, 7),
        new THREE.MeshLambertMaterial({ color: "#ffffff", flatShading: true })
    );
    eyer.position.z = 5;
    eyer.position.x = 10;
    eyer.position.y = 5;

    head.add(eyel);
    head.add(eyer);

    // neck
    var neck = new THREE.Mesh(
        new THREE.BoxGeometry(18, 20, 4),
        new THREE.MeshLambertMaterial({ color: 0xe0bea5, flatShading: true })
    );
    neck.position.z = 60;
    neck.castShadow = true;
    neck.receiveShadow = false;

    // BODY
    body = new THREE.Mesh(
        new THREE.BoxBufferGeometry(positionWidth / 3 * zoom, positionWidth / 2 * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }));
    body.position.z = 20 * zoom;
    body.castShadow = true;
    body.receiveShadow = false;

    //HANDS 
    handl = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 4 * zoom, 12 * zoom),
        new THREE.MeshPhongMaterial({ color: 0xe0bea5, flatShading: true }));
    handl.position.z = 0 * zoom;
    handl.position.y = -6 * zoom;
    handl.castShadow = true;
    handl.receiveShadow = false;

    handr = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 4 * zoom, 12 * zoom),
        new THREE.MeshPhongMaterial({ color: 0xe0bea5, flatShading: true }));
    handr.position.z = 0 * zoom;
    handr.position.y = 6 * zoom;
    handr.castShadow = true;
    handr.receiveShadow = false;

    pick11 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 15 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: "black", flatShading: true }));
    pick11.position.x = 7 * zoom;
    pick11.position.z = 3 * zoom;
    pick11.position.y = 0 * zoom;
    pick11.position.y = 0 * zoom;
    pick11.castShadow = true;
    pick11.receiveShadow = false;
    pick11.visible = false;

    pick12 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 15 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: "black", flatShading: true }));
    pick12.position.x = 14 * zoom;
    pick12.position.z = 3 * zoom;
    pick12.position.y = 0 * zoom;
    pick12.castShadow = true;
    pick12.receiveShadow = false;
    pick12.visible = false;

    pick21 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(15 * zoom, 4 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: "red", flatShading: true }));
    pick21.position.x = 11 * zoom;
    pick21.position.z = 5 * zoom;
    pick21.position.y = 4 * zoom;
    pick21.castShadow = true;
    pick21.receiveShadow = false;
    pick21.visible = false;

    pick22 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(15 * zoom, 4 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: "red", flatShading: true }));
    pick22.position.x = 11 * zoom;
    pick22.position.z = 5 * zoom;
    pick22.position.y = -4 * zoom;
    pick22.castShadow = true;
    pick22.receiveShadow = false;
    pick22.visible = false;

    pick31 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 15 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: "blue", flatShading: true }));
    pick31.position.x = 7 * zoom;
    pick31.position.z = 7 * zoom;
    pick31.position.y = 0 * zoom;
    pick31.castShadow = true;
    pick31.receiveShadow = false;
    pick31.visible = false;

    pick32 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 15 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: "blue", flatShading: true }));
    pick32.position.x = 14 * zoom;
    pick32.position.z = 7 * zoom;
    pick32.position.y = 0 * zoom;
    pick32.castShadow = true;
    pick32.receiveShadow = false;
    pick32.visible = false;


    let rails_1 = new Rails();
    rails_1.position.x = (positionWidth / 1.5) * zoom;
    rails_1.position.z = 5;
    rails_1.visible = false;
    let rails_2 = new Rails();
    rails_2.position.x = (positionWidth / 1.3) * zoom;
    rails_2.position.z = 15;
    rails_2.rotation.z = Math.PI / 2;
    rails_2.visible = false;
    let rails_3 = new Rails();
    rails_3.position.x = (positionWidth / 1.5) * zoom;
    rails_3.position.z = 25;
    rails_3.visible = false;

    wb = new WaterBucket();
    wb.position.x = positionWidth / 2 * zoom;
    wb.children[1].visible = false;
    wb.visible = false;

    ha = new Hache();
    ha.position.x = positionWidth / 2 * zoom;
    ha.position.y = -(positionWidth / 3) * zoom;
    ha.position.z = positionWidth / 2 * zoom;
    ha.children[2].visible = false;
    ha.rotation.x = Math.PI / 2;
    ha.rotation.z = -Math.PI / 2;
    ha.visible = false;

    a = new Axe();
    a.position.x = positionWidth / 2 * zoom;
    a.position.y = -(positionWidth / 3) * zoom;
    a.position.z = positionWidth / 2 * zoom;
    a.children[4].visible = false;
    a.rotation.x = Math.PI / 2;
    a.rotation.z = -Math.PI / 2;
    a.visible = false;

    body.add(handl);
    body.add(handr);
    body.add(pick11);
    body.add(pick12);
    body.add(pick21);
    body.add(pick22);
    body.add(pick31);
    body.add(pick32);
    body.add(rails_1);
    body.add(rails_2);
    body.add(rails_3);
    body.add(wb);
    body.add(ha);
    body.add(a);


    // PIEDS
    piedsl = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3 * zoom, 3 * zoom, 12 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x755b0b, flatShading: true }));
    piedsl.position.z = 6 * zoom;
    piedsl.position.y = 3 * zoom;
    piedsl.castShadow = true;
    piedsl.receiveShadow = true;


    piedsr = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3 * zoom, 3 * zoom, 12 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x755b0b, flatShading: true }));
    piedsr.position.z = 6 * zoom;
    piedsr.position.y = -3 * zoom;
    piedsr.castShadow = true;
    piedsr.receiveShadow = true;


    playerg.position.x = current_x * positionWidth * zoom;
    playerg.position.y = current_y * positionWidth * zoom;

    playerg.add(head);
    playerg.add(neck);
    playerg.add(body);
    playerg.add(piedsl);
    playerg.add(piedsr);

    return playerg;
}


function Hache() {
    ag = new THREE.Group();

    a = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3 * zoom, 6 * zoom, 2),
        new THREE.MeshPhongMaterial({ color: colors.metal, flatShading: true }));
    a.position.z = 2;
    a.position.x = -10;
    a.position.y = 0;

    ag.add(a);

    a2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry((positionWidth - 8) * zoom, 2 * zoom, 2),
        new THREE.MeshPhongMaterial({ color: colors.bois, flatShading: true }));
    a2.position.z = 1;
    a2.position.x = 4;
    a2.position.y = -3;
    ag.add(a2);


    infoTexture = new Texture('#45be6f', positionWidth * zoom * 2, positionWidth * zoom * 2, [
        { x: 0, y: 0, w: 10, h: positionWidth * zoom * 2 },
        { x: 0, y: 0, w: positionWidth * zoom * 2, h: 20 },
        { x: 0, y: 0, w: 20, h: 40 },
        { x: 40, y: 0, w: 30, h: 40 },
        { x: 0, y: positionWidth * zoom * 2 - 30, w: positionWidth * zoom * 2, h: 30 },
        { x: positionWidth * zoom * 2 - 10, y: 0, w: 30, h: positionWidth * zoom * 2 },
    ]);

    ai = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, positionWidth / 1.5 * zoom, positionWidth / 1.5 * zoom),
        [
            new THREE.MeshPhongMaterial({ color: '#FFF', flatShading: true, map: infoTexture }),
            new THREE.MeshPhongMaterial({ color: colors.sapin, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: colors.sapin, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: colors.sapin, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: colors.sapin, flatShading: true }), // top
            new THREE.MeshPhongMaterial({ color: colors.sapin, flatShading: true }) // bottom
        ]);
    ai.position.z = positionWidth * zoom;
    ai.position.x = -positionWidth / 2 * zoom;
    ag.add(ai);

    return ag;
}

function Axe() {
    hg = new THREE.Group();

    h = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1.5 * zoom, 10 * zoom, 2),
        new THREE.MeshPhongMaterial({ color: colors.metal, flatShading: true }));
    h.position.z = 2;
    h.position.x = -10;
    h.position.y = 0;
    hg.add(h);

    h2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry((positionWidth - 8) * zoom, 2 * zoom, 2),
        new THREE.MeshPhongMaterial({ color: colors.bois, flatShading: true }));
    h2.position.z = 1;
    h2.position.x = 2;
    h2.position.y = 0;
    hg.add(h2);

    h3 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1.5 * zoom, 1.5 * zoom, 2),
        new THREE.MeshPhongMaterial({ color: colors.metal, flatShading: true }));
    h3.position.z = 2;
    h3.position.x = -8;
    h3.position.y = -11;
    hg.add(h3);
    h4 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1.5 * zoom, 1.5 * zoom, 2),
        new THREE.MeshPhongMaterial({ color: colors.metal, flatShading: true }));
    h4.position.z = 2;
    h4.position.x = -8;
    h4.position.y = 11;
    hg.add(h4);

    infoTexture = new Texture('#f274d6', positionWidth * zoom * 2, positionWidth * zoom * 2, [
        { x: 0, y: 0, w: 10, h: positionWidth * zoom * 2 }, //haut
        { x: positionWidth * zoom * 2 - 10, y: 0, w: 10, h: positionWidth * zoom * 2 }, //bas
        { x: 0, y: 0, w: positionWidth * zoom * 2, h: 10 }, //droite
        { x: 0, y: positionWidth * zoom * 2 - 10, w: positionWidth * zoom * 2, h: 10 }, //gauche
        { x: 30, y: 0, w: 90, h: 35 }, // int droit
        { x: 20, y: 18, w: 10, h: 17 }, // int droit 2
        { x: 30, y: 45, w: 80, h: 40 }, // int gauche
        { x: 20, y: 45, w: 10, h: 17 }, // int gauche 2
        { x: 0, y: 0, w: 16, h: 16 }, // coin haut droit
        { x: 0, y: positionWidth * zoom * 2 - 16, w: 16, h: 16 }, // coin haut gauche
    ]);

    hi = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, positionWidth / 1.5 * zoom, positionWidth / 1.5 * zoom),
        [
            new THREE.MeshPhongMaterial({ color: '#FFF', flatShading: true, map: infoTexture }),
            new THREE.MeshPhongMaterial({ color: colors.pink, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: colors.pink, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: colors.pink, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: colors.pink, flatShading: true }), // top
            new THREE.MeshPhongMaterial({ color: colors.pink, flatShading: true }) // bottom
        ]);
    hi.position.z = positionWidth * zoom;
    hi.position.x = -positionWidth / 2 * zoom;
    hg.add(hi);

    return hg;
}
function Stock(type) {

    stock = new THREE.Group();
    stock.position.x = 0;
    stock.position.y = -(positionWidth);
    stock.position.z = 0;
    stock.rotation.z = Math.PI / 2;

    pick11 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 15 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: colors[type], flatShading: true }));
    pick11.position.x = 7 * zoom;
    pick11.position.z = 2 * zoom;
    pick11.position.y = 0 * zoom;
    pick11.position.y = 0 * zoom;
    pick11.castShadow = true;
    pick11.receiveShadow = false;
    pick11.visible = true;

    pick12 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 15 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: colors[type], flatShading: true }));
    pick12.position.x = 14 * zoom;
    pick12.position.z = 2 * zoom;
    pick12.position.y = 0 * zoom;
    pick12.castShadow = true;
    pick12.receiveShadow = false;
    pick12.visible = true;

    stock.add(pick11);
    stock.add(pick12);

    return stock;
}

function WaterGround() {
    waterground = new THREE.Group();

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
        ba = new THREE.Mesh(
            new THREE.BoxBufferGeometry(bord.w * zoom, bord.d * zoom, bord.h * zoom),
            new THREE.MeshPhongMaterial({ color: colors.rail, flatShading: true }));
        ba.castShadow = true;
        ba.receiveShadow = true;
        ba.position.x = bord.x * zoom;
        ba.position.z = -3;
        ba.position.y = bord.y;
        waterground.add(ba);
    }

    ba = new THREE.Mesh(
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
    if (type == 'train') {
        size = 15;
        color = 'red';
        bords_height = 4;
        bords_color = colors.rail;
        p = positionWidth * 1.5;
    }
    else if (type == 'water') {
        size = 15;
        color = 'white';
        bords_height = 4;
        bords_color = colors.rail;
        p = positionWidth * 1;
    }
    else if (type == 'stock') {
        size = 2;
        color = 'black';
        bords_height = 12;
        bords_color = '#8D6842';
        p = positionWidth * 1.7;
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
    wagon = new THREE.Group();

    main = new THREE.Mesh(
        new THREE.BoxBufferGeometry((positionWidth - 2) * zoom, p * zoom, size * zoom),
        new THREE.MeshPhongMaterial({ color: colors[color], flatShading: false }));
    main.position.z = (7 + size / 2) * zoom;
    main.castShadow = true;
    main.receiveShadow = true;
    if (type == 'water') {
        main.material.opacity = 0.5;
        main.material.transparent = true;
        water = new THREE.Mesh(
            new THREE.BoxBufferGeometry((positionWidth - 3) * zoom, (p - 3) * zoom, (size - 3) * zoom),
            new THREE.MeshPhongMaterial({ color: colors['blue'], flatShading: false }));
        // water.position.z = (7 + (size - 4) / 2) * zoom;
        main.add(water);
    }
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
        ba = new THREE.Mesh(
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
        attache = new THREE.Mesh(
            new THREE.BoxBufferGeometry(ad.w * zoom, ad.d * zoom, ad.h * zoom),
            new THREE.MeshPhongMaterial({ color: colors.gray, flatShading: true }));
        attache.castShadow = true;
        attache.receiveShadow = true;
        attache.position.x = ad.x * zoom;
        attache.position.z = (-(size / 2) + 2) * zoom;
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
        wheel = new THREE.Mesh(
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

    smoke = new THREE.Group();

    main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(positionWidth / 8 * zoom, positionWidth / 8 * zoom, positionWidth / 8 * zoom),
        new THREE.MeshPhongMaterial({ opacity: 0.99, transparent: true, color: 0xffffff, flatShading: false }));

    main.position.y = 10 * zoom;
    main.position.z = 28 * zoom;
    smoke.add(main);

    return smoke;
}
function Train() {

    wagong = new THREE.Group();

    wagon = new Wagon('train');

    carBackTexture = new Texture("#000", 40, 80, [{ x: 10, y: 10, w: 30, h: 60 }]);
    carLeftSideTexture = new Texture("#000", 110, 40, [{ x: 10, y: 10, w: 40, h: 30 }, { x: 60, y: 10, w: 40, h: 30 }]);


    cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry((positionWidth - 2) * zoom, (positionWidth - 4) * zoom, positionWidth / 2 * zoom),
        [
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carBackTexture }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carLeftSideTexture }),
            new THREE.MeshPhongMaterial({ color: colors.red, flatShading: true }), // top
            new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }) // bottom
        ]);

    cabin.position.y = -((positionWidth - 6) / 2) * zoom;
    cabin.position.z = 27 * zoom;
    cabin.castShadow = true;
    cabin.receiveShadow = true;

    wagon.add(cabin);

    noise = new THREE.Mesh(
        new THREE.CylinderBufferGeometry(3 * zoom, 2 * zoom, 11 * zoom, 11 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.black, flatShading: true }));
    noise.castShadow = true;
    noise.receiveShadow = true;

    noise.position.y = 10 * zoom;
    noise.position.z = 25 * zoom;

    noise.rotation.x = Math.PI / 2;
    wagon.add(noise);

    wagong.add(wagon);

    for (let i = 0; i <= train_countdown / 100; i++) {
        let countdown = new TrainCountdown(i);
        countdown.visible = false;
        wagong.add(countdown);
    }

    return wagong;
}



function Rails() {
    three = new THREE.Group();


    createTraverses = () => new THREE.Mesh(
        new THREE.BoxBufferGeometry(positionWidth * zoom, 3 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true }));

    createRail = () => new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, positionWidth * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.rail, flatShading: true }));

    for (let i = 0; i < 3; i++) {
        middle = createTraverses();
        middle.receiveShadow = true;
        middle.castShadow = true;
        middle.position.x = 1 * zoom;
        middle.position.y = ((7 * i) - 8) * zoom;
        middle.position.z = 1 * zoom;
        three.add(middle);
    }

    rail_left = createRail();
    rail_left.receiveShadow = true;
    rail_left.castShadow = true;
    rail_left.position.z = 2 * zoom;
    rail_left.position.x = ((-(positionWidth / 2)) + 5) * zoom;
    three.add(rail_left);

    rail_right = createRail();
    rail_right.position.x = ((positionWidth / 2) - 2) * zoom;
    rail_right.receiveShadow = true;
    rail_right.castShadow = true;
    rail_right.position.z = 2 * zoom;
    three.add(rail_right);

    return three;
}


function Rock() {
    rock = new THREE.Group();


    trunk = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.metal, flatShading: true }));

    trunk.position.z = 2.5 * zoom;
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    trunk2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.metal, flatShading: true }));

    trunk2.position.z = 2.5 * zoom;
    trunk2.castShadow = true;
    trunk2.receiveShadow = true;
    rock.add(trunk);
    rock.add(trunk2);

    height = (positionWidth / 2 + Math.floor(Math.random() * 20)) / 3 * zoom;
    this.adefault_position = height;
    // console.log("rock height", height);
    main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(positionWidth * zoom, positionWidth * zoom, height * zoom),
        new THREE.MeshPhongMaterial({ color: colors.rock, flatShading: true }));

    main.position.x = 0 * zoom;
    main.position.y = 0 * zoom;
    main.position.z = height / 2 * zoom;
    main.castShadow = true;
    main.receiveShadow = true;
    rock.add(main);

    // rock_1 = new THREE.Mesh(
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
    rock = new THREE.Group();


    trunk = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true }));

    trunk.position.z = 2.5 * zoom;
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    trunk2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true }));

    trunk2.position.z = 2.5 * zoom;
    trunk2.castShadow = true;
    trunk2.receiveShadow = true;
    rock.add(trunk);
    rock.add(trunk2);

    height = (positionWidth / 2 + Math.floor(Math.random() * 20)) / 2 * zoom;
    this.adefault_position = height;
    // console.log("rock height", height);
    main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(positionWidth * zoom, positionWidth * zoom, height * zoom),
        new THREE.MeshPhongMaterial({ color: colors.metal, flatShading: true }));

    main.position.x = 0 * zoom;
    main.position.y = 0 * zoom;
    main.position.z = height / 2 * zoom;
    main.castShadow = true;
    main.receiveShadow = true;
    rock.add(main);

    return rock;
}

function Arbre() {
    arbre = new THREE.Group();

    trunk = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.bois, flatShading: true }));

    trunk.position.z = 2.5 * zoom;
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    trunk2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.bois, flatShading: true }));

    trunk2.position.z = 2.5 * zoom;
    trunk2.castShadow = true;
    trunk2.receiveShadow = true;
    arbre.add(trunk);
    arbre.add(trunk2);


    body = new THREE.Group();
    let rotation = Math.floor(Math.random() * 180) + 1;
    body.rotation.z = rotation * Math.PI / 180;
    // Petit cube
    cube1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(9 * zoom, 9 * zoom, 9 * zoom),
        new THREE.MeshLambertMaterial({ color: 0x9cff00, flatShading: true }));

    cube1.position.z = 12 * zoom;
    cube1.position.x = 3 * zoom;
    cube1.position.y = -3 * zoom;
    cube1.castShadow = true;
    cube1.receiveShadow = false;
    body.add(cube1);

    // Grand cube
    cube2 = new THREE.Mesh(
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
    arbre = new THREE.Group();

    trunk = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.bois, flatShading: true }));

    trunk.position.z = 2.5 * zoom;
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    trunk2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: colors.bois, flatShading: true }));

    trunk2.position.z = 2.5 * zoom;
    trunk2.castShadow = true;
    trunk2.receiveShadow = true;
    arbre.add(trunk);
    arbre.add(trunk2);


    body = new THREE.Group();
    let rotation = Math.floor(Math.random() * 180) + 1;
    body.rotation.z = rotation * Math.PI / 180;
    // Petit cube
    cube1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(6 * zoom, 6 * zoom, 6 * zoom),
        new THREE.MeshLambertMaterial({ color: 0x45be6f, flatShading: true }));

    cube1.position.z = 16 * zoom;
    cube1.castShadow = true;
    cube1.receiveShadow = false;
    body.add(cube1);

    // Grand cube
    cube2 = new THREE.Mesh(
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
    station = new THREE.Group();
    stationBackTexture = new Texture('#000', positionWidth * zoom * 2, positionWidth * zoom * 6, [
        { x: 30, y: 10, w: 60, h: 60 },
        { x: 20, y: 80, w: 60, h: 80 },
        { x: 30, y: 170, w: 60, h: 60 }
    ]);

    center = new THREE.Mesh(
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
    plafond = new THREE.Mesh(
        new THREE.BoxBufferGeometry((positionWidth - 4) * zoom, (positionWidth * 3 - 4) * zoom, 4 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x5acaa4, flatShading: true }));

    plafond.position.z = (positionWidth * 1.5 + 2) * zoom;
    plafond.castShadow = true;
    plafond.receiveShadow = true;

    grenier = new THREE.Mesh(
        new THREE.BoxBufferGeometry((positionWidth - 4) * zoom, positionWidth * zoom, positionWidth * zoom),
        new THREE.MeshPhongMaterial({ color: 0x705341, flatShading: true })
    );

    grenier.position.z = (positionWidth * 2 + 4) * zoom;
    grenier.castShadow = true;
    grenier.receiveShadow = true;

    gplafond = new THREE.Mesh(
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
    let addon = data[1] && data[1] != " " ? data[1] : null;
    let addon2 = data[2] && data[2] != " " ? data[2] : null;
    let height = 15;
    if (type == 'g') // gazon
        color = 0x84ed47;
    if (type == 'h') // herbe
        color = 0xfff14b;
    if (type == 'o') // Orange
        color = 0xff5b3c;
    if (type == 'b') // Brown
        color = 0xaa5252;
    if (type == 'r') // Rock
        color = colors.rock;
    if (type == 'm') // Metal
        color = colors.metal;
    if (type == 'w' || type == 'x') // Water
        color = 0x00ffe0;

    cellg = new THREE.Group();

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
        if (addon == 'b' || addon == 'p') {
            nb = 1;
            if (addon2)
                nb = addon2;
            for (let i = 0; i < nb; i++) {
                // console.log("addon", addon);
                let addon_type = addon == 'b' ? 'bois' : 'metal';
                let sb = new Stock(addon_type);
                // sb.position.x = 0;
                // sb.position.y = 0;
                sb.position.z = (i * 3) - 2;
                sb.position.y = -25;
                if (i % 2 !== 0) {
                    sb.rotation.z = Math.PI;
                    sb.position.x = positionWidth;
                    sb.position.y = -4;
                }
                cellg.add(sb);
            }
        }
        if (addon == 'w') {
            this.addon = new WaterBucket();
            cellg.add(this.addon);
        }
        if (addon == 'h') {
            this.addon = new Hache();
            cellg.add(this.addon);
        }
        if (addon == 'a') {
            this.addon = new Axe();
            cellg.add(this.addon);
        }
        if (addon == 's') {
            this.addon = new Station();
            cellg.add(this.addon);
        }
    }


    return cellg;
}

function TrainCountdown(countdown = 5) {

    let distance = new THREE.Group();


    var loader = new THREE.FontLoader();
    loader.load('helvetiker_regular.typeface.json', function (font) {
        var textGeometry = new THREE.TextGeometry(countdown.toString(), {

            font: font,

            size: 20,
            height: 1,
            curveSegments: 12,

            bevelThickness: 1,
            bevelSize: 1,
            bevelEnabled: true

        });
        var textMaterial = new THREE.MeshPhongMaterial(
            { color: 0xFFFFFF, specular: 0xFFFFFF }
        );

        var mesh = new THREE.Mesh(textGeometry, textMaterial);
        mesh.position.x = 0 * zoom;
        mesh.position.z = positionWidth * 1.8 * zoom;
        mesh.position.y = -(positionWidth / 2) * zoom;

        mesh.rotation.z = 90 * Math.PI / 180;
        mesh.rotation.y = 90 * Math.PI / 180;
        // mesh.position.z = (-boardWidth / 2) * zoom;
        distance.add(mesh);
        return distance;
    });
    return distance;
}


function Distance(index) {

    let distance = new THREE.Group();


    var loader = new THREE.FontLoader();
    loader.load('helvetiker_regular.typeface.json', function (font) {
        var textGeometry = new THREE.TextGeometry(index + " m", {

            font: font,

            size: 20,
            height: 1,
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
                { color: 0xe0e0e0, specular: 0xe0e0e0 }
            );
        }

        var mesh = new THREE.Mesh(textGeometry, textMaterial);
        mesh.position.x = columns * positionWidth * zoom;
        mesh.position.z = -25 * zoom;
        mesh.position.y = 0;

        mesh.rotation.z = 90 * Math.PI / 180;
        mesh.rotation.y = 90 * Math.PI / 180;
        // mesh.position.z = (-boardWidth / 2) * zoom;
        distance.add(mesh);
        return distance;
    });
    return distance;
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
        if (levels[level_id][i][index] && levels[level_id][i][index][0] != 'e') {
            cells[i] = new Cell(levels[level_id][i][index]);
            cells[i].position.x = positionWidth * i * zoom;
            this.mesh.add(cells[i]);
        }
        else {
            this.mesh.add(new THREE.Group());
        }
    }
    if ((index - 8) % 10 == 0) {
        this.mesh.add(new Distance(index - 8));
    }
    this.cells = cells;
}