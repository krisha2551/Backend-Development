import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379",
});

// Error handler
redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err.message);
});

// Connect function
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("✅ Redis Connected");
  } catch (err) {
    console.error("❌ Redis Connection Failed:", err.message);
    process.exit(1);
  }
};

connectRedis();

export default redisClient;