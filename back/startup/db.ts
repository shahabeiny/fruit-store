import * as mongoose from 'mongoose';

const connectToDatabase = (): void => {
  const dbAddress = process.env.DBADDRESS as string;

  mongoose
    .connect(dbAddress, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as mongoose.ConnectOptions)
    .then(() => console.log('connected to mongodb!')) // connect ok
    .catch((error: Error) => console.log('could not connect to mongodb!', error)); // connect error
};

export default connectToDatabase;
