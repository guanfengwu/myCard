import { useNode } from "@craftjs/core";

import React, { useState } from "react";
import { Collapse } from "antd";
import styled from "styled-components";
const { Panel } = Collapse;

const MyCollapse = styled(Collapse)`
  background: transparent;
  border: none;
  border-top: 1px solid #e2e1e1;

  .ant-collapse-item {
    border: none;
    transition: padding 150ms cubic-bezier(0.4, 0, 0.2, 1);
    .ant-collapse-header {
      padding: 8px 16px;
    }
  }
  .ant-collapse-item-active {
    padding: 10px 0;
  }
  .ant-collapse-content {
    border: none;
  }
`;

export const ToolbarSection = ({ title, props, summary, children }: any) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res: any, key: any) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {}),
  }));

  const [expand, setExpand] = useState(false);

  return (
    <MyCollapse>
      <Panel
        showArrow={false}
        key={1}
        header={
          <div
            className="flex justify-between "
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <h5 className="text-sm text-light-gray-1 text-left font-medium text-dark-gray">
              {title}
            </h5>
            {summary && props ? (
              <h5 className="text-light-gray-2 text-sm text-right text-dark-blue">
                {summary(
                  props.reduce((acc: any, key: any) => {
                    acc[key] = nodeProps[key];
                    return acc;
                  }, {})
                )}
              </h5>
            ) : null}
          </div>
        }
      >
        <div>{children}</div>
      </Panel>
    </MyCollapse>
  );
};
