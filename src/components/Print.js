import * as React from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import { PrinterOutlined } from "@ant-design/icons";

export const FunctionalComponentWithHook = ({ data }) => {
  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called"); // tslint:disable-line no-console
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
    setLoading(true);

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 2000);
    });
  }, [setLoading]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  React.useEffect(() => {
    if (
      data === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, data]);

  return (
    <div>
      <PrinterOutlined onClick={handlePrint} style={{ fontSize: 32 }} />
      <ComponentToPrint ref={componentRef} data={data} />
    </div>
  );
};
