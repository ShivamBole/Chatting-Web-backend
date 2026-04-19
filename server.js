// const express = require("express");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv");
// const userRoutes = require("./routes/userRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const path = require("path");

// dotenv.config();
// connectDB();
// const app = express();

// app.use(express.json()); // to accept json data

// // app.get("/", (req, res) => {
// //   res.send("API Running!");
// // });

// app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);



// // Error Handling middlewares
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT;

// const server = app.listen(
//   PORT,
//   console.log(`Server running on PORT ${PORT}...`.yellow.bold)
// );

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//     // credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Connected to socket.io");
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });
//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     var chat = newMessageRecieved.chat;

//     if (!chat.users) return console.log("chat.users not defined");

//     chat.users.forEach((user) => {
//       if (user._id == newMessageRecieved.sender._id) return;

//       socket.in(user._id).emit("message recieved", newMessageRecieved);
//     });
//   });

//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   });
// });






// const express = require("express");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv");
// const userRoutes = require("./routes/userRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const path = require("path");

// dotenv.config();
// connectDB();
// const app = express();

// app.use(express.json());

// app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);

// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT;

// const server = app.listen(
//   PORT,
//   console.log(`Server running on PORT ${PORT}...`.yellow.bold)
// );

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Connected to socket.io");

//   // ─────────────────────────────────────────
//   // EXISTING CHAT EVENTS — unchanged
//   // ─────────────────────────────────────────

//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });

//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     var chat = newMessageRecieved.chat;
//     if (!chat.users) return console.log("chat.users not defined");
//     chat.users.forEach((user) => {
//       if (user._id == newMessageRecieved.sender._id) return;
//       socket.in(user._id).emit("message recieved", newMessageRecieved);
//     });
//   });

//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   });

//   // ─────────────────────────────────────────
//   // NEW WebRTC SIGNALING EVENTS
//   // ─────────────────────────────────────────

//   /**
//    * Caller emits this to start a video call.
//    * Payload: { to: userId, from: userId, chatId, callerName, offer: RTCSessionDescription }
//    * Server relays it to the target user's socket room.
//    */
//   socket.on("call:initiate", ({ to, from, chatId, callerName, offer }) => {
//     console.log(`Video call from ${from} to ${to}`);
//     socket.in(to).emit("call:incoming", { from, chatId, callerName, offer });
//   });

//   /**
//    * Receiver emits this after accepting the call and creating an answer.
//    * Payload: { to: userId, answer: RTCSessionDescription }
//    * Server relays it back to the caller.
//    */
//   socket.on("call:answer", ({ to, answer }) => {
//     socket.in(to).emit("call:answered", { answer });
//   });

//   /**
//    * Both sides emit ICE candidates as they are discovered.
//    * Payload: { to: userId, candidate: RTCIceCandidate }
//    * Server relays to the other peer.
//    */
//   socket.on("call:ice-candidate", ({ to, candidate }) => {
//     socket.in(to).emit("call:ice-candidate", { candidate });
//   });

//   /**
//    * Either side emits this to hang up.
//    * Payload: { to: userId }
//    * Server notifies the other peer to close the connection.
//    */
//   socket.on("call:end", ({ to }) => {
//     socket.in(to).emit("call:ended");
//   });

//   /**
//    * Caller emits this if the receiver doesn't pick up.
//    * Payload: { to: userId }
//    */
//   socket.on("call:reject", ({ to }) => {
//     socket.in(to).emit("call:rejected");
//   });
// });





// const express = require("express");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv");
// const userRoutes = require("./routes/userRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const conferenceRoutes = require("./routes/Conferenceroutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// const cors = require("cors");


// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://chatting-website-sb.netlify.app"
//     ],
//     credentials: true,
//   })
// );

// app.use(express.json());
// // ── REST routes ───────────────────────────────────────
// app.get("/",(req,resp)=>{
//   resp.send("server is running")
// })
// app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);
// app.use("/api/conference", conferenceRoutes);

// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// const server = app.listen(
//   PORT,
//   console.log(`Server running on PORT ${PORT}...`.yellow.bold)
// );

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "https://chatting-website-sb.netlify.app",
//     ],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // ── mediasoup — start worker then open socket server ──
// const {
//   createWorker,
//   getOrCreateRouter,
//   getRoom,
//   addPeer,
//   removePeer,
//   getOtherProducers,
//   getPeerList,
// } = require("./mediasoup/roomManager");

// // Boot mediasoup worker (async, but server already listening for HTTP)
// createWorker().catch((err) => {
//   console.error("Failed to create mediasoup worker:", err);
//   process.exit(1);
// });

// // ─────────────────────────────────────────────────────
// io.on("connection", (socket) => {
//   console.log("Socket connected:", socket.id);

//   // ════════════════════════════════════════════════════
//   // EXISTING CHAT + CALL EVENTS — completely unchanged
//   // ════════════════════════════════════════════════════

//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });

//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     const chat = newMessageRecieved.chat;
//     if (!chat.users) return console.log("chat.users not defined");
//     chat.users.forEach((user) => {
//       if (user._id === newMessageRecieved.sender._id) return;
//       socket.in(user._id).emit("message recieved", newMessageRecieved);
//     });
//   });

//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(socket._userData?._id);
//   });

//   // 1-to-1 call signaling
//   socket.on("call:initiate", ({ to, from, chatId, callerName, offer }) => {
//     socket.in(to).emit("call:incoming", { from, chatId, callerName, offer });
//   });
//   socket.on("call:answer", ({ to, answer }) => {
//     socket.in(to).emit("call:answered", { answer });
//   });
//   socket.on("call:ice-candidate", ({ to, candidate }) => {
//     socket.in(to).emit("call:ice-candidate", { candidate });
//   });
//   socket.on("call:end", ({ to }) => {
//     socket.in(to).emit("call:ended");
//   });
//   socket.on("call:reject", ({ to }) => {
//     socket.in(to).emit("call:rejected");
//   });

//   // ════════════════════════════════════════════════════
//   // CONFERENCE (mediasoup SFU) EVENTS
//   // ════════════════════════════════════════════════════

//   /**
//    * Step 1 — peer joins conference room
//    * Client sends: { roomCode, userId, name }
//    * Server responds with RTP capabilities of the router
//    */
//   socket.on("conf:join", async ({ roomCode, userId, name }, callback) => {
//     try {
//       socket.join(`conf:${roomCode}`);
//       socket._confRoom = roomCode;
//       socket._confUser = { userId, name };

//       const router = await getOrCreateRouter(roomCode);
//       addPeer(roomCode, socket.id, { userId, name });

//       // Tell everyone else a new peer joined
//       socket.to(`conf:${roomCode}`).emit("conf:peer-joined", {
//         socketId: socket.id,
//         userId,
//         name,
//       });

//       callback({
//         rtpCapabilities: router.rtpCapabilities,
//         existingPeers: getPeerList(roomCode).filter((p) => p.socketId !== socket.id),
//         existingProducers: getOtherProducers(roomCode, socket.id),
//       });
//     } catch (err) {
//       console.error("conf:join error:", err);
//       callback({ error: err.message });
//     }
//   });

//   /**
//    * Step 2 — create a WebRTC transport (one for send, one for recv)
//    * Client sends: { roomCode, direction: "send" | "recv" }
//    */
//   socket.on("conf:create-transport", async ({ roomCode, direction }, callback) => {
//     try {
//       const room = getRoom(roomCode);
//       if (!room) return callback({ error: "Room not found" });

//       const transport = await room.router.createWebRtcTransport({
//         listenIps: [
//           {
//             ip: "0.0.0.0",
//             announcedIp: process.env.ANNOUNCED_IP || "127.0.0.1",
//             // ↑ Change to your server's public IP for production
//           },
//         ],
//         enableUdp: true,
//         enableTcp: true,
//         preferUdp: true,
//         initialAvailableOutgoingBitrate: 1_000_000,
//       });

//       transport.on("dtlsstatechange", (dtlsState) => {
//         if (dtlsState === "closed") transport.close();
//       });

//       // Store transport on the peer
//       const peer = room.peers.get(socket.id);
//       if (peer) peer.transports.set(transport.id, transport);

//       callback({
//         id: transport.id,
//         iceParameters: transport.iceParameters,
//         iceCandidates: transport.iceCandidates,
//         dtlsParameters: transport.dtlsParameters,
//       });
//     } catch (err) {
//       console.error("conf:create-transport error:", err);
//       callback({ error: err.message });
//     }
//   });

//   /**
//    * Step 3a — connect send transport (DTLS handshake)
//    * Client sends: { roomCode, transportId, dtlsParameters }
//    */
//   socket.on("conf:connect-transport", async ({ roomCode, transportId, dtlsParameters }, callback) => {
//     try {
//       const room = getRoom(roomCode);
//       const peer = room?.peers.get(socket.id);
//       const transport = peer?.transports.get(transportId);
//       if (!transport) return callback({ error: "Transport not found" });

//       await transport.connect({ dtlsParameters });
//       callback({ connected: true });
//     } catch (err) {
//       console.error("conf:connect-transport error:", err);
//       callback({ error: err.message });
//     }
//   });

//   /**
//    * Step 3b — produce (start sending audio or video)
//    * Client sends: { roomCode, transportId, kind, rtpParameters }
//    */
//   socket.on("conf:produce", async ({ roomCode, transportId, kind, rtpParameters }, callback) => {
//     try {
//       const room = getRoom(roomCode);
//       const peer = room?.peers.get(socket.id);
//       const transport = peer?.transports.get(transportId);
//       if (!transport) return callback({ error: "Transport not found" });

//       const producer = await transport.produce({ kind, rtpParameters });

//       peer.producers.set(producer.id, producer);

//       producer.on("transportclose", () => {
//         producer.close();
//         peer.producers.delete(producer.id);
//       });

//       // Notify all other peers about this new producer
//       socket.to(`conf:${roomCode}`).emit("conf:new-producer", {
//         producerId: producer.id,
//         kind: producer.kind,
//         socketId: socket.id,
//         peerId: peer.userId,
//         peerName: peer.name,
//       });

//       callback({ producerId: producer.id });
//     } catch (err) {
//       console.error("conf:produce error:", err);
//       callback({ error: err.message });
//     }
//   });

//   /**
//    * Step 4 — consume (start receiving another peer's stream)
//    * Client sends: { roomCode, transportId, producerId, rtpCapabilities }
//    */
//   socket.on("conf:consume", async ({ roomCode, transportId, producerId, rtpCapabilities }, callback) => {
//     try {
//       const room = getRoom(roomCode);
//       if (!room) return callback({ error: "Room not found" });

//       if (!room.router.canConsume({ producerId, rtpCapabilities })) {
//         return callback({ error: "Cannot consume this producer" });
//       }

//       const peer = room.peers.get(socket.id);
//       const transport = peer?.transports.get(transportId);
//       if (!transport) return callback({ error: "Transport not found" });

//       // Find the producer's owner name
//       let producerPeerName = "Unknown";
//       let producerPeerId = null;
//       room.peers.forEach((p) => {
//         if (p.producers.has(producerId)) {
//           producerPeerName = p.name;
//           producerPeerId = p.userId;
//         }
//       });

//       const consumer = await transport.consume({
//         producerId,
//         rtpCapabilities,
//         paused: false,
//       });

//       peer.consumers.set(consumer.id, consumer);

//       consumer.on("transportclose", () => {
//         consumer.close();
//         peer.consumers.delete(consumer.id);
//       });

//       consumer.on("producerclose", () => {
//         consumer.close();
//         peer.consumers.delete(consumer.id);
//         socket.emit("conf:producer-closed", { consumerId: consumer.id, producerId });
//       });

//       callback({
//         consumerId: consumer.id,
//         producerId,
//         kind: consumer.kind,
//         rtpParameters: consumer.rtpParameters,
//         producerPeerName,
//         producerPeerId,
//       });
//     } catch (err) {
//       console.error("conf:consume error:", err);
//       callback({ error: err.message });
//     }
//   });

//   /**
//    * Conference chat message (in-meeting text chat)
//    * Client sends: { roomCode, message, senderName }
//    */
//   socket.on("conf:chat", ({ roomCode, message, senderName }) => {
//     io.to(`conf:${roomCode}`).emit("conf:chat", {
//       message,
//       senderName,
//       timestamp: Date.now(),
//     });
//   });

//   /**
//    * Clean up when socket disconnects
//    */
//   socket.on("disconnect", () => {
//     const roomCode = socket._confRoom;
//     if (!roomCode) return;

//     const user = socket._confUser;
//     removePeer(roomCode, socket.id);

//     socket.to(`conf:${roomCode}`).emit("conf:peer-left", {
//       socketId: socket.id,
//       userId: user?.userId,
//       name: user?.name,
//     });

//     console.log(`Peer left conference ${roomCode}: ${user?.name}`);
//   });
// });










// const express = require("express");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv");
// const userRoutes = require("./routes/userRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const conferenceRoutes = require("./routes/Conferenceroutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// dotenv.config();
// connectDB();

// const app = express();
// const cors = require("cors");

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://chatting-website-sb.netlify.app",
//     ],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // ── REST routes ──────────────────────────────────────
// app.get("/", (req, resp) => {
//   resp.send("server is running");
// });
// app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);
// app.use("/api/conference", conferenceRoutes);

// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// const server = app.listen(
//   PORT,
//   () => console.log(`Server running on PORT ${PORT}...`)
// );

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "https://chatting-website-sb.netlify.app",
//     ],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // ── mediasoup ──────────────────────────────────────
// const {
//   createWorker,
//   getOrCreateRouter,
//   getRoom,
//   addPeer,
//   removePeer,
//   getOtherProducers,
//   getPeerList,
// } = require("./mediasoup/roomManager");

// createWorker().catch((err) => {
//   console.error("Failed to create mediasoup worker:", err);
//   process.exit(1);
// });

// // ─────────────────────────────────────────────────────
// io.on("connection", (socket) => {
//   console.log("Socket connected:", socket.id);

//   // ════════════════════════════════════════════════════
//   // EXISTING CHAT + CALL EVENTS
//   // ════════════════════════════════════════════════════

//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });

//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     const chat = newMessageRecieved.chat;
//     if (!chat.users) return console.log("chat.users not defined");
//     chat.users.forEach((user) => {
//       if (user._id === newMessageRecieved.sender._id) return;
//       socket.in(user._id).emit("message recieved", newMessageRecieved);
//     });
//   });

//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(socket._userData?._id);
//   });

//   // 1-to-1 call signaling
//   socket.on("call:initiate", ({ to, from, chatId, callerName, offer }) => {
//     socket.in(to).emit("call:incoming", { from, chatId, callerName, offer });
//   });
//   socket.on("call:answer", ({ to, answer }) => {
//     socket.in(to).emit("call:answered", { answer });
//   });
//   socket.on("call:ice-candidate", ({ to, candidate }) => {
//     socket.in(to).emit("call:ice-candidate", { candidate });
//   });
//   socket.on("call:end", ({ to }) => {
//     socket.in(to).emit("call:ended");
//   });
//   socket.on("call:reject", ({ to }) => {
//     socket.in(to).emit("call:rejected");
//   });

//   // ════════════════════════════════════════════════════
//   // CONFERENCE (mediasoup SFU) EVENTS
//   // ════════════════════════════════════════════════════

//   /**
//    * Step 1 — peer joins conference room
//    */
//   socket.on("conf:join", async ({ roomCode, userId, name }, callback) => {
//     try {
//       socket.join(`conf:${roomCode}`);
//       socket._confRoom = roomCode;
//       socket._confUser = { userId, name };

//       const router = await getOrCreateRouter(roomCode);
//       addPeer(roomCode, socket.id, { userId, name });

//       socket.to(`conf:${roomCode}`).emit("conf:peer-joined", {
//         socketId: socket.id,
//         userId,
//         name,
//       });

//       callback({
//         rtpCapabilities: router.rtpCapabilities,
//         existingPeers: getPeerList(roomCode).filter((p) => p.socketId !== socket.id),
//         existingProducers: getOtherProducers(roomCode, socket.id),
//       });
//     } catch (err) {
//       console.error("conf:join error:", err);
//       callback({ error: err.message });
//     }
//   });

//   /**
//    * Step 2 — create WebRTC transport (send or recv)
//    */
//   socket.on("conf:create-transport", async ({ roomCode, direction }, callback) => {
//     try {
//       const room = getRoom(roomCode);
//       if (!room) return callback({ error: "Room not found" });

//       const transport = await room.router.createWebRtcTransport({
//         listenIps: [
//           {
//             ip: "0.0.0.0",
//             // For localhost set to 127.0.0.1, for production set ANNOUNCED_IP env var
//             announcedIp: process.env.ANNOUNCED_IP || "127.0.0.1",
//           },
//         ],
//         // Railway free tier blocks UDP — use TCP only.
//         // For localhost development both work fine.
//         enableUdp: process.env.ENABLE_UDP === "true",
//         enableTcp: true,
//         preferUdp: process.env.ENABLE_UDP === "true",
//         initialAvailableOutgoingBitrate: 1_000_000,
//       });

//       transport.on("dtlsstatechange", (dtlsState) => {
//         if (dtlsState === "closed") transport.close();
//       });

//       const peer = room.peers.get(socket.id);
//       if (peer) peer.transports.set(transport.id, transport);

//       callback({
//         id: transport.id,
//         iceParameters: transport.iceParameters,
//         iceCandidates: transport.iceCandidates,
//         dtlsParameters: transport.dtlsParameters,
//       });
//     } catch (err) {
//       console.error("conf:create-transport error:", err);
//       callback({ error: err.message });
//     }
//   });

//   /**
//    * Step 3a — connect transport (DTLS handshake)
//    */
//   socket.on("conf:connect-transport", async ({ roomCode, transportId, dtlsParameters }, callback) => {
//     try {
//       const room = getRoom(roomCode);
//       const peer = room?.peers.get(socket.id);
//       const transport = peer?.transports.get(transportId);
//       if (!transport) return callback({ error: "Transport not found" });

//       await transport.connect({ dtlsParameters });
//       callback({ connected: true });
//     } catch (err) {
//       console.error("conf:connect-transport error:", err);
//       callback({ error: err.message });
//     }
//   });

//   /**
//    * Step 3b — produce (start sending audio or video)
//    */
//   socket.on("conf:produce", async ({ roomCode, transportId, kind, rtpParameters }, callback) => {
//     try {
//       const room = getRoom(roomCode);
//       const peer = room?.peers.get(socket.id);
//       const transport = peer?.transports.get(transportId);
//       if (!transport) return callback({ error: "Transport not found" });

//       const producer = await transport.produce({ kind, rtpParameters });
//       peer.producers.set(producer.id, producer);

//       producer.on("transportclose", () => {
//         producer.close();
//         peer.producers.delete(producer.id);
//       });

//       // Notify all other peers in the room about this new producer
//       socket.to(`conf:${roomCode}`).emit("conf:new-producer", {
//         producerId: producer.id,
//         kind: producer.kind,
//         socketId: socket.id,
//         peerId: peer.userId,
//         peerName: peer.name,
//       });

//       callback({ producerId: producer.id });
//     } catch (err) {
//       console.error("conf:produce error:", err);
//       callback({ error: err.message });
//     }
//   });

//   /**
//    * Step 4 — consume (start receiving another peer's stream)
//    * Consumer is created PAUSED — client must call conf:resume-consumer after setup.
//    * This is the correct mediasoup pattern and prevents dropped frames.
//    */
//   socket.on("conf:consume", async ({ roomCode, transportId, producerId, rtpCapabilities }, callback) => {
//     try {
//       const room = getRoom(roomCode);
//       if (!room) return callback({ error: "Room not found" });

//       if (!room.router.canConsume({ producerId, rtpCapabilities })) {
//         console.error(`Cannot consume producerId=${producerId}`);
//         return callback({ error: "Cannot consume this producer" });
//       }

//       const peer = room.peers.get(socket.id);
//       const transport = peer?.transports.get(transportId);
//       if (!transport) return callback({ error: "Transport not found" });

//       // Find producer's owner info
//       let producerPeerName = "Unknown";
//       let producerPeerId = null;
//       room.peers.forEach((p) => {
//         if (p.producers.has(producerId)) {
//           producerPeerName = p.name;
//           producerPeerId = p.userId;
//         }
//       });

//       // KEY: create paused — client signals when it's ready to receive
//       const consumer = await transport.consume({
//         producerId,
//         rtpCapabilities,
//         paused: true,
//       });

//       peer.consumers.set(consumer.id, consumer);

//       consumer.on("transportclose", () => {
//         consumer.close();
//         peer.consumers.delete(consumer.id);
//       });

//       consumer.on("producerclose", () => {
//         consumer.close();
//         peer.consumers.delete(consumer.id);
//         socket.emit("conf:producer-closed", { consumerId: consumer.id, producerId });
//       });

//       callback({
//         consumerId: consumer.id,
//         producerId,
//         kind: consumer.kind,
//         rtpParameters: consumer.rtpParameters,
//         producerPeerName,
//         producerPeerId,
//       });
//     } catch (err) {
//       console.error("conf:consume error:", err);
//       callback({ error: err.message });
//     }
//   });

//   /**
//    * Step 5 — resume consumer
//    * Called by client after it has called recvTransport.consume() and consumer.resume().
//    * BOTH sides must resume for media to flow.
//    */
//   socket.on("conf:resume-consumer", async ({ roomCode, consumerId }) => {
//     try {
//       const room = getRoom(roomCode);
//       const peer = room?.peers.get(socket.id);
//       const consumer = peer?.consumers.get(consumerId);
//       if (!consumer) {
//         console.warn("conf:resume-consumer: consumer not found:", consumerId);
//         return;
//       }
//       await consumer.resume();
//       console.log(`Consumer resumed: ${consumerId}`);
//     } catch (err) {
//       console.error("conf:resume-consumer error:", err);
//     }
//   });

//   /**
//    * In-meeting text chat
//    */
//   socket.on("conf:chat", ({ roomCode, message, senderName }) => {
//     io.to(`conf:${roomCode}`).emit("conf:chat", {
//       message,
//       senderName,
//       timestamp: Date.now(),
//     });
//   });

//   /**
//    * Cleanup on disconnect
//    */
//   socket.on("disconnect", () => {
//     const roomCode = socket._confRoom;
//     if (!roomCode) return;

//     const user = socket._confUser;
//     removePeer(roomCode, socket.id);

//     socket.to(`conf:${roomCode}`).emit("conf:peer-left", {
//       socketId: socket.id,
//       userId: user?.userId,
//       name: user?.name,
//     });

//     console.log(`Peer left conference ${roomCode}: ${user?.name}`);
//   });
// });
















































const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const conferenceRoutes = require("./routes/Conferenceroutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
const cors = require("cors");

console.log("ANNOUNCED_IP:", process.env.ANNOUNCED_IP);
console.log("ENABLE_UDP:", process.env.ENABLE_UDP);

app.use(cors({
  origin: [
    "http://192.168.1.16:3000",
    "http://localhost:3000",
    "https://chatting-website-sb.netlify.app",
  ],
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => res.send("server is running"));
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/conference", conferenceRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`[SERVER] Running on PORT ${PORT}`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: [
      "http://192.168.1.16:3000",
      "http://localhost:3000",
      "https://chatting-website-sb.netlify.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ── mediasoup ──────────────────────────────────────────────
const {
  createWorker,
  getOrCreateRouter,
  getRoom,
  addPeer,
  removePeer,
  getOtherProducers,
  getPeerList,
} = require("./mediasoup/roomManager");

createWorker().catch((err) => {
  console.error("[SERVER] Failed to create mediasoup worker:", err);
  process.exit(1);
});

// ──────────────────────────────────────────────────────────
io.on("connection", (socket) => {
  console.log(`[SOCKET] Connected: ${socket.id}`);

  // ══════════════════════════════════════════════════════════
  // EXISTING CHAT + 1-to-1 CALL EVENTS (unchanged)
  // ══════════════════════════════════════════════════════════

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`[SOCKET] User joined chat room: ${room}`);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    const chat = newMessageRecieved.chat;
    if (!chat.users) return;
    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => socket.leave(socket._userData?._id));

  socket.on("call:initiate", ({ to, from, chatId, callerName, offer }) => {
    socket.in(to).emit("call:incoming", { from, chatId, callerName, offer });
  });
  socket.on("call:answer", ({ to, answer }) => {
    socket.in(to).emit("call:answered", { answer });
  });
  socket.on("call:ice-candidate", ({ to, candidate }) => {
    socket.in(to).emit("call:ice-candidate", { candidate });
  });
  socket.on("call:end", ({ to }) => socket.in(to).emit("call:ended"));
  socket.on("call:reject", ({ to }) => socket.in(to).emit("call:rejected"));

  // ══════════════════════════════════════════════════════════
  // CONFERENCE (mediasoup SFU)
  // ══════════════════════════════════════════════════════════

  /**
   * conf:join
   * Client: { roomCode, userId, name }
   * Server: { rtpCapabilities, existingPeers, existingProducers }
   */
  socket.on("conf:join", async ({ roomCode, userId, name }, callback) => {
    try {
      console.log(`[CONF] conf:join roomCode=${roomCode} name=${name} socketId=${socket.id}`);
      socket.join(`conf:${roomCode}`);
      socket._confRoom = roomCode;
      socket._confUser = { userId, name };

      const router = await getOrCreateRouter(roomCode);
      addPeer(roomCode, socket.id, { userId, name });

      const existingPeers = getPeerList(roomCode).filter((p) => p.socketId !== socket.id);
      const existingProducers = getOtherProducers(roomCode, socket.id);

      console.log(`[CONF] Room ${roomCode}: existingPeers=${existingPeers.length} existingProducers=${existingProducers.length}`);

      // Tell other peers someone joined
      socket.to(`conf:${roomCode}`).emit("conf:peer-joined", {
        socketId: socket.id,
        userId,
        name,
      });

      callback({
        rtpCapabilities: router.rtpCapabilities,
        existingPeers,
        existingProducers,
      });
    } catch (e) {
      console.error("[CONF] conf:join error:", e);
      callback({ error: e.message });
    }
  });

  /**
   * conf:create-transport
   * Client: { roomCode, direction: "send"|"recv" }
   * Server: { id, iceParameters, iceCandidates, dtlsParameters }
   */
  socket.on("conf:create-transport", async ({ roomCode, direction }, callback) => {
    try {
      const room = getRoom(roomCode);
      if (!room) return callback({ error: "Room not found" });

      const transport = await room.router.createWebRtcTransport({
        listenIps: [{
          ip: "0.0.0.0",
          announcedIp: process.env.ANNOUNCED_IP || "127.0.0.1",
        }],
        // For local dev: ENABLE_UDP=true
        // For Railway free tier: ENABLE_UDP=false (UDP ports are blocked)
        enableUdp: process.env.ENABLE_UDP === "true",
        enableTcp: true,
        preferUdp: process.env.ENABLE_UDP === "true",
        initialAvailableOutgoingBitrate: 1_000_000,
      });

      transport.on("dtlsstatechange", (state) => {
        console.log(`[CONF] Transport ${transport.id} dtlsState=${state}`);
        if (state === "closed") transport.close();
      });

      transport.on("icestatechange", (state) => {
        console.log(`[CONF] Transport ${transport.id} iceState=${state}`);
      });

      const peer = room.peers.get(socket.id);
      if (peer) peer.transports.set(transport.id, transport);

      console.log(`[CONF] Created ${direction} transport ${transport.id} for ${socket.id}`);

      callback({
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      });
    } catch (e) {
      console.error("[CONF] conf:create-transport error:", e);
      callback({ error: e.message });
    }
  });

  /**
   * conf:connect-transport — DTLS handshake
   * Client: { roomCode, transportId, dtlsParameters }
   */
  socket.on("conf:connect-transport", async ({ roomCode, transportId, dtlsParameters }, callback) => {
    try {
      const room = getRoom(roomCode);
      const peer = room?.peers.get(socket.id);
      const transport = peer?.transports.get(transportId);
      if (!transport) return callback({ error: `Transport ${transportId} not found` });

      await transport.connect({ dtlsParameters });
      console.log(`[CONF] Transport ${transportId} connected`);
      callback({ connected: true });
    } catch (e) {
      console.error("[CONF] conf:connect-transport error:", e);
      callback({ error: e.message });
    }
  });

  /**
   * conf:produce — start sending audio or video
   * Client: { roomCode, transportId, kind, rtpParameters }
   * Server: { producerId }
   */
  socket.on("conf:produce", async ({ roomCode, transportId, kind, rtpParameters }, callback) => {
    try {
      const room = getRoom(roomCode);
      const peer = room?.peers.get(socket.id);
      const transport = peer?.transports.get(transportId);
      if (!transport) return callback({ error: `Transport ${transportId} not found` });

      const producer = await transport.produce({ kind, rtpParameters });
        console.log("=== PRODUCER CREATED ===");
  console.log("Kind:", kind);           // "audio" or "video"
  console.log("Producer ID:", producer.id);
  console.log("Socket:", socket.id);
  console.log("Room:", roomCode);
  console.log("Producer paused?", producer.paused);
  
      peer.producers.set(producer.id, producer);

      producer.on("transportclose", () => {
        console.log(`[CONF] Producer ${producer.id} closed (transport closed)`);
        producer.close();
        peer.producers.delete(producer.id);
      });

      console.log(`[CONF] Producer created: id=${producer.id} kind=${kind} socketId=${socket.id}`);

      // Notify all other peers in the room
      socket.to(`conf:${roomCode}`).emit("conf:new-producer", {
        producerId: producer.id,
        kind: producer.kind,
        socketId: socket.id,
        peerId: peer.userId,
        peerName: peer.name,
      });

      callback({ producerId: producer.id });
    } catch (e) {
      console.error("[CONF] conf:produce error:", e);
      callback({ error: e.message });
    }
  });

  /**
   * conf:consume — start receiving another peer's stream
   * Client: { roomCode, transportId, producerId, rtpCapabilities }
   * Server: { consumerId, kind, rtpParameters }
   *
   * Consumer is created PAUSED. Client must call conf:resume-consumer after
   * setting up the consumer on its side.
   */
  socket.on("conf:consume", async ({ roomCode, transportId, producerId, rtpCapabilities }, callback) => {
    try {
      const room = getRoom(roomCode);
      if (!room) return callback({ error: "Room not found" });

      console.log(`[CONF] conf:consume producerId=${producerId} by socketId=${socket.id}`);

      if (!room.router.canConsume({ producerId, rtpCapabilities })) {
        console.error(`[CONF] Cannot consume producerId=${producerId}`);
        return callback({ error: "Cannot consume this producer — codec mismatch or producer gone" });
      }

      const peer = room.peers.get(socket.id);
      const transport = peer?.transports.get(transportId);
      if (!transport) return callback({ error: `Transport ${transportId} not found` });

      // Find who owns this producer
      let producerPeerName = "Unknown";
      let producerPeerId = null;
      room.peers.forEach((p) => {
        if (p.producers.has(producerId)) {
          producerPeerName = p.name;
          producerPeerId = p.userId;
        }
      });

      // Create PAUSED — client signals ready via conf:resume-consumer
      const consumer = await transport.consume({
        producerId,
        rtpCapabilities,
        paused: true,
      });

      peer.consumers.set(consumer.id, consumer);
      console.log(`[CONF] Consumer created: id=${consumer.id} kind=${consumer.kind} paused=true`);

      consumer.on("transportclose", () => {
        console.log(`[CONF] Consumer ${consumer.id} closed (transport closed)`);
        consumer.close();
        peer.consumers.delete(consumer.id);
      });

      consumer.on("producerclose", () => {
        console.log(`[CONF] Consumer ${consumer.id} closed (producer closed)`);
        consumer.close();
        peer.consumers.delete(consumer.id);
        socket.emit("conf:producer-closed", { consumerId: consumer.id, producerId });
      });

      callback({
        consumerId: consumer.id,
        producerId,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
        producerPeerName,
        producerPeerId,
      });
    } catch (e) {
      console.error("[CONF] conf:consume error:", e);
      callback({ error: e.message });
    }
  });

  /**
   * conf:resume-consumer
   * Called by client after it has received the track and is ready to play.
   * BOTH client and server must resume for media to flow.
   * Client: { roomCode, consumerId }
   */
  socket.on("conf:resume-consumer", async ({ roomCode, consumerId }) => {
    try {
      const room = getRoom(roomCode);
      const peer = room?.peers.get(socket.id);
      const consumer = peer?.consumers.get(consumerId);
      if (!consumer) {
        console.warn(`[CONF] conf:resume-consumer: consumer ${consumerId} not found for socket ${socket.id}`);
        return;
      }
      await consumer.resume();
      console.log(`[CONF] Consumer resumed: ${consumerId} kind=${consumer.kind}`);
    } catch (e) {
      console.error("[CONF] conf:resume-consumer error:", e);
    }
  });

  /**
   * conf:chat — in-meeting text message
   */
  socket.on("conf:chat", ({ roomCode, message, senderName }) => {
    io.to(`conf:${roomCode}`).emit("conf:chat", {
      message,
      senderName,
      timestamp: Date.now(),
    });
  });

  /**
   * disconnect — clean up peer from all rooms
   */
  socket.on("disconnect", () => {
    console.log(`[SOCKET] Disconnected: ${socket.id}`);
    const roomCode = socket._confRoom;
    if (!roomCode) return;

    const user = socket._confUser;
    removePeer(roomCode, socket.id);

    socket.to(`conf:${roomCode}`).emit("conf:peer-left", {
      socketId: socket.id,
      userId: user?.userId,
      name: user?.name,
    });

    console.log(`[CONF] Peer left ${roomCode}: ${user?.name} (${socket.id})`);
  });
});