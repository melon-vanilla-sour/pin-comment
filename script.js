console.log('twitter sweet loaded')

// Make Following the default tab to show after loading
const checkExist = setInterval(() => {
  const followingTab = document.querySelector(
    "[data-testid='ScrollSnap-List'] > :nth-child(2) > :first-child"
  )
  if (followingTab) {
    followingTab.click()
    clearInterval(checkExist)
  }
}, 100)
// function injectCSS(file) {
//   const link = document.createElement('link')
//   link.href = chrome.runtime.getURL(file)
//   link.type = 'text/css'
//   link.rel = 'stylesheet'
//   document.head.appendChild(link)
// }

// Inject the CSS file
// injectCSS('styles.css')
