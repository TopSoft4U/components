import {FC} from "react";

export type TS4UComponent<TProps = {}> = FC<TProps> & {
  className?: string;
}
