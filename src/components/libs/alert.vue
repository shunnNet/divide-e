<template>
  <section class="alert">
    <h4 class="alert__title">{{ title }}</h4>
    <p class="alert__msg">{{ msg }}</p>
    <div class="alert__btns">
      <button class="alert__btns__main btn--main" type="button" @click="confirm()">
        確定
      </button>
    </div>
  </section>
</template>

<script>
import { alert } from "@/assets/store.js"
export default {
  data() {
    return {}
  },
  computed: {
    msg() {
      return alert.state.msg
    },
    title() {
      return alert.state.title
    },
    resolve() {
      return alert.state.resolve
    },
    reject() {
      return alert.state.reject
    },
  },
  methods: {
    confirm() {
      this.resolve()
      alert.close()
    },
    cancel() {
      this.reject()
      alert.close()
    },
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/_variable.scss";
.alert {
  background-color: $sub;
  
  max-width: 500px;
  padding: 20px;
  font-size: 24px;
  &__title {
    font-weight: bold;
    margin-bottom: 15px;
  }
  &__msg {
    font-size: 0.75em;
    margin-bottom: 25px;
    color: $alert;
  }
  &__btns {
    font-size: 0.75em;
    display: flex;
    justify-content: flex-end;
    &__main {
      margin-left: 10px;

    }
  }

}
</style>