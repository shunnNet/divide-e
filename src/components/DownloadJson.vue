<template>
  <button type="button" class="btn--base" @click="downloadSetting">下載設定</button>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  methods: {
    downloadSetting() {
      const blob = new Blob([JSON.stringify(this.value, null, 2)], {
        type: "application/json",
      })
      const uri = URL.createObjectURL(blob)
      downloadURI(uri, "settings.json")

      function downloadURI(uri, name) {
        var link = document.createElement("a")
        link.download = name
        link.href = uri
        link.click()
      }
    },
  },
}
</script>

<style>
</style>