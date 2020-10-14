// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8082});

wss.on("connection", ws =>{
  console.log("new client connected!");
  
  
  ws.on("close", ()=>{
    consol
  })
});
