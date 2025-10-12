import { spawn } from 'child_process';
import { log } from "./vite";

// Start Flask application instead of Express
log("Starting Flask API server...");

// First, seed the database
const seed = spawn('python', ['seed_db.py'], {
  env: process.env,
  stdio: 'pipe'
});

seed.stdout?.on('data', (data) => {
  log(data.toString().trim(), "seed");
});

seed.stderr?.on('data', (data) => {
  console.error(`Seed error: ${data}`);
});

seed.on('close', (code) => {
  if (code === 0) {
    log("Database seeded successfully", "seed");
    
    // Now start Flask server
    const flask = spawn('python', ['app.py'], {
      stdio: 'inherit',
      env: process.env
    });

    flask.on('error', (error) => {
      console.error(`Failed to start Flask: ${error.message}`);
      process.exit(1);
    });

    flask.on('exit', (code) => {
      log(`Flask process exited with code ${code}`, "flask");
      process.exit(code || 0);
    });

    // Handle termination signals
    process.on('SIGTERM', () => {
      flask.kill('SIGTERM');
    });

    process.on('SIGINT', () => {
      flask.kill('SIGINT');
    });
  } else {
    log(`Database seed failed with code ${code}`, "seed");
    // Continue with Flask anyway
    const flask = spawn('python', ['app.py'], {
      stdio: 'inherit',
      env: process.env
    });

    flask.on('error', (error) => {
      console.error(`Failed to start Flask: ${error.message}`);
      process.exit(1);
    });
  }
});
