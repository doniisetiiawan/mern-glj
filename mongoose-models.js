const mongoose = require('mongoose');

const { connection, Schema } = mongoose;

mongoose.set('useUnifiedTopology', true);
mongoose
  .connect('mongodb://localhost:27017/test-xot', {
    useNewUrlParser: true,
  })
  .catch(console.error);

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  likes: [String],
});
const User = mongoose.model('User', UserSchema);

const addUser = (firstName, lastName) => new User({
  firstName,
  lastName,
}).save();

const getUser = (id) => User.findById(id);
const removeUser = (id) => User.deleteOne({ id });

connection.once('connected', async () => {
  try {
    const newUser = await addUser('John', 'Smith');
    const user = await getUser(newUser.id);
    user.firstName = 'Jonny';
    user.lastName = 'Smithy';
    user.likes = [
      'cooking',
      'watching movies',
      'ice cream',
    ];
    await user.save();
    console.log(JSON.stringify(user, null, 4));
    await removeUser(user.id);
  } catch (error) {
    console.dir(error.message, { colors: true });
  } finally {
    await connection.close();
  }
});
