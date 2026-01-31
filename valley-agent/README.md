# Valley Agent

A Claude Code server that uses `~/.valley/` as its workspace, with HTTP API and real-time WebSocket streaming.

## Quick Start

```bash
cd valley-agent
bun install
bun run start
```

The server will start at `http://localhost:3000`.

## Features

- **HTTP API** - Start queries and manage sessions via REST endpoints
- **WebSocket** - Real-time streaming of Claude's responses
- **Workspace** - Uses `~/.valley/` as the working directory (customizable via CLAUDE.md)
- **Session Management** - Multi-turn conversations with resume support
- **Logging** - JSONL logs for each session in `~/.valley/logs/sessions/`
- **Web UI** - Simple browser-based interface for viewing and interacting with sessions

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/query` | Start a new query session |
| POST | `/api/query/:sessionId/message` | Send a message to an existing session |
| GET | `/api/sessions` | List all sessions |
| GET | `/api/sessions/:sessionId/logs` | Get logs for a session |
| WS | `/ws` | WebSocket connection for real-time updates |
| GET | `/` | Web UI |

## Example Usage

### Start a new query

```bash
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello, what can you do?"}'
```

### Send a follow-up message

```bash
curl -X POST http://localhost:3000/api/query/SESSION_ID/message \
  -H "Content-Type: application/json" \
  -d '{"content":"Tell me more"}'
```

### WebSocket Connection

```javascript
const ws = new WebSocket('ws://localhost:3000/ws');

ws.onopen = () => {
  // Send a chat message
  ws.send(JSON.stringify({
    type: 'chat',
    content: 'Hello!',
    sessionId: 'optional-session-id'
  }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log(message);
  // { type: 'assistant_message', content: '...', sessionId: '...' }
  // { type: 'tool_use', toolName: '...', toolInput: {...}, sessionId: '...' }
  // { type: 'result', success: true, cost: 0.01, sessionId: '...' }
};
```

## Workspace Structure

```
~/.valley/
├── CLAUDE.md           # Agent instructions (customize behavior here)
├── .claude/
│   ├── settings.json   # Project settings (permissions, etc.)
│   └── skills/         # Custom skills
└── logs/
    └── sessions/       # Session logs (JSONL format)
```

## Customization

Edit `~/.valley/CLAUDE.md` to customize the agent's behavior and instructions.

Edit `~/.valley/.claude/settings.json` to configure allowed tools and permissions.

## Development

```bash
bun run dev  # Watch mode with auto-reload
```
