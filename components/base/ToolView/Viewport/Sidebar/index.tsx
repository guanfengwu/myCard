/*
 * @Author: WGF
 * @Date: 2024-01-08 14:34:41
 * @LastEditors: WGF
 * @LastEditTime: 2024-01-09 12:46:58
 * @Description:
 * @FilePath: /mycard/components/base/ToolView/Viewport/Sidebar/index.tsx
 */
import { useEditor } from "@craftjs/core";
import { Layers } from "@craftjs/layers";
import React, { useState } from "react";
import styled from "styled-components";

import { SidebarItem } from "./SidebarItem";

import CustomizeIcon from "../../../../../public/icons/customize.svg";
import LayerIcon from "../../../../../public/icons/layers.svg";
import { Toolbar } from "../../Toolbar";

export const SidebarDiv = styled.div<{ enabled: boolean }>`
  opacity: ${(props) => (props.enabled ? 1 : 0)};
  width: ${(props) => (props.enabled ? "280px" : 0)};
  background: #fff;
`;

export const Sidebar = () => {
  const [layersVisible, setLayerVisible] = useState(true);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const { enabled, nodes } = useEditor((state) => ({
    nodes: state.nodes,
    enabled: state.options.enabled,
  }));

  return (
    <SidebarDiv enabled={enabled} className="sidebar transition bg-white">
      <div className="flex flex-col h-full">
        <SidebarItem
          icon={CustomizeIcon}
          title="定制"
          height={!layersVisible ? "full" : "55%"}
          visible={toolbarVisible}
          onChange={(val) => setToolbarVisible(val)}
        >
          <Toolbar />
        </SidebarItem>
        <SidebarItem
          icon={LayerIcon}
          title="图层"
          height={!toolbarVisible ? 'full' : '45%'}
          visible={layersVisible}
          onChange={(val) => setLayerVisible(val)}
        >
          <div className="">
            <Layers expandRootOnLoad={true} />
          </div>
        </SidebarItem>

      </div>
    </SidebarDiv>
  );
};
