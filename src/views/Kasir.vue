<template>
  <div>
    <h2>Kasir Sederhana</h2>
    <input v-model="nama" placeholder="Nama Barang" />
    <input v-model="harga" type="number" placeholder="Harga" />
    <input v-model="jumlah" type="number" placeholder="Jumlah" />
    <button @click="simpan">{{ isEdit ? 'Update' : 'Tambah' }}</button>

    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Harga</th>
          <th>Jumlah</th>
          <th>Total</th>
          <th>Waktu</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in transaksi" :key="item.id">
          <td>{{ item.nama }}</td>
          <td>Rp {{ item.harga }}</td>
          <td>{{ item.jumlah }}</td>
          <td>Rp {{ item.total }}</td>
          <td>{{ item.created_at }}</td>
          <td>
            <button @click="edit(index)">Edit</button>
            <button @click="hapus(item.id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transaksi: [],
      nama: '',
      harga: '',
      jumlah: '',
      editId: null,
    };
  },
  computed: {
    isEdit() {
      return this.editId !== null;
    }
  },
  methods: {
    fetchData() {
      fetch('/api/transaksi')
        .then(res => res.json())
        .then(data => this.transaksi = data);
    },
    simpan() {
      const data = {
        nama: this.nama,
        harga: Number(this.harga),
        jumlah: Number(this.jumlah)
      };

      const method = this.isEdit ? 'PUT' : 'POST';
      const url = this.isEdit ? `/api/transaksi/${this.editId}` : '/api/transaksi';

      fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(() => {
          this.reset();
          this.fetchData();
        });
    },
    edit(index) {
      const item = this.transaksi[index];
      this.nama = item.nama;
      this.harga = item.harga;
      this.jumlah = item.jumlah;
      this.editId = item.id;
    },
    hapus(id) {
      fetch(`/api/transaksi/${id}`, { method: 'DELETE' })
        .then(() => this.fetchData());
    },
    reset() {
      this.nama = '';
      this.harga = '';
      this.jumlah = '';
      this.editId = null;
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>
