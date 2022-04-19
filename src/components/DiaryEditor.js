// DiaryEditor.js
import React, { useState, useRef, useContext } from "react";
// icons
import { AiTwotoneSnippets } from "react-icons/ai";
// url
import { DiaryDispatchContext } from "../App";

const DiaryEditor = () => {
  // useContext => 상태관리[비구조 할당]
  const { onCreate } = useContext(DiaryDispatchContext);
  // common state
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });
  // useRef
  const authorInput = useRef();
  const contentInput = useRef();
  // event handler => value
  const changeStateHandler = (e) => {
    // state
    setState({
      // ...state => 스프레이드 연산자!
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
      contentInput.current.focus();
      return;
    }
    // create author, content, emotion data
    onCreate(state.author, state.content, state.emotion);
    // successful msg
    alert("저장 성공!");
    // statae data => successful and next action => refresh data
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };
  return (
    <div className="diaryEditor">
      <h2>
        <AiTwotoneSnippets
          fontSize={24}
          style={{ color: "#CC70EF", marginRight: "10px" }}
        />
        Today's Diary
      </h2>
      <div>
        <input
          type="text"
          name="author"
          value={state.author}
          onChange={changeStateHandler}
          ref={authorInput}
          placeholder="Please author at least one letter..."
          maxLength="50"
        />
        <div>
          <textarea
            name="content"
            value={state.content}
            onChange={changeStateHandler}
            ref={contentInput}
            placeholder="Please write at least 5 letters..."
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

export default React.memo(DiaryEditor);
