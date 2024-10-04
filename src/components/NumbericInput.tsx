import { Input } from "antd";
import React from "react";
import { SuccessFunc } from "../models";
import { func } from "../utils/func";

type Props = {
  onChange?: SuccessFunc<number>;
  value?: number;
  className?: string;
  placeholder?: string;
};

const NumbericInput = (props: Props) => {
  const { onChange, value, className, placeholder } = props;
  return (
    <div>
      <Input
        onChange={(e) => {
          const value = func.stringToNumber(e.target.value);
          onChange && onChange(value > 0 ? value : 0);
        }}
        size="large"
        value={func.numberWithDots(value ?? "")}
        className={`text-center w-36 ${className && className}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default React.memo(NumbericInput);
