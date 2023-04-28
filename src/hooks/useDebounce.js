import React, { useEffect, useState } from 'react'

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  // Hook 함수는 어느 시점에 끼어들어 실행되는 함수.
  useEffect(() => { // 입력될 때까지 0.5초를 기다렸다가 함수 실행. handler 내용이 끝나면 return문으로 clearTimeout 시켜 끝내고 다시 setTimeout 실행되게 함. 이후 아무것도 입력이 안 되면 한꺼번에 debounceValue에 입력한 값을 저장한 뒤 searchTerm으로 저장시킴.
    const handler = setTimeout(() => {
      setDebounceValue(value); 
    }, delay);

    return () => {// 더이상 실행 안 될 때 return문을 실행. 업데이트 직전에 실행됨. 업데이트가 되면 handler 실행됨.
      clearTimeout(handler);
    }

  },[value, delay]); // state값이 있으므로 componentDidUpdate 역할을 함.

  return debounceValue; // 바뀐 debounceValue 값을 내보낸다.
}

export default useDebounce
