<template>
  <div class="tasks-container">
    <button class="btn btn-primary" @click="tick">Tick</button>
    <div class="list-group mt-2">
      <a href="#" class="list-group-item list-group-item-action" v-for="tasks in $store.state.tasks" :key="tasks.id" >
        <div class="d-flex w-100 justify-content-between">
          <small>{{ tasks.dueIn }} days to go</small>
        </div>
        <p class="mb-1">{{ tasks.name }}</p>
        {{ tasks.priority }}
      </a>

    </div>
  </div>
</template>

<script>

export default {
    methods: {
      tick() {
        this.$store.dispatch('tick')
        this.$store.dispatch('getTasks')
      }
    },
    created() {
        this.$store.dispatch('getTasks')
  },
}
</script>

