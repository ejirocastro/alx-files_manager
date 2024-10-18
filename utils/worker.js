import { userQueue } from './queues/userQueue';
import dbClient from './utils/db';

userQueue.process(async (job, done) => {
  const { userId } = job.data;

  if (!userId) {
    throw new Error('Missing userId');
  }

  const user = await dbClient.users().findOne({ _id: new dbClient.ObjectID(userId) });

  if (!user) {
    throw new Error('User not found');
  }

  console.log(`Welcome ${user.email}!`);

  done();
});
