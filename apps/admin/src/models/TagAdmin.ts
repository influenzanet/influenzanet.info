import {Tag} from "@models/Tag";
import { validate } from "./validators/validate";
import type { ResourceWithOptions } from "adminjs";
import { elementsPerPage } from "./helpers/helpers";


export const TagAdmin : ResourceWithOptions = {
  resource: Tag,
  options: {
    titleProperty: 'label',
    properties: {
      id: { isVisible: false },
      label: {
        type: 'string',
        custom: {isRequired: true}
      }
    },
    actions: {
      show: {isAccessible: false},
      edit: {showInDrawer:true, before: validate},
      new: {before: validate},
      list: {
        before: elementsPerPage
      }
    },
    sort: {
      sortBy: 'label',
      direction: 'desc',
    },
    navigation: {
      icon: 'Tag'
    }
  },
}
