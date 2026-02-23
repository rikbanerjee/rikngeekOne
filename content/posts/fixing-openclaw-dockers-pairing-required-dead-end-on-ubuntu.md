---
title: "Fixing OpenClaw Docker's \"Pairing Required\" Dead End on Ubuntu"
excerpt: "I recently set up [OpenClaw](https://openclaw.com/) using Docker and followed [Simon Willison's excellent TIL post](https://til.simonwillison.net/llms/openclaw-docker) as my starting point. It's a fantastic first guide and I highly recommend it for getting the containers up and running. Everything went smoothly until I hit this in the browser:"
date: "2026-02-23"
readTime: "3 min read"
category: "AI"
categorySlug: "ai"
categoryColor: "bg-purple-100 text-purple-800"
image: "/images/docker-openclaw-rikngeek.jpg"
tags:
  - "openclaw"
  - "ai"
  - "agenticai"
  - "docker"
author: "RikNGeek"
---

# Fixing OpenClaw Docker's "Pairing Required" Dead End on Ubuntu

**Author:** Rik Banerjee  
**Date:** February 2026  
**Tested with:** OpenClaw 2026.2.12, Ubuntu, Docker

---

I recently set up [OpenClaw](https://openclaw.com/) using Docker and followed [Simon Willison's excellent TIL post](https://til.simonwillison.net/llms/openclaw-docker) as my starting point. It's a fantastic first guide and I highly recommend it for getting the containers up and running. Everything went smoothly until I hit this in the browser:

```
disconnected (1008): pairing required
```

Simon's post acknowledges this and suggests running the CLI via `docker compose exec` to list and approve devices. **This is where I got stuck.** That command threw a completely different error and I spent a good chunk of time going back to the drawing board.

---

## Where Things Break

Following the guide, you run:

```bash
docker compose exec openclaw-gateway node dist/index.js devices list
```

Instead of listing devices, you get:

```
gateway connect failed: Error: unauthorized: gateway token mismatch
(set gateway.remote.token to match gateway.auth.token)
```

So the "pairing required" fix from the guide leads straight into a **token mismatch** wall. You'll also see `CLAUDE_*` variable warnings in the output -- ignore those, they're unrelated.

---

## The Fix: Bypass with an Environment Variable

The CLI inside the container isn't resolving the token from `openclaw.json` correctly. The workaround is to inject it directly using `docker exec -e`.

### Step 1 — Find your gateway token

Check the token in your host config:

```bash
cat ~/.openclaw/openclaw.json | grep -A5 '"auth"'
```

Look for the `"token"` value under `gateway.auth`:

```json
"auth": {
  "mode": "token",
  "token": "<YOUR_TOKEN>"
}
```

### Step 2 — Verify the container has the same token

```bash
docker ps  # note the openclaw-gateway CONTAINER_ID
docker exec -it <CONTAINER_ID> cat /home/node/.openclaw/openclaw.json | grep -A5 '"auth"'
```

The tokens should match. If they don't, that's your problem right there.

### Step 3 — List devices with the token override

Instead of `docker compose exec`, use `docker exec` with the `-e` flag:

```bash
docker exec \
  -e OPENCLAW_GATEWAY_TOKEN=<YOUR_TOKEN> \
  -it <CONTAINER_ID> \
  node dist/index.js devices list
```

This should now work and show your pending device requests:

```
Pending (1)
| Request            | Device    | Role     | IP         | Age    |
| ------------------ | --------- | -------- | ---------- | ------ |
| xxxxxxx-xx-xxxx-xx | 0458f6... | operator | 172.19.0.1 | 2m ago |
```

### Step 4 — Approve the pending device

Use the **Request ID** (not the Device ID) from the output above:

```bash
docker compose exec openclaw-gateway \
  node dist/index.js devices approve <REQUEST_ID>
```

You should see: `Approved`

### Step 5 — Verify

Open [http://localhost:18789](http://localhost:18789) in your browser.

**The "pairing required" error is gone and OpenClaw connects successfully.**

---

## What I Tried That Didn't Work

Passing the token as a CLI flag — don't waste your time:

```bash
# This does NOT work
docker exec -it <CONTAINER_ID> node dist/index.js \
  --gateway.remote.token="<YOUR_TOKEN>" devices list
# error: unknown option '--gateway.remote.token=...'
```

The environment variable approach (`-e OPENCLAW_GATEWAY_TOKEN=...`) is the only workaround that worked.

---

## TL;DR

If you followed Simon's guide, hit `disconnected (1008): pairing required`, and then the suggested `docker compose exec` device commands fail with a **token mismatch** — here's your one-liner:

```bash
docker exec -e OPENCLAW_GATEWAY_TOKEN=<YOUR_TOKEN> -it <CONTAINER_ID> node dist/index.js devices list
```

Approve the pending device from the output, refresh the browser, and you're in.

Thanks to [Simon Willison](https://til.simonwillison.net/llms/openclaw-docker) for the original Docker setup guide that got me started.

---

*Tags: #openclaw #docker #BuildingAI #weekendcoding #openAI #agentic #ai*
