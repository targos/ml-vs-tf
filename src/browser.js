'use strict';

import { Matrix } from 'ml-matrix';
import * as tf from '@tensorflow/tfjs-core';

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
for (var i = 0; i < 10; i++) {
  getTResult();
  getMResult();
}

export default function execute(setResults) {
  const result = {};
  // timing t
  const startT = performance.now();
  for (var i = 0; i < 100; i++) {
    getTResult();
  }
  result.t = performance.now() - startT;

  // timing m
  const startM = performance.now();
  for (var i = 0; i < 100; i++) {
    getMResult();
  }
  result.m = performance.now() - startM;
  setResults(result);
}
