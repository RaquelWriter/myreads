import { useState, useEffect } from 'react';

function useDebounce(val, delay = 500) {
  const [debouncedVal, setDebouncedVal] = useState(val);
  useEffect(() => {
    const countdown = setTimeout(() => 
    {
      setDebouncedVal(val);
    }, delay);
    return (
      () => {
        clearTimeout(countdown);
      })
    }, [val, delay])

    return debouncedVal;
}

export default useDebounce;
