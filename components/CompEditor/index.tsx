import { GlobalContext } from "@/stores";
import { Editor, Frame, Element } from "@craftjs/core";
import { useState } from "react";
import { Container, Text, Button } from "../Selector";
import { RenderNode } from "../ToolView/RenderNode";
import { Viewport } from "../ToolView";

const Index = () => {
  const [apiData, setApiData] = useState<Record<string, any>>({});
  return (
    <div className="h-full h-screen">
      <GlobalContext.Provider value={{ apiData: apiData }}>
        <Editor
          resolver={{ Container, Text, Button }}
          enabled={true}
          onRender={RenderNode}
        >
          <Viewport>
            <Frame>
              <Element
                canvas
                is={Container}
                width="600px"
                height="500px"
                radius={10}
                background={{ r: 255, g: 255, b: 255, a: 1 }}
                padding={["40", "40", "40", "40"]}
                custom={{ displayName: "App" }}
              >
                <h2 className="text-lg px-10 py-5 text-white">
                  I'm a component that only accepts
                  <br /> buttons.
                </h2>
                <Element canvas is={Container}>
                  <Button />
                  <Button
                    buttonStyle="outline"
                    color={{ r: 255, g: 255, b: 255, a: 1 }}
                  />
                  <Element
                    canvas
                    is={Text}
                    custom={{ displayName: "1111" }}
                  ></Element>
                </Element>
              </Element>
            </Frame>
          </Viewport>
        </Editor>
      </GlobalContext.Provider>
    </div>
  );
};

export default Index;
