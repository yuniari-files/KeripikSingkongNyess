 // Intersection Observer untuk trigger animasi saat grid terlihat
  const productsGrid = document.querySelector('.products-grid');
  const productCards = document.querySelectorAll('.product-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Grid sudah terlihat di viewport - tambah class animate-in ke semua cards
        productCards.forEach(card => {
          card.classList.add('animate-in');
        });
      } else {
        // Grid sudah keluar dari viewport - hapus class untuk siap animasi ulang
        productCards.forEach(card => {
          card.classList.remove('animate-in');
        });
      }
    });
  }, {
    threshold: 0.1
  });

  if (productsGrid) {
    observer.observe(productsGrid);
  }

  // Intersection Observer untuk brand section
  const brandSection = document.querySelector('.brand');
  const brandContent = document.querySelector('.brand .content');
  const brandImageContainer = document.querySelector('.brand .image-container');

  const brandObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Brand section terlihat - tambah class animate-in
        if (brandContent) brandContent.classList.add('animate-in');
        if (brandImageContainer) brandImageContainer.classList.add('animate-in');
      } else {
        // Brand section keluar viewport - hapus class untuk siap animasi ulang
        if (brandContent) brandContent.classList.remove('animate-in');
        if (brandImageContainer) brandImageContainer.classList.remove('animate-in');
      }
    });
  }, {
    threshold: 0.1
  });

  if (brandSection) {
    brandObserver.observe(brandSection);
  }
