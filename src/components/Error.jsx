import { Children } from 'react';

export default function ErrorComp({ children }) {
  return (
    <p className="text-center my-4 bg-red-500 text-white font-bold p-3 uppercase text-sm">
      {children}
    </p>
  );
}

