#!/bin/bash
# ==============================================================================
# TutorBari.com — One-Click Production Build & Server Runner
# Architect: Sakil Ahammed (Full-Stack AI Automation & Autonomous Operations Architect)
# Crafted with love by: কলিজা (Kolija)
# ==============================================================================

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "======================================================================"
echo "🚀 TUTORBARI.COM — INITIALIZING PRODUCTION RUNNER ON PORT 3003"
echo "======================================================================"

# 1. Check dependencies
if [ ! -d "node_modules" ]; then
  echo "📦 Installing npm dependencies..."
  npm install
fi

# 2. Build Next.js application
echo "⚡ Building Next.js 16 production bundle..."
npm run build

# 3. Start server
echo "✨ Starting TutorBari production server on port 3003..."
PORT=3003 npx next start -p 3003
