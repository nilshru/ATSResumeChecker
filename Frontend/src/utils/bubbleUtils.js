
export function generateBubbles(count = 20) {
  return Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * 30 + 10; // 10px to 30px
    const left = Math.random() * 100; // percentage
    const delay = Math.random() * 9; // seconds
    const duration = Math.random() * 5 + 5; // seconds

    return {
      id: i,
      size,
      left,
      delay,
      duration,
    };
  });
} 
