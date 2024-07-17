import express from 'express';
import { adminMain } from './adminPageController.js';

const adminRouter = express.Router()

adminRouter.get('/', adminMain);

export {adminRouter}