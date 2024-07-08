import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConfig';
import User from './user';

interface JournalAttributes {
  id: number;
  title: string;
  content: string;
  category: string;
  userId: number;
}

interface JournalCreationAttributes extends Optional<JournalAttributes, 'id'> {}

class Journal extends Model<JournalAttributes, JournalCreationAttributes> implements JournalAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public category!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Journal.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'journals',
  }
);

Journal.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Journal, { foreignKey: 'userId' });

export default Journal;
