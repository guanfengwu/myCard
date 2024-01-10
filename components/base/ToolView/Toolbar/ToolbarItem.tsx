import { useNode } from "@craftjs/core";

import React from "react";

import { ToolbarDropdown } from "./ToolbarDropdown";
import { ToolbarTextInput } from "./ToolbarTextInput";
import { Radio, Slider } from "antd";

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

export type ToolbarItemProps = {
  prefix?: string;
  label?: string;
  full?: boolean;
  propKey?: string;
  index?: number;
  children?: React.ReactNode;
  type: string;
  onChange?: (value: any) => any;
};
export const ToolbarItem = ({
  full = false,
  propKey,
  type,
  onChange,
  index,
  ...props
}: ToolbarItemProps) => {
  const {
    actions: { setProp },
    propValue,
  } = useNode((node) => ({
    propValue: node.data.props[propKey],
  }));
  const value = Array.isArray(propValue) ? propValue[index] : propValue;
  console.log(type);

  return (
    <div>
      {["text", "color", "bg", "number"].includes(type) ? (
        <>
          {props.label ? (
            <h4 className="text-sm text-light-gray-2 mb-1">{props.label}</h4>
          ) : null}
          <ToolbarTextInput
            {...props}
            type={type}
            value={value}
            onChange={(value) => {
              console.log("onChange", value);

              setProp((props: any) => {
                if (Array.isArray(propValue)) {
                  props[propKey][index] = onChange ? onChange(value) : value;
                } else {
                  props[propKey] = onChange ? onChange(value) : value;
                }
              }, 500);
            }}
          />
        </>
      ) : type === "slider" ? (
        <>
          {props.label ? (
            <h4 className="text-sm text-light-gray-2 mb-1">{props.label}</h4>
          ) : null}
          <Slider
            value={parseInt(value) || 0}
            onChange={
              ((value: number) => {
                setProp((props: any) => {
                  if (Array.isArray(propValue)) {
                    props[propKey][index] = onChange ? onChange(value) : value;
                  } else {
                    props[propKey] = onChange ? onChange(value) : value;
                  }
                }, 1000);
              }) as any
            }
          />
        </>
      ) : type === "radio" ? (
        <>
          {props.label ? (
            <h4 className="text-sm text-light-gray-2 mb-1">{props.label}</h4>
          ) : null}
          <Radio.Group
            value={value || 0}
            onChange={(e) => {
              const value = e.target.value;
              setProp((props: any) => {
                props[propKey] = onChange ? onChange(value) : value;
              });
            }}
          >
            {props.children}
          </Radio.Group>
        </>
      ) : type === "select" ? (
        <ToolbarDropdown
          value={value || ""}
          onChange={(value) =>
            setProp(
              (props: any) =>
                (props[propKey] = onChange ? onChange(value) : value)
            )
          }
          {...props}
        />
      ) : null}
    </div>
  );
};
