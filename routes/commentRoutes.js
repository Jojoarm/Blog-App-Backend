import express from 'express';
import {
  addComment,
  deleteComment,
  getPostComments,
} from '../controllers/commentControllers.js';

const router = express.Router();

router.get('/:postId', getPostComments);
router.post('/:postId', addComment);
router.delete('/:id', deleteComment);

export default router;