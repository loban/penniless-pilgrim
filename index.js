// # Penniless Pilgrim
//
// Solves the "Penniless Pilgrim" riddle from TED-Ed
//
// [![Penniless Pilgrim](http://img.youtube.com/vi/6sBB-gRhfjE/0.jpg)](https://www.youtube.com/watch?v=6sBB-gRhfjE)
//
// https://www.youtube.com/watch?v=6sBB-gRhfjE
//
// Copyright (C) 2018 Loban Amaan Rahman

const roadsX = [
    [1, 2, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

const roadsY = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
];

const current = {
    x: 2,
    y: 0,
    tax: 4,
};

const target = {
    x: 4,
    y: 4,
    tax: 0
};

// Print current paths
function print(p, rX, rY, s) {
    console.log();
    console.log(`Position = ${p.x}, ${p.y}; Steps = ${s}; Tax = ${p.tax}`);

    for (let y = 0; y <= 4; y++) {
        let rowA = '';
        for (let x = 0; x <= 4; x++) {
            rowA += (p.x === x && p.y === y) ? '■' : '+';
            if (x < 4) {
                rowA += rX[y][x] ? `═${rX[y][x]}`.padEnd(4, '═') : '────';
            }
        }
        console.log(rowA);

        if (y < 4) {
            let rowB = ['', '', ''];
            for (let x = 0; x <= 4; x++) {
                rowB[0] += rY[y][x] ? '║    ' : '│    ';
                rowB[1] += rY[y][x] ? `${rY[y][x]}`.padEnd(5, ' ') : '│    ';
                rowB[2] += rY[y][x] ? '║    ' : '│    ';
            }
            rowB.forEach(row => console.log(row));
        }
    }
}

// Greedy solve
function greedy(p, t, rX, rY, s) {
    if (p.x === t.x && p.y === t.y && p.tax === t.tax) {
        print(p, rX, rY, s);
        console.log(`Solved in ${s} steps!`);
        return;
    }

    let hasMoved = false;

    if (p.x < 4 && !rX[p.y][p.x]) {
        // Clone arguments
        let pn = Object.assign({}, p);
        let rXn = rX.map(rX1 => rX1.map(rX2 => rX2));
        let rYn = rY.map(rY1 => rY1.map(rY2 => rY2));

        // console.log(`Go right`);
        hasMoved = true;

        rXn[p.y][p.x] = s + 1;
        pn.x = p.x + 1;
        pn.tax = p.tax + 2;

        greedy(pn, t, rXn, rYn, s + 1);
    }
    if (p.y < 4 && !rY[p.y][p.x]) {
        // Clone arguments
        let pn = Object.assign({}, p);
        let rXn = rX.map(rX1 => rX1.map(rX2 => rX2));
        let rYn = rY.map(rY1 => rY1.map(rY2 => rY2));

        // console.log(`Go down`);
        hasMoved = true;

        rYn[p.y][p.x] = s + 1;
        pn.y = p.y + 1;
        pn.tax = p.tax * 2;

        greedy(pn, t, rXn, rYn, s + 1);
    }
    if (p.x > 0 && !rX[p.y][p.x - 1]) {
        // Clone arguments
        let pn = Object.assign({}, p);
        let rXn = rX.map(rX1 => rX1.map(rX2 => rX2));
        let rYn = rY.map(rY1 => rY1.map(rY2 => rY2));

        // console.log(`Go left`);
        hasMoved = true;

        rXn[p.y][p.x - 1] = s + 1;
        pn.x = p.x - 1;
        pn.tax = p.tax - 2;

        greedy(pn, t, rXn, rYn, s + 1);
    }
    if (p.y > 0 && !rY[p.y - 1][p.x]) {
        // Clone arguments
        let pn = Object.assign({}, p);
        let rXn = rX.map(rX1 => rX1.map(rX2 => rX2));
        let rYn = rY.map(rY1 => rY1.map(rY2 => rY2));

        // console.log(`Go up`);
        hasMoved = true;

        rYn[p.y - 1][p.x] = s + 1;
        pn.y = p.y - 1;
        pn.tax = p.tax / 2;

        greedy(pn, t, rXn, rYn, s + 1);
    }

    // if (!hasMoved) {
    //     print(p, rX, rY, s);
    //     console.log(`Unsolvable!`);
    // }
}

greedy(current, target, roadsX, roadsY, 2);
