const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

let engine, canvas, mouse, mouseConstraint;
let bubble;
let bubbles = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  engine = Engine.create();
  // 마우스 생성
  mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      angularStiffness: 0.1,
    },
  });
  // 벽
  let margin = 40;
  Composite.add(engine.world, [
    Bodies.rectangle(margin, height / 2, margin, height, { isStatic: true }),
    Bodies.rectangle(width - margin, height / 2, margin, height, {
      isStatic: true,
    }),
    Bodies.rectangle(width / 2, margin, width, margin, { isStatic: true }),
    Bodies.rectangle(width / 2, height - margin, width, margin, {
      isStatic: true,
    }),
  ]);

  Composite.add(engine.world, mouseConstraint);
  bubbles.push(new Bubble(random(width), random(height), 20));
  // bubble = new Bubble(200, 200, 50);
}

function draw() {
  Engine.update(engine);
  background(0);
  // bubble.display();
  for (let b of bubbles) {
    b.display();
  }
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY, random(5, 20)));
}
