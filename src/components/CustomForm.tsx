import React, { ReactElement } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {FormItemProps, FormProps, Rule} from "antd/es/form";
import {FieldData} from "rc-field-form/lib/interface";

// InternalFieldProps
export interface CustomFormRowsProps extends FormItemProps{
    type:string,
    render?:React.FC,
    placeholder?:string,
    params?:object, // 渲染组件的参数
    rules?:Rule[]
}

export interface CustomFormProps extends FormProps{
    rows:CustomFormRowsProps[],
    fields?:FieldData[]
}

interface O {
    [key:string]:any
}

const FormItemTypeMap:O = {
    input:Input
}


const CreateFormItem:React.FC<CustomFormRowsProps> = (v:CustomFormRowsProps) =>{
    const {type,render,params,rules=[],...other} = v;
    const Com = FormItemTypeMap[type];

    if (render) { // 自定义渲染
        const Render = render;
        return <Render />
    }

    return (
        <Form.Item {...other} rules={rules} key={v.type}>
            <Com {...params} />
        </Form.Item>
    );
}

const CustomForm:React.FC<CustomFormProps> = (props) => {
    const {rows} = props;
    return (
        <Form {...props}>
            {rows.map((v:CustomFormRowsProps)=>{
                return CreateFormItem(v);
            })}
            {props.children}
        </Form>
    )
}

export default CustomForm;
