import React, { createContext, useState, ReactNode } from "react";

type ContextProps = {
  log: boolean;
  openlog: (value: boolean) => void;
  opt: boolean;
  openopt: (value: boolean) => void;
  socket: object | undefined;
  setsocket: (value: object)=> void;
  room: string
  setroom: (value : string)=> void
};

export const ChatContext = createContext<ContextProps | undefined>(undefined);

export const Chatprovider = ({ children }: { children: ReactNode }) => {
  const [log, openlog] = useState(false);
  const [opt, openopt] = useState(false);
  const [socket, setsocket] = useState({});
  const [room, setroom] = useState("");

  return (
    <ChatContext.Provider value={{ log, openlog, opt, openopt ,setsocket, socket,room,setroom}}>
      <div>{children}</div>
    </ChatContext.Provider>
  );
};
