// 1. Create config object
const config = {
  env: 'dev',
  port: 3000,
  debug: true
};

// 2. Change config.port to 8080 (works)
config.port = 8080;

console.log("After changing port:", config);

// 3. Try reassigning config (throws TypeError)
try {
  config = {};
} catch (error) {
  console.log("Error:", error.message);
}

// 4. Create frozenConfig
const frozenConfig = Object.freeze({ ...config });

// 5. Try changing frozenConfig.port
frozenConfig.port = 9999; // No effect

console.log("Frozen Config after modification attempt:", frozenConfig);

// 6. Log both configs
console.log("config:", config);
console.log("frozenConfig:", frozenConfig);