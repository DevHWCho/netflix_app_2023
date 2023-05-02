import React, { useEffect } from 'react'

function useOnClickOutside(ref, handler) {// 사용자 정의 Hook 함수. 앞에 use 붙여야 함. 함수 재사용 하기 위해 만듦.
  useEffect(() => {
    // console.log('ref->', ref); // ref.current는 div.modal

    const listener = (event) => {
      if(!ref.current || ref.current.contains(event.target)){
        // 모달창이 안 닫히는 경우 - 모달창이 없거나, 모달창 안을 클릭했을 경우
        // console.log("event.target->",event.target)
        return; // 함수 종료
      }
      //모달창이 닫히는 경우 (event) => {setModalOpen(false)}
      handler(event);
    }
    document.addEventListener("mousedown",listener);
    document.addEventListener("touchstart",listener)
  },[ref, handler]); //ref, handler가 바뀔 때마다 다시 호출됨.
}

export default useOnClickOutside
