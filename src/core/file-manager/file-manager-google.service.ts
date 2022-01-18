import { IFileManager } from './file-manager.interface';
const {Storage} = require('@google-cloud/storage');

export class FileManagerGoogleService implements IFileManager{

    private storage : Storage
    private bucket 
    constructor(){
       this.storage = new Storage({
            projectId : 'wasiatku',
            keyFilename : 'wasiatku-89063501355a.json',
        })
        this.bucket  =  this.storage.bucket('keep_my_space')

    }


  
    delete(filename: string): Promise<void> {
        return this.bucket.file(filename).delete()
    }

    async signUrl(filename:string) : Promise<string>{
        try{
            
        return this.bucket.file(filename).getSignedUrl( {
            version: 'v4',
            action: 'read',
            expires: Date.now() + 1  * 60 * 1000,
          }
        )
        }catch(error){
            console.log(error)
        }
    }

    
}