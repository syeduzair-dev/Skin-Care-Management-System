import Customer from "../models/Customer.js";
import Product from "../models/Product.js";
import Sale from "../models/Sale.js";

export const getDashboardData = async (req: any, res: any) => {
  try {
  
    const totalCustomers = await Customer.countDocuments();

   
    const lowStockProducts = await Product.countDocuments({
      stock: { $lt: 10 },
    });

    
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todaySalesAgg = await Sale.aggregate([
      { $match: { createdAt: { $gte: todayStart } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const todaySales = todaySalesAgg[0]?.total || 0;

    
    const expiryLimit = new Date();
    expiryLimit.setDate(expiryLimit.getDate() + 30);

    const expiringSoon = await Product.countDocuments({
      expiryDate: { $lte: expiryLimit.toISOString() },
    });

   
    const recentActivities = await Sale.find()
      .populate("customerId", "name")
      .populate("productId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    
    const topProducts = await Sale.aggregate([
      {
        $group: {
          _id: "$productId",
          sales: { $sum: "$quantity" },
        },
      },
      { $sort: { sales: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
    ]);

    res.json({
      totalCustomers,
      lowStockProducts,
      todaySales,
      expiringSoon,
      recentActivities,
      topProducts,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Dashboard data error" });
  }
};
