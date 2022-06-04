import { square } from "./square.js"
export const dimensions = {};
const grid = []
const canv = document.getElementById("maze");
const draw = canv.getContext('2d');

const ROWS = 36;
const COLS = 36;

let w_inc = canv.width / ROWS;
let l_inc = canv.height / COLS;

// const ROWS = 10;
// const COLS = 10;

for (let i = 0; i < ROWS; i++) {
    grid[i] = [];
    for (let j = 0; j < COLS; j++) {
        grid[i][j] = new square();
        // if (i === j || i === (COLS-j-1))
        //     grid[i][j].click()
    }
}
const drawGrid = () => {

    draw.fillStyle = "#000"
    console.log("drawing grid");
    console.log(w_inc, l_inc);
    console.dir(draw);
    for (let i = 0; i < ROWS; i++) {
        draw.moveTo(0, l_inc * i);
        draw.lineTo(canv.width, l_inc * i);
        for (let j = 0; j < COLS; j++) {
            const s = grid[i][j];
            draw.moveTo(w_inc * j, 0);
            draw.lineTo(w_inc * j, canv.height);
            if (s.modifiedClick) {
                draw.fillStyle = s.color;
                draw.fillRect(w_inc * j, l_inc * i, w_inc, l_inc)
                draw.fillStyle = "#fff"
                s.modifiedClick = false;
            }
        }
    }
    draw.stroke();
}

let mousedown = false;
let lastsquare = null;
const clickhandler = (event) => {
    console.warn(event.type);
    event.preventDefault();
    mousedown = true;
    const rect = canv.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);
    const x_spot = Math.floor(x / w_inc);
    const y_spot = Math.floor(y / l_inc);
    const s = grid[y_spot][x_spot];
    if (s === lastsquare){
        return;
    }
    lastsquare = s;
    s.click()
    fillSquare(s, x_spot * w_inc, y_spot * l_inc)
    // console.log(`x in canv is ${x} y in canv is ${y}`)
    // console.log(`x spot in canv is ${x_spot} y spot in canv is ${y_spot}`)
}
const fillSquare = (sq, x_spot, y_spot) => {
    draw.moveTo(y_spot, x_spot);
    draw.fillStyle = sq.color;
    draw.fillRect(x_spot, y_spot, w_inc, l_inc);
}
const mousemovehandler = (event) => {
    if (mousedown) {
        clickhandler(event);
    }
}

const mouseuphandler = (event) => {
    mousedown = false
    drawGrid()
}

const resize = () => {
    dimensions.width = Math.floor(screen.width * 0.75);
    dimensions.height = Math.floor(screen.height * 0.75);

    canv.setAttribute("width", dimensions.width);
    canv.setAttribute("height", dimensions.height);

    w_inc = canv.width / ROWS;
    l_inc = canv.height / COLS;
}
const resizehandler = (event) => {
    console.log("resizing screen");
    resize()
    drawGrid();
}
window.addEventListener("resize", resizehandler);
canv.addEventListener("mousedown", clickhandler);
canv.addEventListener("mousemove", mousemovehandler);
canv.addEventListener("contextmenu", clickhandler);
canv.addEventListener("mouseup", mouseuphandler);

console.dir(canv);

resize();
drawGrid();