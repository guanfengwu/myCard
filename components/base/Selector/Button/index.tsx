/*
 * @Author: WGF
 * @Date: 2024-01-03 21:00:08
 * @LastEditors: WGF
 * @LastEditTime: 2024-01-05 18:33:17
 * @Description:
 * @FilePath: /landing/components/selectors/Button/index.tsx
 */
import { UserComponent, useEditor, useNode } from "@craftjs/core";
import cx from "classnames";
import React, { useContext } from "react";
import styled from "styled-components";

import { ButtonSettings } from "./ButtonSettings";

import { Text } from "../Text";
import { GlobalContext } from "@/stores";


type ButtonProps = {
  background?: Record<"r" | "g" | "b" | "a", number>;
  color?: Record<"r" | "g" | "b" | "a", number>;
  buttonStyle?: string;
  margin?: any[];
  text?: string;
  clickFunc?: string;
  textComponent?: any;
};

const StyledButton = styled.button<ButtonProps>`
  background: ${(props) =>
    props.buttonStyle === "full"
      ? `rgba(${Object.values(props.background)})`
      : "transparent"};
  border: 2px solid transparent;
  border-color: ${(props) =>
    props.buttonStyle === "outline"
      ? `rgba(${Object.values(props.background)})`
      : "transparent"};
  margin: ${({ margin }) =>
    `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`};
`;

export const Button: UserComponent<ButtonProps> = (props) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    // selected: node.events.selected,
  }));
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const { apiData } = useContext(GlobalContext);

  const { text, textComponent, clickFunc, color, ...otherProps } = props;

  const onClick = () => {
    if (enabled) return;
    try {
      const clickFunction = new Function("data", clickFunc);
      clickFunction(apiData);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <StyledButton
      ref={connect}
      onClick={onClick}
      className={cx([
        "rounded w-full px-4 py-2",
        {
          "shadow-lg": props.buttonStyle === "full",
        },
      ])}
      {...otherProps}
    >
      <Text {...textComponent} text={text} color={props.color} />
    </StyledButton>
  );
};

Button.craft = {
  displayName: "Button",
  props: {
    background: { r: 255, g: 255, b: 255, a: 0.5 },
    color: { r: 92, g: 90, b: 90, a: 1 },
    buttonStyle: "full",
    text: "Button",
    margin: ["5", "0", "5", "0"],
    clickFunc: "{}",
    textComponent: {
      ...Text.craft.props,
      textAlign: "center",
    },
  },
  related: {
    toolbar: ButtonSettings,
  },
};
