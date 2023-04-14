<script setup lang="ts">
    import { ref, computed, defineProps, onMounted, watch } from 'vue';
    import Modal from '@/components/ModalComponent.vue'
    import { getUsers, type RandomUserResults, type RandomUser } from '@/services/randomUserService';

    const props = defineProps<{
        gender: string,
        nat: string
    }>();

    let data = ref<RandomUserResults>({
        results: [],
        info: { page: 0, results: 0, seed: '', version: ''}
    });
    let page = ref(1);
    const perPage = 6;
    let userCard = ref<RandomUser>();
    let prevPage = 1;

    watch([() => props.gender, () => props.nat], async ([newGender, newNat]) => {
        page.value = 1;
        prevPage = 1;
        data.value = await getUsers(`results=6&page=${page.value}&gender=${newGender}&nat=${newNat}`);
    });

    watch(() => page.value, async (newPage) => {
        if (newPage > prevPage) {
            const pageDiff = newPage - prevPage;

            const { results } = await getUsers(`results=${pageDiff * perPage}&page=${newPage}&gender=${props.gender}&nat=${props.nat}`);

            data.value.results.push(...results);
            prevPage = newPage;
        }
    });

    onMounted(async () => {
        data.value = await getUsers(`results=6`);
    });
    
    const paginatedData = computed(() =>
        data.value.results.slice((page.value - 1) * perPage, page.value * perPage)
    );
    const nextPage = () => {
        if (page.value !== Math.ceil(30 / perPage)) {
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
    const handleUser = (user: RandomUser) => {
        userCard.value = user;
    }
</script>

<template>
    <Modal :user="userCard as RandomUser" />
    <div class="container-fluid text-center">
        <div v-for="i in 2" :key="i" class="row">
            <template v-for="n in 3" :key="n">
                <div class="col col-md-4">
                    <div class="card shadow p-1 mb-5 bg-body-tertiary rounded" 
                    @click="() => handleUser(paginatedData[(i - 1) * 3 + (n - 1)])" 
                    :id="String((i - 1) * 3 + (n - 1))" 
                    style="width: 14rem;"
                    >
                        <img :src="
                            paginatedData[(i - 1) * 3 + (n - 1)] ? paginatedData[(i - 1) * 3 + (n - 1)].picture.large :
                            '...'" class="card-img-top" alt="..."  style="height: 160px;">
                        <div class="card-body">
                            <h5 class="card-title" style="font-size: 17px;">{{ 
                            paginatedData[(i - 1) * 3 + (n - 1)] ? `${paginatedData[(i - 1) * 3 + (n - 1)].name.first} ${paginatedData[(i - 1) * 3 + (n - 1)].name.last }` :
                            '...'
                            }}</h5>
                            <p class="card-text">
                                {{ paginatedData[(i - 1) * 3 + (n - 1)] ? `${paginatedData[(i - 1) * 3 + (n - 1)].location.country}` :
                            '...' }}
                            </p>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userDetailsModal">
                                Detalhes
                            </button>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>

    <div class="mt-4 mb-4">
        <button class="btn btn-outline-light page-control" @click="backPage">Anterior</button>
        <button :class="item === page ? 'btn btn-primary' : 'btn btn-outline-primary'"
        v-for="item in Math.ceil(30 / perPage)"
        :key="item"
        @click="() => goToPage(item)"
        >
        {{ item }}
        </button>
        <button class="btn btn-outline-light page-control" @click="nextPage">Próximo</button>
    </div>
</template>

<style scoped>
    .card {
        background-color: #343a40;
    }
    p {
        font-size: 13px;
    }
    button {
        font-size: 14px;
        margin: 2px;
    }
    button.page-control {
        margin: 8px;
    }
</style>
  
