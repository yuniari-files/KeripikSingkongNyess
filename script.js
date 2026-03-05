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

  const checks = document.querySelectorAll('.produk-check');
const qtys = document.querySelectorAll('.produk-qty');
const totalTampilan = document.getElementById('totalTampilan');
const totalInput = document.getElementById('totalInput');

function hitungTotal() {
    let total = 0;
    checks.forEach((check, index) => {
        const qtyInput = qtys[index];
        if (check.checked) {
            qtyInput.style.display = "block"; // Munculkan kolom jumlah
            total += parseInt(check.getAttribute('data-harga')) * parseInt(qtyInput.value);
        } else {
            qtyInput.style.display = "none"; // Sembunyikan kolom jumlah
        }
    });
    
    // Format mata uang Rupiah
    totalTampilan.innerText = "Rp " + total.toLocaleString('id-ID');
    totalInput.value = total; // Simpan angka bersih untuk dikirim ke database
}

// Jalankan fungsi setiap kali ada perubahan pada checkbox atau input angka
checks.forEach(c => c.addEventListener('change', hitungTotal));
qtys.forEach(q => q.addEventListener('input', hitungTotal));


  const form = document.getElementById('formPesanan');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Mengambil nilai radio button yang dipilih
      const selectedRadio = document.querySelector('input[name="pembayaran"]:checked');
      if (!selectedRadio) {
        alert('Pilih metode pembayaran terlebih dahulu.');
        return;
      }
      const metodePembayaran = selectedRadio.value;

      // Menentukan halaman tujuan berdasarkan pilihan
      let targetPage = 'instruksi-transfer.html'; // Default page

      if (metodePembayaran === 'Transfer') {
        targetPage = 'instruksi-transfer.html';
      } else if (metodePembayaran === 'DANA') {
        targetPage = 'instruksi-dana.html';
      } else if (metodePembayaran === 'GOPAY') {
        targetPage = 'instruksi-gopay.html';
      } else if (metodePembayaran === 'COD') {
        targetPage = 'instruksi-cod.html';
      }

      // Redirect ke halaman instruksi pembayaran
      window.location.href = targetPage;
    });
  }