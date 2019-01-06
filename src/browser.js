'use strict';

import * as tf from '@tensorflow/tfjs-core';

export function createMatrices(cols, rows) {
  const size = rows * cols;

  const ma1 = new Float32Array(size);
  const ma2 = new Float32Array(size);

  for (let i = 0; i < size; i++) {
    ma1[i] = Math.random();
    ma2[i] = Math.random();
  }

  const t1 = tf.tensor2d(ma1, [cols, rows], 'float32');
  const t2 = tf.tensor(ma2, [rows, cols], 'float32');

  return {
    cols,
    rows,
    t1,
    t2
  };
}

export function execute(data) {
  const { t1, t2 } = data;

  const start = performance.now();
  const result = t1.matMul(t2);
  return performance.now() - start;
}
