import express from 'express';
export const router = express.Router()

//endpoints
import {create} from './create.js';

router
    .post('/links/create', create)