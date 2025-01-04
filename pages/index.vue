<template>
  <div>
    <form @submit.prevent="sendMoney">
      <input v-model="sourceAccountId" placeholder="source account id" />
      <input v-model="targetAccountId" placeholder="target account id" />
      <input v-model="money" placeholder="amount" />
      <button type="submit">send money</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
const sourceAccountId = ref('')
const targetAccountId = ref('')
const money = ref(0)
const message = ref('')

const sendMoney = async () => {
  try {
    const { data, error } = await useFetch('/api/send-money', {
      method: 'POST',
      body: JSON.stringify({
        sourceAccountId: sourceAccountId.value,
        targetAccountId: targetAccountId.value,
        money: money.value
      })
    })
    if (error.value) {
      message.value = error.value.message
    } else {
      message.value = 'success'
    }
  } catch (e) {
    message.value = `Error: ${e.message}`
  }
}

</script>