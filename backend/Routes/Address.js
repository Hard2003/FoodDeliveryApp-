const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validator');

// All routes require authentication
router.use(protect);

router.post('/',
  addressController.createAddressValidation,
  validate,
  addressController.createAddress
);

router.get('/', addressController.getMyAddresses);

router.get('/:id', addressController.getAddressById);

router.put('/:id', addressController.updateAddress);

router.delete('/:id', addressController.deleteAddress);

router.patch('/:id/set-default', addressController.setDefaultAddress);

module.exports = router;
