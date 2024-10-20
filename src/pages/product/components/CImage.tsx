import Text from "@/components/Text";
import UploadMultipleFile from "@/components/UploadMultipleFile";
import { Flex, Image } from "antd";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  onChange?: (url: string[]) => void;
  value?: string[];
  disabled?: boolean;
};

const CImage = (props: Props) => {
  const { value, onChange, disabled } = props;
  const { t } = useTranslation();
  const [images, setImages] = useState<string[]>(value ?? []);
  const [choseImage, setChoseImage] = useState<string>(value ? value[0] : "");
  useEffect(() => {
    if (!choseImage && images[0]) setChoseImage(images[0]);
  }, [images]);
  return (
    <Flex vertical gap={16}>
      <Flex>
        <div className="w-full h-[400px]  rounded-lg border border-dashed border-black border-opacity-20">
          {choseImage ? (
            <img src={choseImage} alt="" className="w-full h-full object-contain" />
          ) : (
            <Flex justify="center" align="center" className="bg-gray-100 h-full ">
              <Text type="BODY">{t("Kích thước ảnh tối đa 2Mb")}</Text>
            </Flex>
          )}
        </div>
      </Flex>
      <Flex gap={12}>
        {images.map((image, idx) => (
          <Flex
            onClick={() => setChoseImage(image)}
            className="py-2 cursor-pointer rounded-lg overflow-hidden border border-solid border-black border-opacity-20"
            key={`image-product-${idx}`}
          >
            <Image src={image} height={86} className="" preview={false} />
          </Flex>
        ))}
        {!disabled && images.length < 3 && (
          <UploadMultipleFile
            hiddenText
            onChange={(images) => {
              setImages(images);
              onChange && onChange(images);
            }}
            initLink={images}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default React.memo(CImage);
