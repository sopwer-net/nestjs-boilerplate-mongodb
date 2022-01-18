
import * as mutlerGoogleStorage from 'multer-google-storage';
import { v4 as uuidv4 } from 'uuid';
const {Storage} = require('@google-cloud/storage');


export class GoogleStorageSetting{
  static StorageGoogleProfile = mutlerGoogleStorage.storageEngine({
    projectId : 'wasiatku',
    keyFilename : 'wasiatku-89063501355a.json',
    bucket : 'keep_my_space',
    filename:function(req ,file,cb){
      var datetimestamp = Date.now();
      cb(null,uuidv4()+datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
})
}




