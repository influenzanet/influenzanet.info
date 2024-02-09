import { ErrorTypeEnum } from "adminjs";
import type { ActionContext, ActionRequest } from "adminjs";
import type { Resource } from "@adminjs/typeorm";


export const required = async (request: ActionRequest, context:ActionContext & {resource: Resource}) => {
  const payload = request.payload
  const resource: Resource = context.resource
  const properties = resource.properties()

  // Filter only the columns that need to be validated
  const columns = properties.filter((property: any) => {
    let noDefaultValue = property.column.default === undefined
    let notBoolean = property.type() !== 'boolean'
    let notPrimary = !property.isId()
    return notPrimary && noDefaultValue && notBoolean
  })

  // Generate the error object
  return columns.reduce((acc:any, property:any)=>{
    const propertyName = property.name()
    const entityName = resource.id()
    if (!property.column.isNullable && !payload[propertyName]) {
      acc[propertyName] = {message: `This field is required`, type: ErrorTypeEnum.Validation}
    }
    return acc
  }, {})
}
