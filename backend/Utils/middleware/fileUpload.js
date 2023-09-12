const multer = require('multer');
const path = require('path');

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "audio/mpeg3": "mp3",
    "video/mp4": "mp4",
    "text/csv": "csv"
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");

        if(isValid) error = null;

        cb(error, path.join(__dirname, "../../resources/images"));
    },

    filename: (_req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

module.exports = multer({ storage }).single("file");