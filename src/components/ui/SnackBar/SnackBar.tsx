import { Toaster } from 'sonner'

const SnackBar = ({ styleClass }: { styleClass?: string }) => {
  return (
    <Toaster
      toastOptions={{
        className: `text-lg ${styleClass}`
      }}
      expand
      visibleToasts={3}
    />
  )
}
export default SnackBar
