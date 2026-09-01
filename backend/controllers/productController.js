const Product = require("../models/Product");

const create = async (req, res, next) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = await Product.create({ name, description, price, quantity });

    res.status(201).json({
      data: product,
      message: "Product created successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const { limit, offset, searchKey } = req.query;
    const filter = {
      name: {
        $regex: searchKey || "",
        $options: "i",
      },
    };

    const products = await Product.find(filter)
      .limit(parseInt(limit, 10) || 10)
      .skip(parseInt(offset, 10) || 0);
    const totalCount = await Product.countDocuments(filter);

    res.status(200).json({
      data: products,
      maxTotal: totalCount,
      total: products.length,
      message: "All products fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      data: product,
      message: "Product fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, quantity },
      { new: true, runValidators: true }
    );

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      data: product,
      message: "Product updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, findAll, findOne, update, remove };
