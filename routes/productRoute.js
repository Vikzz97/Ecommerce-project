import express from 'express';
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, singleProductController, updateProductController } from '../controllers/productController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable'

const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//get products
router.get('/get-product', getProductController)

//single-product
router.get('/get-product/:slug', singleProductController)

//get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/delete-product/:pid', deleteProductController)

//filter product
router.post('/product-filter', productFilterController)

//product count
router.get('/product-count', productCountController)

//product per page
router.get('/product-list/:page', productListController)

//search product
router.get("/search/:keyword", searchProductController)

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category-wise product
router.get('/product-category/:slug', productCategoryController)

//payment route
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController)

export default router;