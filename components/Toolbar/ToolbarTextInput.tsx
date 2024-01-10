import { Input } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { ChromePicker } from "react-color";
import styled from "styled-components";

export type ToolbarTextInputProps = {
  prefix?: string;
  label?: string;
  type: string;
  onChange?: (value: any) => void;
  value?: any;
};

export const MyInput = styled(Input)`
  margin: 0;
  font-size: 12px;
  background: #efeff1;
  border-radius: 100px;
  border: none;
  padding-left: 28px;
  padding-top: 5px;
  padding-bottom: 5px;
  &:focus {
    box-shadow: none;
  }
`;
export const ToolbarTextInput = ({
  onChange,
  value,
  prefix,
  label,
  type,
  ...props
}: ToolbarTextInputProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let val = value;
    if (type === "color" || type === "bg")
      val = `rgba(${Object.values(value)})`;
    setInternalValue(val);
  }, [value, type]);
  console.log(type, active);

  return (
    <div
      style={{ width: "100%", position: "relative" }}
      onClick={() => {
        setActive(true);
      }}
    >
      {(type === "color" || type === "bg") && active ? (
        <div
          className="absolute"
          style={{
            zIndex: 99999,
            top: "calc(100% + 10px)",
            left: "-5%",
          }}
        >
          <div
            className="fixed top-0 left-0 w-full h-full cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(false);
            }}
          ></div>
          <ChromePicker
            color={value}
            onChange={(color: any) => {
              onChange(color.rgb);
            }}
          />
        </div>
      ) : null}
      <MyInput
        value={internalValue || ""}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange((e.target as any).value);
          }
        }}
        onChange={(e) => {
          setInternalValue(e.target.value);
        }}
        {...props}
      />
      {["color", "bg"].includes(type) && (
        <div
          className="w-2 h-2 inline-block rounded-full absolute"
          style={{
            left: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            background: internalValue,
          }}
        />
      )}
    </div>
  );
};
