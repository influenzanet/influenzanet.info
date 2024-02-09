// import {ResourceWithOptions} from "adminjs/types/src/adminjs-options.interface";
import { Partner } from "@models/Partner";
import { validate } from "./validators/validate";
import { BaseRecord, ResourceWithOptions } from "adminjs";
import { elementsPerPage } from "./helpers/helpers";
import uploadFileFeature from "@adminjs/upload";
import { UploadLocalProvider } from "../provider/UploadLocalProvider";
import path from "path";
import { __dirname } from "../__dirname";
import { componentLoader } from "../components/component-loader";


export const PartnerAdmin : ResourceWithOptions = {
  resource: Partner,
  options: {
    titleProperty: 'name',
    properties: {
      id: { isVisible: false },
      name: {
        type: 'string',
        position: 10,
        isSortable: true,
        custom: {isRequired: true}
      },
      platformId:{
        position: 15,
        isSortable: true,
        custom: {isRequired: true}
      },
      hidden:{
        type: 'boolean',
        position: 17,
        isSortable: true,
      },
      website: {
        type: 'string',
        position: 20,
        isSortable: true,
        isVisible: {list: false, show: true, edit: true},
      },
      description: {
        type: 'richtext',
        position: 70,
        isVisible: {list: false, show: true, edit: true},
      },
      logo: {
        type: 'mixed',
        isVisible: true,
        position: 80,
        isSortable: false
      },
    },
    navigation: {
      // icon: 'Partnership'
      icon: 'Users'
    },
    sort: {
      sortBy: 'order',
      direction: 'asc',
    },
    actions: {
      show: {isAccessible: false},
      edit: {before: validate},
      new: {before: validate},
      list: {before: elementsPerPage}
    }
  },
  features: [
    uploadFileFeature({
      componentLoader: componentLoader,
      provider: new UploadLocalProvider({
        bucket: path.join(__dirname, '/assets/upload'),
        opts: { baseUrl: '/assets/upload' },
      }),
      properties: {
        file: `logo`,
        key: `logo.key`,
        mimeType: `logo.mime`,
        bucket: `logo.bucket`,
        size: `logo.size`,
        filename: 'logo.filename',
      },
      // multiple: true,
      validation: {
        // @TODO: make it work with svg
        mimeTypes: ['image/png', 'image/jpg', 'image/jpeg', /*'image/svg+xml'*/],
        maxSize: 10485760
      },
      uploadPath: (record: BaseRecord, filename: string)=> `logo/partner/${filename}`
    })
  ]
}
