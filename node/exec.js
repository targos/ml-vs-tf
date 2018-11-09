'use strict';

const { Matrix } = require('ml-matrix');
const tf = require('@tensorflow/tfjs-core');

module.exports = function exec() {
const m1 = Matrix.random(200, 300);
const m2 = Matrix.random(300, 200);

const ma1 = m1.to2DArray();
const ma2 = m2.to2DArray();

const t1 = tf.tensor(ma1);
const t2 = tf.tensor(ma2);

function getTResult() {
  const tResult = t1.matMul(t2);
  return tResult;
}

function getMResult() {
  const mResult = m1.mmul(m2);
  return mResult;
}

// warmup
for (var i = 0; i < 100; i++) {
  getTResult();
  getMResult();
}

// timing t
console.time('tensorflow');
for (var i = 0; i < 1000; i++) {
  getTResult();
}
console.timeEnd('tensorflow');

// timing m
console.time('matrix');
for (var i = 0; i < 1000; i++) {
  getMResult();
}
console.timeEnd('matrix');

}