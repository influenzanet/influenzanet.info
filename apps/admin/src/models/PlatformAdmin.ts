import { Platform } from "@models/Platform";
import path from "path";
import { validate } from "./validators/validate";
import uploadFileFeature, { UploadOptions } from "@adminjs/upload";
import { BaseRecord, ResourceWithOptions } from "adminjs";
import { componentLoader } from "../components/component-loader";
import { UploadLocalProvider } from "../provider/UploadLocalProvider";
import { __dirname } from "../__dirname";
import { elementsPerPage } from "./helpers/helpers";


export const PlatformAdmin: ResourceWithOptions = {
  resource: Platform,
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
      countryId: {
        position:15,
        isSortable: true,
        custom: {isRequired: true}
      },
      hidden:{
        type: 'boolean',
        position: 20,
        isSortable: true,
      },
      filePrefix: {
        type: 'string',
        position:25,
        custom: {isRequired: true},
        description: `CSV files prefix. (EG: IT for "IT_active.csv", "IT_incidence.csv" and "IT_visits_cumulated.csv")`
      },
      website: {
        type: 'string',
        position:30,
        isVisible: {list: false, show: true, edit: true},
      },
      websiteJoinLink: {
        type: 'string',
        position:35,
        isVisible: {list: false, show: true, edit: true},
      },
      order: {
        type: 'number',
        position:40,
        isSortable: true,
      },
      description: {
        type: 'richtext',
        position: 70,
        custom: {isRequired: true},
        isVisible: {list: false, show: true, edit: true},
      },
      about: {
        type: 'richtext',
        position: 75,
        isVisible: {list: false, show: true, edit: true},
      },
      logo: {
        type: 'mixed',
        isVisible: true,
        position: 80,
        isSortable: true
      },
      filePath: {isVisible: false}
    },
    actions: {
      show: {isAccessible: false},
      new: {before: validate},
      edit: {before: validate},
      list: {before: elementsPerPage}
    },
    sort: {
      sortBy: 'order',
      direction: 'asc',
    },
    navigation: {
      // icon: 'Webhook',
      icon: 'Target',
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
      validation: {
        // @TODO: make it work with svg
        mimeTypes: ['image/png', 'image/jpg', 'image/jpeg', /*'image/svg+xml'*/],
        maxSize: 10485760
      },
      uploadPath: (record: BaseRecord, filename: string)=> `logo/platform/${filename}`
    } as UploadOptions)
  ]
}
