import {Router} from "express"
import {asyncHandler} from '../../middleware/asyncHandling.js'
import {auth} from '../../middleware/auth.js'
import * as category from './controller/category.controller.js'
import { endpoint } from "./category.endpoint.js";
import { fileValidation, myMulter } from "../../services/multer.js"
import  subcategoryRouter  from "../‏‏subcategory/subcategory.route.js";
const router=Router()
router.use('/:categoryId/subcategory',subcategoryRouter)
router.post('/',auth(endpoint.add),myMulter(fileValidation.imag).single('image'),asyncHandler(category.createdCategory))
router.put('/:id',auth(endpoint.update),myMulter(fileValidation.imag).single('image'),asyncHandler(category.updateCategory))
router.get('/',asyncHandler(category.getAllcats)) //اذا اي واحد معه الرابط بقدر يدخل auth ما اعطيته 
router.get('/:id',asyncHandler(category.getCat))
export default router;
