import { ActionContext, ActionRequest, ValidationError } from "adminjs";
import { required } from "./required";
import { unique } from "./unique";
import { Resource } from "@adminjs/typeorm";

export const validate = async (request: ActionRequest, context: ActionContext & {resource: Resource}) => {
  if(request.method === 'get') return request

  const requiredColumns = await required(request, context)
  const uniqueColumns = await unique(request, context)
  const errors = {...uniqueColumns, ...requiredColumns}

  if (Object.keys(errors).length) throw new ValidationError(errors)
  else return request
}
