// ================================================
//   StreetLight Creative Studios
//   script.js — Final Complete Version
// ================================================

document.addEventListener('DOMContentLoaded', function () {


  // ================================================
  //   1. MOBILE NAVIGATION — HAMBURGER MENU
  // ================================================

  const navbar   = document.querySelector('.navbar')
  const navLinks = document.querySelector('.nav-links')

  const hamburger = document.createElement('button')
  hamburger.classList.add('hamburger')
  hamburger.setAttribute('aria-label', 'Toggle navigation menu')
  hamburger.innerHTML = '☰'
  navbar.appendChild(hamburger)

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation()
    const isOpen = navLinks.classList.toggle('nav-open')
    hamburger.innerHTML = isOpen ? '✕' : '☰'
  })

  const allNavLinks = document.querySelectorAll('.nav-links a')
  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('nav-open')
      hamburger.innerHTML = '☰'
    })
  })

  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('nav-open')
      hamburger.innerHTML = '☰'
    }
  })


  // ================================================
  //   2. DROPDOWN MENU
  // ================================================

  const dropdown = document.querySelector('.dropdown')

  if (dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle')

    toggle.addEventListener('click', function (e) {
      e.stopPropagation()
      dropdown.classList.toggle('open')
    })

    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open')
      }
    })

    const dropdownLinks = dropdown.querySelectorAll('.dropdown-menu a')
    dropdownLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        dropdown.classList.remove('open')
        navLinks.classList.remove('nav-open')
        hamburger.innerHTML = '☰'
      })
    })
  }


  // ================================================
  //   3. ACTIVE NAV LINK — ALL 9 PAGES
  // ================================================

  const currentPage = window.location.pathname.split('/').pop()

  allNavLinks.forEach(function (link) {
    const linkPage = link.getAttribute('href')
    if (
      linkPage === currentPage ||
      (currentPage === '' && linkPage === 'index.html') ||
      (currentPage === '/' && linkPage === 'index.html')
    ) {
      link.classList.add('active-link')
    }
  })

  // Highlight dropdown toggle when on a dropdown page
  if (dropdown) {
    const dropdownPages = [
      'photography.html',
      'content.html',
      'podcast.html',
      'music.html'
    ]
    if (dropdownPages.includes(currentPage)) {
      dropdown.querySelector('.dropdown-toggle').style.color = '#d4a017'
    }
  }


  // ================================================
  //   4. NAVBAR SCROLL EFFECT
  // ================================================

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.style.backgroundColor   = 'rgba(10, 10, 15, 0.97)'
      navbar.style.boxShadow         = '0 2px 24px rgba(0, 0, 0, 0.6)'
      navbar.style.borderBottomColor = 'rgba(212, 160, 23, 0.30)'
    } else {
      navbar.style.backgroundColor   = '#060810'
      navbar.style.boxShadow         = 'none'
      navbar.style.borderBottomColor = 'rgba(212, 160, 23, 0.15)'
    }
  })


  // ================================================
  //   5. SCROLL REVEAL ANIMATION
  // ================================================

  const revealTargets = document.querySelectorAll(
    '.card, .service-block, .episode-card, .skill-card, ' +
    '.value-card, .faq-item, .photo-card, .content-card, ' +
    '.video-card, .platform-btn, .contact-item, .about-image, ' +
    '.about-text, .podcast-cover, .podcast-header-text'
  )

  revealTargets.forEach(function (el) {
    el.style.opacity    = '0'
    el.style.transform  = 'translateY(28px)'
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease'
  })

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1'
          entry.target.style.transform = 'translateY(0)'
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 }
  )

  revealTargets.forEach(function (el) {
    revealObserver.observe(el)
  })


  // ================================================
  //   6. PORTFOLIO FILTER BUTTONS
  // ================================================

  const filterButtons     = document.querySelectorAll('.filter-btn')
  const portfolioSections = document.querySelectorAll('.portfolio-section')

  if (filterButtons.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {

        filterButtons.forEach(function (b) {
          b.classList.remove('active')
        })

        btn.classList.add('active')

        const filter = btn.textContent.trim().toLowerCase()

        portfolioSections.forEach(function (section) {
          const title = section.querySelector('h2').textContent.toLowerCase()

          if (filter === 'all') {
            section.style.display = 'block'
            section.style.opacity = '1'
          } else if (title.includes(filter)) {
            section.style.display = 'block'
            section.style.opacity = '1'
          } else {
            section.style.display = 'none'
          }
        })
      })
    })
  }


  // ================================================
  //   7. CONTACT FORM VALIDATION
  // ================================================

  const contactForm = document.querySelector('.contact-form')

  if (contactForm) {
    const sendButton = contactForm.querySelector('.btn')

    sendButton.addEventListener('click', function () {

      const nameField    = contactForm.querySelector('input[type="text"]')
      const emailField   = contactForm.querySelector('input[type="email"]')
      const messageField = contactForm.querySelector('textarea')

      const name    = nameField.value.trim()
      const email   = emailField.value.trim()
      const message = messageField.value.trim()

      clearHighlights(contactForm)

      if (name === '') {
        showNotification('Please enter your name.', 'error')
        highlightField(nameField)
        nameField.focus()
        return
      }

      if (email === '') {
        showNotification('Please enter your email address.', 'error')
        highlightField(emailField)
        emailField.focus()
        return
      }

      if (!email.includes('@') || !email.includes('.')) {
        showNotification('Please enter a valid email address.', 'error')
        highlightField(emailField)
        emailField.focus()
        return
      }

      if (message === '') {
        showNotification('Please tell me about your project.', 'error')
        highlightField(messageField)
        messageField.focus()
        return
      }

      showNotification(
        '🙌 Message sent! I will get back to you within 24 hours.',
        'success'
      )

      contactForm.querySelectorAll('input').forEach(function (i) {
        i.value = ''
      })
      contactForm.querySelectorAll('select').forEach(function (s) {
        s.selectedIndex = 0
      })
      messageField.value = ''
      clearHighlights(contactForm)

    })
  }


  // ================================================
  //   8. FIELD HIGHLIGHT HELPERS
  // ================================================

  function highlightField (field) {
    field.style.borderColor = '#c0392b'
    field.style.transition  = 'border-color 0.3s ease'
    field.addEventListener('input', function () {
      field.style.borderColor = ''
    }, { once: true })
  }

  function clearHighlights (form) {
    form.querySelectorAll('input, textarea, select').forEach(function (el) {
      el.style.borderColor = ''
    })
  }


  // ================================================
  //   9. NOTIFICATION SYSTEM
  // ================================================

  function showNotification (message, type) {

    const existing = document.querySelector('.notification-box')
    if (existing) existing.remove()

    const notification = document.createElement('div')
    notification.classList.add('notification-box', 'notification-' + type)
    notification.textContent      = message
    notification.style.opacity    = '0'
    notification.style.transition = 'opacity 0.4s ease'

    const sendBtn = document.querySelector('.contact-form .btn')
    if (sendBtn) {
      sendBtn.parentNode.insertBefore(notification, sendBtn)
    }

    setTimeout(function () {
      notification.style.opacity = '1'
    }, 10)

    setTimeout(function () {
      notification.style.opacity = '0'
      setTimeout(function () {
        if (notification.parentNode) notification.remove()
      }, 400)
    }, 5000)
  }


  // ================================================
  //   10. SMOOTH SCROLL FOR ANCHOR LINKS
  // ================================================

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href')
      const target   = document.querySelector(targetId)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })


  // ================================================
  //   11. WHATSAPP FLOATING BUTTON
  // ================================================

  const whatsappNumber  = '233207918365'
  const whatsappMessage = encodeURIComponent(
    'Hi! I visited StreetLight Creative Studios website and would love to work with you.'
  )

  const isMobile     = /iPhone|Android|iPad/i.test(navigator.userAgent)
  const whatsappLink = isMobile
    ? 'https://wa.me/' + whatsappNumber + '?text=' + whatsappMessage
    : 'https://web.whatsapp.com/send?phone=' + whatsappNumber + '&text=' + whatsappMessage

  const waButton = document.createElement('a')
  waButton.href  = whatsappLink
  waButton.setAttribute('target', '_blank')
  waButton.setAttribute('rel', 'noopener noreferrer')
  waButton.setAttribute('aria-label', 'Chat on WhatsApp')
  waButton.classList.add('whatsapp-btn')
  waButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26"><path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path fill="white" d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.335-1.505A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.732.887.936-3.618-.235-.372A9.818 9.818 0 1112 21.818z"/></svg>'
  document.body.appendChild(waButton)


  // ================================================
  //   12. BACK TO TOP BUTTON
  // ================================================

  const backToTop = document.createElement('button')
  backToTop.classList.add('back-to-top')
  backToTop.setAttribute('aria-label', 'Back to top')
  backToTop.innerHTML = '↑'
  document.body.appendChild(backToTop)


  // ================================================
  //   13. SCROLL — SHOW/HIDE FLOATING BUTTONS
  // ================================================

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.style.opacity    = '1'
      backToTop.style.visibility = 'visible'
      waButton.style.opacity     = '1'
      waButton.style.visibility  = 'visible'
    } else {
      backToTop.style.opacity    = '0'
      backToTop.style.visibility = 'hidden'
      waButton.style.opacity     = '0'
      waButton.style.visibility  = 'hidden'
    }
  })

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })


  // ================================================
  //   14. AUTO COPYRIGHT YEAR
  // ================================================

  const yearElements = document.querySelectorAll('.copyright-year')
  yearElements.forEach(function (el) {
    el.textContent = new Date().getFullYear()
  })


// ================================================
//   END
// ================================================

// ================================================
  //   15. LIGHTBOX — PHOTO & VIDEO VIEWER
  // ================================================

  // Build the lightbox HTML
  const lightboxHTML = `
    <div class="lightbox-overlay" id="lightbox">
      <button class="lightbox-close" id="lightboxClose">✕</button>
      <button class="lightbox-nav lightbox-prev" id="lightboxPrev">‹</button>
      <div class="lightbox-content" id="lightboxContent"></div>
      <button class="lightbox-nav lightbox-next" id="lightboxNext">›</button>
      <p class="lightbox-caption" id="lightboxCaption"></p>
    </div>
  `
  document.body.insertAdjacentHTML('beforeend', lightboxHTML)

  const lightbox        = document.getElementById('lightbox')
  const lightboxContent = document.getElementById('lightboxContent')
  const lightboxCaption = document.getElementById('lightboxCaption')
  const lightboxClose   = document.getElementById('lightboxClose')
  const lightboxPrev    = document.getElementById('lightboxPrev')
  const lightboxNext    = document.getElementById('lightboxNext')

  let currentImages = []
  let currentIndex  = 0

  // Collect all clickable photo cards
  function setupLightbox () {

    // --- PHOTOS ---
    const photoCards = document.querySelectorAll('.photo-card img')
    const photoArray = Array.from(photoCards)

    photoCards.forEach(function (img, index) {
      img.addEventListener('click', function () {
        currentImages = photoArray
        currentIndex  = index
        openLightboxImage(img)
      })
    })

    // --- CONTENT CARD IMAGES ---
    const contentImages = document.querySelectorAll('.content-card img')
    contentImages.forEach(function (img) {
      img.addEventListener('click', function () {
        currentImages = []
        openLightboxImage(img)
      })
    })

    // --- VIDEO PLACEHOLDERS ---
    const videoPlaceholders = document.querySelectorAll('.video-placeholder')
    videoPlaceholders.forEach(function (placeholder) {
      placeholder.addEventListener('click', function () {
        const videoSrc = placeholder.getAttribute('data-video')
        if (videoSrc) {
          openLightboxVideo(videoSrc)
        }
      })
    })

    // --- VIDEO CARD IMAGES (thumbnails) ---
    const videoThumbs = document.querySelectorAll('.video-card img')
    videoThumbs.forEach(function (img) {
      img.addEventListener('click', function () {
        const videoSrc = img.getAttribute('data-video')
        if (videoSrc) {
          openLightboxVideo(videoSrc)
        } else {
          currentImages = []
          openLightboxImage(img)
        }
      })
    })

  }

  function openLightboxImage (img) {
    lightboxContent.innerHTML = `<img src="${img.src}" alt="${img.alt || ''}">`
    lightboxCaption.textContent = img.alt || ''
    lightbox.classList.add('active')
    document.body.style.overflow = 'hidden'
    updateNavButtons()
  }

  function openLightboxVideo (src) {
    // Check if YouTube link
    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      const videoId = src.includes('youtu.be')
        ? src.split('youtu.be/')[1].split('?')[0]
        : src.split('v=')[1].split('&')[0]
      lightboxContent.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${videoId}?autoplay=1"
          allow="autoplay; fullscreen"
          allowfullscreen>
        </iframe>`
    } else {
      lightboxContent.innerHTML = `
        <video controls autoplay>
          <source src="${src}">
        </video>`
    }
    lightboxCaption.textContent = ''
    lightbox.classList.add('active')
    document.body.style.overflow = 'hidden'
    lightboxPrev.style.display = 'none'
    lightboxNext.style.display = 'none'
  }

  function closeLightbox () {
    lightbox.classList.remove('active')
    lightboxContent.innerHTML = ''
    lightboxCaption.textContent = ''
    document.body.style.overflow = ''
    lightboxPrev.style.display = 'flex'
    lightboxNext.style.display = 'flex'
  }

  function updateNavButtons () {
    if (currentImages.length <= 1) {
      lightboxPrev.style.display = 'none'
      lightboxNext.style.display = 'none'
    } else {
      lightboxPrev.style.display = 'flex'
      lightboxNext.style.display = 'flex'
    }
  }

  function showPrev () {
    if (currentImages.length === 0) return
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length
    openLightboxImage(currentImages[currentIndex])
  }

  function showNext () {
    if (currentImages.length === 0) return
    currentIndex = (currentIndex + 1) % currentImages.length
    openLightboxImage(currentImages[currentIndex])
  }

  // Event listeners
  lightboxClose.addEventListener('click', closeLightbox)
  lightboxPrev.addEventListener('click', showPrev)
  lightboxNext.addEventListener('click', showNext)

  // Close on background click
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox()
  })

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return
    if (e.key === 'Escape')     closeLightbox()
    if (e.key === 'ArrowLeft')  showPrev()
    if (e.key === 'ArrowRight') showNext()
  })

  // Initialise
  setupLightbox()
})
