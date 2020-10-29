import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import React, { useEffect, forwardRef, useState } from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import { useForm } from 'antd/es/form/Form';

export interface ModalElementProps {
    component?:any,
    maskClose?:Boolean,
    complete:Function,
    openSuccess?:Function,
    title?:string, // 弹框标题
    oKText?:string,
    cancelText?:string,
    hideBottom?:boolean
}
const ModalElement = forwardRef((props: ModalElementProps, ref: any) => {
  const [form] = useForm();
  const Component = props?.component;
  const MaskClose = props?.maskClose;
  const complete = props?.complete;
  const title = props?.title;
  const oKText = props.oKText || '提交';
  const cancelText = props.cancelText || '关闭';
  const [open, setOpen] = useState(true);
  const [hideBottom] = useState(props.hideBottom || false);

  /**
     * 取消按钮
     */
  function cancel(isMask = true) {
    if (!MaskClose && isMask) return;
    close(false);
  }

  /**
     * 确定按钮
     */
  function ok() {
    close(true);
  }

  /**
     * 关闭弹框
     */
  function close(result: Boolean) {
    setOpen(false);
    complete(result);
  }

  if (!open) return null;

  return (
    <div
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)',
      }}
      onClick={() => cancel(false)}
    >
      <div
        style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', backgroundColor: '#fff', padding: 10,
        }}
        onClick={(e) => {
          // 阻止事件冒泡
          e.stopPropagation();
        }}
      >

        <div className="modal-header">
          <div className="modal-header-title">
            {title || 'test'}
          </div>
          <div style={{ cursor: 'pointer' }} title="关闭" onClick={() => close(false)}>
            <CloseOutlined />
          </div>
        </div>

        <Divider />

        {/* eslint-disable-next-line max-len */}
        <Component form={form} openSuccess={props?.openSuccess} cancel={cancel} ok={ok} {...props} />

        <Divider />

        {!hideBottom && (
        <div className="modal-bottom">
          <Button onClick={() => close(false)}>{cancelText}</Button>
          <Button
            onClick={() => {
              form?.submit?.();
            }}
            type="primary"
            style={{ marginLeft: 10 }}
          >
            {oKText}
          </Button>
        </div>
        )}

      </div>
    </div>
  );
});

export interface ObjectMap {
    [propName:string]:any
}

class Modal {
    complete: any;

    /**
     * 异步打开弹框
     * openSuccess 打开成功回调
     * tips 如打开的component 用到了redux  不能直接用 useXXX 的方法
     *      可以用store 代替
     */
    async openComponent(component:React.FC, params?: ObjectMap, openSuccess?:Function) {
      const modalDiv = this.createModalDiv();
      return new Promise((ps) => {
        this.complete = ps;
        // eslint-disable-next-line max-len
        ReactDOM.render(<ModalElement component={component} openSuccess={openSuccess} {...params} complete={this.complete} />,
          modalDiv);
        return this;
      });
    }

    createModalDiv = () => {
      const modalDiv = document.createElement('div');
      modalDiv.className = 'modal';
      document.getElementById('App')?.append(modalDiv);
      return modalDiv;
    };
}

function UseModal() {
  return new Modal();
}

export default UseModal;
