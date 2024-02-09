import {BaseProvider, LocalUploadOptions} from "@adminjs/upload";
import {existsSync} from "fs";
import * as fs from "fs";
import * as path from 'path'
import { move, ensureDir } from "fs-extra";
import {UploadedFile} from "adminjs";
import { logger } from "../logger";


export class UploadLocalProvider extends BaseProvider {
  constructor(options: LocalUploadOptions) {
    super(options.bucket, options.opts)
    if (!existsSync(options.bucket)) {
      logger.error(`ERROR upload bucket does not exist at ${options.bucket}`)
    }
  }

  public async upload(file: UploadedFile, key: string): Promise<any> {
    try{
      const temporaryPath = file.path
      const destinationPath = this.serverPath(key)
      await ensureDir(path.dirname(destinationPath));
      await move(temporaryPath, destinationPath, { overwrite: true });
    }
    catch (e: any){ logger.error('ERROR uploading file', e) }
  }

  public async delete(filePath: string, bucket: string): Promise<any> {
    try{ await fs.promises.unlink(this.serverPath(filePath, bucket)) }
    catch (e: any){ logger.error('ERROR deleting file', e) }
  }

  public serverPath(filePath: string, bucket: string = this.bucket): string {
    return `${path.join(this.bucket, filePath)}`
  }

  public path(filePath: string, bucket: string = this.bucket): string {
    try{
      let assetsBaseUrl = this.opts.baseUrl
      return `${path.join(assetsBaseUrl, filePath)}`
    }
    catch (e: any){  logger.error('ERROR computing file path', e) }
  }
}
