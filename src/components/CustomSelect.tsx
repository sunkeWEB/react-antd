import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import Request from '../utils/request';

const { Option } = Select;

interface CustomSelectProps{
    api?:string, // 后台请求数据
    method?:string, // 请求方式
    data?:any[], // 同步数据源
    onChange?:Function, // 修改之后回调
    label?:string, // option 显示字段 默认title
    value?:string, // option 默认value
    placeholder?:string, // 提示语
    name?:string,
}

const CustomSelect:React.FC<CustomSelectProps> = (props:CustomSelectProps) => {
  const {
    label = 'title', value = 'value', data = [], api, method = 'GET',
  } = props;
  const [sourceData, setSourceData] = useState([]);
  const [fieldKey] = useState(label);
  const [valueKey] = useState(value);

  const getData = async () => {
    const ret = await Request.SendRequest(method, api || '', data || {});
    if (ret.isSuccess) {
      setSourceData(ret.data);
    }
  };

  useEffect(() => {
    if (api) {
      getData();
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setSourceData(data);
    }
  }, []);

  return (
    <Select {...props} placeholder={props.placeholder} style={{ width: '100%' }} onChange={(e, v) => props?.onChange?.(e, v)}>
      {sourceData.map((v:any) => {
        const labels = v[fieldKey];
        const values = v[valueKey];
        return (
          <Option key={values} value={values}>{labels}</Option>
        );
      })}
    </Select>
  );
};

export default CustomSelect;
