const mongoose = require('mongoose');

const { connection, Schema } = mongoose;

mongoose.set('useUnifiedTopology', true);
mongoose
  .connect('mongodb://localhost:27017/test-xot', {
    useNewUrlParser: true,
  })
  .catch(console.error);

const UserSchema = new Schema({
  username: {
    type: String,
    minlength: 6,
    maxlength: 20,
    required: [true, 'user is required'],
    validate: {
      message: '{VALUE} is not a valid username',
      validator: (val) => /^[a-zA-Z]+$/.test(val),
    },
  },
});

const User = mongoose.model('User', UserSchema);

connection.once('connected', async () => {
  try {
    const user = new User();
    let errors = null;

    errors = user.validateSync();
    console.dir(errors.errors.username.message);

    user.username = 'Smith';
    errors = user.validateSync();
    console.dir(errors.errors.username.message);

    user.username = 'Smith_9876';
    errors = user.validateSync();
    console.dir(errors.errors.username.message);
  } catch (error) {
    console.dir(error, { colors: true });
  } finally {
    await connection.close();
  }
});
