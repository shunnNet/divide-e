<template>
  <label>
    <slot>
      <p class="btn btn--base">載入設定</p>
    </slot>
    <input hidden="hidden" type="file" @change="importJSON($event)" />
  </label>
</template>

<script>
export default {
  methods: {
    importJSON(e) {
      const file = e.target.files[0]
      if (file) {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
          this.$emit("load", e.currentTarget.result)
        }
        fileReader.readAsText(file)
      }
    },
  },
}
</script>

<style>
</style>