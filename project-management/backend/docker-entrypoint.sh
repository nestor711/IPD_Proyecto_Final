#!/bin/sh
set -e

echo "Initializing database..."
node scripts/initDB.js

echo "Starting server..."
npm start