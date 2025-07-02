  const openBtn = document.getElementById('openBtn');
  const iframe = document.getElementById('iframeElement');
  const closeBtn = document.getElementById('closeBtn');

  openBtn.addEventListener('click', () => {
    iframe.classList.add('show');
    closeBtn.style.display = 'block';
  });

  function closeIframe() {
    iframe.classList.remove('show');
    closeBtn.style.display = 'none';
  }

  closeBtn.addEventListener('click', closeIframe);
  closeBtn.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeIframe();
    }
  });