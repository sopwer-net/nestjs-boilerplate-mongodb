
import * as mutlerGoogleStorage from 'multer-google-storage';
import { v4 as uuidv4 } from 'uuid';
const {Storage} = require('@google-cloud/storage');

export const StorageGoogleProfile = mutlerGoogleStorage.storageEngine({
    projectId : 'wasiatku',
    keyFilename : 'wasiatku-89063501355a.json',
    bucket : 'keep_my_space',
    filename:function(req ,file,cb){
      var datetimestamp = Date.now();
      cb(null,uuidv4()+datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
})

export const storage = new Storage({
    projectId : 'wasiatku',
    keyFilename : 'wasiatku-89063501355a.json',
})
export const expires = Date.now() + 1  * 60 * 1000
export let options = {
  version: 'v4',
  action: 'read',
  expires: Date.now() + 1  * 60 * 1000,
};

export const bucketGoogle =  storage.bucket('keep_my_space')


