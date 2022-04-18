// OptimizeTest.js
import React, { useState } from "react";

// textView => setState data
// const TextView = React.memo(({ text }) => {
//   return <div>{text}</div>;
// });

// countView => setState data
// const CountView = ({ count }) => {
//   return <div>{count}</div>;
// };

// counter A
const CounterA = React.memo(({ count }) => {
  return <div>{count}</div>;
});

// counter B
const CounterB = React.memo(({ obj }) => {
  return <div>{obj.count}</div>;
});

// props 비교(React.memo)
const areEqual = (prevProps, nextProps) => {
  // return true; // before props === after props ? not rendering!
  // return false; // before props !== after props ? rendering!
  return prevProps.obj.count === nextProps.obj.count;
};

// check props state
const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  // count state
  const [count, setCount] = useState(1);
  // const [text, setText] = useState("");
  const [obj, setObj] = useState({
    count: 1,
  });
  return (
    <div style={{ padding: 50 }}>
      {/* 
        [useState, React.Memo => data 관리]
      <div>
        <h2>count</h2>
        <CountView count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <TextView text={text} />
      </div> */}
      <div>
        <h2>Counter A</h2>
        <button onClick={() => setCount(count)}>A Button</button>
        <CounterA count={count} />
      </div>
      <div>
        <h2>Counter B</h2>
        <button
          onclick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B Button
        </button>
        <MemoizedCounterB obj={obj} />
      </div>
    </div>
  );
};

export default OptimizeTest;
