// @ts-ignore
import { Label } from '@adminjs/design-system';
import { useTranslation } from "adminjs";


const CustomLabel = (props:any)=>{
  let {property} = props
  const { translateProperty } = useTranslation()

  let name = property?.name
  let required = property?.custom?.isRequired
  let label = translateProperty(property?.label, property?.resourceId)
  return (<Label htmlFor={name} required={required}>{label}</Label>)
}

export default CustomLabel
