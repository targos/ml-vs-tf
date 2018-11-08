import { useState } from 'react';
import Head from 'next/head';

import { createMatrices, execute } from '../src/browser';

export default () => {
  const [iterations, setIterations] = useState(100);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(300);
  const [data, setData] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [results, setResults] = useState(null);

  const handleChangeIterations = (e) => {
    setIterations(Number(e.target.value));
  };
  const handleChangeWidth = (e) => {
    setWidth(Number(e.target.value));
  };
  const handleChangeHeight = (e) => {
    setHeight(Number(e.target.value));
  };

  let action;
  let result;
  if (!data || data.width !== width || data.height !== height) {
    result = null;
    action = (
      <button
        type="button"
        className="border p-2"
        onClick={() => {
          setData(createMatrices(width, height));
        }}
      >
        Create matrices
      </button>
    );
  } else {
    result = executing
      ? 'Executing...'
      : results && <Results value={results} />;
    action = (
      <button
        className="border p-2"
        type="button"
        disabled={executing}
        onClick={() => {
          setExecuting(true);
          setResults(null);
          setTimeout(() => {
            setResults(execute(data, iterations));
            setExecuting(false);
          }, 100);
        }}
      >
        Execute
      </button>
    );
  }

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container m-auto p-10">
        <h1 className="mb-6">Demo of ml.js vs TensorFlow.js</h1>
        <h2 className="mb-4">Multiplying two matrices</h2>
        <div className="mb-2">
          <label htmlFor="width" className="mr-4">
            Width
          </label>
          <input
            className="border rounded p-2"
            type="number"
            value={width}
            id="width"
            onChange={handleChangeWidth}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="height" className="mr-4">
            Height
          </label>
          <input
            className="border rounded p-2"
            type="number"
            value={height}
            id="height"
            onChange={handleChangeHeight}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="iterations" className="mr-4">
            Iterations
          </label>
          <input
            className="border rounded p-2"
            type="number"
            value={iterations}
            id="iterations"
            onChange={handleChangeIterations}
          />
        </div>
        {action}
        {result}
      </div>
    </>
  );
};

function Results(props) {
  return (
    <ul>
      <li>TensorFlow took {Math.round(props.value.t) / 1000}s</li>
      <li>ml.js took {Math.round(props.value.m) / 1000}s</li>
    </ul>
  );
}
