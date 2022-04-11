// DiaryItem.js
import React from "react";

const DiaryItem = ({ author, content, emotion, crt_date, id }) => {
  // props => author, content, emotion, created_date, id
  return (
    <div className="diaryItem" key={id}>
      <div className="info">
        <div className="info-main">
          <span>작성자 : {author}</span>
          <spoan>감정 : {emotion}</spoan>
        </div>
        <div className="content">{content}</div>
      </div>
      <span className="date">{new Date(crt_date).toLocaleString()}</span>
    </div>
  );
};

export default DiaryItem;
