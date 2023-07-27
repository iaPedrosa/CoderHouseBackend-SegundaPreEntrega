import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://ignapedrosa:U9buZxQz0MQzjMcO@pedrosa.7sooq4u.mongodb.net/ecommerce2?retryWrites=true&w=majority';

  try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
