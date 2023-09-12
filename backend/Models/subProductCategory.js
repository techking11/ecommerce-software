const mongoose = require('mongoose');

const SubProductCategorySchema = mongoose.Schema(
    {
        product_category_id: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "ProductCategory"
        },
        sub_product_category_code: {
            type: String,
            required: true
        },
        sub_product_category: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("SubProductCategory", SubProductCategorySchema);