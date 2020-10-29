import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Request from '../utils/request';
import ResultBean from '../utils/request/ResultBean';

interface CustomTableProps {
    api?:string, // 异步请求数据必须
    method?:string, // 异步请求默认GET
    params?:object, // 请求的数据源
    data?:[], // 同步数据源
    columns:ColumnsType<never>, // 数据列
    pagination?:boolean, // 是否需要分页 默认需要
    [key:string]:any
}

const CustomTable:React.FC<CustomTableProps> = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const {
    api, data, method = 'GET', params = {}, columns, pagination = true, ...other
  } = props;

  const getData = async () => {
    const ret = await Request.SendRequest(method, api || '', params || {});
    if (ret.isSuccess) {
      // 根据实际的后台返回 进行改动
      const { list } = ret.data;
      setDataSource(list);
    } else {
      // message.warn(ret.message);
    }
  };

  useEffect(() => {
    if (api) {
      getData();
    } else if (!data) {
      throw new Error('同步数据 data 必须是数组');
    } else {
      setDataSource(data);
    }
  }, []);

  return (
    <>
      <Table dataSource={dataSource} columns={columns} {...other} />
    </>
  );
};

export default CustomTable;
