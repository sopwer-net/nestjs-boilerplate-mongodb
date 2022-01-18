import { FilterError } from "./file-message.error";

const path = require('path')


export const filterFileImage  = function (req, file, callback) {
    var ext = path.extname(file.originalname.toLowerCase());
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new FilterError('error' , 400 , 'please insert image') ,false)
    }
    callback(null, true)
}