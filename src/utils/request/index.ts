import http from './httpRequest';
import config from '../../config';
import ResultBean from './ResultBean';

// 网络请求工具类
export default class Request {
  /**
     * Get请求
     * */
  static Get(url:string, data = {}) {
    return http.request('get', url, data);
  }

  /**
     * Post请求
     * */
  static Post(url:string, data = {}) {
    return http.request('post', url, data);
  }

  /**
     * FormData
     * */
  static FormData(url:string, data:FormData | {[key:string]:any}) {
    // eslint-disable-next-line no-underscore-dangle
    let _data;
    if (data instanceof FormData) {
      _data = data;
    } else {
      const fm = new FormData();
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const k in data) {
        let val = data[k];
        if (val instanceof Object)val = JSON.stringify(val);
        fm.append(k, val);
      }
      _data = fm;
    }
    return http.request('post', url, _data);
  }

  /**
     * 根据 method字符串 请求
     */
  static SendRequest(method:string, api:string, data:any):Promise<ResultBean> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const send = RequestMethodMap[method.toLocaleLowerCase()];
    if (!send) {
      throw new Error('不支持的请求方式');
    }
    return send(api, data);
  }
}

export const RequestMethodMap = {
  get: Request.Get,
  post: Request.Post,
};
