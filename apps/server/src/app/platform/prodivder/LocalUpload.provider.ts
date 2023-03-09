import { move } from "fs-extra";
import {existsSync} from "fs";
import {UploadedFile} from "adminjs";
import {LocalUploadOptions} from "@adminjs/upload";
import * as fs from "fs";
import * as path from "path";


export class LocalUploadProvider{
  public name: string
  public bucket: string

  constructor(options: LocalUploadOptions) {
    // super(options.bucket)
    this.name = 'BaseProvider'
    this.bucket = options.bucket
    if (!existsSync(options.bucket)) {
      // throw new Error(ERROR_MESSAGES.NO_DIRECTORY(options.bucket))
      throw new Error('Upload Bucket not found in: '+options.bucket)
    }
  }

  public async upload(file: UploadedFile, key: string): Promise<any> {
    console.log('FILE UPLOAD: ')
    console.log({file, key})
    console.log('##############')

    const filePath = process.platform === 'win32'
      ? this.path(key) : this.path(key).slice(1) // adjusting file path according to OS

    await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
    await move(file.path, filePath, { overwrite: true });
    // await fs.promises.rename(file.path, filePath)
  }

  public async delete(key: string, bucket: string): Promise<any> {
    await fs.promises.unlink(
      process.platform === 'win32'
        ? this.path(key, bucket)
        : this.path(key, bucket).slice(1),
    ) // adjusting file path according to OS
  }

  // eslint-disable-next-line class-methods-use-this
  public path(key: string, bucket?: string): string {
    // Windows doesn't requires the '/' in path, while UNIX system does
    return process.platform === 'win32'
      ? `${path.join(bucket || this.bucket, key)}`
      : `/${path.join(bucket || this.bucket, key)}`
  }
}
