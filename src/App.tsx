import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  createDispatchHook, createSelectorHook, createStoreHook, Provider,
} from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  Button, DatePicker, Form, Select,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FormInstance } from 'antd/lib/form';
import moment from 'moment';
import RouterView from './router/RouterView';
import reducer from './redux/reducer';
import './App.css';
import CustomTable from './components/CustomTable';
import 'antd/dist/antd.css';
import CustomForm, { CustomFormRowsProps } from './components/CustomForm';
import CustomSelect from './components/CustomSelect';
import CustomUpload from './components/CustomUpload';
import UseModal from './components/Modal';
import Home from './Home';
import Request from './utils/request';

const AddUser:React.FC = (props:any) => {
  const [form] = useForm();
  const onFinish = (values:any) => {
    console.log('Success:', values);
    props?.ok();
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    Request.Get('//asa', {});
    props?.openSuccess(props?.form);
  }, []);

  const rows: CustomFormRowsProps[] = [
    {
      type: 'input',
      name: 'username',
      placeholder: '请输入姓名',
      rules: [{ required: true, message: 'Please input your username!' }],
    },
    {
      type: 'select',
      name: 'age',
      placeholder: '请选择性别',
      params: { label: 'name', value: 'value', data: [{ name: '男', value: 1 }, { name: '女', value: 2 }] },
    }, {
      type: 'datePicker',
      name: 'time',
      placeholder: '请选择时间',
      rules: [{ required: true, message: 'Please input your username!' }],
      params: {
        style: {
          width: '100%',
        },
      },
    },
  ];
  return (
    <div style={{ width: 300 }}>
      <CustomForm
        form={props?.form}
        rows={rows}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...layout}
      />
    </div>
  );
};

/**
 * 非hooks 组件 使用 store 即可获得同样效果
 */
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
  // horizontal:true
};
const dateFormat = 'YYYY-MM-DD';
function App() {
  const modal = UseModal();
  const kk = () => 1;
  return (
    <Provider store={store}>
      <div id="App">
        <Router>
          <div>
            <div onClick={(e) => {
              kk();
            }}
            >
              打开弹框
            </div>
            <RouterView beforeEnter={(path:string) => path !== '/project/add'} />
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
