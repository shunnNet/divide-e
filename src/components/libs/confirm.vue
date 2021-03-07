<template>
  <section class="confirm">
    <h4 class="confirm__title">{{ title }}</h4>
    <p class="confirm__msg">{{ msg }}</p>
    <div class="confirm__btns">
      <button class="btn--lightSub" type="button" @click="cancel()">
        取消
      </button>
      <button
        class="confirm__btns__main btn--main"
        type="button"
        @click="confirm()"
      >
        確定
      </button>
    </div>
  </section>
</template>

<script>
import { confirm } from "@/assets/store.js"
export default {
  data() {
    return {}
  },
  computed: {
    msg() {
      return confirm.state.msg
    },
    title() {
      return confirm.state.title
    },
    resolve() {
      return confirm.state.resolve
    },
    reject() {
      return confirm.state.reject
    },
  },
  methods: {
    confirm() {
      this.resolve()
      confirm.close()
    },
    cancel() {
      this.reject()
      confirm.close()
    },
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/_variable.scss";
.confirm {
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