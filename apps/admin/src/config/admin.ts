import { componentLoader } from "../components/component-loader";
import { PlatformAdmin } from "../models/PlatformAdmin";
import { CountryAdmin } from "../models/CountryAdmin";
import { PartnerAdmin } from "../models/PartnerAdmin";
import { PublicationAdmin } from "../models/PublicationAdmin";
import { NewsAdmin } from "../models/NewsAdmin";
import { TagAdmin } from "../models/TagAdmin";
import { AdminJSOptions, PageContext } from "adminjs";
import { en } from "../i18n/en";
import { influenzaNet } from "../themes/influenzaNet";


export const adminConfiguration : AdminJSOptions = {
  rootPath: '/admin',
  loginPath: '/admin/login',
  componentLoader: componentLoader,
  dashboard: {
    component: 'Dashboard'
  },
  resources: [
    PlatformAdmin,
    CountryAdmin,
    PartnerAdmin,
    PublicationAdmin,
    NewsAdmin,
    TagAdmin
  ],
  locale: {
    language: 'en',
    availableLanguages: ['en'],
    fallbackLng: "en",
    translations: {en},
    debug: false
  },
  branding: {
    companyName: 'InfluenzaNet',
    logo: '/assets/img/logo/influenzaNet/influenzanet_logo.png',
    withMadeWithLove: false,
  },
  assets: {
    styles: ['/assets/css/admin.css'],
  },
  defaultTheme: influenzaNet.id,
  availableThemes: [influenzaNet],
}
