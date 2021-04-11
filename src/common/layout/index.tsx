import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => (
  <div className={styles.page}>
    <div className={styles.content}>{children}</div>
  </div>
)

export default Layout
