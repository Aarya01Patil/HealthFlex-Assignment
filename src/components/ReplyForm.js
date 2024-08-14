import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReply } from '../redux/commentsSlice';

const ReplyForm = ({ commentId, parentReplyId, parentName }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && text.trim()) {
      dispatch(addReply({ commentId, parentReplyId, name, text }));
      setName('');
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
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
        placeholder={`Reply `}
        required
      />
      <button type="submit">Post Reply</button>
    </form>
  );
};

export default ReplyForm;