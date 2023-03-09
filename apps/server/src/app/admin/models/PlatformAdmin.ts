import {ResourceWithOptions} from "adminjs/types/src/adminjs-options.interface";
import uploadFileFeature from '@adminjs/upload';
import {Platform} from "@models/Platform";
import {environment} from "../../../environments/environment";
import {BaseRecord} from "adminjs";
import {LocalUploadProvider} from "../../platform/prodivder/LocalUpload.provider";

export const PlatformAdmin: ResourceWithOptions | any = {
  resource: Platform,
  options: {
    properties: {
      'id': { isVisible: false },
      'name': {
        type: 'string',
        isTitle: true,
        position: 1
      },
      'countryId': {
        position:2,
      },
      'website': {
        type: 'string',
        position:3,
      },
      'order': {
        type: 'number',
        position:3,
      },
      'description': {
        type: 'richtext',
        content: 'Changed label',
        position: 1000,
        description: ''
      },
      'logo': {
        type: 'string',
        isVisible:true
      }
    },
    actions: {
      show: {isAccessible: false},
    },
    sort: {
      sortBy: 'order',
      direction: 'asc',
    },
    navigation: {
      icon: 'Webhook',
    }
  },
  // features: [
  //   uploadFileFeature({
  //       // provider: {local: {bucket: environment.production? './assets/upload': './apps/server/src/assets/upload'}},
  //       provider: new LocalUploadProvider({bucket: environment.production? './assets/upload': './apps/server/src/assets/upload'}),
  //       properties: {
  //         file: `logoFile.file`,
  //         filePath: `logoFile.filePath`,
  //         filesToDelete: `logoFile.filesToDelete`,
  //         key: `logoFile.key`,
  //         mimeType: `logoFile.mime`,
  //         bucket: `logoFile.bucket`,
  //         size: `logoFile.size`,
  //       },
  //       // multiple: true,
  //     validation: {
  //         mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'],
  //         maxSize: 10485760
  //     },
  //     uploadPath: (record: BaseRecord, filename: string)=> `/logo/${filename}`
  //   })
  // ]
}
