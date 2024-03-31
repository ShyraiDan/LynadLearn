export const removeScrollBar = (state: boolean) => {
  const html = document.querySelector('html') as HTMLElement
  state === false ? (html.style.overflowY = 'hidden') : (html.style.overflowY = 'scroll')
}
