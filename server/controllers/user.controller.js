const UserModel = require("../models/user");

// ---------------------------------------------------------------
// --------------------- LOG IN -----------------------------
// ---------------------------------------------------------------
exports.sign_in = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const already_exits = await UserModel.findOne({ email });
    if (!already_exits) {
      const user = await UserModel.create({ name, email, points: 0 });
      return res.status(201).json(user);
    }
    return res.status(200).json(already_exits);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

// ---------------------------------------------------------------
// --------------------- LOGGED IN USER -----------------------------
// ---------------------------------------------------------------
exports.logged_in_user = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({ _id: id });

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

// ---------------------------------------------------------------
// --------------------- UPDATE POINTS -----------------------------
// ---------------------------------------------------------------
exports.update_points = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { points } = req.body;
    await UserModel.updateOne({ _id: id }, { $set: { points } });
    const user = await UserModel.findOne({ _id: id });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};
