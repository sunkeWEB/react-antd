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
import CustomForm from "./components/CustomForm";
import { Button } from 'antd'
const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

function App() {
  const column = [{title: "标题", dataIndex: "title"},{title: "标题", dataIndex: "title"}];

    // @ts-ignore
    const onFinish = values => {
        console.log('Success:', values);
    };

    // @ts-ignore
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

  return (
      <Provider  store={store}>
        <div className="App">
          <Router>
              <div>
                  <div>头部</div>
                  <CustomForm onFinish={onFinish}
                              onFinishFailed={onFinishFailed} {...layout} row={[]}  initialValues={{ username: "12121" }}>
                      <Button type="primary" htmlType="submit">
                          Submit
                      </Button>
                  </CustomForm>
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
