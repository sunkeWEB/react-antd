import React from 'react'
import Home from '../Home'
import NotFount from '../pages/error/NotFount';
import Login from '../pages/Login';
import ProjectAdd from "../ProjectAdd";
import ProjectView from "../ProjectView";

export interface RouterConfig {
    path:string,
    authKey?:string, // 如果有值 检查权限
    component?:React.FC,
    childers?:RouterConfig[]
}

const RouterMap:RouterConfig[] = [
    {
        path:"/",
        component:Home
    },
    {
        path:"/project",
        // authKey:"project",
        childers:[
            {
                path:"/list/:id",
                component:ProjectView
            },
            {
                path:"/add",
                authKey:"project",
                component:ProjectAdd
            }
        ]
    },
    {
        path:'/login',
        component:Login
    },{
    path:"*",
        component:NotFount
    }
]


export default RouterMap;
