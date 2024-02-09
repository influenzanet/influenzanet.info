import { ActionContext, ActionRequest, BaseRecord, ErrorTypeEnum, Filter } from "adminjs";
import type { Resource } from "@adminjs/typeorm";
// @ts-ignore
import type { IndexMetadata } from "typeorm";
// @ts-ignore
import type { Property } from "@adminjs/typeorm/lib/Property";


export const unique = async (request: ActionRequest, context: ActionContext & {resource: Resource}) => {
  // Only check for actions that require unique validation
  if(!['edit', 'new'].includes(request.params.action)) return {};

  // Get resource and properties
  const resource: Resource = context.resource
  const properties: Property[] = resource.properties()

  // Get field that should be unique
  const columns = properties.filter((property: Property) => {
    const hasPayload = request.payload[property.name()] !== undefined
    const shouldBeUnique = property.column.entityMetadata.ownIndices
      .some((index:IndexMetadata) => index.isUnique && index.columns.length === 1 && index.columns[0].propertyName === property.name())
    return hasPayload && shouldBeUnique
  })

  const errors = {}
  // Check which fields are not unique and add error
  for (const property of columns) {
    const propertyName = property.name()
    const entityName = resource.id()
    const where = {[propertyName]: request.payload[propertyName]}

    // Check for unique
    let uniqueQuery = await resource.find(new Filter(where, resource), {sort: {sortBy: 'id'}})
    const notUnique = uniqueQuery.filter(record => record.id().toString() !== (request.params.recordId || -1)).length > 0

    if (notUnique) errors[propertyName] =
      {message: `A ${ entityName } with the same field already exists`, type: ErrorTypeEnum.Validation }
  }

  return errors
}
