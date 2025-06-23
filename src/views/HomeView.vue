<script setup>
import { onMounted, ref } from 'vue'

const products = ref([])

const fetchProducts = async () => {
  const response = await fetch('/api/products')
  const data = await response.json()
  products.value = data
}

onMounted(() => {
  fetchProducts()
})

const removeProduct = async (id) => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  })
  if (response.ok) {
    fetchProducts()
  }
}
</script>

<template>
<main>
    <div>Produk</div>
    <div>
      <RouterLink to="/products">Buat Produk</RouterLink>
    </div>
    <div>
      <ul>
        <li v-for="product in products" :key="product.id">
          <div>nama: {{ product.name }}</div>
          <div>harga: {{ product.price }}</div>
          <div>
            <RouterLink :to="`/products/${product.id}`">Edit</RouterLink>
          </div>
          <div>
            <button @click="removeProduct(product.id)">Hapus Data</button>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>