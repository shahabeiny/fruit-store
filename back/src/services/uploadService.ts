import { Request } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { UploadedFile } from 'express-fileupload';

type FileType = 'music' | 'movie' | 'image' | 'document';

class Uploader {
  constructor(private maxSize: number = 1 * 1024 * 1024) {}

  private generateFileName(kind: FileType, extension: string): string {
    const date = new Date();
    return `${kind}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${Math.floor(
      Math.random() * 1000000
    )}.${extension}`;
  }

  private getFileType(mimeType: string): FileType {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'movie';
    if (mimeType.startsWith('audio/')) return 'music';
    if (mimeType.startsWith('application/') || mimeType.startsWith('text/')) return 'document';
    throw new Error('Unsupported file type.');
  }

  public async uploadFile(req: Request, fileKey: string): Promise<string> {
    const file = req.files?.[fileKey] as UploadedFile;
    if (!file) {
      throw { status: 400, message: 'فایلی آپلود نشده است' };
    }

    if (file.size > this.maxSize) {
      throw new Error(`سایز فایل نباید بیشتر از ${this.maxSize} باشد`);
    }

    const kind = this.getFileType(file.mimetype);
    const filePath = this.generateFileName(kind, path.extname(file.name).slice(1));

    const uploadPath = path.resolve(__dirname, '../../public/', filePath);
    await fs.mkdir(path.dirname(uploadPath), { recursive: true });
    await fs.writeFile(uploadPath, await fs.readFile(file.tempFilePath));

    return filePath;
  }
}

export default Uploader;
