import {News} from "@models/News";
import { validate } from "./validators/validate";
import { ResourceWithOptions } from "adminjs";
import { elementsPerPage } from "./helpers/helpers";


export const NewsAdmin : ResourceWithOptions = {
  resource: News,
  options: {
    titleProperty: 'title',
    properties: {
      id: { isVisible: false },
      title: {
        type: 'string',
        position: 10,
        props:{
          maxLength: 100,
        },
        isSortable: true,
        custom: {isRequired: true}
      },
      publicationDate: {
        type: 'date',
        position: 20,
        isSortable: true
      },
      tagId:{
        position: 30,
        isSortable: true
      },
      content: {
        type: 'richtext',
        isVisible: {list: false, show: true, edit: true},
        position: 40,
        isSortable: true,
        custom: {isRequired: true}
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
      icon: 'Send'
    }
  },
}
