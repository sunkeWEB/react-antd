import http from "./httpRequest";
import config from "../../config";

// 网络请求工具类
export default class Request{
    /**
     * Get请求
     * */ 
    static Get(url:string,data={}){
        return http.request("get",url,data);
    }
    /**
     * Post请求
     * */ 
    static Post(url:string,data={}){
        return http.request("post",url,data);
    }
    /**
     * FormData
     * */
    static FormData(url:string,data:FormData | {[key:string]:any}){
       let _data;
       if(data instanceof FormData){
           _data = data;
       }else{
          let fm = new FormData();
          for(let k in data){
              let val = data[k];
              if(val instanceof Object)val = JSON.stringify(val);
              fm.append(k,val);
          }
          _data = fm;
       }
       return http.request("post",url,_data);
    } 
} 