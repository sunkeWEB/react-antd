import code from "./ResultCode";

import {message as AntdMessage} from "antd";

export default class ResultBean{
    code:string="0";
    private _data:any;
    private _message="";
    constructor(code?:string,data?:any,message?:any){
        if(code)this.code = code;
        this.data = data;
        this.message = message;
    }
    Success(data:any,message?:any){
        this.message = message || data?.msg;
        this.code = data?.code || code.SUCCESS;
        this.data = data;

        if(this.message){
            if(this.isSuccess){
                // AntdMessage.success(this.message);
            }else{
                AntdMessage.error(this.message);
            }
        }
     
        return this;
    }
    Fail(message?:any){
        this.message = message;
        this.data=null;
        this.code = code.FAIL;

        if(message){
            AntdMessage.error(message);
        }

        return this;
    }
    get isSuccess():boolean{
        return this.code == code.SUCCESS;
    }
    get message(){
        return this._message;
    }
    set message(msg){
        this._message = msg; 
    }
    get data(){
        if(this._data)return this._data;
        return null;
    }
    set data(data){
       if(!data)return;
       if(data.message)this.message = data.message;
       if(data.code)this.code = data.code;

       if(data.data)this._data = data.data;
       else this._data = data;
    }
}