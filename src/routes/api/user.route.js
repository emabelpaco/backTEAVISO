var express = require('express')
var router = express.Router()
var UserController = require('../../controller/users.controller');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a api/user.routes');
  });

router.get('/get', UserController.getUsers)
router.get('/getCategorias', UserController.getCategorias)
router.get('/getCategoriasByEmail', UserController.getCategoriasByEmail)
router.get('/searchFrasePictograma', UserController.searchFrasePictograma)
router.get('/saveMessajeInCategoria', UserController.saveMessajeInCategoria)

// Export the Router
module.exports = router;