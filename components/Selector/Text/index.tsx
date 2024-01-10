/*
 * @Author: WGF
 * @Date: 2024-01-03 21:00:08
 * @LastEditors: WGF
 * @LastEditTime: 2024-01-05 18:27:01
 * @Description:
 * @FilePath: /landing/components/selectors/Text/index.tsx
 */
import { useNode, useEditor } from "@craftjs/core";
import React, { useContext, useMemo } from "react";
import ContentEditable from "react-contenteditable";

import { TextSettings } from "./TextSettings";
import { GlobalContext } from "stores";


export type TextProps = {
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  color: Record<"r" | "g" | "b" | "a", string>;
  shadow: number;
  text: string;
  margin: [string, string, string, string];
  textKey: string;
};

export const Text = ({
  fontSize,
  textAlign,
  fontWeight,
  color,
  shadow,
  text,
  margin,
  textKey,
}: Partial<TextProps>) => {
  const {
    connectors: { connect },
    setProp,
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const { apiData } = useContext(GlobalContext);

  const html = useMemo(() => {
    if (enabled) {
      return text;
    } else {
      if (apiData?.[textKey]) {
        return apiData?.[textKey];
      } else {
        return text;
      }
    }
  }, [text, textKey, apiData]);

  return (
    <ContentEditable
      innerRef={connect}
      html={html} // innerHTML of the editable div
      disabled={!enabled}
      onChange={(e) => {
        setProp((prop) => (prop.text = e.target.value), 500);
      }} // use true to disable editing
      tagName="h2" // Use a custom HTML tag (uses a div by default)
      style={{
        width: "100%",
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        color: `rgba(${Object.values(color)})`,
        fontSize: `${fontSize}px`,
        textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
        fontWeight,
        textAlign,
      }}
    />
  );
};

Text.craft = {
  displayName: "Text",
  props: {
    fontSize: "15",
    textAlign: "left",
    fontWeight: "500",
    color: { r: 92, g: 90, b: 90, a: 1 },
    margin: [0, 0, 0, 0],
    shadow: 0,
    text: "Text",
    textKey: "",
  },
  related: {
    toolbar: TextSettings,
  },
};
