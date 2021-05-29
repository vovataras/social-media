// TODO: refactor
import React, { useState } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Container, useMediaQuery, useTheme } from '@material-ui/core'
import { PostCreate } from '@typings'
import { userPostsCollection } from '@services/database'
import { putImage } from '@services/storage'
import imageCompression from 'browser-image-compression'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Routes from '@constants/routes'
import Layout from '@common/layout'

import FirstStep from './first-step'
import SecondStep from './second-step'
import FinalStep from './final-step'

import styles from './styles.module.scss'

const getSteps = () => {
  return ['Select photo', 'Add description', 'Share a post']
}

const AddPostView: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set<number>())
  const [image, setImage] = useState(null as string | null)
  const [imgFile, setImgFile] = useState(null as File | null)
  const [imgError, setImgError] = useState(null as string | null)
  const [shareError, setShareError] = useState(null as string | null)
  const [isHandlingShare, setIsHandlingShare] = useState(false)
  const [description, setDescription] = useState('')
  const users = useSelector((state) => state.users.items)
  const steps = getSteps()
  const uid = useSelector((state) => state.auth.user?.uid)
  const userData = users.find((user) => user.uid === uid)

  const router = useRouter()

  if (!uid) {
    return null
  }

  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('sm'))

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            image={image}
            imgError={imgError}
            setImage={setImage}
            setImgFile={setImgFile}
            setImgError={setImgError}
          />
        )
      case 1:
        return (
          <SecondStep
            description={description}
            setDescription={setDescription}
            image={image}
          />
        )
      case 2:
        return (
          <FinalStep
            username={userData?.username}
            avatar={userData?.avatar ? userData.avatar : ''}
            image={image ? image : ''}
            description={!skipped.size ? description : ''}
            isHandlingShare={isHandlingShare}
          />
        )
      default:
        return (
          <Typography className={styles.instructions}>
            {'Unknown step'}
          </Typography>
        )
    }
  }

  const isStepOptional = (step: number) => {
    return step === 1
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleShare = async () => {
    setIsHandlingShare(true)

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    const compressedFile = await imageCompression(imgFile!, options)

    const uploadTask = putImage(uid, compressedFile)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      (error) => {
        setShareError(error.message)
        console.error(error)

        handleNext()
      },
      async () => {
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()

        const post: PostCreate = {
          uid: uid,
          image: downloadURL,
          date: new Date().toJSON(),
          description: description,
          likesCount: 0
        }
        await userPostsCollection.create(uid, post)

        setIsHandlingShare(false)

        handleNext()
      }
    )
  }

  const handleFinal = () => {
    setTimeout(() => {
      router.push(Routes.home)
    }, 2000)

    return (
      <Typography className={styles.instructions}>
        {shareError}
        {!shareError && 'You have successfully shared the post.'}
      </Typography>
    )
  }

  return (
    <Layout>
      <Container maxWidth="md">
        <div className={styles.root}>
          <Stepper
            activeStep={activeStep}
            orientation={desktop ? 'horizontal' : 'vertical'}
          >
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {}
              const labelProps: { optional?: React.ReactNode } = {}
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                )
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              handleFinal()
            ) : (
              <div>
                {getStepContent(activeStep)}
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={styles.button}
                  >
                    {'Back'}
                  </Button>
                  {isStepOptional(activeStep) && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSkip}
                      className={styles.button}
                    >
                      {'Skip'}
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <Button
                      disabled={!image || isHandlingShare}
                      variant="contained"
                      color="primary"
                      onClick={handleShare}
                      className={styles.button}
                    >
                      {'Share'}
                    </Button>
                  ) : (
                    <Button
                      disabled={!image || (activeStep === 1 && !description)}
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={styles.button}
                    >
                      {'Next'}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default AddPostView
