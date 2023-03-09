import {ResourceWithOptions} from "adminjs/types/src/adminjs-options.interface";
import {Partner} from "@models/Partner";

// import uploadFeature from '@adminjs/upload'
// const path = require("path");

export const PartnerAdmin: ResourceWithOptions | any = {
  resource: Partner,
  options: {
    properties: {
      'id': { isVisible: false },
      'name': {
        type: 'string',
        isTitle: true,
        position: 1
      },
      'website': {
        type: 'string',
        position: 2
      },
      'description': {
        type: 'richtext',
        content: 'Changed label',
        position: 1000,
        description: ''
      },
      actions: {
        show: {isAccessible: false},
      },
      // features: [uploadFeature({
      //   provider: {local: {bucket: path.resolve('./apps/server/src/public')}},
      //   properties: {key: 'logo'},
      // })],
    },
    navigation: {
      icon: 'Partnership'
    }
  },
}
