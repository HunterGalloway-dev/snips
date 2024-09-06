import React, { ReactNode } from "react";

const ConditionalRender = ({
  show,
  children,
}: {
  show: boolean;
  children: ReactNode;
}) => {
  if (show) {
    if (show) return <>{children}</>;

    return <></>;
  }

  return;
};

export default ConditionalRender;
