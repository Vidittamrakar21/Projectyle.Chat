'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Homeplay from "./components/home/home";
import Sign from './components/sign/sign'
import Card from "./components/card/card";
import { useState,useMemo } from "react";
import { Chatprovider } from "@/context/contextapi";

export default function Home() {


 

  return (

   
    <main className={styles.main}>
    
   <Chatprovider>
    <Homeplay></Homeplay>
    
    <Sign></Sign>
     <Card></Card>  
   </Chatprovider>
    
    </main>
  );
}
