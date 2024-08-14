import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComment, deleteComment, likeComment, dislikeComment } from '../redux/commentsSlice';
import ReplyForm from './ReplyForm';
import Reply from './Reply';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Comment = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editedText.trim()) {
      dispatch(editComment({ id: comment.id, text: editedText }));
      setIsEditing(false);
    }
  };

  return (
    <div className="comment">
      <h3>{comment.name}</h3>
      <p className="date">{new Date(comment.date).toLocaleString()}</p>
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <p>{comment.text}</p>
      )}
      <div className="comment-actions">
        {isEditing ? (
          <button onClick={handleEdit}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
        )}
        <button onClick={() => dispatch(deleteComment(comment.id))} className="delete-button">
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
        <button onClick={() => dispatch(likeComment(comment.id))}>
          <FontAwesomeIcon icon={faThumbsUp} /> {comment.likes}
        </button>
        <button onClick={() => dispatch(dislikeComment(comment.id))}>
          <FontAwesomeIcon icon={faThumbsDown} /> {comment.dislikes}
        </button>
      </div>
      <ReplyForm commentId={comment.id} />
      {comment.replies && comment.replies.map(reply => (
        <Reply key={reply.id} reply={reply} commentId={comment.id} parentName={comment.name} />
      ))}
    </div>
  );
};

export default Comment;