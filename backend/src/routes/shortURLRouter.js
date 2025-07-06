import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {getShortUrl, redirectfunction} from '../controllers/shortUrlController.js'

const shortURLRouter = Router();

shortURLRouter.post("/",protect, getShortUrl);
shortURLRouter.get("/:shortcode", redirectfunction);

export default shortURLRouter;
