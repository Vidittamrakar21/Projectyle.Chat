import React, { createContext, useState, ReactNode } from "react";

type ContextProps = {
  log: boolean;
  openlog: (value: boolean) => void;
  opt: boolean;
  openopt: (value: boolean) => void;
};

export const ChatContext = createContext<ContextProps | undefined>(undefined);

export const Chatprovider = ({ children }: { children: ReactNode }) => {
  const [log, openlog] = useState(false);
  const [opt, openopt] = useState(false);

  return (
    <ChatContext.Provider value={{ log, openlog, opt, openopt }}>
      <div>{children}</div>
    </ChatContext.Provider>
  );
};
