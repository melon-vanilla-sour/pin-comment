console.log('pin-yt-comment extension loaded')

function addPinButtonToComments() {
  // container for each comment element
  let commentsContainer = document.querySelectorAll('ytd-comment-thread-renderer')

  commentsContainer.forEach((commentContainer) => {
    let comment = commentContainer.querySelector('#comment')
    let commentHeader = commentContainer.querySelector('#body #main #header #header-author')

    // pin button isn't already added
    if (!commentHeader.querySelector('.pin-button')) {
      const pinButton = document.createElement('a')
      togglePinText(pinButton)
      pinButton.className = 'pin-button'

      let originalParent = null
      // parent node includes elements like replies i.e. the full comment
      let commentParent = comment.parentNode

      // event listener 1
      const onPinComment = (event) => {
        if (isTheaterMode()) return
        event.stopPropagation()

        // store info to restore position when unpinning
        originalParent = commentParent.parentNode

        commentParent.style.overflowY = 'scroll'
        const videoPlayerHeight = document.querySelector('#player').getBoundingClientRect().height
        commentParent.style.maxHeight = videoPlayerHeight / 2 + 'px'

        const rightColumn = document.querySelector('#secondary')
        rightColumn.prepend(commentParent)

        togglePinText(pinButton)

        pinButton.removeEventListener('click', onPinComment)
        pinButton.addEventListener('click', onUnpinComment)
      }

      // event listener 2
      const onUnpinComment = (event) => {
        if (isTheaterMode()) return
        event.stopPropagation()
        // insert back into original position
        originalParent.prepend(commentParent)

        commentParent.style.maxHeight = null

        togglePinText(pinButton)

        pinButton.removeEventListener('click', onUnpinComment)
        pinButton.addEventListener('click', onPinComment)
      }

      pinButton.addEventListener('click', onPinComment)
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

function isTheaterMode() {
  const playerContainer = document.querySelector('ytd-watch-flexy')
  return playerContainer && playerContainer.hasAttribute('theater')
}
