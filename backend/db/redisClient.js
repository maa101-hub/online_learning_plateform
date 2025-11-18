const redis = require('./redisDB');
const run = async () => {
  await redis.set('test-key', 'hello', 120);  // Set with 2 min expiry
  const value = await redis.get('test-key');  // Get
  console.log(value);                         // "hello"
  await redis.del('test-key');                // Delete
};

run();
