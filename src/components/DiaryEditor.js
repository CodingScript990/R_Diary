import React, { useState } from "react";

const DiaryEditor = () => {
  // common state
  const [state, setState] = useState({
    author: "",
    content: "",
    // ...state => 스프레이드 연산자!
    emotion: 1,
  });
  // event handler => value
  const changeStateHandler = (e) => {
    // state
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  // handleSubmit
  const handleSubmit = () => {
    console.log(state);
    alert("Successful Diary Save!");
  };
  return (
    <div className="diaryEditor">
      <h2>Today's Diary</h2>
      <div>
        <input
          type="text"
          name="author"
          value={state.author}
          onChange={changeStateHandler}
          placeholder="Author..."
          maxLength="50"
        />
        <div>
          <textarea
            name="content"
            value={state.content}
            onChange={changeStateHandler}
            placeholder="content..."
            maxLength="1000"
          />
        </div>
        <div>
          <select
            name="emotion"
            value={state.emotion}
            onChange={changeStateHandler}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default DiaryEditor;
