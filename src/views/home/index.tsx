import React, { useMemo } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useMediaQuery } from '@material-ui/core'
import Loader from '@components/loader'
import Layout from '@common/layout'
import Post, { PostProps } from '@common/post'
import { ReduxState } from '@typings'

import View from './view'

const mapStateToProps = (state: ReduxState) => ({
  currentUID: state.auth.user?.uid,
  isUsersLoaded: state.users.isLoaded,
  usersError: state.users.error,
  users: state.users.items,
  isPostsLoaded: state.posts.isLoaded,
  postsError: state.posts.error,
  posts: state.posts.items
})

const connector = connect(mapStateToProps)

interface Props extends ConnectedProps<typeof connector> {}

interface Props {
  children?: React.ReactNode
}

const HomeView: React.FC<Props> = ({
  currentUID,
  isUsersLoaded,
  usersError,
  users,
  isPostsLoaded,
  postsError,
  posts
}) => {
  const isMobile = useMediaQuery('(max-width: 425px)')

  const getPostsData = () => {
    if (currentUID) {
      const postsData: Array<PostProps> = posts.map((post) => ({
        post,
        users,
        currentUID
      }))

      return postsData
    } else {
      return []
    }
  }

  const postsData = useMemo(getPostsData, [posts, users])

  const renderItems = postsData.map((post, i) => <Post {...post} key={i} />)

  // TODO: refactor
  return (
    <Layout>
      {!isUsersLoaded && !isPostsLoaded && <Loader small />}
      {usersError && <>{usersError}</>}
      {postsError && <>{postsError}</>}
      <View isMobile={isMobile} posts={renderItems} />
    </Layout>
  )
}

export default connector(HomeView)
