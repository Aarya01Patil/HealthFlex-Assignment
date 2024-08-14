import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/commentsSlice';

const CommentForm = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && text.trim()) {
      dispatch(addComment({ name, text }));
      setName('');
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Comment"
        required
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CommentForm;