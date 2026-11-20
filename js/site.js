/* ============================================================
   NOVA OS — Site de download
   JavaScript vanilla. Sem framework, sem build, sem rede.
   ============================================================ */
(function () {
  'use strict';

  /* Trocar apenas estas duas URLs quando publicar no GitHub Releases. */
  var SITE = {
    version: '1.1.0',
    downloads: {
      portable: 'downloads/NOVA OS.exe',
      setup: 'downloads/NOVA OS Setup.exe'
    },
    sizes: {
      portable: '114,7 MB',
      setup: '125,2 MB'
    },
    fileNames: {
      portable: 'NOVA OS.exe',
      setup: 'NOVA OS Setup.exe'
    },
    checksums: {
      portable: 'ab96fe80f76b138bdfbea1f96131334ca1f51c1d4b7025fb778e41798dbe2247',
      setup: 'd1f3f3b98060363f208f74de21b32d4e3a3f81193ca51af5889e51d184e27966'
    }
  };

  function isExternal(url) {
    return /^https?:\/\//i.test(url);
  }

  function applyDownloads() {
    document.querySelectorAll('[data-download]').forEach(function (el) {
      var key = el.getAttribute('data-download');
      var url = SITE.downloads[key];
      if (!url) return;
      el.setAttribute('href', url);
      if (isExternal(url)) {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
        el.removeAttribute('download');
      } else {
        el.removeAttribute('target');
        el.removeAttribute('rel');
        el.setAttribute('download', SITE.fileNames[key] || url.split('/').pop());
      }
    });

    document.querySelectorAll('[data-size]').forEach(function (el) {
      var value = SITE.sizes[el.getAttribute('data-size')];
      if (value) el.textContent = value;
    });

    document.querySelectorAll('[data-file]').forEach(function (el) {
      var value = SITE.fileNames[el.getAttribute('data-file')];
      if (value) el.textContent = value;
    });

    document.querySelectorAll('[data-checksum-short]').forEach(function (el) {
      var hash = SITE.checksums[el.getAttribute('data-checksum-short')];
      if (!hash) return;
      el.textContent = hash.slice(0, 12) + '…';
      el.title = hash;
    });

    document.querySelectorAll('[data-version]').forEach(function (el) {
      el.textContent = 'v' + SITE.version;
    });
  }

  function initLightbox() {
    var box = document.getElementById('lightbox');
    if (!box) return;

    var img = box.querySelector('img');
    var caption = box.querySelector('p');
    var close = box.querySelector('.lb-close');
    var shots = Array.prototype.slice.call(document.querySelectorAll('.shot'));
    var current = -1;
    var lastFocused = null;

    function show(index) {
      var button = shots[index];
      if (!button) return;
      var source = button.querySelector('img');
      current = index;
      img.src = source.src;
      img.alt = source.alt || '';
      caption.textContent = button.getAttribute('data-caption') || source.alt || '';
      box.hidden = false;
      document.body.style.overflow = 'hidden';
      close.focus();
    }

    function hide() {
      box.hidden = true;
      img.src = '';
      current = -1;
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    shots.forEach(function (button, index) {
      button.addEventListener('click', function () {
        lastFocused = button;
        show(index);
      });
    });

    close.addEventListener('click', hide);

    box.addEventListener('click', function (event) {
      if (event.target === box) hide();
    });

    document.addEventListener('keydown', function (event) {
      if (box.hidden) return;
      if (event.key === 'Escape') {
        hide();
      } else if (event.key === 'ArrowRight') {
        show((current + 1) % shots.length);
      } else if (event.key === 'ArrowLeft') {
        show((current - 1 + shots.length) % shots.length);
      }
    });
  }

  function init() {
    applyDownloads();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
