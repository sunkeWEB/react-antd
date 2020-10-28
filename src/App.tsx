import React from 'react'
import {BrowserRouter as Router,} from 'react-router-dom'
import {Provider} from "react-redux"
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
      <Provider  store={store}>
        <div className="App">
          <Router>
              <div>
                  <div>头部</div>
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
