<template>
  <div>
    <h2>TOKO H. MAKSUM</h2>
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
<style scoped>
body {
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 1rem;
  color: #333;
}

.form-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 180px;
}

button {
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  background-color: #002842;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #f7f7f7;
  color: #555;
}

td button {
  margin-right: 5px;
  background-color: #a5ae27;
}

td button:last-child {
  background-color: #ee1b04;
}

td button:hover {
  opacity: 0.9;
}

@media (max-width: 600px) {
  .form-group {
    flex-direction: column;
  }

  input {
    width: 100%;
  }
}
</style>
