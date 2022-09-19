import multer from 'multer';
import { Router } from 'express';
import {authenticate, createUser, getUser, listUsers, updateUser} from '../controllers/users.controller';
import {createBook, getBook, listBooks, updateBook} from "../controllers/books.controller";
import {createPhoto, getPhoto} from "../controllers/photos.controller";

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
router.post('/books', createBook);
router.put('/books/:id', updateBook);

router.get('/photos/:id', getPhoto);
router.post('/photos', upload.single('photo'), createPhoto);

export default router;
