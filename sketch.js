const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

let engine;
let ball;
let box;
let floor;
let mouse;
let mouseConstraint;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  // 새로운 엔진 객체 생성
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
  Composite.add(engine.world, mouseConstraint);

  // 원형 바디 생성
  ball = Bodies.circle(width / 2, height / 2, 50, {
    restitution: 0.8,
    //frictionAir: 0.2,
  });
  box = Bodies.rectangle(150, height / 2, 50, 50, {
    restitution: 0.8,
    // frictionAir: 0.2,
  });
  floor = Bodies.rectangle(width / 2, height - 40, width, 20, {
    isStatic: true,
  });
  // 바디 속성
  Body.setAngularVelocity(box, 0.2);

  // 바디를 world에 더하기
  Composite.add(engine.world, [ball, floor, box]);
  print(Matter);
}

function draw() {
  /////////////////// Matter
  Engine.update(engine);

  ////////////////// p5
  background(255);
  //print(ball.position.y);
  // ball
  fill("#10c1c1ff");
  noStroke();
  circle(ball.position.x, ball.position.y, 100);
  // box
  let boxPos = box.position;
  let boxAngle = box.angle;
  //rect(boxPos.x, boxPos.y, 50, 50);
  // 박스 회전하기
  push();
  translate(boxPos.x, boxPos.y);
  rotate(boxAngle);
  fill("#e9bd0bff");
  noStroke();
  rect(0, 0, 50, 50);
  pop();

  // floor
  fill(0);
  rect(width / 2, height - 40, width, 20);
}
