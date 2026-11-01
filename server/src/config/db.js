import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_detective_room';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to MongoDB at ${uri}.`);
    console.warn(`[Database Warning] Reason: ${error.message}`);
    console.warn(`[Database Warning] Server will continue running with in-memory fallback where applicable.`);
    return false;
  }
}

