const { new: _new, index, show, create, edit, update, delete: _delete } = require('../controllers/CaloriController');


//copy pasted
function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}

module.exports = router => {
  router.get('/caloris', index);
  router.get('/caloris/new', auth ,_new);
  router.post('/caloris', create);
  router.post('/caloris/update', auth,update);
  router.post('/caloris/delete', _delete);
  router.get('/caloris/:id/edit',auth,edit);
  router.get('/caloris/:id' ,show);
  router.delete('/caloris/:id',auth , _delete)
};
