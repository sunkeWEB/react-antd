import React from 'react';
import Home from '../Home';
import NotFount from '../pages/error/NotFount';
import Login from '../pages/Login';

export interface RouterConfig {
    path:string,
    authKey?:string, // 如果有值 检查权限
    component?:React.FC,
    childers?:RouterConfig[]
}

const RouterMap:RouterConfig[] = [
  {
    path: '/',
    component: Home,
  }, {
    path: '/login',
    component: Login,
  }, {
    path: '*',
    component: NotFount,
  },
];

export default RouterMap;
