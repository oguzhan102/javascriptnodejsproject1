// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/

const viewPath = 'caloris';
const Calori = require('../models/Calori');
const User = require('../models/User');


exports.new = (req, res) => {
  res.render(`caloris/new`, {
    pageTitle: 'New Page'
  });
};

exports.index = async (req, res) => {
  try {
    const caloris = await Calori
      .find()
      .populate('user')
    res.render(`${viewPath}/index`, {
      pageTitle: 'EVERYTHING!',
      caloris: caloris
    });
  }
  catch (error) {
    req.flash(`ERROR`);
    res.redirect('/');
  }
};


exports.show = async (req, res) => {
  try {
    const calori = await Calori.findById(req.params.id)
      .populate('user');
    res.render(`${viewPath}/show`, {
      pageTitle: calori.title,
      calori: calori
    });
  }
  catch (error) {
    res.redirect('/');
  }
};


exports.create = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    const calori = await Calori.create({user: user._id, ...req.body});
    req.flash('Calorie journey Successfully Created!');
    res.redirect(`/caloris/${calori.id}`);
  } catch (error) {
    req.session.formData = req.body;
    res.redirect('/caloris/new');
  }
};

exports.edit = async (req, res) => {
  try {
    const calori = await Calori.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: calori.title,
      formData: calori
    });
  }
  catch (error) {
    res.redirect('/caloris');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let calori = await Calori.findById(req.body.id);
    if (!calori) throw new Error('could not be found');

    const attributes = {user: user._id, ...req.body};
    await Calori.findByIdAndUpdate(attributes.id, attributes);

    req.flash('Successfully updated!!!');
    res.redirect(`/caloris`);
  }
  catch (error) {
    res.redirect(`/caloris/${req.body.id}`);
  }
};

exports.delete = async (req, res) => {
  await Calori.deleteOne({_id: req.body.id});
  res.redirect(`/caloris`);
};
