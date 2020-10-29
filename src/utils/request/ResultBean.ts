import { message as AntdMessage } from 'antd';
import code from './ResultCode';

export default class ResultBean {
    code='0';

    private _data:any;

    private _message='';

    // eslint-disable-next-line no-shadow
    constructor(code?:string, data?:any, message?:any) {
      if (code) this.code = code;
      this.data = data;
      this.message = message;
    }

    Success(data:any, message?:any) {
      this.message = message || data?.msg;
      this.code = data?.code || code.SUCCESS;
      this.data = data;

      if (this.message) {
        if (this.isSuccess) {
          // AntdMessage.success(this.message);
        } else {
          AntdMessage.error(this.message);
        }
      }

      return this;
    }

    Fail(message?:any) {
      this.message = message;
      this.data = null;
      this.code = code.FAIL;

      if (message) {
        AntdMessage.error(message);
      }

      return this;
    }

    get isSuccess():boolean {
      return this.code === code.SUCCESS;
    }

    get message() {
      // eslint-disable-next-line no-underscore-dangle
      return this._message;
    }

    set message(msg) {
      // eslint-disable-next-line no-underscore-dangle
      this._message = msg;
    }

    get data() {
      // eslint-disable-next-line no-underscore-dangle
      if (this._data) return this._data;
      return null;
    }

    set data(data) {
      if (!data) return;
      if (data.message) this.message = data.message;
      if (data.code) this.code = data.code;
      // eslint-disable-next-line no-underscore-dangle
      if (data.data) this._data = data.data;
      else {
        // eslint-disable-next-line no-underscore-dangle
        this._data = data;
      }
    }
}
