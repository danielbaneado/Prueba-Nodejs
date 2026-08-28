// Punto de entrada de modelos: importa todos los modelos y registra asociaciones
// Evita dependencias circulares: database.ts → models → database.ts

import './user.model';
import './profile.model';
import './associations';
