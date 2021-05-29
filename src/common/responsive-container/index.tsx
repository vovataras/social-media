import { Container, ContainerProps, useMediaQuery } from '@material-ui/core'

interface Props extends ContainerProps {}

const ResponsiveContainer: React.FC<Props> = ({ children, ...props }) => {
  const isMobile = useMediaQuery('(max-width: 425px)')

  return (
    <Container maxWidth="md" disableGutters={isMobile} {...props}>
      <>{children}</>
    </Container>
  )
}

export default ResponsiveContainer
