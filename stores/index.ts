/*
 * @Author: WGF
 * @Date: 2024-01-09 12:21:58
 * @LastEditors: WGF
 * @LastEditTime: 2024-01-09 12:22:31
 * @Description:
 * @FilePath: /mycard/stores/index.ts
 */
import { createContext } from "react";

const GlobalContext = createContext<{ apiData: Record<string, any> | null }>(
  null
);

export { GlobalContext };
