import AdminAuth from '@/components/AdminAuth/AdminAuth'

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen z-30 bg-neutral-800 opacity-50" />
      <div
        className="fixed max-w-[1040px] flex flex-col items-center justify-center min-w-fit overflow-hidden mx-4 bg-transparent inset-y-0 inset-x-0 z-40
        lg:p-8
        xl:mx-auto"
      >
        <AdminAuth />
      </div>
    </>
  )
}
