import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs'; // Cambiado de bcrypt a bcryptjs


export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingresa un email válido'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true } // Agrega automáticamente createdAt y updatedAt
);

// Encriptar la contraseña antes de guardar
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcryptjs.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);