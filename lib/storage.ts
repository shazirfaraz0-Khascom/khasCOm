import fs from 'fs/promises';
import path from 'path';

export interface StorageAdapter {
  uploadFile(file: Buffer, fileName: string): Promise<string>;
  deleteFile(fileUrl: string): Promise<void>;
}

export class LocalStorageAdapter implements StorageAdapter {
  private uploadDir = path.join(process.cwd(), 'public', 'uploads');

  async uploadFile(file: Buffer, fileName: string): Promise<string> {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }

    const uniqueName = `${Date.now()}-${fileName}`;
    const filePath = path.join(this.uploadDir, uniqueName);
    
    await fs.writeFile(filePath, file);
    return `/uploads/${uniqueName}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    if (!fileUrl.startsWith('/uploads/')) return;
    const fileName = fileUrl.replace('/uploads/', '');
    const filePath = path.join(this.uploadDir, fileName);
    
    try {
      await fs.unlink(filePath);
    } catch (e) {
      console.error(`Failed to delete file ${filePath}:`, e);
    }
  }
}

// Export singleton instance based on environment
export const storage: StorageAdapter = process.env.NODE_ENV === 'production' 
  ? new LocalStorageAdapter() // Replace with S3 Adapter for prod if configured
  : new LocalStorageAdapter();
