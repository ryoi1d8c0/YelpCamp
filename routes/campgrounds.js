const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { uploadImage } = require('../cloudinary');
const upload = multer({ storage: multer.memoryStorage() });

router
    .route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('images'), validateCampground, catchAsync(campgrounds.createCampground));
// .post(
//     upload.array('image'),
//     catchAsync(async (req, res) => {
//         const results = await Promise.all(req.files.map((f) => uploadImage(f.buffer)));
//         res.send('受け付けました');
//     }),
// );

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router
    .route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('images'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
