const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Server } = require('socket.io')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 8000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

// Game state
const gameState = {
  players: new Map(),
  resources: []
}

// Generate random resources
function generateResources() {
  const resources = []
  for (let i = 0; i < 50; i++) {
    resources.push({
      id: `resource_${i}`,
      x: Math.random() * 4000 - 2000,
      y: Math.random() * 4000 - 2000,
      type: ['uridium', 'prometium', 'endurium'][Math.floor(Math.random() * 3)],
      amount: Math.floor(Math.random() * 100) + 50
    })
  }
  return resources
}

// Initialize resources
gameState.resources = generateResources()

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

  io.on('connection', (socket) => {
    console.log('Player connected:', socket.id)

    // Player joins game
    socket.on('playerJoin', (data) => {
      const player = {
        id: socket.id,
        name: data.name,
        x: Math.random() * 1000 - 500,
        y: Math.random() * 1000 - 500,
        rotation: 0,
        health: 100,
        maxHealth: 100,
        level: 1,
        experience: 0,
        faction: data.faction,
        ship: 'basic'
      }

      gameState.players.set(socket.id, player)
      
      // Send initial game state to new player
      socket.emit('gameState', {
        players: Array.from(gameState.players.values()),
        resources: gameState.resources,
        playerId: socket.id
      })

      // Notify other players
      socket.broadcast.emit('playerJoined', player)
      
      console.log(`Player ${data.name} joined as ${data.faction}`)
    })

    // Player movement
    socket.on('playerMove', (data) => {
      const player = gameState.players.get(socket.id)
      if (player) {
        player.x = data.x
        player.y = data.y
        player.rotation = data.rotation

        // Broadcast movement to other players
        socket.broadcast.emit('playerMoved', {
          id: socket.id,
          x: data.x,
          y: data.y,
          rotation: data.rotation
        })
      }
    })

    // Player shoots
    socket.on('playerShoot', (data) => {
      const player = gameState.players.get(socket.id)
      if (player) {
        // Broadcast shot to all players
        io.emit('playerShot', {
          playerId: socket.id,
          x: data.x,
          y: data.y,
          targetX: data.targetX,
          targetY: data.targetY,
          faction: player.faction
        })
      }
    })

    // Resource collection
    socket.on('collectResource', (resourceId) => {
      const resourceIndex = gameState.resources.findIndex(r => r.id === resourceId)
      if (resourceIndex !== -1) {
        const resource = gameState.resources[resourceIndex]
        const player = gameState.players.get(socket.id)
        
        if (player) {
          // Remove resource and give experience
          gameState.resources.splice(resourceIndex, 1)
          player.experience += resource.amount
          
          // Level up logic
          const newLevel = Math.floor(player.experience / 1000) + 1
          if (newLevel > player.level) {
            player.level = newLevel
            player.maxHealth += 20
            player.health = player.maxHealth
            socket.emit('levelUp', { level: newLevel })
          }

          // Notify all players
          io.emit('resourceCollected', { resourceId, playerId: socket.id })
          socket.emit('playerUpdate', player)
        }
      }
    })

    // Chat message
    socket.on('chatMessage', (message) => {
      const player = gameState.players.get(socket.id)
      if (player && message.trim()) {
        io.emit('chatMessage', {
          playerId: socket.id,
          playerName: player.name,
          faction: player.faction,
          message: message.trim(),
          timestamp: Date.now()
        })
      }
    })

    // Player disconnect
    socket.on('disconnect', () => {
      console.log('Player disconnected:', socket.id)
      gameState.players.delete(socket.id)
      socket.broadcast.emit('playerLeft', socket.id)
    })
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
