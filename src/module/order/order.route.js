import { Router } from "express";
import * as order from './controller/order.controller.js'
const router=Router()
import {auth} from '../../middleware/auth.js'
import { endpoint } from "./order.endpoint.js";
import { asyncHandler } from "../../middleware/asyncHandling.js";
router.post('/',auth(endpoint.create),asyncHandler(order.createOrder))
export default router;