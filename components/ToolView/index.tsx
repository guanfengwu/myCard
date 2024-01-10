/*
 * @Author: WGF
 * @Date: 2024-01-09 12:27:04
 * @LastEditors: WGF
 * @LastEditTime: 2024-01-09 12:53:58
 * @Description:
 * @FilePath: /mycard/components/base/ToolView/Viewport/index.tsx
 */
import { useEditor } from "@craftjs/core";
import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import cx from "classnames";
import { LeftTabs } from "./LeftTabs";

export const Viewport: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const {
    enabled,
    connectors,
    actions: { setOptions },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  useEffect(() => {
    if (!window) {
      return;
    }

    window.requestAnimationFrame(() => {
      // Notify doc site
      window.parent.postMessage(
        {
          LANDING_PAGE_LOADED: true,
        },
        "*"
      );

      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions]);

  return (
    <div className="viewport">
      <div className="h-10 flex items-center bg-white border-b border-slate-300">
        消息卡片搭建工具
      </div>
      <div
        className={cx(["flex h-full overflow-hidden flex-row w-full fixed pb-10"])}
      >
        <LeftTabs />
        <div className="page-container flex flex-1 h-full flex-col">
          <div
            className={cx([
              "craftjs-renderer flex-1 h-full w-full transition overflow-auto",
              {
                "bg-renderer-gray": enabled,
              },
            ])}
            ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
          >
            <div className="h-full relative flex justify-center items-center">
              {children}
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};
