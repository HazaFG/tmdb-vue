<template>

    <div>
        <p>persona 5</p>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import headers from '../globals';  
import { ref } from 'vue';

interface Person {
  id: number;
}


const route = useRoute();
const personId: string = route.params.id as string;
let person = ref<Person | null>(null);

getPersonDetails(personId);

async function getPersonDetails(personId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  const response = await fetch(`https://api.themoviedb.org/3/person/${personId}`, requestOptions);
  const json = await response.json();
  person.value = json;
}
</script>