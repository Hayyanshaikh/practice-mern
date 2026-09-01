const User = require("../models/User");

const validateField = (data) => {
  const err = [];
  if (!data.name) {
    err.push("Name is required");
  }

  if (!data.email) {
    err.push("Email is required");
  }

  return err;
};

const create = async (req, res, next) => {
  try {
    const { name, email, age } = req.body;

    const errors = validateField(req.body);

    if (errors.length > 0) {
      throw new Error(errors);
    }

    const user = await User.create({
      name,
      email,
      age,
    });

    res.status(201).json({
      data: user,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const findAll = async (req, res) => {
  try {
    const { limit, offset, searchKey } = req.query;

    const users = await User.find({
      name: {
        $regex: searchKey || "",
        $options: "i",
      },
    })
      .limit(parseInt(limit) || 10)
      .skip(parseInt(offset) || 0);
    const totalCount = await User.countDocuments();
    const count = users.length;

    res.status(200).json({
      data: users,
      maxTotal: totalCount,
      total: count,
      message: "All users fetch Successfully.",
    });
  } catch (error) {
    console.error(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const users = await User.findById(id);

    if (!users) {
      const error = new Error("User not Found.");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      data: users,
      message: "All users fetch Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(201).json({
      data: user,
      message: "User update Successfully.",
    });
  } catch (error) {
    console.error(error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
