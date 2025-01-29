export const getCookies = () => {
  const cookies = document.cookie.split('; ')
  const cookiesObj: { [key: string]: string } = {}
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split('=')
    cookiesObj[key] = value
  })
  return cookiesObj
}
