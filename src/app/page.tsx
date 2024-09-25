'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [joke, setJoke] = useState('');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 mt-8 max-w-lg">
        <h1 className="font-semibold tracking-tight text-5xl md:text-[5rem]">
          your mom <br /> <span className="text-orange-500 text-2xl">AI joke generator</span>
        </h1>
        <h2 className="text-xl text-slate-500 md:max-w-lg xl:max-w-xl text-center">
          hi i am a joke generator that gives really bad jokes back.
        </h2>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const response = await fetch('http://localhost:3001/generate?q=' + input);
            const data = await response.text();
            setJoke(data);
            setInput("")
          }}
          className="max-w-lg w-full flex flex-col items-center"
        >
          <input
            placeholder="your input"
            className="w-full h-12 border-2 border-slate-400/50 rounded-lg px-6 py-2"
            alt="link input box"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="px-6 py-4 flex text-center justify-center mt-8 bg-orange-500 font-semibold rounded-lg text-white hover:bg-orange-700 ease-in-out duration-150"
            type="submit"
          >
            make me laugh ✨
          </button>
        </form>
        {joke && <p>{joke}</p>}
      </div>
    </main>
  );
}