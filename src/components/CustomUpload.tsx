import React, {useEffect, useState} from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Request from "../utils/request";

interface CustomUploadProps {
    api?:string,// 上传接口
    filed?:string, // 自动上传form-mate 字段
    onUpload?:Function, // 上传回调
    onChange?:Function, // 修改回调
}

const CustomUpload:React.FC<CustomUploadProps> = (props) => {
    const {api,filed,onUpload} = props;
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const uploadSubmit =  async () => {
        const formData = new FormData();
        setLoading(true)
        formData.append(filed || "", "");
        const ret = await Request.FormData(api||"", formData);
        if (!ret.isSuccess) {
            return message.warn(ret.message);
        }
        setLoading(false);
        onUpload && onUpload(ret);
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={(e)=>{
                    uploadSubmit();
                    props?.onChange?.(e)
                }}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </>
    )
}

export default CustomUpload;
