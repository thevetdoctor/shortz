const router = require('express').Router();
const urlController = require('../controllers/index');


router.post('/short', urlController.createShortenedUrl);

router.get('/:short', urlController.getOriginalUrl);

module.exports = router;