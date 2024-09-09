console.log('pin-yt-comment extension loaded')

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

        pinButton.textContent = 'unpin comment'
        pinButton.addEventListener('click', (event) => {})

        const rightColumn = document.querySelector('#secondary')
        // parent node includes elements like replies i.e. the full comment
        commentParent = comment.parentNode
        commentParent.style.overflowY = 'scroll'
        const videoPlayerHeight = document.querySelector('#player').getBoundingClientRect().height
        commentParent.style.height = videoPlayerHeight / 2 + 'px'
        // commentParent.style.height = commentParent.getBoundingClientRect().height * 1.5 + 'px'
        rightColumn.prepend(commentParent)
      })

      commentHeader.appendChild(pinButton)
    }
  })
}

const waitForCommentsSectionLoad = setInterval(() => {
  // the entire comments section that loads new comments with scroll
  const commentsSection = document.querySelector('#comments')

  if (commentsSection) {
    clearInterval(waitForCommentsSectionLoad)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
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
