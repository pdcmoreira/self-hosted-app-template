module.exports = {
  apps: [
    {
      name: 'self-hosted-app-template',
      script: './backend/dist/server.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      time: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
      kill_timeout: 5000,
      listen_timeout: 3000,
      shutdown_with_message: true,
      wait_ready: false,
      // Auto-restart on crash
      restart: true,
      // Exponential backoff restart delay
      exp_backoff_restart_delay: 100,
    },
  ],
};
