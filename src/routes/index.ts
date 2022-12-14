import multer from 'multer';
import {Router} from 'express';
import {authenticate, createUser, getUser, listUsers, updateUser} from '../controllers/users.controller';
import {createBook, getBook, getTopPicks, listBooks, updateBook} from "../controllers/books.controller";
import {createPhoto, getPhoto} from "../controllers/photos.controller";
import {listGenres} from "../controllers/genres.controller";
import {updateConfig} from "../controllers/config.controller";
import {createReview, getReview, listReviews, updateReview} from "../controllers/reviews.controller";

const router = Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/').pop();
        cb(null, file.originalname);
    }
  })
const upload = multer({ storage: storage })

router.get('/users', listUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.post('/users/authenticate', authenticate);
router.put('/users/:id', updateUser);

router.get('/books', listBooks);
router.get('/books/:id', getBook);
router.get('/books/top_picks', getTopPicks);
router.post('/books', createBook);
router.put('/books/:id', updateBook);

router.get('/photos/:id', getPhoto);
router.post('/photos', upload.single('photo'), createPhoto);

router.get('/reviews', listReviews);
router.get('/reviews/:id', getReview);
router.post('/reviews', createReview);
router.put('/reviews', updateReview);

router.get('/genres', listGenres);

router.put('/config', updateConfig);

export default router;
