import multer from 'multer';
import { __dirname } from '../utils.js';



const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/profiles')
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileExtension = file.originalname.split('.').pop();
      cb(null,'Profile' + '-' + uniqueSuffix + '.' + fileExtension);

  }
});

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/products')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null,'Product' + '-' + uniqueSuffix + '.' + fileExtension);
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
  
