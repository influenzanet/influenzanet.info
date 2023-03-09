import {ResourceWithOptions} from "adminjs/types/src/adminjs-options.interface";
import {Publication} from "@models/Publication";

export const PublicationAdmin: ResourceWithOptions | any = {
  resource: Publication,
  options: {
    properties: {
      'id': { isVisible: false },
      'title': {
        type: 'string',
      },
      'authors': {
        type: 'string',
      },
      'publisher': {
        type: 'string',
      },
      'publicationDate': {
        type: 'date',
      },
      'url': {
        type: 'string',
      },
    },
    actions: {
      show: {isAccessible: false},
      edit: {showInDrawer: true},
      new: {showInDrawer: true},
      list: {
        before: async (request, context) => {
          request.query.perPage = 20;
          return request
        }
      }
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
