<template>
  <div class="fileLoader">
    <input
      class="fileLoader__upload"
      type="file"
      ref="file"
      @change="loadWorkbook($event)"
    />
    <div>
      <label class="fileLoader__check" v-for="ws in worksheets" :key="ws.id">
        <input type="radio" v-model="outputSheetName" :value="ws.name" />
        {{ ws.name }}
      </label>
    </div>
  </div>
</template>

<script>
import ExcelJS from "exceljs"

const worker = new Worker("../excel.worker.js", { type: "module" })

export default {
  props: ["need-process"],
  data() {
    return {
      file: null,
      workbook: new ExcelJS.Workbook(),
      worksheets: [],
      outputSheetName: "",
    }
  },
  watch: {
    worksheets: {
      deep: true,
      handler: function (now, old) {
        this.updateNeedProcess()
      },
    },
    outputSheetName() {
      this.updateNeedProcess()
    },
  },
  mounted() {
    const self = this
    worker.onmessage = function (e) {
      self.worksheets = e.data
    }
  },
  methods: {
    updateNeedProcess() {
      this.$emit(
        "update:needProcess",
        this.worksheets.filter((ws) => ws.name === this.outputSheetName)
      )
    },
    loadWorkbook($event) {
      this.worksheets = []

      if ($event.target.files.length > 0) {
        this.file = $event.target.files[0]
        $event.target.files[0].arrayBuffer().then(async (buffer) => {
          worker.postMessage({
            type: "field",
            blob: buffer,
          })
        })
      }
    },
  },
}
</script>

<style lang="scss">
.fileLoader {
  &__upload {
    cursor: pointer;
    margin-bottom: 10px;
  }
  &__check {
    cursor: pointer;
    &:hover {
      color: #0075ff;
    }
  }
}
.upload {
  display: block;
  font-size: 28px;
  max-width: 500px;
  min-height: 200px;

  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: orange;
  }
}
</style>