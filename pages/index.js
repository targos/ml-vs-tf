import { useState } from 'react';
import Head from 'next/head';

import execute from '../src/browser';

export default () => {
  const [executing, setExecuting] = useState(false);
  const [results, setResults] = useState(null);
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
        <h2 className="mb-4">Multiplying two matrices 200x300 and 300x200</h2>
        <button
          className="border p-2"
          type="button"
          disabled={executing}
          onClick={() => {
            setExecuting(true);
            setTimeout(() => {
              execute(setResults);
              setExecuting(false);
            }, 10);
          }}
        >
          Execute
        </button>
        {results && <Results value={results} />}
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
