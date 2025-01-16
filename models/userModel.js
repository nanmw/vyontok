const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'You must have a name.'],
    maxlength: [60, 'You name must have less or equal 60 characters.'],
    minlength: [5, 'You must have more or equal 5 characters.']
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, 'Please provide an email.'],
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: {
    type: String,
    default: 'default.jpeg',
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  occupation: {
    type: String,
  },
  quotation: {
    type: String,
  },
  about: {
    type: String,
  },
  goals: {
    type: Array,
  },
  role: {
    type: String,
    enum: ['user', 'volunteer', 'treasurer', 'secretary', 'vice-chairman', 'chairman', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 6,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      // This only works on CREATE and on SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same.'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// FUNCTIONS
const processGoals = function (next) {
  const update = this.getUpdate();
  if (update.goals) {
    update.goals = update.goals.split(';').map(goal => goal.trim());
  }
  next();
};

userSchema.virtual('formattedName').get(function () {
  if (this.name) {
    return this.name.charAt(0).toUpperCase() + this.name.slice(1);
  }
  return this.name;
});

userSchema.virtual('formattedRole').get(function () {
  if (this.role) {
    return this.role.charAt(0).toUpperCase() + this.role.slice(1);
  }
  return this.role;
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified.
  if (!this.isModified('password')) return next();

  // this.password = await bcrypt.hash(this.password, bcrypt.genSalt(12));

  // Hash the password with cost of 12.
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field.
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('updateOne', processGoals);
userSchema.pre('findOneAndUpdate', processGoals);


userSchema.pre(/^find/, function (next) {
  // This points to the current query.
  this.find({
    active: { $ne: false }
  });
  next();
});


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    // console.log(this.passwordChangedAt.getTime() / 1000);
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;