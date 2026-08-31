import User from './user.model';
import Profile from './profile.model';
import Clinic from './clinic.model';
import Warehouse from './warehouse.model';
import Medication from './medication.model';
import Inventory from './inventory.model';
import SupplyRequest from './supply-request.model';

// Asociaciones entre User y Profile
User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Asociaciones entre User y Clinic (responsable)
User.hasOne(Clinic, { foreignKey: 'responsibleUserId', as: 'clinic' });
Clinic.belongsTo(User, { foreignKey: 'responsibleUserId', as: 'responsibleUser' });

// Asociaciones entre User y Warehouse (gestor)
User.hasOne(Warehouse, { foreignKey: 'managerId', as: 'warehouse' });
Warehouse.belongsTo(User, { foreignKey: 'managerId', as: 'manager' });

// Asociaciones entre Clinic y SupplyRequest
Clinic.hasMany(SupplyRequest, { foreignKey: 'clinicId', as: 'supplyRequests' });
SupplyRequest.belongsTo(Clinic, { foreignKey: 'clinicId', as: 'clinic' });

// Asociaciones entre Warehouse y SupplyRequest
Warehouse.hasMany(SupplyRequest, { foreignKey: 'warehouseId', as: 'supplyRequests' });
SupplyRequest.belongsTo(Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });

// Asociaciones entre Medication y SupplyRequest
Medication.hasMany(SupplyRequest, { foreignKey: 'medicationId', as: 'supplyRequests' });
SupplyRequest.belongsTo(Medication, { foreignKey: 'medicationId', as: 'medication' });

// Asociaciones entre Warehouse e Inventory
Warehouse.hasMany(Inventory, { foreignKey: 'warehouseId', as: 'inventories' });
Inventory.belongsTo(Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });

// Asociaciones entre Medication e Inventory
Medication.hasMany(Inventory, { foreignKey: 'medicationId', as: 'inventories' });
Inventory.belongsTo(Medication, { foreignKey: 'medicationId', as: 'medication' });
