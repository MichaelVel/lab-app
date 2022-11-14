import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DBURL as string;

mongoose.connect(uri); 

mongoose.connection.on('connected', () => {
  console.log('connected to database');
});

mongoose.connection.on('error', err => {
  console.log('error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});


// Close the connections when needed
const gracefulShutdown = (msg: string, callback: () => void) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

