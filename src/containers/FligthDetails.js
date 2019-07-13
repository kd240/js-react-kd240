import React from 'react';
import { Header } from './Header';

export function FligthDetails({ 
  match: {
    params: {
      id,
    },
  },
}) {
  return (
    <div className="wrapper">
      <Header />
    </div>
  );
}
