const tabela = document.querySelector('#pixel-board');
let getInput = document.querySelector('#board-size');
let getButton = document.querySelector('#generate-board');


function pixelTable(linha, boardSize) {
    for(let i = 0; i < boardSize; i += 1){
        const quadrado = document.createElement('div');
        quadrado.className = 'pixel';
        linha.appendChild(quadrado);

    }

}

function fiveTimesLine(boardSize) {
    for(let i = 0; i < boardSize; i += 1) {
        const linha = document.createElement('div');
        linha.className = 'LinesPixel';
        pixelTable(linha, boardSize);
        tabela.appendChild(linha);

    }
}
fiveTimesLine(5)

let getPalet1 = document.querySelector('#color-palette')


function selecPalet(evento) {
    let getAllPalet = document.querySelector('.selected')
    getAllPalet.className = 'color'
    evento.target.className = 'color selected'

}

getPalet1.addEventListener('click', selecPalet)


let allPixel = document.querySelector('#pixel-board')

function changeBlocks(eventoOne) {
    let getColorSelected = document.querySelector('.color.selected')
    let getColorStyle = getColorSelected.style.backgroundColor;
    eventoOne.target.style.backgroundColor = getColorStyle;

}
allPixel.addEventListener('click', changeBlocks)
allPixel.addEventListener('dragenter', changeBlocks)
allPixel.addEventListener('touchmove', changeBlocks)

let acessClearButton = document.querySelector('#clear-board');


function buttonClear() {
    let getNewAccess = document.querySelectorAll('.pixel');
    for(let i = 0;  i < getNewAccess.length; i += 1) {
        getNewAccess[i].style.backgroundColor = 'white'
    }
}

acessClearButton.addEventListener('click', buttonClear);



function alerta() {
  if(getInput.value === '') {
     alert('Board inválido!');
  }if(getInput.value < 5){
    getInput.value = 5;
    tabela.innerHTML = '';
    fiveTimesLine(getInput.value);
  }if(getInput.value > 50) {
    getInput.value = 50;
    tabela.innerHTML = '';
    fiveTimesLine(getInput.value);
  }
  tabela.innerHTML = '';
  fiveTimesLine(getInput.value);
}


getButton.addEventListener('click', alerta);


function creatNewColors() {
  let red = Math.ceil(Math.random() * 255)
  let green = Math.ceil(Math.random() * 255)
  let blue = Math.ceil(Math.random() * 255)

  return `rgb(${red}, ${green}, ${blue})`

}
console.log(creatNewColors());

function creatPallet() {
  for(i = 0; i <= 10; i += 1 ) {
     let div = document.createElement('div');

    if(i === 0){
      div.style.backgroundColor = 'black';
      div.classList.add('selected')
    }else{
      div.style.backgroundColor = creatNewColors()
    }

    div.classList.add('color')

    getPalet1.appendChild(div);
  }
}
creatPallet();

(function() {

  var Base, Particle, canvas, colors, context, draw, drawables, i, mouseX, mouseY, mouseVX, mouseVY, rand, update, click, min, max, colors, particles;

  min = 1;
  max = 8;
  particles = 200;
  colors = ["64, 32, 0", "250, 64, 0", "64, 0, 0", "200, 200, 200"];

  rand = function(a, b) {
    return Math.random() * (b - a) + a;
  };

  Particle = (function() {
    function Particle() {
      this.reset();
    }

    Particle.prototype.reset = function() {
      this.color = colors[~~(Math.random()*colors.length)];
      this.radius = rand(min, max);
      this.x = rand(0, canvas.width);
      this.y = rand(-20, canvas.height*0.5);
      this.vx = -5 + Math.random()*10;
      this.vy = 0.7 * this.radius;
      this.valpha = rand(0.02, 0.09);
      this.opacity = 0;
      this.life = 0;
      this.onupdate = undefined;
      this.type = "dust";
    };

    Particle.prototype.update = function() {
      this.x = (this.x + this.vx/3);
      this.y = (this.y + this.vy/3);

      if(this.opacity >=1 && this.valpha > 0) this.valpha *=-1;
      this.opacity += this.valpha/3;
      this.life += this.valpha/3;

      if(this.type === "dust")
        this.opacity = Math.min(1, Math.max(0, this.opacity));
      else
        this.opacity = 1;

      if(this.onupdate) this.onupdate();
      if(this.life < 0 || this.radius <= 0 || this.y > canvas.height){
        this.onupdate = undefined;
        this.reset();
      }
    };

    Particle.prototype.draw = function(c) {
      c.strokeStyle = "rgba(" + this.color + ", " + Math.min(this.opacity, 0.85) + ")";
      c.fillStyle = "rgba(" + this.color + ", " + Math.min(this.opacity, 0.65) + ")";
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
      c.fill();
      c.stroke();
    };

    return Particle;

  })();

  mouseVX = mouseVY = mouseX = mouseY = 0;

  canvas = document.getElementById("bg");
  context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  drawables = (function() {
    var _i, _results;
    _results = [];
    for (i = _i = 1; _i <= particles; i = ++_i) {
      _results.push(new Particle);
    }
    return _results;
  })();

  draw = function() {
    var d, _i, _len;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.clearRect(0, 0, canvas.width, canvas.height)

    for (_i = 0, _len = drawables.length; _i < _len; _i++) {
      d = drawables[_i];
      d.draw(context);
    }
  };

  update = function() {
    var d, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = drawables.length; _i < _len; _i++) {
      d = drawables[_i];
      _results.push(d.update());
    }
    return _results;
  };

  document.onmousemove = function(e) {
    mouseVX = mouseX;
    mouseVY = mouseY;
    mouseX = ~~e.pageX;
    mouseY = ~~e.pageY;
    mouseVX = ~~((mouseVX - mouseX)/2);
    mouseVY = ~~((mouseVY - mouseY)/2);

  };

  window.addEventListener('resize', draw, false);
  setInterval(draw, 1000 / 30);
  setInterval(update, 1000 / 60);
}).call(this);