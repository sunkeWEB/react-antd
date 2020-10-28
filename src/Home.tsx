import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from './redux/store'
import {store} from "./App";

const Home = (props:any) => {
    const dispatch = store.dispatch;
    // const name = useSelector((state: RootStore) => {
    //     return state.name;
    // });
    //
    // useEffect(()=>{
    //     // console.log("name改变：",name)
    // },[name])
    //
    // function add () {
    //     dispatch({
    //         type:"add",
    //         name: Math.random() + ""
    //     })
    // }

    return (
        <div onClick={()=>{
            props.ok()
        }}>
            hello,{props.name}

        </div>
    )
}

export default Home
