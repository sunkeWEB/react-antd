import React from 'react';
import {
  Form, Input, DatePicker, Switch,
} from 'antd';
import { FormItemProps, FormProps, Rule } from 'antd/es/form';
import { FieldData } from 'rc-field-form/lib/interface';
import CustomSelect from './CustomSelect';
import CustomUpload from './CustomUpload';

export interface CustomFormRowsProps extends FormItemProps{
    type:string,
    render?:React.FC,
    placeholder?:string,
    params?:object, // 渲染组件的参数
    rules?:Rule[],
    initialValues?:any
}

export interface CustomFormProps extends FormProps{
    rows:CustomFormRowsProps[],
    fields?:FieldData[]
}

interface O {
    [key:string]:any
}

/**
 * 理论上支持antd 所有组件
 * 只需要自己扩展就行
 */
const FormItemTypeMap:O = {
  input: Input,
  select: CustomSelect,
  upload: CustomUpload,
  datePicker: DatePicker,
  switch: Switch,
};

const CreateFormItem:React.FC<CustomFormRowsProps> = (v:CustomFormRowsProps) => {
  const {
    type, render, params, rules = [], ...other
  } = v;
  const Com = FormItemTypeMap[type];

  if (render) { // 自定义渲染
    const Render = render;
    return <Render />;
  }
  if (!Com) {
    return (
      <div>
        配置错误，无
        {type}
        类型组件。
      </div>
    );
  }
  return (
    <Form.Item {...other} rules={rules} key={v.type}>
      <Com {...params} {...other} />
    </Form.Item>
  );
};

const CustomForm:React.FC<CustomFormProps> = (props) => {
  const { rows } = props;
  return (
    <Form {...props}>
      {rows.map((v:CustomFormRowsProps) => CreateFormItem(v))}
      {props.children}
    </Form>
  );
};

export default CustomForm;
