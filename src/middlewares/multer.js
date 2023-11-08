import multer from 'multer';
import { __dirname } from '../utils.js';



const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/images/profiles')
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, 'Profile' + '-' + uniqueSuffix + file.originalname)

  }
});

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/images/products')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,'Product' + '-' + uniqueSuffix + file.originalname)
  }
});

const documentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/documents')
  },
  filename: function (req, file, cb) {
    cb(null, 'DOCUMENT-' + file.originalname)
  }
});

export const uploadProfile = multer({ storage: profileStorage }).single('profile');
export const uploadProduct = multer({ storage: productStorage }).single('product');
export const uploadDocument = multer({ storage: documentStorage }).single('document');
  
