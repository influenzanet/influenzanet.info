import {ResourceWithOptions} from "adminjs/types/src/adminjs-options.interface";
import {Country} from "@models/Country";

export const CountryAdmin: ResourceWithOptions | any = {
  resource: Country,
  options: {
    properties: {
      'id': { isVisible: false },
      'name': {
        type: 'string',
      },
    },
    actions: {
      show: {isAccessible: false},
      edit: {showInDrawer: true},
    },
    navigation: {
      icon: 'EarthFilled'
    }
  },
}
