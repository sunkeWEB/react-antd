import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from './redux/store'

const Home = () => {
    const dispatch = useDispatch();
    const name = useSelector((state:RootStore) => {
        return state.name;
    })

    useEffect(()=>{
        // console.log("name改变：",name)
    },[name])

    function add () {
        dispatch({
            type:"add",
            name: Math.random() + ""
        })
    }

    return (
        <div onClick={add}>
            hello，{name}
        </div>
    )
}

export default Home
