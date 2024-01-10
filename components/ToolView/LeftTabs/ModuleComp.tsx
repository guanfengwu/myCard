import { Element, useEditor } from "@craftjs/core";

import React, { useState } from "react";
import styled from "styled-components";

import { Tooltip } from "antd";
import { Button, Container, Text } from "@/components/Selector";
import TypeSvg from "../../../public/icons/toolbox/text.svg";
import ButtonSvg from "../../../public/icons/toolbox/button.svg";
import SquareSvg from "../../../public/icons/toolbox/rectangle.svg";

const ToolboxDiv = styled.div<{ enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  position: relative;
  ${(props) => (!props.enabled ? `width: 0;` : "")}
  ${(props) => (!props.enabled ? `opacity: 0;` : "")}
`;

const Item = styled.a<{ move?: boolean }>`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
  border-radius: 8px;
  ${(props) =>
    props.move &&
    `
    cursor: move;
  `}
  &:hover {
    transform: translateX(2px);
    box-shadow: 0 4px 16px 4px rgba(31, 35, 41, 0.03),
      0 4px 8px rgba(31, 35, 41, 0.02), 0 2px 4px -4px rgba(31, 35, 41, 0.02);
  }
`;

const Index = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ToolboxDiv
      enabled={enabled && enabled}
      className="toolbox transition h-full bg-white"
    >
      <div className="flex flex-1 flex-col py-6 px-2">
        <div className="mb-2">
          <div className="text-slate-600 pl-2">容器</div>
          <div
            ref={(ref) =>
              create(
                ref,
                <Element
                  canvas
                  is={Container}
                  background={{ r: 0, g: 0, b: 0, a: 0 }}
                  color={{ r: 0, g: 0, b: 0, a: 1 }}
                  height="300px"
                  width="300px"
                ></Element>
              )
            }
          >
            <Item className="flex px-3 py-2.5 cursor-pointer block" move>
              <SquareSvg />
              <span className="ml-2 text-slate-950">容器</span>
            </Item>
          </div>
        </div>
        <div className="mb-2">
          <div className="text-slate-600 pl-2">内容组件</div>
          <div
            ref={(ref) =>
              create(
                ref,
                <Text fontSize="12" textAlign="left" text="Hi there" />
              )
            }
          >
            <Item className="flex px-3 py-2.5 cursor-pointer block" move>
              <TypeSvg />
              <span className="ml-2 text-slate-950">文本</span>
            </Item>
          </div>
          <div
            ref={(ref) =>
              create(
                ref,
                <Text fontSize="12" textAlign="left" text="Hi there" />
              )
            }
          >
            <Item className="flex px-3 py-2 cursor-pointer block" move>
              <TypeSvg />
              <span className="ml-2 text-slate-950">文本</span>
            </Item>
          </div>
        </div>
        <div className="mb-2">
          <div className="text-slate-600 pl-2">交互组件</div>
          <div ref={(ref) => create(ref, <Button />)}>
            <Item className="flex px-3 py-2.5 cursor-pointer block" move>
              <ButtonSvg />
              <span className="ml-2 text-slate-950">按钮</span>
            </Item>
          </div>
        </div>
      </div>
    </ToolboxDiv>
  );
};
export default Index;
