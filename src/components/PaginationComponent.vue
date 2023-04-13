<script setup lang="ts">
    import { ref, computed, defineProps, onMounted, watch } from 'vue';
    import Modal from '@/components/ModalComponent.vue'
    import { getUsers, type RandomUser } from '@/services/randomUserService';

    const props = defineProps<{
        gender: string,
        nat: string
    }>();

    let data = ref<RandomUser>({
        results: [],
        info: { page: 0, results: 0, seed: '', version: ''}
    });
    let page = ref(1);
    const perPage = 6;
    let userCard = ref({});

    watch([() => props.gender, () => props.nat], async ([newGender, newNat]) => {
        data.value = await getUsers(`gender=${newGender}&nat=${newNat}`);
    });

    onMounted(async () => {
        data.value = await getUsers();
    });
    
    const paginatedData = computed(() =>
        data.value.results.slice((page.value - 1) * perPage, page.value * perPage)
    );
    const nextPage = () => {
        if (page.value !== Math.ceil(data.value.results.length / perPage)) {
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
    const handleUser = (user: any) => {
        userCard.value = user;
    }
</script>

<template>
    <Modal :user="userCard" />
    <div class="container text-center">
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
                         'Sem elemento'
                        }}</h5>
                        <p class="card-text">
                            {{ paginatedData[(i - 1) * 3 + (n - 1)] ? `${paginatedData[(i - 1) * 3 + (n - 1)].location.country}` :
                         'Sem elemento' }}
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
        <button class="btn btn-outline-dark" @click="backPage">prev</button>
        <button :class="item === page ? 'btn btn-primary' : 'btn btn-outline-primary'"
        v-for="item in Math.ceil(data.results.length / perPage)"
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
  
