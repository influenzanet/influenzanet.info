import {BaseProvider, LocalUploadOptions} from "@adminjs/upload";
import {existsSync} from "fs";
import * as fs from "fs";
import * as path from 'path'
import { move } from "fs-extra";
// import {ERROR_MESSAGES} from "@adminjs/upload/types/features/upload-file/constants";
import {UploadedFile} from "adminjs";


export class UploadLocalProvider extends BaseProvider {
  constructor(options: LocalUploadOptions) {
    super(options.bucket)
    if (!existsSync(options.bucket)) {
      // throw new Error(ERROR_MESSAGES.NO_DIRECTORY(options.bucket))
      console.log('UPLOAD DIRECTORY ERROR')
    }
  }

  public async upload(file: UploadedFile, key: string): Promise<any> {
    try{
      const filePath = process.platform === 'win32'
        ? this.path(key) : this.path(key).slice(1) // adjusting file path according to OS

      await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
      // await fs.promises.rename(file.path, filePath)
      await move(file.path, filePath, { overwrite: true });
    }
    catch (e: any){
      console.log('upload ERR', e)
    }
  }

  public async delete(key: string, bucket: string): Promise<any> {
    try{
      await fs.promises.unlink(
        process.platform === 'win32'
          ? this.path(key, bucket)
          : this.path(key, bucket).slice(1),
      ) // adjusting file path according to OS
    }
    catch (e: any){
      console.log('delete ERR', e)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public path(key: string, bucket?: string): string {
    try{
      // Windows doesn't requires the '/' in path, while UNIX system does
      return process.platform === 'win32' ? `${path.join(bucket || this.bucket, key)}`
        : `${path.join(bucket || this.bucket, key)}`
    }
    catch (e: any){
        console.log('delete ERR', e)
    }
  }
}
