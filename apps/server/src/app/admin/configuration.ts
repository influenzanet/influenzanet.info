import {PlatformAdmin} from "./models/PlatformAdmin";
import {CountryAdmin} from "./models/CountryAdmin";
import {PartnerAdmin} from "./models/PartnerAdmin";
import {PublicationAdmin} from "./models/PublicationAdmin";
import { AdminModuleOptions } from "@adminjs/nestjs";
import { ConfigService } from "@nestjs/config";


export const adminConfigurationFactory = (configService: ConfigService)=>{
  return <AdminModuleOptions>{
    // https://github.com/SoftwareBrothers/adminjs-typeorm/blob/master/example-app/src/index.ts
    adminJsOptions: {
      rootPath: '/admin',
      resources: [
        PlatformAdmin,
        CountryAdmin,
        PartnerAdmin,
        PublicationAdmin
      ],
      locale: {
        language: 'en',
        translations: {
          labels: {
            Platform: 'Platform (Teams)',
          },
          resources: {
            Platform: {
              properties: {
                countryId: 'Country'
              }
            }
          }
        },
      },
      branding: {
        companyName: 'InfluenzaNet',
        logo: '/public/influenzanet_logo.png',
      },
      assets: {
        styles: ['/public/css/admin.css'],
      },
    },
    auth: {
      authenticate: async (email, password) =>{
        const adminUser = configService.get('ADMIN_USER', 'admin')
        const adminPassword = configService.get('ADMIN_PASSWORD', 'password');
        return email === adminUser && password === adminPassword
          ? Promise.resolve({email: adminUser, password: adminPassword})
          : null
      },
      cookieName: 'influenzaNet-AuthToken',
      cookiePassword: 'testPass',
    },
    sessionOptions: {
      resave: true,
      saveUninitialized: true,
      secret: 'secret'
    },
  }

}



