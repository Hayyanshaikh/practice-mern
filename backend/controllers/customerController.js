const Customer = require("../models/Customer");

const create = async (req, res, next) => {
  try {
    const { name, email, phone, address } = req.body;
    const customer = await Customer.create({ name, email, phone, address });

    res.status(201).json({
      data: customer,
      message: "Customer created successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const { limit, offset, searchKey } = req.query;
    const filter = {
      $or: [
        { name: { $regex: searchKey || "", $options: "i" } },
        { email: { $regex: searchKey || "", $options: "i" } },
      ],
    };

    const customers = await Customer.find(filter)
      .limit(parseInt(limit, 10) || 10)
      .skip(parseInt(offset, 10) || 0);
    const totalCount = await Customer.countDocuments(filter);

    res.status(200).json({
      data: customers,
      maxTotal: totalCount,
      total: customers.length,
      message: "All customers fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      data: customer,
      message: "Customer fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, email, phone, address } = req.body;
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address },
      { new: true, runValidators: true }
    );

    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      data: customer,
      message: "Customer updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, findAll, findOne, update, remove };
