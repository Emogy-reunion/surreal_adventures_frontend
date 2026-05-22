module.exports = {
  apps: [
    {
      name: "surreal-frontend",

      cwd: "/home/surreal/apps/frontend",

      script: "npm",
      args: "start",

      instances: 1,
      exec_mode: "fork",

      autorestart: true,
      watch: false,

      max_memory_restart: "500M",

      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },

      error_file: "/home/surreal/logs/surreal-frontend-error.log",
      out_file: "/home/surreal/logs/surreal-frontend-out.log",
      log_file: "/home/surreal/logs/surreal-frontend-combined.log",
      time: true,
    },
  ],
};
