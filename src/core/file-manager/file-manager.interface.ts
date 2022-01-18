import { BlockBlobClient, BlobUploadCommonResponse } from '@azure/storage-blob';
export interface IFileManager {
    
    delete(filename: string): Promise<void> 
    
}