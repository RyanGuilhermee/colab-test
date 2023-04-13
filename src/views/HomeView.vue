<script setup lang="ts">
  import { ref } from 'vue';
  import Navbar from '@/components/NavbarComponent.vue';
  import Pagination from '@/components/PaginationComponent.vue';

  interface EventTargetValue extends EventTarget {
    value: string;
  }

  const gender = ref('');
  const nat = ref('');

  const handleChangeNat = (event: Event) => {
    const targetValue = event.target as EventTargetValue;
    nat.value = targetValue.value;
  }

  const handleChangeGen = (event: Event) => {
    const targetValue = event.target as EventTargetValue;
    gender.value = targetValue.value;
  }

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="container d-flex flex-column align-items-center mt-4">
    <h1>Usuários</h1>

    <section class="filters d-flex flex-column align-items-center mt-3">
      <h3>Filtrar por:</h3>

      <div class="filters-container d-flex flex-row justify-content-between mt-2">
        <div class="form-floating">
          <select class="form-select" 
          id="floatingSelect" 
          aria-label="Floating label select example"
          @change="handleChangeGen"
          >
            <option value="" selected>Selecionar</option>
            <option value="female">Feminino</option>
            <option value="male">Masculino</option>
          </select>
          <label for="floatingSelect">Gênero</label>
        </div>
        <div class="form-floating">
          <select class="form-select" 
          id="floatingSelect" 
          aria-label="Floating label select example"
          @change="handleChangeNat"
          >
            <option value="" selected>Selecionar</option>
            <option value="br">Brasil</option>
            <option value="us">Estados Unidos</option>
            <option value="au">Austrália</option>
            <option value="ca">Canadá</option>
            <option value="ch">Suiça</option>
            <option value="de">Alemanha</option>
            <option value="dk">Dinamarca</option>
            <option value="es">Espanha</option>
            <option value="fi">Finlândia</option>
          </select>
          <label for="floatingSelect">Nacionalidade</label>
        </div>
      </div>
    </section>

    <section class="pagination d-flex flex-column align-items-center mt-5">
      <Pagination :gender="gender" :nat="nat" />
    </section>
  </main>
</template>

<style scoped>
  .filters { 
    width: 70%;
  }
  .filters h3 {
    font-size: 17px;
  }
  .filters-container {
    width: 60%;
  }
  .pagination {
    width: 70%;
  }
</style>
