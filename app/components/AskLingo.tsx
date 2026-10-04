"use client";
import { useState } from "react";

export default function AskLingo() {
  const [open,setOpen]=useState(false);
  const [messages,setMessages]=useState<string[]>([]);
  const ask=(q:string)=>{
    const answer=q.includes("store")?"I can route you to the merch floor and keep checkout behind the configured commerce path.":q.includes("drop")?"The studio is organized around preview → merch floor → safe checkout → vendor fulfillment.":"I’m AskLINGO. Try asking about the store, drops, or the launch system.";
    setMessages(m=>[...m,"You: "+q,"AskLINGO: "+answer]);
  };
  return <div className={"asklingo "+(open?"asklingo-open":"")}>
    {open&&<div className="asklingo-panel">
      <div className="asklingo-head"><strong>askLINGO</strong><span>LIVE STUDIO</span></div>
      <div className="asklingo-messages">{!messages.length&&<p>Legacy Intelligence online. What are you looking for?</p>}{messages.map((m,i)=><p key={i}>{m}</p>)}</div>
      <div className="asklingo-actions">{["Open the store","Show my drop","What can I do?"].map(q=><button key={q} onClick={()=>ask(q)}>{q}</button>)}</div>
    </div>}
    <button className="asklingo-launcher" aria-label="Open AskLINGO" onClick={()=>setOpen(!open)}><span className="asklingo-l">L</span><span>{open?"×":"askLINGO"}</span></button>
  </div>;
}
