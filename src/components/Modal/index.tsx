import React from 'react';
import { forwardRef, useState } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

export interface ModalElementProps {
    component?:any,
    maskClose?:Boolean,
    complete:Function
}
const ModalElement = forwardRef((props: ModalElementProps, ref: any) => {
    const Component = props?.component;
    const MaskClose = props?.maskClose;
    const complete = props?.complete;
    const [open, setOpen] = useState(true);

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
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)" }} onClick={() => cancel(false)}>
            <div style={{ position: 'absolute', left: "50%", top: "50%", transform: "translate(-50%,-50%)", backgroundColor: "#fff", padding: 10 }}>
                <Component cancel={cancel} ok={ok} {...props} />
            </div>
        </div>
    )
})

export interface ObjectMap {
    [propName:string]:any
}

class Modal {

    complete: any;

    /**
     * 异步打开弹框
     *
     * tips 如打开的component 用到了redux  不能直接用 useXXX 的方法
     *      可以用store 代替
     */
    async openComponent (component:React.FC, params?: ObjectMap) {
        const modalDiv = this.createModalDiv();
        return new Promise(ps=>{
            this.complete = ps;
            ReactDOM.render(<ModalElement component={component} {...params} complete={this.complete} />,modalDiv)
            return this;
        })
    }

    createModalDiv() {
        const modalDiv = document.createElement("div");
        modalDiv.className = "modal";
        document.getElementById("App")?.append(modalDiv);
        return modalDiv;
    }

}

function UseModal () {
    return new Modal();
}

export default UseModal;