'use strict';

const tf = require('@tensorflow/tfjs-core');

const rows = 10000;
const cols = 20000;

const size = rows * cols;

module.exports = function exec() {
  const ma1 = new Float32Array(size);
  const ma2 = new Float32Array(size);

  for (let i = 0; i < size; i++) {
    ma1[i] = Math.random();
    ma2[i] = Math.random();
  }

  const t1 = tf.tensor2d(ma1, [cols, rows], 'float32');
  const t2 = tf.tensor(ma2, [rows, cols], 'float32');

  console.time('tensorflow');
  const result = t1.matMul(t2);
  console.timeEnd('tensorflow');
  console.log(result.shape);
};
