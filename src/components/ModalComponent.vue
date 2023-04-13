<script setup lang="ts">
  import type { RandomUser } from '@/services/randomUserService';
  import { defineProps, watch, ref } from 'vue';

  const props = defineProps<{user: RandomUser}>();

  const userDetails = ref<RandomUser>();

  watch(() => props.user, (newUser) => {
    userDetails.value = newUser;
    const userDateBirthday = new Date(userDetails.value.dob.date);
    userDetails.value.dob.date = userDateBirthday.toLocaleDateString('pt-BR'); 
  });
</script>

<template>
  <div class="modal fade" id="userDetailsModal" tabindex="-1" aria-labelledby="userDetailsModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="userDetailsModalLabel">{{ `${userDetails?.name.first} ${userDetails?.name.last}` }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInputDisabled" 
            :value="`${userDetails?.location.city}, ${userDetails?.location.state}, ${userDetails?.location.country}`" disabled>
            <label for="floatingInputDisabled">Localização</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInputDisabled" :value="userDetails?.email" disabled>
            <label for="floatingInputDisabled">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInputDisabled" :value="userDetails?.cell" disabled>
            <label for="floatingInputDisabled">Celular</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInputDisabled" :value="userDetails?.dob.date" disabled>
            <label for="floatingInputDisabled">Data de nascimento</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInputDisabled" :value="`${userDetails?.dob.age} anos`" disabled>
            <label for="floatingInputDisabled">Idade</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInputDisabled" 
            :value="userDetails?.gender === 'male' ? 'Masculino' : 'Feminino'" disabled>
            <label for="floatingInputDisabled">Gênero</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

