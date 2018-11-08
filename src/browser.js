'use strict';

import { Matrix } from 'ml-matrix';
import * as tf from '@tensorflow/tfjs-core';

export function createMatrices(width, height) {
  const m1 = Matrix.random(width, height);
  const m2 = Matrix.random(height, width);

  const ma1 = m1.to2DArray();
  const ma2 = m2.to2DArray();

  const t1 = tf.tensor(ma1);
  const t2 = tf.tensor(ma2);

  return {
    width,
    height,
    m1,
    m2,
    t1,
    t2
  };
}

export function execute(data, iterations) {
  const { m1, m2, t1, t2 } = data;
  function getTResult() {
    const tResult = t1.matMul(t2);
    return tResult;
  }

  function getMResult() {
    const mResult = m1.mmul(m2);
    return mResult;
  }

  const result = {};
  // timing t
  const startT = performance.now();
  for (var i = 0; i < iterations; i++) {
    getTResult();
  }
  result.t = performance.now() - startT;

  // timing m
  const startM = performance.now();
  for (var i = 0; i < iterations; i++) {
    getMResult();
  }
  result.m = performance.now() - startM;
  return result;
}
