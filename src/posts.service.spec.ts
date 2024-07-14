import { Post, PostsService } from './posts.service'

describe('PostsService', () => {
	let postsService: PostsService
	const post: Omit<Post, 'id' | 'date'> = {
		text: 'Mocked post',
	}

	beforeEach(async () => {
		postsService = new PostsService()

		postsService.create({ text: 'Some pre-existing post' })
	})

	it('should add a new post', () => {
		// Количество постов до добавления нового поста
		const initialPosts = postsService['posts']
		const initialPostCount = initialPosts.length

		// Добавление нового поста
		const newPost = postsService.create(post)

		// Проверка количества постов после добавления нового поста
		const allPosts = postsService['posts']
		expect(allPosts.length).toBe(initialPostCount + 1)
		expect(allPosts).toContainEqual(newPost)

		// Проверка атрибутов нового поста
		expect(newPost.text).toBe(post.text)
		expect(newPost.id).toBeDefined()
		expect(newPost.date).toBeDefined()
	})

	it('should find a post', () => {
		// Создание нового поста
		const newPost = postsService.create(post)

		// Поиск поста по id
		const foundPost = postsService.find(newPost.id)

		// Проверка найденного поста
		expect(foundPost).toBeDefined()
		expect(foundPost?.id).toBe(newPost.id)
		expect(foundPost?.text).toBe(newPost.text)
	})
})
