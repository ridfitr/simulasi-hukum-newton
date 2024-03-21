let tombol;
let besti;
let objek;
let jatuh = false;
let gravForce;
let windForce;

/*
Exercise: buatlah program seperti ini, dengan informasi 
nama dan nim pada posisi di antara Judul simulasi dan tombol.
*/

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  tombol = createButton('Run/Pause')
  tombol.position(30,120)
  tombol.style('background-color','white')
  
  objekPos = createVector(width/2,height/4);
  objekVel = createVector(-1,2);
  objekAcc = createVector(0,0);
  objekMass = 8;
  objek = new Mover(objekPos, objekVel, objekAcc, objekMass);
  
  gravForce = createVector(0, objek.mass*0.02);
  windForce = createVector(0.5,0);
}


function draw() {
  background("Yellow");
  nama = createElement('h4', 'Nama : Rida Fitriani')
  nama.position(40,50)
  nama.style('color','purple')
  nim = createElement('h4','NIM : 122160013')
  nim.position(40,70)
  nim.style('color','purple')
  judul = createElement('h1', 'Simulasi Hukum Newton')
  judul.position(30, 15)
  judul.style('color','brown')
  objek.display();
  
  var Cd = 0.0001;
  var diam1 = (2*objek.mass);
  var A1 = PI*diam1/2;
  var frictionForce = objek.velocity.copy();
  frictionForce.normalize()
  frictionForce.mult(-1* (frictionForce.mag()**2) *A1*Cd)

  
  objek.applyForce(gravForce);
  objek.applyForce(windForce);
  objek.applyForce(frictionForce);
  
  
  
  tombol.mousePressed(run);
  
  if (jatuh){
    objek.update();
  }
  
}

function sayHello() {
  besti = createElement('h2', 'Selamat datang ' + nama.value())
  besti.position(30, 150)
}

function run(){
  // objek.update();
  if (jatuh){
    jatuh = false;
  }
  else{
    jatuh = true
  }
}

class Mover {
  constructor(loc, vel, acc, m){
    this.location = loc;
    this.mass = m;
    this.velocity = vel;
    this.acceleration = acc;
  }
  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }
  display(){
    noStroke();
    fill('pink')
    ellipse(this.location.x, this.location.y, 2*this.mass, 2*this.mass);
    ellipse(this.location.x-10, this.location.y, 2*this.mass, 2*this.mass);
    ellipse(this.location.x+10, this.location.y, 2*this.mass, 2*this.mass);
    ellipse(this.location.x, this.location.y-10, 2*this.mass, 2*this.mass);
    ellipse(this.location.x, this.location.y+10, 2*this.mass, 2*this.mass);
    
  }  
  
  applyForce(force){
    force.div(this.mass)
    this.acceleration.add(force);
  }

}
