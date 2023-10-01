import {Router} from "express"
import {asyncHandler} from '../../middleware/asyncHandling.js'
import {auth} from '../../middleware/auth.js'
import * as subcategory from './controller/subcategory.controller.js'
import { endpoint } from "./subcategory.endpoint.js";
import { fileValidation, myMulter } from "../../services/multer.js"
const router=Router({mergeParams:true}) //category.route الموجود بالصفحة req.params مشان اشوف 

router.post('/',auth(endpoint.add),myMulter(fileValidation.imag).single('image'),asyncHandler(subcategory.createdSubCategory))
router.put('/:id',auth(endpoint.update),myMulter(fileValidation.imag).single('image'),asyncHandler(subcategory.updateSubCategory))
router.get('/',asyncHandler(subcategory.getAllcats)) //اذا اي واحد معه الرابط بقدر يدخل auth ما اعطيته 
// router.get('/:id',asyncHandler(subcategory.getSubCat))
router.get('/:id',subcategory.getSubCat)
export default router;