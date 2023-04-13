<script setup lang="ts">
  import type { RandomUser } from '@/services/randomUserService';
import { defineProps, watch, ref } from 'vue';

  const props = defineProps<{user: RandomUser}>();

  const userDetails = ref<RandomUser>();

  watch(() => props.user, (newUser) => {
    userDetails.value = newUser;
  });
</script>

<template>
    <div class="modal fade" id="userDetailsModal" tabindex="-1" aria-labelledby="userDetailsModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="userDetailsModalLabel"></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>

