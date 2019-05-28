#!/usr/bin/env babel-node

import http from 'http';
import app from '../app';

const port = '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port);