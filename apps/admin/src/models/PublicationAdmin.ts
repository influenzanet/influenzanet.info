// import {ResourceWithOptions} from "adminjs/types/src/adminjs-options.interface";
import { Publication } from "@models/Publication";
import { validate } from "./validators/validate";
import { ResourceWithOptions } from "adminjs";
import { elementsPerPage } from "./helpers/helpers";


export const PublicationAdmin : ResourceWithOptions = {
  resource: Publication,
  options: {
    titleProperty: 'title',
    properties: {
      id: { isVisible: false },
      title: {
        type: 'string',
        custom: {isRequired: true}
      },
      authors: {
        type: 'string',
        custom: {isRequired: true}
      },
      publisher: {
        type: 'string',
        custom: {isRequired: true}
      },
      publicationDate: {
        type: 'date',
        custom: {isRequired: true}
      },
      url: {
        type: 'string',
      },
    },
    actions: {
      show: {isAccessible: false},
      edit: {before: validate},
      new: {before: validate},
      list: {before: elementsPerPage}
    },
    sort: {
      sortBy: 'publicationDate',
      direction: 'desc',
    },
    navigation: {
      icon: 'Book'
    }
  },
}
