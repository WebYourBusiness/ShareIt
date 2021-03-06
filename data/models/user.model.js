const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	image: String,
	age: Number,
	gender: String,
	email: String,
	createdOn: Date,
	favorites: [{}],
	activeListings: [{}]
});

let UserModel;
const femaleProfileImage = '/assets/profile-female.jpg';
const maleProfileImage = '/assets/profile-male.jpg';
userSchema.static('createUser', function (user) {
	let imageUrl = user.image;
	if (!imageUrl) {
		if (user.gender === 'Male') {
			imageUrl = maleProfileImage;
		} else {
			imageUrl = femaleProfileImage;
		}
	}

	return new UserModel({
		username: user.username,
		password: user.password,
		firstName: user.firstName,
		lastName: user.lastName,
		image: imageUrl,
		age: +user.age,
		gender: user.gender,
		email: user.email,
		createdOn: new Date(),
		favorites: user.favorites || [],
		activeListings: user.activeListings || []
	});
});

userSchema.method('isAuthenticated', function (username, password) {
	return this.username === username && this.password === password;
});

mongoose.model('User', userSchema);
UserModel = mongoose.model('User');

// UserModel.plugin(passportLocalMongoose);

module.exports = (function () {
	return UserModel;
})();
