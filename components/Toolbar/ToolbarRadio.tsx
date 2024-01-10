import { Checkbox, Radio } from "antd";
import classnames from "classnames";
import React from "react";

export const ToolbarRadio = ({ value, label }: any) => {
  return <Radio value={value} >{label}</Radio>;
};
