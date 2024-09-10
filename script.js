console.log('pin-yt-comment extension loaded')

function addPinButtonToComments() {
  // container for each comment element
  let commentsContainer = document.querySelectorAll('ytd-comment-thread-renderer')

  commentsContainer.forEach((commentContainer) => {
    let comment = commentContainer.querySelector('#comment')
    let commentHeader = commentContainer.querySelector('#body #main #header')

    if (!commentHeader.querySelector('.pin-button')) {
      const pinButton = document.createElement('a')

      togglePinText(pinButton)
      pinButton.className = 'pin-button'

      pinButton.addEventListener('click', (event) => {
        event.stopPropagation()

        const rightColumn = document.querySelector('#secondary')
        // parent node includes elements like replies i.e. the full comment
        commentParent = comment.parentNode

        // store info to restore position when unpinning
        const originalParent = commentParent.parentNode
        const originalSibling = commentParent.nextSibling

        commentParent.style.overflowY = 'scroll'
        const videoPlayerHeight = document.querySelector('#player').getBoundingClientRect().height
        commentParent.style.maxHeight = videoPlayerHeight / 2 + 'px'
        rightColumn.prepend(commentParent)

        togglePinText(pinButton)

        pinButton.addEventListener('click', (event) => {
          // insert back into original position
          if (originalSibling) {
            originalParent.insertBefore(commentParent, originalSibling)
          } else {
            originalParent.appendChild(commentParent)
          }

          // remove max height
          commentParent.style.maxHeight = null
        })
      })

      commentHeader.appendChild(pinButton)
    }
  })
}

const togglePinText = (node) => {
  node.textContent == 'pin comment'
    ? (node.textContent = 'unpin comment')
    : (node.textContent = 'pin comment')
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
