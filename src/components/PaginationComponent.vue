<script setup lang="ts">
    import { ref, computed } from "vue";

    let page = ref(1);

    const data = Array.from(Array(50).keys()).map((item) => {
        return { index: item, value: `this_${item}` };
    });

    const perPage = 9;

    const paginatedData = computed(() =>
        data.slice((page.value - 1) * perPage, page.value * perPage)
    );

    const nextPage = () => {
        if (page.value !== Math.ceil(data.length / perPage)) {
            page.value += 1;
        }
    };

    const backPage = () => {
        if (page.value !== 1) {
            page.value -= 1;
        }
    };

    const goToPage = (numPage: number) => {
        page.value = numPage;
    };
</script>

<template>
    <div class="container text-center">
        <div v-for="i in 3" :key="i" class="row">
            <template v-for="n in 3" :key="n">
                <div class="col col-md">
                    <div class="card shadow p-1 mb-5 bg-body-tertiary rounded" style="width: 14rem; height: ;">
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" class="card-img-top" alt="..."  style="height: 160px;">
                    <div class="card-body">
                        <h5 class="card-title">{{ paginatedData[(i - 1) * 3 + (n - 1)].value }}</h5>
                        <p class="card-text">Some quick example text to</p>
                        <a href="#" class="btn btn-primary">Detalhes</a>
                    </div>
                    </div>
                </div>
            </template>
        </div>
    </div>

    <div class="mt-4 mb-4">
        <button class="btn btn-outline-dark" @click="backPage">prev</button>
        <button class="btn btn-outline-primary"
        v-for="item in Math.ceil(data.length / perPage)"
        :key="item"
        @click="() => goToPage(item)"
        >
        {{ item }}
        </button>
        <button class="btn btn-outline-dark" @click="nextPage">next</button>
    </div>
</template>

<style scoped>
</style>
  
