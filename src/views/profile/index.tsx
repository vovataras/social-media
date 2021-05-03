// TODO: refactor
import React, { useState, useMemo } from 'react'
import { Post as PostType, ReduxState, User } from '@typings'
import { connect, ConnectedProps } from 'react-redux'
// import LayoutPreloader from '../../modules/LayoutPreloader'
import EditProfile, { FormValues } from './edit-profile'
import { FormikHelpers } from 'formik'
import { usersCollection } from '@services/database'
import { Paper } from '@material-ui/core'
import { uploadPhoto } from '@services/upload'
// import ErrorPaper from '../../elements/ErrorPaper'
// import LayoutError from '../../modules/LayoutError'
import Error from 'next/error'
import Post from '@common/post'
import Loader from '@components/loader'

import styles from './styles.module.scss'
import ProfileView from './view'

let mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
  isUsersLoaded: state.users.isLoaded,
  users: state.users.items,
  isPostsLoaded: state.posts.isLoaded,
  postsError: state.posts.error,
  posts: state.posts.items
})

const connector = connect(mapStateToProps)

interface Props extends ConnectedProps<typeof connector> {
  profileId?: string
}

const Profile: React.FC<Props> = ({
  profileId,
  user,
  isUsersLoaded,
  users,
  isPostsLoaded,
  postsError,
  posts
}) => {
  const [open, setOpen] = useState(false)
  const [imgFile, setImgFile] = useState(null as File | null)
  // const [postsState, setPostsState] = useState({
  //   isLoaded: false,
  //   items: [] as Post[],
  //   error: null as string | null
  // })

  let isOwner = false
  let userData: User | undefined = undefined
  let content: JSX.Element[] | JSX.Element | null = null

  let userId = profileId

  if (user) {
    isOwner = user.uid === profileId

    if (users) {
      if (profileId) {
        userData = users.find((item) => item.uid === profileId)
      } else {
        userData = users.find((item) => item.uid === user.uid)
        isOwner = true
        userId = userData?.uid
      }
    }
  }

  const userPosts = useMemo(() => {
    return posts.filter((item) => item.uid === userId)
  }, [users, posts])

  // useEffect(() => {
  //   if (profileId && !isOwner) {
  //     userPostsServices.on(profileId, 'value', (snapshot) => {
  //       if (snapshot.exists()) {
  //         const data = snapshot.val()
  //         const entries = Object.entries(data)
  //         setPostsState({
  //           isLoaded: true,
  //           items: entries.reverse() as PostArray,
  //           error: null
  //         })
  //       } else {
  //         setPostsState({
  //           isLoaded: true,
  //           items: null,
  //           error: 'No posts yet.'
  //         })
  //       }
  //     })
  //   }

  //   return () => {
  //     if (profileId && !isOwner) {
  //       userPostsServices.off(profileId)
  //     }
  //   }
  // }, [profileId, isOwner])

  if (
    !isUsersLoaded ||
    !isPostsLoaded
    // (profileId && !isOwner && !postsState.isLoaded)
  ) {
    // return <LayoutPreloader />
    return <Loader />
  }

  if (!user) return null

  if (!userData) {
    return <Error statusCode={404} />
  }

  const handleSettingsClick = () => {
    setOpen(true)
  }

  const handleFormSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const newUserData: Partial<User> = {}

    const checkValues = () => {
      if (userData?.username !== values.username) {
        newUserData.username = values.username
      }
      if (userData?.status !== values.description) {
        newUserData.status = values.description
      }
    }

    if (imgFile) {
      let downloadURL = await uploadPhoto(user.uid, imgFile)
      newUserData.avatar = downloadURL
      checkValues()
    } else {
      checkValues()
    }

    if (Object.keys(newUserData).length !== 0) {
      await usersCollection.update(user.uid, newUserData)
    }

    formikHelpers.setSubmitting(false)
    setImgFile(null)
    setOpen(false)
  }

  const getContent = (posts: PostType[], currentUID: string, users: User[]) => {
    const content = posts.map((value) => {
      return (
        <Post
          key={value.id}
          currentUID={currentUID}
          post={value}
          users={users}
          isProfilePage
        />
      )
      // } else {
      //   return <ErrorPaper error="Post data is unavailable" />
      // }
    })

    return content
  }

  const setContent = (
    error: string | null,
    posts: PostType[] | null,
    users: User[] | null
  ) => {
    if (error) {
      content = <Paper className={styles.errorPaper}>{error}</Paper>
    } else if (posts && users) {
      content = getContent(posts, user.uid, users)
    } else {
      // content = <LayoutError error="Something went wrong." />
      content = <>{'Something went wrong.'}</>
    }
  }

  setContent(postsError, userPosts, users)

  return (
    <>
      <ProfileView
        username={userData?.username}
        avatar={userData?.avatar ? userData?.avatar : undefined}
        description={userData?.status}
        content={content}
        showSettings={isOwner}
        handleSettingsClick={handleSettingsClick}
      />
      {isOwner && (
        <EditProfile
          usernameVal={userData?.username}
          descriptionVal={userData?.status}
          open={open}
          setOpen={setOpen}
          imgFile={imgFile}
          setImgFile={setImgFile}
          handleSubmit={handleFormSubmit}
        />
      )}
    </>
  )
}

export default connector(Profile)
