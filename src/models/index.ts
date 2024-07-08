import sequelize from '../config/dbConfig';
import User from './user';
import Journal from './journal';

const dbInit = async () => {
  await sequelize.sync({ force: true });
};

export { User, Journal, dbInit };
