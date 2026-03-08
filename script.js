  // 1. Inisialisasi Observer untuk Animasi (Tetap dipertahankan)
  const productsGrid = document.querySelector('.products-grid');
  const productCards = document.querySelectorAll('.product-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        productCards.forEach(card => card.classList.add('animate-in'));
      } else {
        productCards.forEach(card => card.classList.remove('animate-in'));
      }
    });
  }, { threshold: 0.1 });

  if (productsGrid) observer.observe(productsGrid);

  const brandSection = document.querySelector('.brand');
  const brandContent = document.querySelector('.brand .content');
  const brandImageContainer = document.querySelector('.brand .image-container');

  const brandObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (brandContent) brandContent.classList.add('animate-in');
        if (brandImageContainer) brandImageContainer.classList.add('animate-in');
      } else {
        if (brandContent) brandContent.classList.remove('animate-in');
        if (brandImageContainer) brandImageContainer.classList.remove('animate-in');
      }
    });
  }, { threshold: 0.1 });

  if (brandSection) brandObserver.observe(brandSection);

  // 2. Logika Perhitungan Total Harga
  const checks = document.querySelectorAll('.produk-check');
  const qtys = document.querySelectorAll('.produk-qty');
  const totalTampilan = document.getElementById('totalTampilan');
  const totalInput = document.getElementById('totalInput');

function hitungTotal() {
  let total = 0;
  checks.forEach((check, index) => {
    const qtyInput = qtys[index];
    if (check.checked) {
      qtyInput.style.display = "block";  // Tampilkan input
      qtyInput.disabled = false;         // Aktifkan agar terkirim ke spreadsheet
      total += parseInt(check.getAttribute('data-harga')) * parseInt(qtyInput.value);
    } else {
      qtyInput.style.display = "none";   // Sembunyikan input
      qtyInput.disabled = true;          // Nonaktifkan agar TIDAK terkirim
    }
  });
  totalTampilan.innerText = "Rp " + total.toLocaleString('id-ID');
  totalInput.value = total;
}

  checks.forEach(c => c.addEventListener('change', hitungTotal));
  qtys.forEach(q => q.addEventListener('input', hitungTotal));

  // 3. Logika Pengiriman Form ke Google Sheets & Redirect
  const scriptURL = 'https://script.google.com/macros/s/AKfycbz97ZDW2fRl6Bm54mbHv0Xt5pR0AthKWnr08upGjQL9dOVBajlZaeWw4g_iEKl42AYYDg/exec';
  const form = document.getElementById('formPesanan');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = "Sedang Memproses...";
    }

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        console.log('Success!', response);
        // Setelah sukses masuk spreadsheet, langsung ke halaman sukses
        window.location.href = "sukses.html";
      })
      .catch(error => {
        console.error('Error!', error.message);
        alert("Aduh manis, ada gangguan koneksi. Coba lagi ya!");
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = "Pesan Sekarang";
        }
      });
  });

function keHalamanInstruksi() {
    // 1. Mengambil elemen radio button yang sedang dipilih
    const pilihanMetode = document.querySelector('input[name="pembayaran"]:checked');

    // 2. Validasi apakah user sudah memilih salah satu metode
    if (!pilihanMetode) {
        alert("Pilih metode pembayarannya dulu ya, manis! ✨");
        return;
    }

    // 3. Ambil nilai (value) dari elemen yang terpilih
    const metode = pilihanMetode.value;

    // 4. Arahkan ke halaman yang sesuai
    switch (metode) {
        case "Transfer":
            window.location.href = "instruksi-transfer.html";
            break;
        case "DANA":
            window.location.href = "instruksi-dana.html";
            break;
        case "GOPAY":
            window.location.href = "instruksi-gopay.html";
            break;
        case "COD":
            window.location.href = "instruksi-cod.html";
            break;
        default:
            console.error("Metode tidak dikenali");
    }
}
