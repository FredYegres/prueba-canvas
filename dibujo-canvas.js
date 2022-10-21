const d = document.getElementById("canvas");
const canvas = d.getContext("2d");
document.addEventListener("mousemove", dibujar);
document.addEventListener("mousedown", empezarDibujo);
var trash = document.getElementById("trash");
trash.addEventListener("click" , borrarTodo);


function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal, lienzo) {
    let diametro = document.getElementById("diametro").value;
    let tipoLinea = {
        CUADRADA: document.getElementById("square").checked,
        CIRCULAR: document.getElementById("circle").checked
    }
    if (tipoLinea.CUADRADA == true) {
        lienzo.lineCap = "square";
    }
    else if (tipoLinea.CIRCULAR == true) {
        lienzo.lineCap = "round";
    }
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.lineWidth = diametro;
    lienzo.lineHeight = diametro;
    lienzo.moveTo(xinicial, yinicial);
    lienzo.lineTo(xfinal, yfinal);
    lienzo.stroke();
    lienzo.closePath();
}

function empezarDibujo(evento) {
    let colorcito = document.getElementById("color").value;
    if (evento.type == "mousedown" && evento.target.id == "canvas" && evento.button == 0) {
        dibujarLinea(colorcito, x, y, evento.offsetX, evento.offsetY, canvas);
    }
}

function dibujar(evento) {
    let colorcito = document.getElementById("color").value;
    let tipoTrazo = {
        LAPIZ: document.getElementById("pencil").checked,
        BORRADOR: document.getElementById("eraser").checked
    }
    if (tipoTrazo.LAPIZ == true) {
        canvas.globalCompositeOperation = "source-over";
    }
    else if (tipoTrazo.BORRADOR == true) {
        canvas.globalCompositeOperation = "destination-out";
    }
    if (evento.buttons == 1 && evento.target.id == "canvas") {
        dibujarLinea(colorcito, x, y, evento.offsetX, evento.offsetY, canvas);
    }
    x = evento.offsetX;
    y = evento.offsetY;   
}

function descargar(){
    let download = document.getElementById("download");
    let image = document.getElementById("canvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}

function borrarTodo() {
    canvas.clearRect(0, 0, d.width, d.height);
}