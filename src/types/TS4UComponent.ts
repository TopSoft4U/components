import {FC} from "react";

type ClassNameProp = {
  className?: string;
};

export type TS4UComponent<TProps = {}> = FC<TProps & ClassNameProp>
