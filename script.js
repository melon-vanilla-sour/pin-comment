console.log('pin comment loaded')

function addPinButtonToComments() {
  let commentsContainer = document.querySelectorAll('ytd-comment-thread-renderer')

  commentsContainer.forEach((commentContainer) => {
    let comment = commentContainer.querySelector('#comment #body #main #header')
    if (!comment.querySelector('.pin-button')) {
      const pinButton = document.createElement('a')
      pinButton.textContent = 'pin comment'
      pinButton.className = 'pin-button'
      comment.appendChild(pinButton)
      console.log('button added')
    }
  })
}

const waitForCommentsLoad = setInterval(() => {
  console.log('waiting comments...')
  const commentsContainer = document.querySelectorAll('ytd-comment-thread-renderer')
  if (commentsContainer.length != 0) {
    clearInterval(waitForCommentsLoad)
    addPinButtonToComments()
  }
}, 1000)

const waitForCommentsSectionLoad = setInterval(() => {
  console.log('waiting comments section...')
  const commentsSection = document.querySelector('#comments')
  if (commentsSection) {
    console.log(commentsSection)
    clearInterval(waitForCommentsSectionLoad)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          console.log(mutation + 'node added!')
          addPinButtonToComments()
        }
      })
    })

    observer.observe(commentsSection, {
      childList: true,
      subtree: true,
    })
    // addPinButtonToComments()
  }
}, 1000)
