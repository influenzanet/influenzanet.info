import { AuthenticationOptions } from "@adminjs/express";

export const authenticationOptions: AuthenticationOptions = {
  authenticate: async (email, password) =>{
    const adminUser = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASSWORD;
    return email === adminUser && password === adminPassword
      ? Promise.resolve({email: adminUser, password: adminPassword})
      : null
  },
  cookieName: 'adminjs',
  cookiePassword: 'sessionsecret',
}
