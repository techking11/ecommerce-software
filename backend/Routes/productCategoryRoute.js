const router = require('express').Router();
const ProductCategoryController = require("../Controllers/productCategory");
const Authorize = require("../Utils/middleware/authorize");
router
    .route("/")
    .get(Authorize, ProductCategoryController.getProductCategory)
    .post(Authorize, ProductCategoryController.createProductCategory);

router
    .route("/:id")
    .delete(Authorize, ProductCategoryController.deleteProuductCategory)
    .put(Authorize, ProductCategoryController.updateProductCategory);

module.exports = router;