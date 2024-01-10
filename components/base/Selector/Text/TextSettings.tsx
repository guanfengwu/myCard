/*
 * @Author: WGF
 * @Date: 2024-01-03 21:00:08
 * @LastEditors: WGF
 * @LastEditTime: 2024-01-05 14:45:56
 * @Description:
 * @FilePath: /landing/components/selectors/Text/TextSettings.tsx
 */
import React from "react";

import { capitalize, weightDescription } from "../../../../utils/text";
import {
  ToolbarSection,
  ToolbarItem,
  ToolbarRadio,
} from "../../../base/ToolView/Toolbar";
import { Space } from "antd";

export const TextSettings = () => {
  return (
    <React.Fragment>
      <ToolbarSection
        title="版式"
        props={["fontSize", "fontWeight", "textAlign"]}
        summary={({ fontSize, fontWeight, textAlign }: any) => {
          return `${fontSize || ""}, ${weightDescription(
            fontWeight
          )}, ${capitalize(textAlign)}`;
        }}
      >
        <ToolbarItem
          full={true}
          propKey="fontSize"
          type="slider"
          label="Font Size"
        />
        <div className="flex gap-12">
          <ToolbarItem propKey="textAlign" type="radio" label="Align">
            <Space direction="vertical">
              <ToolbarRadio value="left" label="Left" />
              <ToolbarRadio value="center" label="Center" />
              <ToolbarRadio value="right" label="Right" />
            </Space>
          </ToolbarItem>
          <ToolbarItem propKey="fontWeight" type="radio" label="Weight">
            <Space direction="vertical">
              <ToolbarRadio value="400" label="Regular" />
              <ToolbarRadio value="500" label="Medium" />
              <ToolbarRadio value="700" label="Bold" />
            </Space>
          </ToolbarItem>
        </div>
      </ToolbarSection>
      <ToolbarSection
        title="外边距"
        props={["margin"]}
        summary={({ margin }: any) => {
          return `${margin[0] || 0}px ${margin[1] || 0}px ${margin[2] || 0}px ${
            margin[3] || 0
          }px`;
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <ToolbarItem propKey="margin" index={0} type="slider" label="Top" />
          <ToolbarItem propKey="margin" index={1} type="slider" label="Right" />
          <ToolbarItem
            propKey="margin"
            index={2}
            type="slider"
            label="Bottom"
          />
          <ToolbarItem propKey="margin" index={3} type="slider" label="Left" />
        </div>
      </ToolbarSection>
      <ToolbarSection
        title="外观"
        props={["color", "shadow"]}
        summary={({ color, shadow }: any) => {
          return (
            <div className="fletext-right">
              <p
                style={{
                  color: color && `rgba(${Object.values(color)})`,
                  textShadow: `0px 0px 2px rgba(0, 0, 0, ${shadow / 100})`,
                }}
                className="text-white text-right"
              >
                T
              </p>
            </div>
          );
        }}
      >
        <ToolbarItem full={true} propKey="color" type="color" label="Text" />
        <ToolbarItem
          full={true}
          propKey="shadow"
          type="slider"
          label="Shadow"
        />
      </ToolbarSection>

      <ToolbarSection title="变量绑定">
        <ToolbarItem full={true} propKey="textKey" type="text" />
      </ToolbarSection>
    </React.Fragment>
  );
};
