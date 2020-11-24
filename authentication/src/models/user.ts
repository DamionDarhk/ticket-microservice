import mongoose from 'mongoose';
import { Password } from '../utils/password';

/**
 * An interface that describes properties
 * that are required to create an user
 */
interface UserAttribute {
  email: string;
  password: string;
}

/**
 * An interface that describes properties
 * than User Model has
 */
interface UserModel extends mongoose.Model<UserDocument> {
  build(attribute: UserAttribute): UserDocument;
}

/**
 * An interface that describes properties
 * that User Document has
 */
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String, //here we are using capital String because are refering to build-in constructor that is available inside javascript
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  //directly changing the output of object
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
    versionKey: false,
  },
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attribute: UserAttribute) => {
  return new User(attribute);
};

/**
 * purpose of angle brackets: types being provided to function as arguements
 */
const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
