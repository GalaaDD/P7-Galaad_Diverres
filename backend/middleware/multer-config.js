//Multer configuration 
// Allow the management of incoming files into http requests
const multer = require('multer');  

//Mime dictionary
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

//Multer strorage, indications of where to send files
const storage = multer.diskStorage({
  destination: (req, file, callback) => { //indication of the folder to send the file to
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); //split and join to avoid any issues while namming file
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage: storage }).single('image');
//At this point multer is fully set
//exportation of multer for futur uses and indication of the types of files we will download, here image