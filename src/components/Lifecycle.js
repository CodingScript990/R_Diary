// Lifecycle.js
import React, { useEffect, useState } from "react";

// UnmountTest
const UnmountTest = () => {
  // 제어하는 단계
  useEffect(() => {
    console.log("Mount!");
    // Umount 시점에 실행되게 해야함
    return () => {
      console.log("Unmount!");
    };
  }, []);
  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  // state[count, text] => lifecycle
  /*const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  // useEffect
  // 1. 최초 한번만 실행될때
  useEffect(() => {
    console.log("Mount!");
  }, []);
  // 2. 실행 될때마다
  useEffect(() => {
    console.log("Update!");
  });
  // 3. 변화가 일어 날때마다
  useEffect(() => {
    console.log(`count is update : ${count}`);
    if (count > 5) {
      alert("count가 5를 넘었습니다. 따라서 1로 초기화 됩니다.");
      setCount(1);
    }
  }, [count]);
  useEffect(() => {
    console.log(`text is update : ${text}`);
  }, [text]);
  */
  // lifecycle => unMount
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default Lifecycle;
