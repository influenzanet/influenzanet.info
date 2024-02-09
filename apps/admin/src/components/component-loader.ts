import { ComponentLoader } from "adminjs";


export const componentLoader: ComponentLoader = new ComponentLoader();
export const CustomComponents = {
  Dashboard: componentLoader.add('Dashboard', './components/Dashboard.tsx'),
  RichText: componentLoader.override('DefaultRichtextEditProperty', './components/TinyMCE.tsx'),
  Label: componentLoader.override('PropertyLabel', './components/CustomLabel.tsx'),
  Login: componentLoader.override('Login', './components/Login.tsx'),
}
