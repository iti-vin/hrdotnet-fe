export type Records = Record<string, any>;

export const createModuleQueryKeys = <
  TCustomKeys extends Record<string, (Records?: Records, pages?: Records) => readonly unknown[]>
>(
  moduleKey: string,
  customKeys?: TCustomKeys
) => {
  const base = [moduleKey] as const;

  const common = {
    base,
    request: (Records?: Records, pages?: Records) => [...base, "request", { ...Records }, { ...pages }] as const,
    reviewal: (Records?: Records, pages?: Records) => [...base, "reviewal", { ...Records }, { ...pages }] as const,
    approval: (Records?: Records, pages?: Records) => [...base, "approval", { ...Records }, { ...pages }] as const,
    filings: (Records?: Records, pages?: Records) => [...base, "filings", { ...Records }, { ...pages }] as const,
  };

  return {
    ...common,
    ...customKeys!,
  };
};
