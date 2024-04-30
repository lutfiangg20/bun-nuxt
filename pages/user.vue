<template>
  <UContainer class="mt-4">
    <div class="flex justify-end">
      <UButton @click="isOpen = true">Add</UButton>
    </div>
    <UTable :rows="datas" :columns="columns">
      <template #actions-data="{ row }">
        <UButton color="red" @click="deleteData(row.id)">Hapus</UButton>
      </template>
    </UTable>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="datas.length"
      />
    </div>
  </UContainer>

  <UModal v-model="isOpen">
    <form class="p-10" @submit.prevent="addUser">
      <UFormGroup label="Name" required class="mb-5">
        <UInput v-model="name" placeholder="Enter Name" />
      </UFormGroup>
      <UFormGroup label="Email" required class="mb-5">
        <UInput v-model="email" placeholder="Enter Email" />
      </UFormGroup>
      <div class="flex justify-end">
        <UButton type="submit">Add</UButton>
      </div>
    </form>
  </UModal>
</template>

<script lang="ts" setup>
const getData = async () => {
  const data = await fetch("/api/user");
  datas.value = await data.json();
};
const { data } = await useFetch("/api/user");
const datas = ref(data);
const isOpen = ref(false);
const page = ref(1);
const pageCount = 5;
const name = ref("");
const email = ref("");

const addUser = async () => {
  await $fetch("/api/user", {
    method: "POST",
    body: {
      name: name.value,
      email: email.value,
    },
  }).then(() => {
    isOpen.value = false;
    getData();
    name.value = "";
    email.value = "";
  });
};

onMounted(() => {
  const rows = computed(() => {
    return datas.slice((page.value - 1) * pageCount, page.value * pageCount);
  });
});

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "actions",
    label: "Action",
  },
];

const items = (row) => [
  {
    label: "Edit",
    icon: "i-heroicons-pencil-square-20-solid",
    click: () => console.log("Edit", row.id),
  },
];

const deleteData = async (id) => {
  await $fetch(`/api/user/${id}`, {
    method: "DELETE",
  }).then(() => {
    getData();
  });
};
</script>
