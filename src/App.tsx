import React from 'react'
import {BrowserRouter as Router,} from 'react-router-dom'
import {createDispatchHook, createSelectorHook, createStoreHook, Provider} from "react-redux"
import thunk from 'redux-thunk'
import {createStore,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import RouterView from "./router/RouterView";
import reducer from './redux/reducer'
import './App.css';
import CustomTable from "./components/CustomTable";
import 'antd/dist/antd.css';
import CustomForm, { CustomFormRowsProps } from "./components/CustomForm";
import { Button } from 'antd'
import CustomSelect from './components/CustomSelect'
import CustomUpload from "./components/CustomUpload";
import UseModal from "./components/Modal";
import Home from "./Home";

/**
 * 非hooks 组件 使用 store 即可获得同样效果
 */
export const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    // horizontal:true
};

function App() {

   const modal =  UseModal();
  const column = [{title: "标题", dataIndex: "title"},{title: "标题", dataIndex: "title"}];

    const onFinish = (values:any) => {
        console.log('Success:', values);
    };

  const onFinishFailed = (errorInfo:any) => {
     console.log('Failed:', errorInfo);
  };

  const rows:CustomFormRowsProps[] = [{type: "input",name:"username", placeholder: "请输入姓名",rules:[{ required: true, message: 'Please input your username!' }]}];

  const t = [{name: "张三", value: 10}];
    return (
      <Provider store={store}>
        <div id="App">
          <Router>
              <div>
                  <CustomUpload api={"sds"} filed={"file"} />

                  <div onClick={async()=>{
                      const ret = await modal.openComponent(Home,{name:"sunke"});
                      console.log("ret", ret);
                  }}>头部</div>
                  <CustomForm rows={rows} name="basic"
                               onFinish={onFinish}
                              onFinishFailed={onFinishFailed} {...layout} >
                      <Button type="primary" htmlType="submit">
                          Submit
                      </Button>
                  </CustomForm>
                  <CustomSelect  label={"name"} value={"value"} data={t} onChange={(e:any,v:any)=>console.log(e,v)}/>
                  <CustomTable columns={column} api={"examination/page"} method={"get"} size={'small'} />
                  <RouterView beforeEnter={(path:string)=>{
                      return path !== "/project/add";
                  }} />
              </div>
          </Router>
        </div>
      </Provider>
  );
}

export default App;
