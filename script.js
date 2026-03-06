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
     // e.preventDefault();
 
  })};

  function keHalamanInstruksi() {
    // Mencari elemen input radio yang dipilih
    const pilihanMetode = document.querySelector('input[name="pembayaran"]:checked');

    // Validasi jika user belum memilih
    if (!pilihanMetode) {
        alert("Silakan pilih metode pembayaran dulu ya, manis!");
        return;
    }

    // Ambil nilai (value) dari pilihan tersebut
    const metode = pilihanMetode.value;

    // Arahkan ke file HTML masing-masing
    if (metode === "Transfer") {
        window.location.href = "instruksi-transfer.html";
    } else if (metode === "DANA") {
        window.location.href = "instruksi-dana.html";
    } else if (metode === "GOPAY") {
        window.location.href = "instruksi-gopay.html";
    } else if (metode === "COD") {
        window.location.href = "instruksi-cod.html";
    }
}
 


