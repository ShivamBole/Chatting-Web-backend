// const mediasoup = require("mediasoup");

// // ── mediasoup codec config ───────────────────────────
// const mediaCodecs = [
//   {
//     kind: "audio",
//     mimeType: "audio/opus",
//     clockRate: 48000,
//     channels: 2,
//   },
//   {
//     kind: "video",
//     mimeType: "video/VP8",
//     clockRate: 90000,
//     parameters: { "x-google-start-bitrate": 1000 },
//   },
//   {
//     kind: "video",
//     mimeType: "video/VP9",
//     clockRate: 90000,
//     parameters: {
//       "profile-id": 2,
//       "x-google-start-bitrate": 1000,
//     },
//   },
//   {
//     kind: "video",
//     mimeType: "video/h264",
//     clockRate: 90000,
//     parameters: {
//       "packetization-mode": 1,
//       "profile-level-id": "4d0032",
//       "level-asymmetry-allowed": 1,
//       "x-google-start-bitrate": 1000,
//     },
//   },
// ];

// let worker = null;

// // rooms Map: roomCode → { router, peers }
// // peers Map: socketId → { id, name, transports, producers, consumers }
// const rooms = new Map();

// // ── Create the mediasoup Worker once at startup ──────
// const createWorker = async () => {
//   worker = await mediasoup.createWorker({
//     rtcMinPort: 2000,
//     rtcMaxPort: 2100,
//     logLevel: "warn",
//   });

//   console.log("mediasoup worker created, pid:", worker.pid);

//   worker.on("died", (error) => {
//     console.error("mediasoup worker died:", error);
//     // In production: restart the worker or exit process
//     setTimeout(() => process.exit(1), 2000);
//   });

//   return worker;
// };

// // ── Get or create a Router for a room ────────────────
// const getOrCreateRouter = async (roomCode) => {
//   if (rooms.has(roomCode)) {
//     return rooms.get(roomCode).router;
//   }

//   const router = await worker.createRouter({ mediaCodecs });

//   rooms.set(roomCode, {
//     router,
//     peers: new Map(), // socketId → peer data
//   });

//   console.log(`Room created: ${roomCode}`);
//   return router;
// };

// // ── Get the room map entry ────────────────────────────
// const getRoom = (roomCode) => rooms.get(roomCode);

// // ── Add a peer to a room ──────────────────────────────
// const addPeer = (roomCode, socketId, userData) => {
//   const room = rooms.get(roomCode);
//   if (!room) return;
//   room.peers.set(socketId, {
//     id: socketId,
//     userId: userData.userId,
//     name: userData.name,
//     transports: new Map(),
//     producers: new Map(),
//     consumers: new Map(),
//   });
// };

// // ── Remove a peer and clean up all their resources ───
// const removePeer = (roomCode, socketId) => {
//   const room = rooms.get(roomCode);
//   if (!room) return;

//   const peer = room.peers.get(socketId);
//   if (!peer) return;

//   // Close all transports (closes producers and consumers too)
//   peer.transports.forEach((transport) => {
//     try { transport.close(); } catch (_) {}
//   });

//   room.peers.delete(socketId);

//   // If room is empty, clean it up
//   if (room.peers.size === 0) {
//     room.router.close();
//     rooms.delete(roomCode);
//     console.log(`Room deleted (empty): ${roomCode}`);
//   }
// };

// // ── Get all producers in a room except own ────────────
// const getOtherProducers = (roomCode, socketId) => {
//   const room = rooms.get(roomCode);
//   if (!room) return [];

//   const producers = [];
//   room.peers.forEach((peer, peerSocketId) => {
//     if (peerSocketId === socketId) return;
//     peer.producers.forEach((producer) => {
//       producers.push({
//         producerId: producer.id,
//         kind: producer.kind,
//         socketId: peerSocketId,
//         peerId: peer.userId,
//         peerName: peer.name,
//       });
//     });
//   });
//   return producers;
// };

// // ── Get peer list for a room ──────────────────────────
// const getPeerList = (roomCode) => {
//   const room = rooms.get(roomCode);
//   if (!room) return [];
//   return Array.from(room.peers.values()).map((p) => ({
//     socketId: p.id,
//     userId: p.userId,
//     name: p.name,
//   }));
// };

// module.exports = {
//   createWorker,
//   getOrCreateRouter,
//   getRoom,
//   addPeer,
//   removePeer,
//   getOtherProducers,
//   getPeerList,
// };





























// const mediasoup = require("mediasoup");

// const mediaCodecs = [
//   {
//     kind: "audio",
//     mimeType: "audio/opus",
//     clockRate: 48000,
//     channels: 2,
//   },
//   {
//     kind: "video",
//     mimeType: "video/VP8",
//     clockRate: 90000,
//     parameters: { "x-google-start-bitrate": 1000 },
//   },
//   {
//     kind: "video",
//     mimeType: "video/VP9",
//     clockRate: 90000,
//     parameters: { "profile-id": 2, "x-google-start-bitrate": 1000 },
//   },
//   {
//     kind: "video",
//     mimeType: "video/h264",
//     clockRate: 90000,
//     parameters: {
//       "packetization-mode": 1,
//       "profile-level-id": "4d0032",
//       "level-asymmetry-allowed": 1,
//       "x-google-start-bitrate": 1000,
//     },
//   },
// ];

// let worker = null;
// const rooms = new Map();

// const createWorker = async () => {
//   worker = await mediasoup.createWorker({
//     rtcMinPort: 2000,
//     rtcMaxPort: 2100,
//     logLevel: "warn",
//   });

//   console.log("mediasoup worker created, pid:", worker.pid);

//   worker.on("died", (error) => {
//     console.error("mediasoup worker died:", error);
//     setTimeout(() => process.exit(1), 2000);
//   });

//   return worker;
// };

// const getOrCreateRouter = async (roomCode) => {
//   if (rooms.has(roomCode)) return rooms.get(roomCode).router;

//   const router = await worker.createRouter({ mediaCodecs });
//   rooms.set(roomCode, { router, peers: new Map() });
//   console.log(`Room created: ${roomCode}`);
//   return router;
// };

// const getRoom = (roomCode) => rooms.get(roomCode);

// const addPeer = (roomCode, socketId, userData) => {
//   const room = rooms.get(roomCode);
//   if (!room) return;
//   room.peers.set(socketId, {
//     id: socketId,
//     userId: userData.userId,
//     name: userData.name,
//     transports: new Map(),
//     producers: new Map(),
//     consumers: new Map(),
//   });
// };

// const removePeer = (roomCode, socketId) => {
//   const room = rooms.get(roomCode);
//   if (!room) return;

//   const peer = room.peers.get(socketId);
//   if (!peer) return;

//   peer.transports.forEach((transport) => {
//     try { transport.close(); } catch (_) {}
//   });

//   room.peers.delete(socketId);

//   if (room.peers.size === 0) {
//     room.router.close();
//     rooms.delete(roomCode);
//     console.log(`Room deleted (empty): ${roomCode}`);
//   }
// };

// const getOtherProducers = (roomCode, socketId) => {
//   const room = rooms.get(roomCode);
//   if (!room) return [];

//   const producers = [];
//   room.peers.forEach((peer, peerSocketId) => {
//     if (peerSocketId === socketId) return;
//     peer.producers.forEach((producer) => {
//       producers.push({
//         producerId: producer.id,
//         kind: producer.kind,
//         socketId: peerSocketId,
//         peerId: peer.userId,
//         peerName: peer.name,
//       });
//     });
//   });
//   return producers;
// };

// const getPeerList = (roomCode) => {
//   const room = rooms.get(roomCode);
//   if (!room) return [];
//   return Array.from(room.peers.values()).map((p) => ({
//     socketId: p.id,
//     userId: p.userId,
//     name: p.name,
//   }));
// };

// // ── Build WebRTC transport options with TURN support ──
// // mediasoup acts as the SFU server so it connects directly
// // to each client. The ANNOUNCED_IP must be your server's
// // real public IP so clients can reach it.
// // For conference, the server itself IS the media relay —
// // no TURN needed for the server side. TURN is only needed
// // for the browser-to-browser 1-to-1 WebRTC calls.
// const getWebRtcTransportOptions = () => ({
//   listenIps: [
//     {
//       ip: "0.0.0.0",
//       // IMPORTANT: set this to your server's public IP in .env
//       // On Oracle Cloud: use your instance's public IP
//       // Locally: use 127.0.0.1
//       announcedIp: process.env.ANNOUNCED_IP || "127.0.0.1",
//     },
//   ],
//   enableUdp: true,
//   enableTcp: true,
//   preferUdp: true,
//   initialAvailableOutgoingBitrate: 1_000_000,
//   minimumAvailableOutgoingBitrate: 600_000,
//   maxSctpMessageSize: 262144,
// });

// module.exports = {
//   createWorker,
//   getOrCreateRouter,
//   getRoom,
//   addPeer,
//   removePeer,
//   getOtherProducers,
//   getPeerList,
//   getWebRtcTransportOptions,
// };























const mediasoup = require("mediasoup");

const mediaCodecs = [
  {
    kind: "audio",
    mimeType: "audio/opus",
    clockRate: 48000,
    channels: 2,
  },
  {
    kind: "video",
    mimeType: "video/VP8",
    clockRate: 90000,
    parameters: { "x-google-start-bitrate": 1000 },
  },
  {
    kind: "video",
    mimeType: "video/VP9",
    clockRate: 90000,
    parameters: { "profile-id": 2, "x-google-start-bitrate": 1000 },
  },
  {
    kind: "video",
    mimeType: "video/h264",
    clockRate: 90000,
    parameters: {
      "packetization-mode": 1,
      "profile-level-id": "4d0032",
      "level-asymmetry-allowed": 1,
      "x-google-start-bitrate": 1000,
    },
  },
];

let worker = null;
const rooms = new Map(); // roomCode → { router, peers: Map }

const createWorker = async () => {
  const rtcMinPort = parseInt(process.env.RTC_MIN_PORT) || 2000;
  const rtcMaxPort = parseInt(process.env.RTC_MAX_PORT) || 2100;

  console.log(`[MEDIASOUP] Creating worker. rtcPorts=${rtcMinPort}-${rtcMaxPort}`);

  worker = await mediasoup.createWorker({
    rtcMinPort,
    rtcMaxPort,
    logLevel: process.env.NODE_ENV === "production" ? "warn" : "debug",
    logTags: ["info", "ice", "dtls", "rtp", "srtp", "rtcp"],
  });

  console.log(`[MEDIASOUP] Worker created, pid=${worker.pid}`);

  worker.on("died", (error) => {
    console.error("[MEDIASOUP] Worker DIED:", error);
    setTimeout(() => process.exit(1), 2000);
  });

  return worker;
};

const getOrCreateRouter = async (roomCode) => {
  if (rooms.has(roomCode)) {
    console.log(`[MEDIASOUP] Reusing router for room: ${roomCode}`);
    return rooms.get(roomCode).router;
  }

  const router = await worker.createRouter({ mediaCodecs });
  rooms.set(roomCode, { router, peers: new Map() });
  console.log(`[MEDIASOUP] Router created for room: ${roomCode}`);
  return router;
};

const getRoom = (roomCode) => rooms.get(roomCode);

const addPeer = (roomCode, socketId, userData) => {
  const room = rooms.get(roomCode);
  if (!room) return;
  room.peers.set(socketId, {
    id: socketId,
    userId: userData.userId,
    name: userData.name,
    transports: new Map(),
    producers: new Map(),
    consumers: new Map(),
  });
  console.log(`[MEDIASOUP] Peer added: ${userData.name} (${socketId}) to room ${roomCode}. Total peers: ${room.peers.size}`);
};

const removePeer = (roomCode, socketId) => {
  const room = rooms.get(roomCode);
  if (!room) return;

  const peer = room.peers.get(socketId);
  if (!peer) return;

  console.log(`[MEDIASOUP] Removing peer ${peer.name} (${socketId}) from room ${roomCode}`);

  // Close all transports — this cascades to producers and consumers
  peer.transports.forEach((transport) => {
    try { transport.close(); } catch (_) {}
  });

  room.peers.delete(socketId);
  console.log(`[MEDIASOUP] Room ${roomCode} now has ${room.peers.size} peer(s)`);

  if (room.peers.size === 0) {
    room.router.close();
    rooms.delete(roomCode);
    console.log(`[MEDIASOUP] Room ${roomCode} deleted (empty)`);
  }
};

/**
 * Returns all producers from other peers in the room.
 * Used when a new peer joins to consume existing streams.
 */
const getOtherProducers = (roomCode, socketId) => {
  const room = rooms.get(roomCode);
  if (!room) return [];

  const producers = [];
  room.peers.forEach((peer, peerSocketId) => {
    if (peerSocketId === socketId) return;
    peer.producers.forEach((producer) => {
      producers.push({
        producerId: producer.id,
        kind: producer.kind,
        socketId: peerSocketId,
        peerId: peer.userId,
        peerName: peer.name,
      });
    });
  });

  console.log(`[MEDIASOUP] getOtherProducers for ${socketId} in ${roomCode}: ${producers.length} producers`);
  return producers;
};

const getPeerList = (roomCode) => {
  const room = rooms.get(roomCode);
  if (!room) return [];
  return Array.from(room.peers.values()).map((p) => ({
    socketId: p.id,
    userId: p.userId,
    name: p.name,
  }));
};

module.exports = {
  createWorker,
  getOrCreateRouter,
  getRoom,
  addPeer,
  removePeer,
  getOtherProducers,
  getPeerList,
};