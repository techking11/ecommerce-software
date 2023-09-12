const ProductCategory = require('../Models/productCategory');
const AppError = require('../Utils/errorThrow');

const randomNumber = (min, max) => {
    min = Math.ceil(1000);
    max = Math.floor(9999);
    return Math.floor(Math.random() * (max - min) + min);
}

exports.getProductCategory = async (req, res, next) => {
    try {
        const pageSize = +req.query.pagesize;
        const page = +req.query.page;

        const productCategoies = await ProductCategory.aggregate([
            {
                $sort: {
                    updatedAt: 1
                }
            },
            {
                $skip: pageSize * ( page - 1)
            },
            {
                $limit: parseInt(pageSize)
            }
        ]);

        const count = await ProductCategory.countDocuments();
        const lastPage = Math.ceil( count / pageSize);

        return res.status(200).json({
            meta: {
                current_page: parseInt(page),
                last_page: lastPage,
                per_page: parseInt(pageSize),
                total: count,
            },
            data: productCategoies,
            links: req.originalUrl
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.createProductCategory = async (req, res, next) => {
    try {

        const product_category_code = "pcat-" + randomNumber(1111, 9999);
        const { product_category } = req.body;

        if(!product_category) {
            throw new AppError("Required: Product Category", 400);
        }

        const productCategoies = await ProductCategory.create({
            product_category_code,
            product_category
        });

        return res.status(200).json({ 
            data: productCategoies, 
            links: req.originalUrl 
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.deleteProuductCategory = async (req, res, next) => {
    try {
        const pcat_id = req.params.id;
        const pcat_data = await ProductCategory.findByIdAndDelete(pcat_id);

        return res.status(200).json({ 
            data: pcat_data, 
            message: "Product Category deleted successfully !",
            links: req.originalUrl 
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.updateProductCategory = async (req, res, next) => {
    try {
        const pcat_id = req.params.id;
        const updatedAt = Date.now();
        const { product_category} = req.body;

        if(!product_category) {
            throw new AppError("Required: Product Category", 400);
        }
        const pcat_data = await ProductCategory.findByIdAndUpdate(pcat_id, {$set: { product_category, updatedAt }});

        return res.status(203).json({
            data: pcat_data,
            message: "Product Category updated successfully !", 
            links: req.originalUrl
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}