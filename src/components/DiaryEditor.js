// DiaryEditor.js
import React, { useState, useRef } from "react";

const DiaryEditor = () => {
  // useRef
  const authorInput = useRef();
  const contentInput = useRef();
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
    // not write author? author < 1
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }
    // not write content? content < 5
    if (state.content.length < 5) {
      alert("일기 작성은 최소 5글자 이상 입력해주세요...");
      contentInput.current.focus();
      return;
    }
    alert("저장 성공!");
  };
  return (
    <div className="diaryEditor">
      <h2>Today's Diary</h2>
      <div>
        <input
          type="text"
          name="author"
          id="author"
          value={state.author}
          onChange={changeStateHandler}
          ref={authorInput}
          placeholder="Author..."
          maxLength="50"
        />
        <div>
          <textarea
            name="content"
            value={state.content}
            onChange={changeStateHandler}
            ref={contentInput}
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
