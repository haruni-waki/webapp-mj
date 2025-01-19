
const menu = document.getElementById("menu");
const inputColor = document.getElementById("inputColor");
const remove = document.getElementById("delete");


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDragging = false;
let shapes = [];
let dragIndex = null;


function Grid() {
    for (let index = 0; index < 10; index++) {
        
        ctx.beginPath(); // 新しいパスを開始
        ctx.moveTo(0,50+index*50); // ペンを (30, 50) へ移動
        ctx.lineTo(500, 50+index*50); // 直線を (150, 100) へ描く
        ctx.stroke(); // パスを描画
        ctx.beginPath(); // 新しいパスを開始
        ctx.moveTo(50+index*50,0); // ペンを (30, 50) へ移動
        ctx.lineTo(50+index*50, 500); // 直線を (150, 100) へ描く
        ctx.stroke(); // パスを描画
        
    }
    
}


function DrawCircle(x, y, r, c) {
    ctx.fillStyle = c;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

function allCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Grid();
    shapes.forEach((shape) =>
        DrawCircle(
            shape.x,
            shape.y,
            shape.radius,
            shape.color
        )
    )
}


canvas.addEventListener('click', onMouseClick);
canvas.addEventListener('contextmenu', onContextClick);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('contextmenu', rightClick);

function onMouseClick(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    if (isClickOnShape(x, y)) return;
    if (dragIndex !== null) return;
    console.log("check")

    
    x = Math.floor(x/50) * 50 +25
    y = Math.floor(y/50) * 50 +25

    color=inputColor.value;
    

    var newShape = {
        x: x,
        y: y,
        radius: 25,
        color: color
    }
    shapes.push(newShape);
    allCircle()
}

function isClickOnShape(x, y) {
    return shapes.some(shape => {
        return x >= shape.x -25 && x <= shape.x + 25 &&
        y >= shape.y-25&& y <= shape.y + 25;
    })
}




function onMouseDown(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i];
        const dist = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
        if (dist <= shape.radius) {
            isDragging = true;
            console.log("dragg")
            dragIndex = i;
            break;
        }
    }
}

function onMouseMove(e) {
    if (!isDragging || dragIndex === null) return;

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    shapes[dragIndex].x = x;
    shapes[dragIndex].y = y;

    allCircle();

}

function onMouseUp(e) {
    if (!isDragging || dragIndex === null) return;

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    x = Math.floor(x/50) * 50 +25
    y = Math.floor(y/50) * 50 +25 
    shapes[dragIndex].x = x;
    shapes[dragIndex].y = y;
    allCircle();
    console.log("mouseup")
    isDragging = false;
    dragIndex = null;
}

function onContextClick(){
    console.log("context")
}

function rightClick(e){
    // var rect = e.target.getBoundingClientRect();
    // var x = e.clientX - rect.left;
    // var y = e.clientY - rect.top;

    menu.style.position="absolute";
    menu.style.top=x;
    menu.style.left=y;
    menu.style.display="block";
}

function removeGeometry(){
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    shapes.splice(x,y);
    allCircle()

}

Grid();

