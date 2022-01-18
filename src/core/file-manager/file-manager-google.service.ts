import { bucketGoogle, expires, options } from './file-google.setting';
import { IFileManager } from './file-manager.interface';
export class FileManagerGoogleService implements IFileManager{
  
    delete(filename: string): Promise<void> {
        return bucketGoogle.file(filename).delete()
    }

    async signUrl(filename:string) : Promise<string>{
        try{
            options.expires = Date.now() + 1  * 60 * 1000;
            
        return bucketGoogle.file(filename).getSignedUrl(options)
        }catch(error){
            console.log(error)
        }
    }
    
}