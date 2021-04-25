import React from 'react'
import Layout from '@common/layout'
import PostCard, { Props as PostProps } from '@common/post-card'
import { useMediaQuery } from '@material-ui/core'

import View from './view'

const posts: PostProps[] = [
  {
    image: 'https://picsum.photos/600/1000',
    username: 'Test'
  },
  {
    image: 'https://picsum.photos/700/900',
    username: 'Test'
  },
  {
    image: 'https://picsum.photos/800/800',
    username: 'Test'
  },
  {
    image: 'https://picsum.photos/900/700',
    username: 'Test'
  },
  {
    image: 'https://picsum.photos/1000/600',
    username: 'Test'
  }
]

const HomeView = () => {
  const isMobile = useMediaQuery('(max-width: 425px)')

  let content = posts.map((value, i) => <PostCard {...value} key={i} />)

  return (
    <Layout>
      <View isMobile={isMobile} posts={content} />
    </Layout>
  )
}

export default HomeView
