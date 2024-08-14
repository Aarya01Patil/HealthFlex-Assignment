import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReply, deleteReply, likeReply, dislikeReply, addReply } from '../redux/commentsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEdit, faTrash, faReply } from '@fortawesome/free-solid-svg-icons';
import ReplyForm from './ReplyForm';

const Reply = ({ reply, commentId, parentName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(reply.text);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editedText.trim()) {
      dispatch(editReply({ commentId, replyId: reply.id, text: editedText }));
      setIsEditing(false);
    }
  };

  return (
    <div className="reply">
      <h4>{reply.name} replied to {parentName}</h4>
      <p className="date">{new Date(reply.date).toLocaleString()}</p>
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <p>{reply.text}</p>
      )}
      <div className="reply-actions">
        {isEditing ? (
          <button onClick={handleEdit}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
        )}
        <button onClick={() => dispatch(deleteReply({ commentId, replyId: reply.id }))} className="delete-button">
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
        <button onClick={() => dispatch(likeReply({ commentId, replyId: reply.id }))}>
          <FontAwesomeIcon icon={faThumbsUp} /> {reply.likes}
        </button>
        <button onClick={() => dispatch(dislikeReply({ commentId, replyId: reply.id }))}>
          <FontAwesomeIcon icon={faThumbsDown} /> {reply.dislikes}
        </button>
        <button onClick={() => setShowReplyForm(!showReplyForm)}>
          <FontAwesomeIcon icon={faReply} /> Reply
        </button>
      </div>
      {showReplyForm && (
        <ReplyForm commentId={commentId} parentReplyId={reply.id} parentName={reply.name} />
      )}
      {reply.replies && reply.replies.map(nestedReply => (
        <Reply key={nestedReply.id} reply={nestedReply} commentId={commentId} parentName={reply.name} />
      ))}
    </div>
  );
};

export default Reply;