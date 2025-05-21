import express from 'express'
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js'

const router = express.Router()

//routes
//create category
//http://localhost:8080/api/v1/category/create-category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

//update category
//http://localhost:8080/api/v1/category/update-category/:id
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

//getAll category
router.get('/get-category', categoryController)

//get single category
router.get('/single-category/:slug', singleCategoryController)


//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router