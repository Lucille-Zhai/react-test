import { Request } from 'util';
import urlSearch from 'url-search-params-polyfill';

const Api = {

  getExpressDate: async (args) => {
    const opts = {
      url: `/order/express/datelist`,
    };
    return await Request(opts, []);
  }
};

export default Api;