<template>
  <q-item>
    <q-item-section
      class="text-grey-8"
      side
      >x{{ card.quantity }}</q-item-section
    >
    <q-item-section> {{ card.name }} ({{ card.exp }})</q-item-section>
    <q-item-section side>
      <div>
        <q-btn
          size="12px"
          flat
          dense
          round
          icon="add"
          @click="onAddClick"
        />
        <q-btn
          size="12px"
          flat
          dense
          round
          icon="delete"
          @click="onDeleteClick"
        />
      </div>
    </q-item-section>
  </q-item>
</template>
<script setup>

const props = defineProps(['card']);

function onAddClick() {
  if(props.card.quantity === 2) {
    console.log("Max card limit is 2.");
  } else {
    console.log("add card to deck");
  }
}

function onDeleteClick() {
  console.log("delete card from deck clicked");
}
</script>
