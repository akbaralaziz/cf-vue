<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const name = ref('')
const price = ref(0)

const saveData = async () => {
    const newProduct = JSON.stringify({
        name: name.value,
        price: price.value,
    })

    const response = await fetch('/api/products', {
        method:'POST',
        body: newProduct,
    })
    const data = await response.json()

    router.push('/')
}
</script>


<template>
    <div class="container px-4 py-6 mx-auto w-lg">
        <h1 class="text-lg sm:text-2xl text-center">Buat Produk Baru</h1>
        <form @submit.prevent="saveData">
            <div class="w-full">
                <label>Nama</label>
                <input type="text" v-model="name" />
            </div>
            <div>
                <label>Harga</label>
                <input type="number" v-model="price" />
            </div>
    
            <div class="mt-3">
                <button type="submit">Simpan</button>
            </div>
        </form>
    </div>
</template>