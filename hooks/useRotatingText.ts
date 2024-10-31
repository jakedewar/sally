import { useState, useEffect } from 'react';

export function useRotatingText(words: string[], interval: number = 2000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 500); // Half of the transition duration
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  return { currentWord: words[currentIndex], isAnimating };
} 