#!/bin/bash

# Install Node.js dependencies
npm ci

# Build the frontend
npm run build

echo "Build completed successfully"
