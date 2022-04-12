// DiaryItem.js
import React, { useState, useRef } from "react";
// icons
import { AiFillDelete } from "react-icons/ai";
import { BsHammer, BsXLg } from "react-icons/bs";
import { BiMessageSquareEdit } from "react-icons/bi";

const DiaryItem = ({
  onEdit,
  onRemove,
  author,
  content,
  emotion,
  crt_date,
  id,
}) => {
  // props => author, content, emotion, created_date, id, onRemove
  // modify state => boolean type
  const [isEdit, setIsEdit] = useState(false);
  // modify toggle handler
  const toggleHandler = () => {
    // 이전의 Data를 수정작업을 해주므로써 Data Change!
    setIsEdit(!isEdit);
  };
  // modify data => content, data => change state
  const [localContent, setLocalContent] = useState(content);
  // localContent reference!
  const localContentInput = useRef();
  // Remove event handler
  const removeHandler = () => {
    // Question before deletion!
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠 습니까?`)) {
      onRemove(id);
    }
  };
  // Modify Cancel event handler
  const cancelHandler = () => {
    // change toggle type state
    setIsEdit(false);
    // change modify content data
    setLocalContent(content);
  };
  // Modify Save event handler[success active]
  const modifyHandler = () => {
    // if ~ else => localContent의 길이가 5글자 미만이면 return 해줘라!
    if (localContent.length < 5) {
      // 5미만일때? focus 해줘라!
      localContentInput.current.focus();
      // 그리고 마지막으로 반환해줘라!
      return;
    }
    // modify 하기전 question! client Yes or No! => save!
    if (window.confirm(`${id}번 째 일기를 수정 하시겠 습니까?`)) {
      // modify data[True]
      onEdit(id, localContent);
      // True이면 toggleIsEdit function이 False => True로 정상적으로 수정되게 해준다.
      toggleHandler();
    }
  };
  return (
    <div className="diaryItem" key={id}>
      <div className="info">
        <div className="info-main">
          <span>작성자 : {author}</span>
          <spoan>감정 : {emotion}</spoan>
        </div>
        <div className="content">
          {isEdit ? (
            <>
              <textarea
                ref={localContentInput}
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
              />
            </>
          ) : (
            <>{content}</>
          )}
        </div>
      </div>
      <div className="info-sub">
        {/* date */}
        <span className="date">{new Date(crt_date).toLocaleString()}</span>
        <div className="sub-icons">
          {isEdit ? (
            <>
              {/* modify cancel */}
              <BsXLg
                className="cancel-icon"
                title="취소"
                onClick={cancelHandler}
              />
              {/* modify save */}
              <BiMessageSquareEdit
                className="save-icon"
                title="저장"
                onClick={modifyHandler}
              />
            </>
          ) : (
            <>
              {/* remove */}
              <AiFillDelete
                className="delete-icon"
                title="삭제"
                onClick={removeHandler}
              />
              {/* modify */}
              <BsHammer
                className="modify-icon"
                title="수정"
                onClick={toggleHandler}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryItem;
