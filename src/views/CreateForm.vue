<script>
export default {
  data() {
    return {
      nama: '',
      harga: '',
      jumlah: '',
      editIndex: -1,
      keranjang: []
    }
  },
  methods: {
    tambahBarang() {
      if (!this.nama || !this.harga || !this.jumlah) {
        alert("Isi semua data barang!");
        return;
      }

      const data = {
        nama: this.nama,
        harga: parseInt(this.harga),
        jumlah: parseInt(this.jumlah)
      }

      // Kirim ke API oke
      fetch('https://cf-vue.akbaralaziz9.workers.dev/api/barang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(response => {
        alert("Barang berhasil ditambahkan!");
        this.keranjang.push(data)
        this.resetForm()
      })
      .catch(err => {
        console.error(err)
        alert("Gagal menambahkan barang")
      })
    },
    resetForm() {
      this.nama = ''
      this.harga = ''
      this.jumlah = ''
    }
  }
}
</script>

<template>
  <div>
    <h2>Kasir Toko Sederhana</h2>
    <input type="text" v-model="nama" placeholder="Nama Barang">
    <input type="number" v-model="harga" placeholder="Harga">
    <input type="number" v-model="jumlah" placeholder="Jumlah">
    <button @click="tambahBarang">Tambah</button>

    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Harga</th>
          <th>Jumlah</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in keranjang" :key="i">
          <td>{{ item.nama }}</td>
          <td>Rp {{ item.harga }}</td>
          <td>{{ item.jumlah }}</td>
          <td>Rp {{ item.harga * item.jumlah }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
