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

	it('should return the correct number of posts with limit', () => {
		postsService.create({ text: 'Post 1' })
		postsService.create({ text: 'Post 2' })
		postsService.create({ text: 'Post 3' })

		const posts = postsService.findMany({ limit: 2 })
		expect(posts.length).toBe(2)
	})

	it('should skip the correct number of posts', () => {
		postsService.create({ text: 'Post 1' })
		postsService.create({ text: 'Post 2' })
		postsService.create({ text: 'Post 3' })

		const posts = postsService.findMany({ skip: 1 })
		expect(posts.length).toBe(3)
		expect(posts[0].text).toBe('Post 1')
	})

	it('should skip and limit posts correctly', () => {
		postsService.create({ text: 'Post 1' })
		postsService.create({ text: 'Post 2' })
		postsService.create({ text: 'Post 3' })
		postsService.create({ text: 'Post 4' })

		const posts = postsService.findMany({ skip: 1, limit: 2 })
		expect(posts.length).toBe(2)
		expect(posts[0].text).toBe('Post 1')
		expect(posts[1].text).toBe('Post 2')
	})

	it('should return all posts if limit and skip are not provided', () => {
		postsService.create({ text: 'Post 1' })
		postsService.create({ text: 'Post 2' })

		const posts = postsService.findMany()
		expect(posts.length).toBe(3)
	})

	it('should return an empty array if skip exceeds number of posts', () => {
		postsService.create({ text: 'Post 1' })
		postsService.create({ text: 'Post 2' })

		const posts = postsService.findMany({ skip: 10 })
		expect(posts.length).toBe(0)
	})
})
