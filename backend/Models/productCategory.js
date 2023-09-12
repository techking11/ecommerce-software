const mongoose = require('mongoose');

const ProductCategorySchema = mongoose.Schema(
    {
        product_category_code: {
            type: String,
            required: true
        },
        product_category: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);