<template>
  <div id="app">


    <app-login v-if="state == 'login'" @redirectToTodo="redirectToTodo"></app-login>
    <app-quests v-else-if="state == 'quests'" @redirectToLogin="redirectToLogin"></app-quests>
    <app-under-quests v-else-if="state == 'under-quests'"></app-under-quests>
    <app-add-quests v-else-if="state == 'add-quests'"></app-add-quests>
    <app-add-under-quests v-else-if="state == 'add-under-quests'"></app-add-under-quests>
    <app-alerting v-else-if="state == 'alerting'"></app-alerting>
    <app-accepting v-else-if="state == 'accepting'"></app-accepting>

  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 'login'
    }
  },
  methods:{
    redirectToTodo: function () {
        this.state = 'quests'
    },
    redirectToLogin: function () {
      this.state = 'login'
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
