import { GetProp, Image, Upload, UploadFile, UploadProps, message } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
// import { IGallery } from '@/models/gallery';
// import { galleryAPI } from '@/apis/upload';

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type Props = {
  onChange?: (urls: string[]) => void;
  value: string[];
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadMultipleFile = (props: Props) => {
  const { onChange, value } = props;
  const { t } = useTranslation();
  const [link, setLink] = useState<UploadFile[]>([]);

  useEffect(() => {
    setLink(
      value?.map((url, idx) => ({
        uid: `id-${idx}`,
        name: `image-${idx}`,
        status: "done",
        url: `${url}`,
      }))
    );
    setUrl(value);
  }, []);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [url, setUrl] = useState<string[]>(value);

  const handleUpload = async (file: any) => {
    try {
      // const res: IGallery = await galleryAPI.upload({ file });
      // if (res) {
      //   onChange && onChange([...url, res.url]);
      //   setUrl((prev) => [...prev, res.url]);
      //   setLink((prev) => [
      //     ...prev,
      //     { uid: res.id, name: res.name, status: 'done', url: `${res.url}` },
      //   ]);
      // }
    } catch (error) {}
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      return message.error(t("You can only upload JPG/PNG file!"));
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      return message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = (info) =>
    handleUpload(info.file.originFileObj);
  return (
    <div>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={link}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload as any}
      >
        <button style={{ border: 0, background: "none" }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default React.memo(UploadMultipleFile);
