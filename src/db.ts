import Sequelize from 'sequelize';
import { resolve } from 'path';

const sq = new Sequelize('db', '', '', {
  dialect: 'sqlite',
  storage: resolve(__dirname, '../storage/db.sqlite3')
});

export default sq;