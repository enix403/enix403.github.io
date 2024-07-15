import { json } from '@sveltejs/kit'

type Post = {

}

async function getPosts() {
	return [];
}

export async function GET() {
	const posts = await getPosts()
	return json(posts)
}

export const prerender = true;