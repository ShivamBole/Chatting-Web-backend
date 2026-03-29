const mediasoup = require("mediasoup");

// ── mediasoup codec config ───────────────────────────
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
    parameters: {
      "profile-id": 2,
      "x-google-start-bitrate": 1000,
    },
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

// rooms Map: roomCode → { router, peers }
// peers Map: socketId → { id, name, transports, producers, consumers }
const rooms = new Map();

// ── Create the mediasoup Worker once at startup ──────
const createWorker = async () => {
  worker = await mediasoup.createWorker({
    rtcMinPort: 2000,
    rtcMaxPort: 2100,
    logLevel: "warn",
  });

  console.log("mediasoup worker created, pid:", worker.pid);

  worker.on("died", (error) => {
    console.error("mediasoup worker died:", error);
    // In production: restart the worker or exit process
    setTimeout(() => process.exit(1), 2000);
  });

  return worker;
};

// ── Get or create a Router for a room ────────────────
const getOrCreateRouter = async (roomCode) => {
  if (rooms.has(roomCode)) {
    return rooms.get(roomCode).router;
  }

  const router = await worker.createRouter({ mediaCodecs });

  rooms.set(roomCode, {
    router,
    peers: new Map(), // socketId → peer data
  });

  console.log(`Room created: ${roomCode}`);
  return router;
};

// ── Get the room map entry ────────────────────────────
const getRoom = (roomCode) => rooms.get(roomCode);

// ── Add a peer to a room ──────────────────────────────
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
};

// ── Remove a peer and clean up all their resources ───
const removePeer = (roomCode, socketId) => {
  const room = rooms.get(roomCode);
  if (!room) return;

  const peer = room.peers.get(socketId);
  if (!peer) return;

  // Close all transports (closes producers and consumers too)
  peer.transports.forEach((transport) => {
    try { transport.close(); } catch (_) {}
  });

  room.peers.delete(socketId);

  // If room is empty, clean it up
  if (room.peers.size === 0) {
    room.router.close();
    rooms.delete(roomCode);
    console.log(`Room deleted (empty): ${roomCode}`);
  }
};

// ── Get all producers in a room except own ────────────
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
  return producers;
};

// ── Get peer list for a room ──────────────────────────
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