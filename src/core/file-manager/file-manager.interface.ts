export interface IFileManager {
    
    delete(filename: string): Promise<void> 
    
}