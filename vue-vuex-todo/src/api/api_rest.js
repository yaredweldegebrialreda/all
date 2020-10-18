
import NET from './api'
import CONFIG from '../config/config'

async function run(param, name) {
  let prop = {
    method: 'POST',
    url: CONFIG.proxy.url + name,
    data: param
  }

  let ret = await NET.request(prop);

  return ret;
}

const API = {
  run: run
}

export default API;
