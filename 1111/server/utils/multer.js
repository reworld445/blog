const multer = require('multer')

var fileName = '';
var pathurl = "./uploads";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathurl)
    },
    filename: function (req, file, callback) {
        fileName = `${Date.now()}.png`
        callback(null, fileName);
    }
})
const  upload = multer({ storage: storage })

module.exports = upload;