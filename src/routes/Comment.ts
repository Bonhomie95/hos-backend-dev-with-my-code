import express from "express";
import Authenticate from "../middlewares/guards/Authenticate";
import upload from "../middlewares/multer/multer"
const {createComment, editComment, deleteComment} = require("../controller/userCommentController");
const reactionController = require ("../controller/reactionController")
const {
    authorizeCommentDelete,
    authorizeCommentEdit
  } = require("../middlewares/guards/ActionsAuthorization")
const router = express.Router();


router.post(
    "/:postId/comment",
    Authenticate, upload.array('file', 3 ),
    createComment
);

router.put(
    "/:postId/comment/:commentId/edit", authorizeCommentEdit, 
    Authenticate,upload.array('file', 3 ),
    editComment
);

router.delete(
    "/:postId/comment/:commentId/delete", authorizeCommentDelete,
    Authenticate,
    deleteComment
);

router.post(
    "/comment/reaction/:commentId",
    Authenticate,
    reactionController.reactToComment
  );




export default router;