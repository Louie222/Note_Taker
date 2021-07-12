const express = require("express");
const fs = require("fs");
const path = require("path")
const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.urlencoded({ extended: true}))
server.use(express.json());





