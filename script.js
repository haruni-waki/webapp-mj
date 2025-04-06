
const menu = document.getElementById("menu");
const inputColor = document.getElementById("inputColor");
const datalistColor = document.getElementById("color");
const remove = document.getElementById("delete");
const inputName = document.getElementById("inputName");
const nameButton = document.getElementById("nameButton");
const row = document.getElementById('row');
const col = document.getElementById('col');
const row_num = document.getElementById("row_num");
const col_num = document.getElementById("col_num");
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDragging = false;
let shapes = [];
let dragIndex = null;
let editShape = null;

let rowSize=7;
let colSize=6;
// グリッドの大きさ
row.addEventListener("change",getGrid);
col.addEventListener("change",getGrid);

// 新しい丸を作るとき
canvas.addEventListener('click', onMouseClick);
// canvas.addEventListener('contextmenu', onContextClick);

// 既存の丸を持つとき
canvas.addEventListener('mousedown', onMouseDown);
// 既存の丸を動かすとき
canvas.addEventListener('mousemove', onMouseMove);
// 既存の丸を置くとき
canvas.addEventListener('mouseup', onMouseUp);
// 既存の丸のメニュー出すとき
// canvas.addEventListener('contextmenu', rightClick);

// メニューイベント
// 名前欄を出す
nameButton.addEventListener('click', nameButtonClick);
// 丸の名前をつけるとき
inputName.addEventListener("keydown",getInputName);

// 丸を消す
remove.addEventListener("click",removeShape);

function removeShape(e){
    console.log("delete")
    shapes.forEach((shape,index)=>{
        if(shape===editShape){
            shapes.splice(index,1)
            editShape=null
          
        }
    })
    allCircle()
}

function nameButtonClick(e){
    inputName.style.visibility="visible";
}

function inputColorClick(e){
    color=inputColor.value;
    editShape.color = color;
    
    child = document.createElement('option');
    option=datalistColor.appendChild(child);
    option.setAttribute('value', color);
    allCircle()

}

function getInputName(e){
    if (e.key==="Enter"){
        // const ctx = canvas.getContext('2d');
        console.log(inputName.value)
        editShape.name = inputName.value
        ctx.fillStyle="#ffffff";
        ctx.font="30px Roboto medium";
        ctx.fillText(editShape.name,editShape.x-7,editShape.y+9);
        inputName.style.visibility="hidden";
        
    }
}

function Grid() {
    // for (let index = 0; index < 2; index++) {
        
    //     ctx.beginPath(); // 新しいパスを開始
    //     ctx.moveTo(0,50+index*50); // ペンを (30, 50) へ移動
    //     ctx.lineTo(500, 50+index*50); // 直線を (150, 100) へ描く
    //     ctx.stroke(); // パスを描画
        
    //     ctx.beginPath(); // 新しいパスを開始
    //     ctx.moveTo(50+index*50,0); // ペンを (30, 50) へ移動
    //     ctx.lineTo(50+index*50, 500); // 直線を (150, 100) へ描く
    //     ctx.stroke(); // パスを描画
        
    // }

    // 横の大きさは10マス 最小５
    // 縦８マス　最小６
    for (let index = 0; index < colSize; index++) {
        
        ctx.beginPath(); // 新しいパスを開始
        ctx.moveTo(0,50+index*50); // ペンを (30, 50) へ移動
        ctx.lineTo(rowSize*50, 50+index*50); // 直線を (150, 100) へ描く
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke(); // パスを描画
    }
    for (let index = 0; index < rowSize; index++) {   
        ctx.beginPath(); // 新しいパスを開始
        ctx.moveTo(index*50,0); // ペンを (30, 50) へ移動
        ctx.lineTo(index*50, colSize*50); // 直線を (150, 100) へ描く
        ctx.stroke(); // パスを描画
        
    }
}


function DrawCircle(x, y, r, c, isSelected = false) {
    ctx.fillStyle = c;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if(isSelected){
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#D9FF52";
        ctx.stroke();
    }

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
            shape.color,
            shape.isSelected
        )
    )
    shapes.forEach(function(shape){
            ctx.fillStyle="#ffffff"
            ctx.font="30px Roboto medium"
            ctx.fillText(shape.name,shape.x-7,shape.y+9)
        }
    )
}


function getGrid(e){
    rowSize=row.value;
    colSize=col.value;
    row_num.textContent=rowSize;
    col_num.textContent=colSize;

    canvas.width=50*rowSize
    canvas.height=50*colSize

    allCircle()
}

function onMouseClick(e) {
    menudisp=menu.style.display
    if (menudisp=="block"){
        menu.style.display="none";
        return
    }
    
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    
    if (isClickOnShape(x, y)){
        editShape = getClickShapePosition(x,y)[0];
        selectShape(editShape)
        allCircle()
        inputColor.value=editShape.color
        return;
    } 
    if (dragIndex !== null) return;
    console.log("check")

    
    x = Math.floor(x/50) * 50 +25
    y = Math.floor(y/50) * 50 +25

    color=inputColor.value;

    var newShape = {
        x: x,
        y: y,
        radius: 25,
        color: color,
        name: "",
        isSelected:true
    }
    selectShape(newShape);

    editShape=newShape
    shapes.push(newShape);
    allCircle()
}

function selectShape(shape) {
    for (let index = 0; index < shapes.length; index++) {
        const element = shapes[index];
        element.isSelected=false;
        
    }
    shape.isSelected = true;
}

function isClickOnShape(x, y) {
    return shapes.some(shape => {
        return x >= shape.x -25 && x <= shape.x + 25 &&
        y >= shape.y-25&& y <= shape.y + 25;
    })
}

function getClickShapePosition(x, y) {
    return shapes.filter(shape => {
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
            selectShape(shape)
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

    // 丸の移動座標を計算する
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    x = Math.floor(x/50) * 50 +25
    y = Math.floor(y/50) * 50 +25

    // 既存の丸があったとき元の位置
    // if(shapes[dragIndex].X==x;

    // 丸の座標を変更する
    shapes[dragIndex].x = x;
    shapes[dragIndex].y = y;

    // 画面を再描写する
    allCircle();
    console.log("mouseup")
    isDragging = false;
    dragIndex = null;
}

function onContextClick(){
    console.log("context")
}

function rightClick(e){

    inputName.style.visibility="hidden";
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    if (isClickOnShape(x, y)){
        var ShapeObject = getClickShapePosition(x,y)[0];
        editShape=ShapeObject
        // x = Math.floor(x/50) * 50 +25
        // y = Math.floor(y/50) * 50 +25
        console.log(ShapeObject)
        x=ShapeObject.x;//menu.clientWidth/2;
        y=ShapeObject.y 
        // menu.style.position="absolute";
        
        console.log(x);
        if (x<-70){
            x=x+80;
        }else if(x<-50){
            x=x+40
        }
        menu.style.left= x + "px";
        menu.style.top= y + "px";
        menu.style.display="block";

        if (editShape.name){
            inputName.value=editShape.name;
        } else {
            inputName.value="";
        }
    } 
}

function removeGeometry(){
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    shapes.splice(x,y);
    allCircle()

}

Grid();

