import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	first: {
		type: String,
		required: true,
    unique: true
	},
	last: {
		type: String,
		required: true,
	},
	addresses: [
		{
      _id: {_id: false},
			street: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			state: {
				type: String,
				required: true,
			},
			country: {
				type: String,
				required: true,
			},
			zipCode: {
				type: Number,
				required: true,
				maxlength: 5,
			},
		},
	],
});

const User = mongoose.model('User', userSchema);

export const makeUser = async () => {
  const user = new User({
    first: 'Ivan',
    last: 'Rodriguez',
    addresses: [
      {
        street: '6 Juan Aguado',
        city: 'El Almirante',
        state: 'Santo Domingo',
        country: 'Republica Dominicana',
        zipCode: 11806
      }
    ]
  })
	await User.deleteMany().then(res => console.log(`Deleted Users count: ${res.deletedCount}`))
  const result = await user.save()

  console.log(result)
  return result
}

export const addAddress = async (id) => {
  const foundUser = await User.findById(id)
  foundUser.addresses.push({
    street: '3801 Vitruvian Way',
    city:'Addison',
    state: 'TX',
    country: 'USA',
    zipCode: 75001
  })
  const newUSerResult = await foundUser.save()
  console.log(newUSerResult)
}



