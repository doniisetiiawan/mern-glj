const mongoose = require('mongoose');

const { connection, Schema } = mongoose;

mongoose.set('useUnifiedTopology', true);
mongoose
  .connect('mongodb://localhost:27017/test-xot', {
    useNewUrlParser: true,
  })
  .catch(console.error);

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
UserSchema.pre('insertMany', async () => {
  console.log('Preparing docs...');
});
UserSchema.post('insertMany', async (docs) => {
  console.log('The following docs were created:\n', docs);
});
const User = mongoose.model('User', UserSchema);

connection.once('connected', async () => {
  try {
    await User.insertMany([
      { firstName: 'Leo', lastName: 'Smith' },
      { firstName: 'Neo', lastName: 'Jackson' },
    ]);
  } catch (error) {
    console.dir(error, { colors: true });
  } finally {
    await connection.close();
  }
});
