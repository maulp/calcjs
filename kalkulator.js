const fs = require('fs');
const readline = require('readline');

// Buat instance readline untuk membaca input dari user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fungsi untuk menghitung operasi matematika
function hitung(operator, number1, number2) {
  let result;
  switch (operator) {
    case '+':
      result = number1 + number2;
      break;
    case '-':
      result = number1 - number2;
      break;
    case '*':
      result = number1 * number2;
      break;
    case '/':
      result = number1 / number2;
      break;
    default:
      result = 'Operator tidak valid';
  }
  return result;
}

// Fungsi untuk menulis data ke file JSON
function simpanData(data) {
  fs.writeFile('hasil.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('Data berhasil disimpan!');
  });
}

// Inisialisasi variabel untuk menyimpan riwayat operasi
let riwayat = [];

// Fungsi utama yang akan dipanggil secara rekursif
function main() {
  // Tampilkan pilihan menu
  console.log('\n=== Kalkulator Sederhana ===');
  console.log('1. Hitung');
  console.log('2. Tampilkan Riwayat');
  console.log('3. Keluar');

  // Baca pilihan menu dari user
  rl.question('Pilih menu: ', (pilihan) => {
    switch (pilihan) {
      case '1':
        // Baca operator dan operand dari user
        rl.question('Masukkan operator (+, -, *, /): ', (operator) => {
          rl.question('Masukkan operand 1: ', (number1) => {
            rl.question('Masukkan operand 2: ', (number2) => {
              // Konversi operand menjadi tipe data number
              number1 = parseInt(number1);
              number2 = parseInt(number2);

              // Hitung hasil operasi dan tampilkan ke layar
              const hasil = hitung(operator, number1, number2);
              console.log(`Hasil: ${hasil}`);

              // Simpan riwayat operasi ke variabel riwayat
              const operasi = {
                operator: operator,
                number1: number1,
                number2: number2,
                hasil: hasil
              };
              riwayat.push(operasi);

              // Panggil fungsi main kembali untuk menampilkan menu
              main();
            });
          });
        });
        break;
      case '2':
        // Tampilkan riwayat operasi
        console.log('\n=== Riwayat Operasi ===');
        console.log(riwayat);

        // Simpan riwayat operasi ke file JSON
        simpanData(riwayat);

        // Panggil fungsi main kembali untuk menampilkan menu
        main();
        break;
      case '3':
        // Keluar dari program
        console.log('Terima kasih!');
        rl.close();
        break;
      default:
        // Jika pilihan tidak valid, panggil fungsi main kembali
        console.log('Pilihan tidak valid!');
        main();
    }
  });
}

// Panggil fungsi main untuk memulai program
main();
