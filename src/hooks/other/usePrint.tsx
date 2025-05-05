import { useRef } from "react";

export function usePrintableRef<T extends HTMLElement>() {
  const printRef = useRef<T>(null);

  const handlePrint = () => {
    if (!printRef.current) return;

    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // optional: refresh to restore interactivity
  };

  return { printRef, handlePrint };
}
