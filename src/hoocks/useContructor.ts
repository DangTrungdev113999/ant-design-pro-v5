import { useRef } from 'react';

type ContructorCallback = () => void;

const useConstructor = (callback: ContructorCallback): void => {
  const isRun = useRef(false);

  if (isRun.current === false) {
    callback();
    isRun.current = true;
  }
};

export default useConstructor;
