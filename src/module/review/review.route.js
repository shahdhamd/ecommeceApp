import { Router } from "express";
const router=Router({mergeParams:true})
import * as review from './controller/review.controller.js'
import { asyncHandler } from "../../middleware/asyncHandling.js";
import { endpoint } from "../order/order.endpoint.js";
import {auth} from '../../middleware/auth.js'
router.post('/',auth(endpoint.create),asyncHandler(review.createReview))
export default router