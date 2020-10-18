import license from "./license.js";
const config = {
  auth: {
    license: license
  },
  proxy: {
    url: "http://127.0.0.1:22000",
    // url: "http://127.0.0.1:22000"
  },
  stream: {
    url: "http://127.0.0.1:22003"

    // url: "http://127.0.0.1:22003"
  }
}

export default config;


