
let observerA;
let observerB;
let door1;
let door2;

function setup() {
  createCanvas(2000, 800);

  observerA = new Observer(100, 1200, 1);
  observerB = new Observer(300, 1200, 1);
  door1 = new Observer(1000, 760, 1);
  door2 = new Observer(1100, 760, 1);
  background(0);
}

function draw() {
  let c = 1;
  
  background(0);

  if (mouseIsPressed){ // CONTROLS ACCELERATION IN X-AXIS
    if (mouseButton === LEFT) {
     let accel = createVector(-100, 0);
     door1.applyForce(accel);
     door2.applyForce(accel);
    }
    if (mouseButton === RIGHT) {
     let stop = createVector(100, 0);
     door1.applyForce(stop);
     door2.applyForce(stop);
    }
  }

    // GRAVITY VECTOR
    let gravity = createVector(0, 0.8);
    let weightObsA = p5.Vector.mult(gravity, observerA.mass)
    let weightObsB = p5.Vector.mult(gravity, observerB.mass)
    observerA.applyForce(weightObsA);
    observerB.applyForce(weightObsB);

  //observerA.drag();
  //observerA.friction();
  observerA.update();
  observerA.ground();
  observerA.showLadder();
  setInterval(observerA.TimeDilation(), 1000);

  //observerB.drag();
  //observerB.friction();
  observerB.update();
  observerB.ground();
  observerB.showLadder();
  //setInterval(observerB.TimeDilation(), 1000);
  

  let cold1 = 0;
  let T = 0;
  door1.update();
  door1.ground();

      var seconds = 0;
      function incrementSeconds(){
           seconds += 1;
          }
          let velocity = door2.vel.copy();
          if (velocity.mag() >= 0.1){
        var t = setInterval(incrementSeconds(), 1000)
          }
        t = t*0.0083;
        function timeDilation(t){
         let velocity3 = door2.vel.copy();
         if (velocity3.mag() >= 0.1){
            let speedSq = door2.vel.magSq();
            T = t / (Math.sqrt(1 - (speedSq/(c**2))))
        }
        return T;
        }
        let dilT = timeDilation(t);
        console.log([t, dilT]);
        let C = 0;
        let D = 0;
        let E = 0;
        let F = 0;

        if(door1.pos.x < (door2.pos.x - observerB.pos.x)*(t/dilT)){
           cold1 = 255;
        }
        if(door1.pos.x > (door2.pos.x - observerB.pos.x)*(t/dilT)){
          cold1 = 0;
        }
        
  fill(255, cold1);
  door1.showDoor();

  let cold2 = 0;
  door2.update();
  door2.ground();
  if(door2.pos.x - observerB.pos.x - 10 < 10){
    cold2 = 255;
  }
  if(door2.pos.x - observerB.pos.x < -10){
    cold2 = 0;
  }
  fill(255, cold2);
  door2.showDoor();
  //setInterval(door2.TimeDilation(), 1000);

  /*  function LengthContraction(l){
    let velocity1 = door2.vel.copy();
        if(velocity1.mag() >= 0.1){
            let speedSq = door2.vel.magSq();
            let L = l * (Math.sqrt(Math.abs(1 - (speedSq/(c**2)))));
            console.log([l, L]);
            return L;
        }
      }

      let L = LengthContraction(100);
      console.log(L);
      
      let velocity1 = door2.vel.copy();
        if(velocity1.mag() >= 0.1){
      if (door2.pos.x - door1.pos.x >= L + 6){
        let Lcon = createVector(100, 0);
        door1.applyForce(Lcon);
      }
      if (door2.pos.x - door1.pos.x <= L + 6){
        let Lcon2 = createVector(-100, 0);
        door1.applyForce(Lcon2);
      }
    } */

    console.log(door2.pos.x - door1.pos.x);
    console.log(door2.vel.x);

    //OKAY SO MAIN CONCEPT OF SIMOULTANEITY WHATEVER:
      // Door in end will close right as the ladder exits, but as the information will be recieved by exit door, 
      // the entry door will receive it later due to time dilation. So the door in front should be 2x slower,
      // giving the ladder time to exit through the exit door before the entry one closes. 

      /* console.log(observerB.pos.x - observerA.pos.x);
      console.log("Units between end of barn and end of ladder:")
      console.log(door2.pos.x - observerB.pos.x);
      console.log("Units between end of barn and start of ladder:")
      console.log(door2.pos.x - observerA.pos.x); */

        let a = 0;
        let b = 0;
        if (observerA.pos.x > door1.pos.x){
          a = 1;
        }
        if (observerB.pos.x < door2.pos.x){
          b = 1;
        }
        if (a + b === 2){
          console.log("It fits!" + " " + L)
        }
        
      }

       /* stroke(255);
        strokeWeight(2);
            if (observerA.pos.x > door1.pos.x){
               col = 0;
              }
            if (observerB.pos.x > door2.pos.x){
              col = 255;
            }
        fill(255, col);
        rect(1150, 760, 10, 50); */ //DOORS OPENING AND CLOSING