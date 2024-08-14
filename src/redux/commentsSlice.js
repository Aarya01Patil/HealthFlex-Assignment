import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    loadComments: (state) => {
      const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
      return savedComments;
    },
    addComment: (state, action) => {
      const newComment = {
        id: Date.now(),
        ...action.payload,
        date: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        replies: [],
      };
      state.push(newComment);
      localStorage.setItem('comments', JSON.stringify(state));
    },
    editComment: (state, action) => {
      const { id, text } = action.payload;
      const comment = state.find(c => c.id === id);
      if (comment) {
        comment.text = text;
        localStorage.setItem('comments', JSON.stringify(state));
      }
    },
    deleteComment: (state, action) => {
      const newState = state.filter(c => c.id !== action.payload);
      localStorage.setItem('comments', JSON.stringify(newState));
      return newState;
    },
    addReply: (state, action) => {
        const { commentId, parentReplyId, name, text } = action.payload;
        const comment = state.find(c => c.id === commentId);
        if (comment) {
          const newReply = {
            id: Date.now(),
            name,
            text,
            date: new Date().toISOString(),
            likes: 0,
            dislikes: 0,
            replies: [],
          };
          if (parentReplyId) {
            const findAndAddReply = (replies) => {
              for (let reply of replies) {
                if (reply.id === parentReplyId) {
                  if (!reply.replies) reply.replies = [];
                  reply.replies.push(newReply);
                  return true;
                }
                if (reply.replies && findAndAddReply(reply.replies)) {
                  return true;
                }
              }
              return false;
            };
            findAndAddReply(comment.replies);
          } else {
            comment.replies.push(newReply);
          }
          localStorage.setItem('comments', JSON.stringify(state));
        }
      },
    editReply: (state, action) => {
      const { commentId, replyId, text } = action.payload;
      const comment = state.find(c => c.id === commentId);
      if (comment) {
        const reply = comment.replies.find(r => r.id === replyId);
        if (reply) {
          reply.text = text;
          localStorage.setItem('comments', JSON.stringify(state));
        }
      }
    },
    deleteReply: (state, action) => {
      const { commentId, replyId } = action.payload;
      const comment = state.find(c => c.id === commentId);
      if (comment) {
        comment.replies = comment.replies.filter(r => r.id !== replyId);
        localStorage.setItem('comments', JSON.stringify(state));
      }
    },
    likeComment: (state, action) => {
      const comment = state.find(c => c.id === action.payload);
      if (comment) {
        comment.likes += 1;
        localStorage.setItem('comments', JSON.stringify(state));
      }
    },
    dislikeComment: (state, action) => {
      const comment = state.find(c => c.id === action.payload);
      if (comment) {
        comment.dislikes += 1;
        localStorage.setItem('comments', JSON.stringify(state));
      }
    },
    likeReply: (state, action) => {
      const { commentId, replyId } = action.payload;
      const comment = state.find(c => c.id === commentId);
      if (comment) {
        const reply = comment.replies.find(r => r.id === replyId);
        if (reply) {
          reply.likes += 1;
          localStorage.setItem('comments', JSON.stringify(state));
        }
      }
    },
    dislikeReply: (state, action) => {
      const { commentId, replyId } = action.payload;
      const comment = state.find(c => c.id === commentId);
      if (comment) {
        const reply = comment.replies.find(r => r.id === replyId);
        if (reply) {
          reply.dislikes += 1;
          localStorage.setItem('comments', JSON.stringify(state));
        }
      }
    },
  },
});

export const {
  loadComments,
  addComment,
  editComment,
  deleteComment,
  addReply,
  editReply,
  deleteReply,
  likeComment,
  dislikeComment,
  likeReply,
  dislikeReply,
} = commentsSlice.actions;

export default commentsSlice.reducer;