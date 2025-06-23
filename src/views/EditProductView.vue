<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();
const route = useRoute()
const id = route.params.id

const name = ref('')
const price = ref(0)

const saveData = async () => {
    const product = JSON.stringify({
        name: name.value,
        price: price.value,
    })

    const response = await fetch(`/api/products/${id}`, {
        method:'PUT',
        body: product,
    })
    const data = await response.json()

    router.push('/')
}

onMounted(() => {
    fetch(`/api/products/${id}`)
        .then(response => response.json())
        .then(data => {
            name.value = data.name
            price.value = data.price
        })
})
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