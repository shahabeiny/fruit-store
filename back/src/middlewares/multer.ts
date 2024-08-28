// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     const filename= Date.now() + Math.random();
//     const ext = path.extname(file.originalname)

//     const validMimeTypes = ["image/jpg", "image/jpeg", "image/png"];

//     if (validMimeTypes.includes(file.mimetype)) {
//       cb(null, `${filename}${ext}`);
//     } else {
//       // cb(new Error("Only .jpg | .jpeg | .png are valid files"));
//     }
//   }
// })

// const maxSize = 2*1000*1000;

// export default multer({ storage,limits:{
//   fileSize:maxSize
// } })