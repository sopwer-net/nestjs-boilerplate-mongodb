const {Storage} = require('@google-cloud/storage');
import { IFileManager } from './file-manager.interface';
export class FileManagerGoogleService implements IFileManager{

    private storage : Storage 
    
    
   private bucketGoogle 
    
    constructor(){
        this.storage = new Storage({
            projectId : 'wasiatku',
            keyFilename : 'wasiatku-89063501355a.json',
        })

        this.bucketGoogle =  this.storage.bucket('keep_my_space')
    }    
  
    delete(filename: string): Promise<void> {
        return this.bucketGoogle.file(filename).delete()
    }

    async signUrl(filename:string) : Promise<string>{
        try{
            
        return this.bucketGoogle.file(filename).getSignedUrl( {
            version: 'v4',
            action: 'read',
            expires: Date.now() + 1  * 60 * 1000,
          })
        }catch(error){
            console.log(error)
        }
    }
    
}