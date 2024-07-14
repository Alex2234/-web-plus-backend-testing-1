import { Injectable } from '@nestjs/common'

export interface Post {
	id: string
	text: string
	date: string
}

@Injectable()
export class PostsService {
	private posts: Post[] = []
	private lastPostId = 1

	create(post: Omit<Post, 'id' | 'date'>) {
		const postWithIdAndDate: Post = {
			...post,
			id: this.lastPostId.toString(),
			date: new Date().toISOString(),
		}

		this.lastPostId++

		this.posts.push(postWithIdAndDate)

		return postWithIdAndDate
	}

	find(postId: string) {
		return this.posts.find(({ id }) => id === postId)
	}

	findMany({ limit, skip }: { limit?: number; skip?: number } = {}): Post[] {
		let result = this.posts

		if (skip) {
			result = result.slice(skip)
		}

		if (limit) {
			result = result.slice(0, limit)
		}

		return result
	}

	getPosts() {
		return this.posts
	}
}
