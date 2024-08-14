import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { loadComments } from '../redux/commentsSlice';

const CommentSection = () => {
  const comments = useSelector(state => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadComments());
  }, [dispatch]);

  return (
    <div className="comment-section">
      <h1>Comments</h1>
      <CommentForm />
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentSection;