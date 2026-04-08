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
app.use(express.json());
const cors = require("cors");


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://chatting-website-sb.netlify.app"
    ],
    credentials: true,
  })
);

app.use(express.json());
// ── REST routes ───────────────────────────────────────
app.get("/",(req,resp)=>{
  resp.send("server is running")
})
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/conference", conferenceRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

// ── Socket.io ─────────────────────────────────────────
// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "*",
//   },
// });

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: [
      "http://localhost:3000",
      "https://chatting-website-sb.netlify.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ── mediasoup — start worker then open socket server ──
const {
  createWorker,
  getOrCreateRouter,
  getRoom,
  addPeer,
  removePeer,
  getOtherProducers,
  getPeerList,
} = require("./mediasoup/roomManager");

// Boot mediasoup worker (async, but server already listening for HTTP)
createWorker().catch((err) => {
  console.error("Failed to create mediasoup worker:", err);
  process.exit(1);
});

// ─────────────────────────────────────────────────────
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // ════════════════════════════════════════════════════
  // EXISTING CHAT + CALL EVENTS — completely unchanged
  // ════════════════════════════════════════════════════

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    const chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(socket._userData?._id);
  });

  // 1-to-1 call signaling
  socket.on("call:initiate", ({ to, from, chatId, callerName, offer }) => {
    socket.in(to).emit("call:incoming", { from, chatId, callerName, offer });
  });
  socket.on("call:answer", ({ to, answer }) => {
    socket.in(to).emit("call:answered", { answer });
  });
  socket.on("call:ice-candidate", ({ to, candidate }) => {
    socket.in(to).emit("call:ice-candidate", { candidate });
  });
  socket.on("call:end", ({ to }) => {
    socket.in(to).emit("call:ended");
  });
  socket.on("call:reject", ({ to }) => {
    socket.in(to).emit("call:rejected");
  });

  // ════════════════════════════════════════════════════
  // CONFERENCE (mediasoup SFU) EVENTS
  // ════════════════════════════════════════════════════

  /**
   * Step 1 — peer joins conference room
   * Client sends: { roomCode, userId, name }
   * Server responds with RTP capabilities of the router
   */
  socket.on("conf:join", async ({ roomCode, userId, name }, callback) => {
    try {
      socket.join(`conf:${roomCode}`);
      socket._confRoom = roomCode;
      socket._confUser = { userId, name };

      const router = await getOrCreateRouter(roomCode);
      addPeer(roomCode, socket.id, { userId, name });

      // Tell everyone else a new peer joined
      socket.to(`conf:${roomCode}`).emit("conf:peer-joined", {
        socketId: socket.id,
        userId,
        name,
      });

      callback({
        rtpCapabilities: router.rtpCapabilities,
        existingPeers: getPeerList(roomCode).filter((p) => p.socketId !== socket.id),
        existingProducers: getOtherProducers(roomCode, socket.id),
      });
    } catch (err) {
      console.error("conf:join error:", err);
      callback({ error: err.message });
    }
  });

  /**
   * Step 2 — create a WebRTC transport (one for send, one for recv)
   * Client sends: { roomCode, direction: "send" | "recv" }
   */
  socket.on("conf:create-transport", async ({ roomCode, direction }, callback) => {
    try {
      const room = getRoom(roomCode);
      if (!room) return callback({ error: "Room not found" });

      const transport = await room.router.createWebRtcTransport({
        listenIps: [
          {
            ip: "0.0.0.0",
            announcedIp: process.env.ANNOUNCED_IP || "127.0.0.1",
            // ↑ Change to your server's public IP for production
          },
        ],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
        initialAvailableOutgoingBitrate: 1_000_000,
      });

      transport.on("dtlsstatechange", (dtlsState) => {
        if (dtlsState === "closed") transport.close();
      });

      // Store transport on the peer
      const peer = room.peers.get(socket.id);
      if (peer) peer.transports.set(transport.id, transport);

      callback({
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      });
    } catch (err) {
      console.error("conf:create-transport error:", err);
      callback({ error: err.message });
    }
  });

  /**
   * Step 3a — connect send transport (DTLS handshake)
   * Client sends: { roomCode, transportId, dtlsParameters }
   */
  socket.on("conf:connect-transport", async ({ roomCode, transportId, dtlsParameters }, callback) => {
    try {
      const room = getRoom(roomCode);
      const peer = room?.peers.get(socket.id);
      const transport = peer?.transports.get(transportId);
      if (!transport) return callback({ error: "Transport not found" });

      await transport.connect({ dtlsParameters });
      callback({ connected: true });
    } catch (err) {
      console.error("conf:connect-transport error:", err);
      callback({ error: err.message });
    }
  });

  /**
   * Step 3b — produce (start sending audio or video)
   * Client sends: { roomCode, transportId, kind, rtpParameters }
   */
  socket.on("conf:produce", async ({ roomCode, transportId, kind, rtpParameters }, callback) => {
    try {
      const room = getRoom(roomCode);
      const peer = room?.peers.get(socket.id);
      const transport = peer?.transports.get(transportId);
      if (!transport) return callback({ error: "Transport not found" });

      const producer = await transport.produce({ kind, rtpParameters });

      peer.producers.set(producer.id, producer);

      producer.on("transportclose", () => {
        producer.close();
        peer.producers.delete(producer.id);
      });

      // Notify all other peers about this new producer
      socket.to(`conf:${roomCode}`).emit("conf:new-producer", {
        producerId: producer.id,
        kind: producer.kind,
        socketId: socket.id,
        peerId: peer.userId,
        peerName: peer.name,
      });

      callback({ producerId: producer.id });
    } catch (err) {
      console.error("conf:produce error:", err);
      callback({ error: err.message });
    }
  });

  /**
   * Step 4 — consume (start receiving another peer's stream)
   * Client sends: { roomCode, transportId, producerId, rtpCapabilities }
   */
  socket.on("conf:consume", async ({ roomCode, transportId, producerId, rtpCapabilities }, callback) => {
    try {
      const room = getRoom(roomCode);
      if (!room) return callback({ error: "Room not found" });

      if (!room.router.canConsume({ producerId, rtpCapabilities })) {
        return callback({ error: "Cannot consume this producer" });
      }

      const peer = room.peers.get(socket.id);
      const transport = peer?.transports.get(transportId);
      if (!transport) return callback({ error: "Transport not found" });

      // Find the producer's owner name
      let producerPeerName = "Unknown";
      let producerPeerId = null;
      room.peers.forEach((p) => {
        if (p.producers.has(producerId)) {
          producerPeerName = p.name;
          producerPeerId = p.userId;
        }
      });

      const consumer = await transport.consume({
        producerId,
        rtpCapabilities,
        paused: false,
      });

      peer.consumers.set(consumer.id, consumer);

      consumer.on("transportclose", () => {
        consumer.close();
        peer.consumers.delete(consumer.id);
      });

      consumer.on("producerclose", () => {
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
    } catch (err) {
      console.error("conf:consume error:", err);
      callback({ error: err.message });
    }
  });

  /**
   * Conference chat message (in-meeting text chat)
   * Client sends: { roomCode, message, senderName }
   */
  socket.on("conf:chat", ({ roomCode, message, senderName }) => {
    io.to(`conf:${roomCode}`).emit("conf:chat", {
      message,
      senderName,
      timestamp: Date.now(),
    });
  });

  /**
   * Clean up when socket disconnects
   */
  socket.on("disconnect", () => {
    const roomCode = socket._confRoom;
    if (!roomCode) return;

    const user = socket._confUser;
    removePeer(roomCode, socket.id);

    socket.to(`conf:${roomCode}`).emit("conf:peer-left", {
      socketId: socket.id,
      userId: user?.userId,
      name: user?.name,
    });

    console.log(`Peer left conference ${roomCode}: ${user?.name}`);
  });
});