import { ApiVersions, Posts } from '@/constants'
import type { IPost, Request } from '@/interfaces'

import { apiService } from './api.service'

/**
 * @description Get all posts
 * @param {}
 * @return {IPost[]}
 * @url /posts
 */
export const getPosts = (req: Request): Promise<IPost[]> => {
  return apiService.get<IPost[], object>(Posts.ALL_POSTS, req, ApiVersions.V1)
}
