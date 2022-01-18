import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';




export const StorageLocalProfile  =   diskStorage({
    destination:'./uploads/profile',
    filename:function(req ,file,cb){
      var datetimestamp = Date.now();
      cb(null,uuidv4()+datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
})



 

