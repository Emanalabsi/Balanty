import app from './app';
import { PORT } from './config';
import build from './database/config/build';
import { sequelize } from './database/config/connection';

const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    build();
    console.log('Connection has been established successfully.');
    app.listen(PORT, (): void => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
startServer();
