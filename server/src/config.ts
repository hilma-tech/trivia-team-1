import { AuthConfig } from "@hilma/auth-nest";

export default (): AuthConfig => ({
  auth: {
    ttl: {
      User: 1000 * 60 * 60 * 3, // 3 hours
    },

    accessToken_cookie: "banQui",
    secretOrKey: process.env.JWT_SECRET,
  },
  roleAccess: {
    // User: {
    //   components: ["User"],
    //   defaultHomePage: "Home",
    // },
  },
});