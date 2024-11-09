
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDragging = false;
let shape = { x: 50, y: 50, width: 100, height: 100 };
let shapes=[];
let dragIndex=null;
function DrawCircle(x,y,r,c){
    ctx.fillStyle=c;
   
    ctx.beginPath();
    ctx.arc(x, y,r, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
}

function allCircle(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);

function onMouseClick(e){
    var rect=e.target.getBoundingClientRect();
    var x=e.clientX-rect.left;
    var y=e.clientY-rect.top;

    if (isClickOnShape(x,y)) return;

    var newShape={
        x:x,
        y:y,
        radius:10,
        color:"white"
    }
    shapes.push(newShape);
    allCircle()
}

function isClickOnShape(x,y){
    return shapes.some(shape=>{
        const dist=Math.sqrt((x-shape.x)**2+(y-shape.y)**2);
        return dist<=shape.radius;
    })
}




function onMouseDown(e) { 
    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;
  
  for (let i=shape.length-1; i>=0; i--){
    const shape=shapes[i];
    const dist=Math.sqrt((x-shape.x)**2+(y-shape.y)**2);
    if(dist<=shape.radius) {
        isDragging=true;
        dragIndex=i;
        break;
    }
  }
 }

 function onMouseMove(e) {
    if (!isDragging  || dragIndex ===null) return;
    var rect=e.target.getBoundingClientRect();
    var x=e.clientX-rect.left;
    var y=e.clientY-rect.top;

    shapes
    
  }

  function onMouseUp(e) {
    isDragging = false;
  }

 
  
  