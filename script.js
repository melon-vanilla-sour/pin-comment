console.log('pin-comment extension loaded')

function addPinButtonToComments() {
  // container for each comment element
  let commentsContainer = document.querySelectorAll('ytd-comment-thread-renderer')

  commentsContainer.forEach((commentContainer) => {
    let comment = commentContainer.querySelector('#comment')
    let commentHeader = commentContainer.querySelector('#body #main #header')
    if (!commentHeader.querySelector('.pin-button')) {
      const pinButton = document.createElement('a')
      pinButton.textContent = 'pin comment'
      pinButton.className = 'pin-button'
      pinButton.addEventListener('click', (event) => {
        event.stopPropagation()
        const rightColumn = document.querySelector('#secondary')
        // parent node includes elements like replies i.e. the full comment
        rightColumn.prepend(comment.parentNode)
      })
      commentHeader.appendChild(pinButton)
      console.log('pin comment button added')
    }
  })
}

const waitForCommentsSectionLoad = setInterval(() => {
  console.log('waiting comments section...')
  // the entire comments section that loads new comments with scroll
  const commentsSection = document.querySelector('#comments')
  if (commentsSection) {
    console.log(commentsSection)
    clearInterval(waitForCommentsSectionLoad)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          console.log(mutation + 'new comments loaded')
          addPinButtonToComments()
        }
      })
    })

    observer.observe(commentsSection, {
      childList: true,
      subtree: true,
    })
  }
}, 1000)
