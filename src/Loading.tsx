import React from "react";
import {LoadingContainer, LoadingSpinner} from "./Loading.style";

type LoadingProps = {
  loadingText?: string;
  tooLongText?: string;

  timeout?: number;
}

const defLoadingText = "Loading, please wait...";
const defTooLongText = "This is taking too long. Consider reloading the page.";

export const Loading: React.FC<LoadingProps> = ({loadingText, tooLongText, timeout = 10}) => {
  const [tooLong, setTooLong] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTooLong(true);
    }, timeout * 1000);
    return () => clearTimeout(timer);
  }, [timeout, tooLong]);

  return <LoadingContainer>
    <p>{loadingText || defLoadingText}</p>
    <LoadingSpinner animation="border" />
    {timeout > 0 && tooLong && <p>{tooLongText || defTooLongText}</p>}
  </LoadingContainer>;
};
