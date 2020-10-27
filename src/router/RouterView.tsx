import React from 'react'
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import RouterMap,{RouterConfig} from "./index";
import NotFount from '../pages/error/NotFount';


const CreateBasicRouter:any = (path:string,component=NotFount,authKey?:string,beforeEnter?:Function) =>{
    if (authKey && beforeEnter && typeof beforeEnter == "function" && !beforeEnter(path)) {
        return <Redirect  to={"/login"}/>;
    }
    return <Route exact={true} path={path} component={component} key={path}  />;
}

const CreateTreeRouter:React.FC|any = (rootPath:string,childers:RouterConfig[],authKey?:string,beforeEnter?:Function) => {
    let dom:React.FC[] = [];
    for (let i = 0; i < childers.length; i++) {
        const {childers: subChilders, path: subPath,component,authKey:subAuthKey} = childers[i];
        if (subChilders?.length) {
            let t =  CreateTreeRouter(rootPath+subPath,subChilders,subAuthKey?subAuthKey:authKey,beforeEnter)
            dom = [...dom, ...t];
        }
        const t = CreateBasicRouter(rootPath + subPath, component,subAuthKey?subAuthKey:authKey,beforeEnter)
        dom.push(t);
    }
    return <Route path={rootPath} key={rootPath+1}><Switch>{dom}</Switch></Route>;
}

export interface RouterViewConfig {
    beforeEnter?:Function,  // 功能类似导航守卫
}

const RouterView:React.FC<RouterViewConfig> = ({beforeEnter}:RouterViewConfig) => {
    return <Switch>
        {RouterMap.map((v:RouterConfig)=>{
            const {path,component,childers,authKey} = v;
            if (childers?.length) {
                return CreateTreeRouter(path,childers,authKey,beforeEnter)
            }
            return CreateBasicRouter(path,component,authKey,beforeEnter)
        })}
    </Switch>
}

export default RouterView;