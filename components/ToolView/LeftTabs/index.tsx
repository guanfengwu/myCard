/*
 * @Author: WGF
 * @Date: 2024-01-08 17:35:17
 * @LastEditors: WGF
 * @LastEditTime: 2024-01-09 12:44:30
 * @Description:
 * @FilePath: /mycard/components/base/ToolView/Viewport/LeftTabs/index.tsx
 */
import { useEditor } from "@craftjs/core";
import { Tabs, TabsProps } from "antd";
import styled from "styled-components";
import References from "./References";
import MyCard from "./MyCard";
import ModuleComp from "./ModuleComp";

const TabsDiv = styled.div<{ enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  position: relative;
  ${(props) => (!props.enabled ? `width: 0;` : "")}
  ${(props) => (!props.enabled ? `opacity: 0;` : "")}
  .ant-tabs {
    height: 100%;
  }
  .ant-tabs-nav {
    margin: 0;
  }
  .ant-tabs-content {
    height: 100%;
    overflow: auto;
  }
`;

export const LeftTabs = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "参考案例",
      children: <References />,
    },
    {
      key: "2",
      label: "模块组件",
      children: <ModuleComp />,
    },
    {
      key: "3",
      label: "我的卡片",
      children: <MyCard />,
    },
  ];

  return (
    <TabsDiv enabled={enabled} className="h-full bg-white flex-none w-80">
      <Tabs centered defaultActiveKey="1" items={items} onChange={onChange} />
    </TabsDiv>
  );
};
