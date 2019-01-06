import { useState } from 'react';
import Head from 'next/head';

import { createMatrices, execute } from '../src/browser';

export default () => {
  const [rows, setRows] = useState(10000);
  const [cols, setCols] = useState(15000);
  const [data, setData] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState(null);

  const handleChangeCols = (e) => {
    setCols(Number(e.target.value));
  };
  const handleChangeRows = (e) => {
    setRows(Number(e.target.value));
  };

  let action;
  let resultDiv;
  if (!data || data.cols !== cols || data.rows !== rows) {
    resultDiv = null;
    action = (
      <button
        type="button"
        className="border p-2"
        onClick={() => {
          setData(createMatrices(cols, rows));
        }}
      >
        Create matrices
      </button>
    );
  } else {
    resultDiv = executing
      ? 'Executing...'
      : result && <Results value={result} />;
    action = (
      <button
        className="border p-2"
        type="button"
        disabled={executing}
        onClick={() => {
          setExecuting(true);
          setResult(null);
          setTimeout(() => {
            setResult(execute(data));
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
          <label htmlFor="cols" className="mr-4">
            Columns
          </label>
          <input
            className="border rounded p-2"
            type="number"
            value={cols}
            id="cols"
            onChange={handleChangeCols}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="rows" className="mr-4">
            Rows
          </label>
          <input
            className="border rounded p-2"
            type="number"
            value={rows}
            id="rows"
            onChange={handleChangeRows}
          />
        </div>
        {action}
        {resultDiv}
      </div>
    </>
  );
};

function Results(props) {
  return (
    <ul>
      <li>Computation took {Math.round(props.value) / 1000}s</li>
    </ul>
  );
}
