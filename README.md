# Node.js Server Crash on Premature Client Disconnection

This repository demonstrates a common issue in Node.js servers where a crash occurs if a client disconnects before the server finishes processing the request.  The problem stems from not properly handling the `'close'` event emitted by the `req` object.

## Problem Description
The provided `bug.js` file contains a simple HTTP server that simulates a long-running operation. If a client closes the connection before the server completes this operation and sends the response, the server will unexpectedly crash.

## Solution
The `bugSolution.js` demonstrates how to fix this issue by gracefully handling the `'close'` event.  The solution ensures that any cleanup tasks (like clearing intervals) are performed even if the client disconnects prematurely, preventing the server crash.

## How to Reproduce
1. Clone this repository.
2. Run `bug.js` using `node bug.js`.
3. Use a tool like `curl` or a browser to make a request to `http://localhost:3000`.  Interrupt the request before the response is received (e.g., by closing the browser tab or using Ctrl+C with `curl`). Observe that the server crashes with an unhandled exception.
4. Run `bugSolution.js` using `node bugSolution.js` and repeat step 3. Note that this time, the server will not crash, demonstrating the effectiveness of the solution.

## Technologies Used
* Node.js
* HTTP