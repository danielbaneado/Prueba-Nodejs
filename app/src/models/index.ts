// Punto de entrada de modelos: importa todos los modelos y registra asociaciones
// Evita dependencias circulares: database.ts → models → database.ts

import './user.model';
import './profile.model';
import './clinic.model';
import './warehouse.model';
import './medication.model';
import './inventory.model';
import './associations.model';
