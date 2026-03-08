'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

export default function App() {
  const searchParams = useSearchParams();

  const rawName = searchParams.get('name') || 'Jack';
  const rawGender = searchParams.get('gender') || '';
  const genderUpper = rawGender.toUpperCase();
  const gender = ['BOY', 'MALE', 'M'].includes(genderUpper)
    ? 'boy'
    : ['GIRL', 'G', 'FEMALE', 'F'].includes(genderUpper)
    ? 'girl'
    : 'boy';

  const [keystrokeCount, setKeystrokeCount] = useState(1);
  const [fragContainer, setFragContainer] = useState<React.ReactNode[]>([]);
  const [partialFrag, setPartialFrag] = useState('');
  const [cursorVisibility, setCursorVisibility] = useState<'visible' | 'hidden'>('visible');

  const fragment = `All work and no play makes ${rawName} a dull ${gender}`;

  const getFullFragCount = useCallback(
    () => Math.floor(keystrokeCount / fragment.length),
    [fragment.length, keystrokeCount]
  );

  const getPartialFrag = useCallback(() => {
    const remainder = keystrokeCount % fragment.length;
    return fragment.substring(0, remainder);
  }, [fragment, keystrokeCount]);

  const getFragContainer = useCallback(() => {
    const frags: React.ReactNode[] = [];
    for (let i = 0; i < getFullFragCount(); i++) {
      frags.push(<p key={i}>{fragment}</p>);
    }
    return frags;
  }, [fragment, getFullFragCount]);

  const onUp = useCallback(() => {
    setKeystrokeCount((prev) => prev + 1);
    setFragContainer(getFragContainer());
    setPartialFrag(getPartialFrag());
  }, [getFragContainer, getPartialFrag]);

  const toggleCursorVisibility = useCallback(() => {
    setCursorVisibility((prev) => (prev === 'hidden' ? 'visible' : 'hidden'));
  }, []);

  useEffect(() => {
    const interval = setInterval(toggleCursorVisibility, 500);
    return () => clearInterval(interval);
  }, [toggleCursorVisibility]);

  useEffect(() => {
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keyup', onUp);
    };
  }, [onUp]);

  const cursorStyle = {
    marginTop: '.45em',
    fontSize: '1.5em',
    visibility: cursorVisibility as 'visible' | 'hidden',
  };

  return (
    <div className="App">
      <div className="frag-container">
        {fragContainer}
        <div className="partial-frag">
          <p>{partialFrag}</p>
          <p style={cursorStyle}>|</p>
        </div>
      </div>
    </div>
  );
}
