import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RouterMap, { RouterConfig } from './index';
import NotFount from '../pages/error/NotFount';

// eslint-disable-next-line max-len
const CreateBasicRouter:any = (path:string, component = NotFount, authKey?:string, beforeEnter?:Function) => {
  if (authKey && beforeEnter && typeof beforeEnter === 'function' && !beforeEnter(path)) {
    return <Redirect key={Math.random() + path} to="/login" />;
  }
  return <Route exact path={path} component={component} key={path} />;
};

// eslint-disable-next-line max-len
const CreateTreeRouter:React.FC|any = (rootPath:string, childers:RouterConfig[], authKey?:string, beforeEnter?:Function) => {
  let dom:React.FC[] = [];
  for (let i = 0; i < childers.length; i += 1) {
    const {
      childers: subChilders, path: subPath, component, authKey: subAuthKey,
    } = childers[i];
    if (subChilders?.length) {
      // eslint-disable-next-line max-len
      const t = CreateTreeRouter(rootPath + subPath, subChilders, subAuthKey || authKey, beforeEnter);
      dom = [...dom, ...t];
    }
    const t = CreateBasicRouter(rootPath + subPath, component, subAuthKey || authKey, beforeEnter);
    dom.push(t);
  }
  return <Route path={rootPath} key={rootPath}><Switch>{dom}</Switch></Route>;
};

export interface RouterViewConfig {
    beforeEnter?:Function, // 功能类似导航守卫
}

const RouterView:React.FC<RouterViewConfig> = ({ beforeEnter }:RouterViewConfig) => (
  <Switch>
    {RouterMap.map((v:RouterConfig) => {
      const {
        path, component, childers, authKey,
      } = v;
      if (childers?.length) {
        return CreateTreeRouter(path, childers, authKey, beforeEnter);
      }
      return CreateBasicRouter(path, component, authKey, beforeEnter);
    })}
  </Switch>
);

export default RouterView;
