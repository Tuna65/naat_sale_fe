import { GetProp, Upload, UploadFile, UploadProps, message } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Text from "./Text";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type Props = {
  onChange: (url: string) => void;
  initLink?: string;
};

const UploadFiles = (props: Props) => {
  const { onChange, initLink } = props;
  const { t } = useTranslation();

  const [link, setLink] = useState<UploadFile[]>(
    initLink
      ? [
          {
            uid: `link-default`,
            name: "res.name",
            status: "done",
            url: initLink,
          },
        ]
      : []
  );

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

  const handleUpload = async (file: any) => {
    // try {
    //   const res: IGallery = await galleryAPI.upload({ file });
    //   if (res) {
    //     onChange(res.url);
    //     setLink([{ uid: res.id, name: res.name, status: 'done', url: `${res.url}` }]);
    //   }
    // } catch (error) {}
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.fileList.length != 0) handleUpload(info.file.originFileObj);
    else setLink([]);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <div className="flex items-center gap-4 flex-col upload-single">
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={link}
        onPreview={onPreview}
        onChange={handleChange}
        // beforeUpload={beforeUpload}
        beforeUpload={beforeUpload as any}
        // openFileDialogOnClick={false}
      >
        {link.length == 0 && (
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <Text type="BODY">{t("Upload")}</Text>
          </button>
        )}
      </Upload>
      <div className="flex flex-col mb-6 font-semibold items-center gap-2">
        <Text type="CAPTION1">{t("Upload a photo")}</Text>
        <Text type="CAPTION4" className="text-center">
          {t("(Recommend JPEG, PNG. Maximum 2MB)")}
        </Text>
      </div>
    </div>
  );
};

export default React.memo(UploadFiles);
