// ===== Pengaturan =====
const JAM_BUKA = 8;
const JAM_TUTUP = 22;

// ===== Data produk (ganti sesuai menu kamu) =====
const produk = [
  {
    nama: "Kopi Susu Hiro",
    deskripsi: "Espresso, susu segar, dan gula aren. Manis yang pas.",
    harga: 22000,
    gambar: "assets/images/menu/kopi-susu-hiro.jpg",
    alt: "Segelas kopi susu gula aren Hiro Cafe dilihat dari atas"
  },
  {
    nama: "Americano Dingin",
    deskripsi: "Segar, bersih, dan ringan. Pas untuk siang hari.",
    harga: 18000,
    gambar: "assets/images/menu/americano-dingin.jpg",
    alt: "Americano dingin dengan es batu dalam gelas bening"
  },
  {
    nama: "Matcha Latte",
    deskripsi: "Matcha pilihan dengan susu yang lembut dan creamy.",
    harga: 25000,
    gambar: "assets/images/menu/matcha-latte.jpg",
    alt: "Matcha latte hijau dengan latte art di dalam cangkir putih"
  }
];

const jam = new Date().getHours();

// ===== 1. Sapaan sesuai jam =====
let sapaan;

if (jam < 11) {
  sapaan = "Selamat pagi";
} else if (jam < 15) {
  sapaan = "Selamat siang";
} else if (jam < 18) {
  sapaan = "Selamat sore";
} else {
  sapaan = "Selamat malam";
}

document.querySelector("#sapaan").textContent = sapaan;

// ===== 2. Status buka / tutup =====
const statusEl = document.querySelector("#status-buka");
const jamBuka = String(JAM_BUKA).padStart(2, "0") + ".00";
const jamTutup = String(JAM_TUTUP).padStart(2, "0") + ".00";

if (jam >= JAM_BUKA && jam < JAM_TUTUP) {
  statusEl.textContent = "Buka sekarang · tutup pukul " + jamTutup;
  statusEl.classList.add("buka");
} else {
  statusEl.textContent = "Tutup · buka lagi pukul " + jamBuka;
  statusEl.classList.add("tutup");
}

// ===== 3. Tampilkan kartu produk dari array =====
const gridProduk = document.querySelector("#grid-produk");

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

produk.forEach(function (item) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  kartu.innerHTML =
    '<div class="kartu-gambar">' +
      '<img src="' + item.gambar + '" alt="' + item.alt + '" width="800" height="800" loading="lazy">' +
    "</div>" +
    "<h3>" + item.nama + "</h3>" +
    "<p>" + item.deskripsi + "</p>" +
    '<div class="kartu-bawah">' +
      "<span>" + formatRupiah(item.harga) + "</span>" +
      '<button class="tombol-keranjang" aria-label="Tambah ' + item.nama + ' ke keranjang">' +
        '<svg class="ikon" aria-hidden="true"><use href="#i-cart"></use></svg>' +
      "</button>" +
    "</div>";

  gridProduk.appendChild(kartu);
});

// Tombol "Lihat Semua" di pojok kanan atas grid
const lihatLain = document.createElement("a");
lihatLain.className = "lihat-lain";
lihatLain.href = "#layanan";
lihatLain.innerHTML = "Lihat<br>Semua";
gridProduk.appendChild(lihatLain);

// ===== 4. Penghitung keranjang =====
const jumlahKeranjang = document.querySelector("#jumlah-keranjang");
let totalKeranjang = 0;

gridProduk.addEventListener("click", function (event) {
  const tombol = event.target.closest(".tombol-keranjang");

  if (tombol) {
    totalKeranjang++;
    jumlahKeranjang.textContent = totalKeranjang;
  }
});

// ===== 5. Menu navigasi di layar kecil =====
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", function () {
  const terbuka = navLinks.classList.toggle("terbuka");
  menuToggle.setAttribute("aria-expanded", terbuka);
});

// Tutup menu setelah salah satu link diklik
navLinks.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    navLinks.classList.remove("terbuka");
    menuToggle.setAttribute("aria-expanded", false);
  }
});
