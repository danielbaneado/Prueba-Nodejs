import User from './user.model';
import Profile from './profile.model';

// Asociaciones explícitas entre modelos
User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });
