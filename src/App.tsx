import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import RouterView from './router/RouterView';
import reducer from './redux/reducer';
import './App.css';
import 'antd/dist/antd.css';
import CustomForm, { CustomFormRowsProps } from './components/CustomForm';
import UseModal from './components/Modal';
import Request from './utils/request';

const AddUser:React.FC = (props:any) => {
  const onFinish = (values:object) => {
    console.log('Success:', values);
    props?.ok();
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
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
function App() {
  const modal = UseModal();
  return (
    <Provider store={store}>
      <div id="App">
        <Router>
          <div>
            <div onClick={async () => {
              await modal.openComponent(AddUser, { name: '添加用户' }, () => {
                console.log('s');
              });
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
