import Sale from "../models/Sale";
import Product from "../models/Product";
export const createSale = async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body;
        if (!customerId || !productId || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const product = await Product.findById(productId);
        console.log("REQUEST BODY =>", req.body);
        console.log("PRODUCT FETCHED =>", product);
        console.log("PRODUCT PRICE =>", product?.price);
        console.log("PRODUCT PRICE =>", product?.price);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }
        const price = product.price;
        const total = price * quantity;
        const sale = await Sale.create({
            customerId,
            productId,
            quantity,
            price,
            total,
        });
        product.stock -= quantity;
        await product.save();
        res.status(201).json(sale);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create sale" });
    }
};
