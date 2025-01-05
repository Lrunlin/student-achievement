function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const WorkerID = Math.min(
  process.env.NODE_APP_INSTANCE ? +process.env.NODE_APP_INSTANCE : random(0, 9),
  9
);

const BaseTime = +new Date("2024-12-01");

let lastTimeTick;

let lastRandomNumberTick = random(1, 3);

function id() {
  let timestamp = +new Date() - BaseTime;
  lastRandomNumberTick = timestamp == lastTimeTick ? ++lastRandomNumberTick : random(0, 3);
  lastTimeTick = timestamp;

  return +`${timestamp}${WorkerID}${lastRandomNumberTick}`;
}


module.exports = id;

