import mongoose, { Schema } from 'mongoose';

const dbUri = 'mongodb://127.0.0.1:27017/Practice';

await mongoose
	.connect(dbUri)
	.then(() => {
		console.log('Database connected!');
	})
	.catch((e) => console.log(`Something bad happened!, ${e}`));

const postUserSchema = mongoose.Schema({
	username: { type: String, required: true },
});

const postSchema = mongoose.Schema({
	text: String,
	likes: Number,
	user: { type: Schema.Types.ObjectId, ref: 'postUsers' },
});

const PostUser = mongoose.model('postUsers', postUserSchema);

const Post = mongoose.model('posts', postSchema);

const createPostUser = async () => {
	// For sample data, remove prev data to avoid duplicates
	await PostUser.deleteMany({});
	const user = PostUser({
		username: 'Jhon Doe',
	});
	const newUser = await user.save();
	console.log({ newUser: newUser });
	return newUser;
};

const createPost = async ({ user, text, likes }) => {
	await Post.deleteMany({});
	const post = Post({ user, text, likes });
	const newPost = await post.save();
	console.log(newPost);
};

const viewPost = async (userId) => {
	const foundPosts = await Post.findOne({ user: userId }).populate('user');
	console.log(foundPosts);
};

const user = await createPostUser();
await createPost({ user, text: 'Gotta love programming', likes: 3500 });
await createPost({ user, text: 'I need to find some good motivation', likes: 270	 });
await createPost({ user, text: 'Web Dev job market is nuts right now', likes: 100 });

await viewPost(user._id)

await mongoose.disconnect();
