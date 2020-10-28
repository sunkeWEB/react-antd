import axios from "axios";
import ResultBean from "./ResultBean";
import Config from "../../config";
// import User from "../User";
import {store} from '../../App'

let User:any = null;
const serverIp = Config.serverIp;
class HttpRequestUtil{
    async request(method: any, url: string, data?: any): Promise<ResultBean> {
        const {dispatch} = store

        dispatch({
            type:"add",
            name: Math.random() + ""
        })
        console.log("store", store);
        const instance = axios.create();
        this.interceptors(instance);
        let ret: ResultBean;
        if (method && method?.toUpperCase() == "POST") {
            ret = await instance.request({method, url, data});
        } else {
            ret = await instance.request({method, url, params: data});
        }
        return ret;
    }
    async interceptors(instance:any) {
        //请求拦截
        instance.interceptors.request.use((config:any)=>{
            config.baseURL = serverIp;
            config.headers['Content-Type'] = "application/json; charset=UTF-8";//'application/x-www-form-urlencoded';
            if(User && User.auth && User.auth.token){
               config.headers["token"] = User.auth.token;
            }
            return config;
        },(error:any)=>{

        });

        const ResBean = new ResultBean();
        // 响应拦截
        instance.interceptors.response.use((res:any) => {
             return ResBean.Success(res.data);
        }, (error:any) => {
             let msg = "连接服务器失败";
             if(error && error.message){
               msg = error.message;
             }else if(typeof(error) == "string"){
               msg = error;
             }
             return ResBean.Fail(msg);
        });

    }
}

export default new HttpRequestUtil();
