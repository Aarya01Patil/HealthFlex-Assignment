import React, { useState } from 'react';
import Comment from './Comment';

const CommentList = ({ comments }) => {
  const [sortOrder, setSortOrder] = useState('desc');

  const sortedComments = [...comments].sort((a, b) => {
    return sortOrder === 'desc'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="comment-list">
      <button onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')} className="sort-button">
        Sort by Date and Time {sortOrder === 'desc' ? '↓' : '↑'}
      </button>
      {sortedComments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;