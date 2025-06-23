// src/hooks/useMounted.ts
import { useState, useEffect } from 'react';

/**
 * A custom hook that returns `true` only after the component has mounted on the client side.
 * This is used to prevent hydration mismatch errors by delaying the rendering of
 * client-only UI until after the initial server render has been hydrated.
 */
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This effect runs only once on the client, after the initial render.
    setMounted(true);
  }, []);

  return mounted;
};
