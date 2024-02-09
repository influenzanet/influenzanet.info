import {Country} from "@models/Country";
import { validate } from "./validators/validate";
import { ResourceWithOptions } from "adminjs";
import { elementsPerPage } from "./helpers/helpers";

export const CountryAdmin : ResourceWithOptions = {
  resource: Country,
  options: {
    titleProperty: 'name',
    properties: {
      id: { isVisible: false },
      name: {
        type: 'string',
        isSortable: true,
        custom: {isRequired: true}
      },
      hidden:{
        type: 'boolean',
        isSortable: true,
      },
    },
    actions: {
      show: {isAccessible: false},
      edit: {showInDrawer:true, before: validate},
      new: {before: validate},
      list: {before: elementsPerPage}
    },
    navigation: {
      // icon: 'EarthFilled'
      icon: 'Globe'
    }
  },
}
