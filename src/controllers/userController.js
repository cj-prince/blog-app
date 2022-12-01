const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { successMessage, errorMessage} = require('../helpers/response');
const logger = require('../config/logger');

const registerUser = async (req, res) => {
  let { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ status: 422, message: 'User already exists!' });
    } else {

      user = new User({
        name: name,
        email: email,
        password: password,
      });
      user.password = bcrypt.hashSync(password, 10);
      await user.save();
      successMessage(res, {
        message: 'user created successfully',
        status: 'success',
        data: user,
      });
    }
  } catch (error) {
    return res.json({ status: 500, message: '' });
  }
};

const loginUser = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.json({ status: 422, message: 'User not found' });
      // res.status(400).json({
      //   status: 'failed',
      //   message: 'User not found',
      // });
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.json({ status: 400, message: 'Incorrect login details' });
      // res.status(400).json({
      //   status: 'failed',
      //   message: 'Incorrect login details',
      // });
    }
    const sessionToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        password: user.password,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      }
    );
    return successMessage(res, {
      message: 'Login successful',
      data: {
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: sessionToken
      },
    });
  } catch (error) {
    return res.json({ status: 500, message: '' });
  }
};

module.exports = { registerUser, loginUser };
