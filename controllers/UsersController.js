const User = require('../models/User');
const viewPath = 'users';

exports.new = async (req, res) => {
  res.render(`users/new`, {
    pageTitle: 'New User'
  });
};

exports.create = async (req, res) => {
  try {
    const user = new User(req.body);
    await User.register(user, req.body.password);

    req.flash(`Thank you, ${user.fullname}. for registering.`);
    res.redirect('/');
  } catch (error) {
    req.flash('error');
    req.session.formData = req.body;
    res.redirect(`/register`);
  }
};
