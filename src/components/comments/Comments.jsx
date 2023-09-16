import React, { useEffect, useState } from "react";
import "./_comments.scss";
import Comment from "../comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsOfVideoById,
} from "../../redux/actions/comments.action";

const Comments = ({ videoId, totalComments }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [videoId, dispatch]);

  const comments = useSelector((state) => state.commentList.comments);

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  ); //iske ander saare comments ka snippet aa jaega jiske ander sara detail about commentator pada hua hai.
  // console.log(typeof _comments);

  const [text, setText] = useState("");
  const handleComments = (e) => {
    e.preventDefault(); //so that my page do not refresh.

    if (text.length === 0) return;

    dispatch(addComment(videoId, text));
    setText("");
  };
  return (
    <div className="comments">
      <p>{totalComments}Comments</p>
      <div className="comments__form d-flex w-100 my-2">
        <img
          src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png"
          alt=""
          className="rounded-circle mx-3"
        />
        <form onSubmit={handleComments} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="border-9 p-2">Comment</button>
        </form>
      </div>

      <div className="comments__lists">
        {_comments?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
