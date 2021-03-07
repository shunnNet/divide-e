<template>
  <Multiselect
    :options="innerField"
    v-model="innerField"
    :taggable="true"
    @tag="addTag"
    @remove="handleRemove"
    track-by="value"
    :multiple="true"
    placeholder="填上要輸出的欄位名稱(若沒有就會輸出全部)"
  />
</template>

<script>
import Multiselect from "vue-multiselect"
export default {
  components: {
    Multiselect,
  },
  model: {
    prop: "field",
    event: "change",
  },
  props: {
    field: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      innerField: [...this.field],
    }
  },
  watch: {
    field() {
      this.innerField = [...this.field]
    },
  },
  methods: {
    handleRemove(value) {
      const i = this.innerField.findIndex((f) => f === value)
      this.innerField.splice(i, 1)
      this.$emit("change", this.innerField)
    },
    addTag(tag) {
      this.innerField.push(tag)
      this.$emit("change", this.innerField)
    },
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>