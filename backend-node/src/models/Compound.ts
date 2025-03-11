import mongoose, { Schema, Document } from 'mongoose';

// Definir la interfaz para el documento de compuesto
export interface ICompound extends Document {
  name: string;
  formula: string;
  properties?: {
    molarMass?: number;
    density?: number;
    meltingPoint?: number;
    boilingPoint?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Definir el esquema de MongoDB para los compuestos
const CompoundSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    formula: { type: String, required: true },
    properties: {
      molarMass: { type: Number, required: false },
      density: { type: Number, required: false },
      meltingPoint: { type: Number, required: false },
      boilingPoint: { type: Number, required: false },
    },
  },
  { timestamps: true } // Agrega campos createdAt y updatedAt automáticamente
);

// Exportar el modelo
export default mongoose.model<ICompound>('Compound', CompoundSchema);