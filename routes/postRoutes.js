import express from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  uploadAuth,
  featurePost,
} from '../controllers/postControllers.js';
import increaseVisit from '../middlewares/increaseVisit.js';

const router = express.Router();

router.get('/upload-auth', uploadAuth);
router.post('/', createPost);
router.get('/', getPosts);
router.get('/:slug', increaseVisit, getPost);
router.delete('/:id', deletePost);
router.patch('/feature', featurePost);

export default router;
