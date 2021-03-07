<template>
  <div class="divider box-md">
    <h1 class="h1">Excel 切割</h1>
    <div class="progress__bar" v-if="!haveOutputed" />
    <ProgressBar ref="progress" #default="{ progress }">
      <p v-if="progress" class="progress-report">
        {{
          progress !== 1
            ? `正在輸出檔案...${Math.ceil(progress * 100)}%`
            : "輸出完成！"
        }}
      </p>
    </ProgressBar>
    <div class="fixBox">
      <DownloadJson :value="outputs" class="download-json" />
      <LoadJson @load="onImportSetting" class="load-json" />
    </div>
    <FileLoader
      class="mb-10"
      :need-process.sync="needProcess"
      ref="fileLoader"
    />

    <OutputController
      :outputs.sync="outputs"
      @output="process($event)"
      :outputing="outputing"
    />
    <transition name="overlay" appear>
      <div class="overlay" v-if="overlay"></div>
    </transition>

    <transition name="modal" appear>
      <FilterBoard class="modal index-filterBoard" v-if="showFilterBoard" />
    </transition>

    <transition name="modal" appear>
      <ConfirmModal class="modal" v-if="confirm" />
      <AlertModal class="modal" v-if="alert" />
    </transition>
  </div>
</template>
<script>
import * as fs from "file-saver"
import { overlay, filterBoardStore, confirm, alert } from "@/assets/store.js"
import FileLoader from "@/components/fileLoader.vue"
import FilterBoard from "@/components/filterBoard.vue"
import OutputController from "@/components/outputController.vue"
import ConfirmModal from "@/components/libs/confirm.vue"
import AlertModal from "@/components/libs/alert.vue"
import DownloadJson from "@/components/DownloadJson.vue"
import LoadJson from "@/components/LoadJson.vue"
import Vue from "vue"
import ProgressBar from "@/components/progress.vue"

const worker = new Worker("../excel.worker.js", { type: "module" })

const outputing = Vue.observable({
  outputing: false,
})

export default {
  name: "Home",
  components: {
    FileLoader,
    FilterBoard,
    OutputController,
    ConfirmModal,
    AlertModal,
    ProgressBar,
    DownloadJson,
    LoadJson,
  },
  data() {
    return {
      needProcess: [],
      outputs: {},
      amount: 70,
      haveOutputed: false,
    }
  },
  created() {
    const settingRaw = localStorage.getItem("setting")
    if (settingRaw) {
      this.outputs = JSON.parse(settingRaw)
    }
  },
  mounted() {
    worker.onmessage = (e) => {
      switch (e.data.type) {
        case "complete":
          fs.saveAs(e.data.blob, `${e.data.name}.xlsx`)
          outputing.outputing = false
          this.progressTo(100)
          break
        case "progress":
          this.progressTo(e.data.progress)
        default:
          break
      }
    }
  },
  computed: {
    outputing() {
      return outputing.outputing
    },
    overlay() {
      return overlay.state.show
    },
    showFilterBoard() {
      return filterBoardStore.state.showFilterBoard
    },
    confirm() {
      return confirm.state.show
    },
    alert() {
      return alert.state.show
    },
  },

  methods: {
    onImportSetting(setting) {
      localStorage.setItem("setting", setting)
      window.location.reload()
    },

    progressTo(num, duration = 1000) {
      this.$refs.progress.pause().to({ to: num, duration: duration })
    },
    async process(ids) {
      this.$refs.progress.reset()

      if (this.needProcess.length > 0 && ids.length > 0) {
        this.haveOutputed = true
        outputing.outputing = true

        this.$refs.fileLoader.file.arrayBuffer().then((buffer) => {
          const payload = {
            type: "output",
            settings: this.outputs,
            ids,
            needProcess: this.needProcess,
            buffer,
          }
          this.progressTo(10)
          worker.postMessage(payload)
        })
      } else {
        await alert.show(
          "輸出檔案",
          "請選擇要切割的 「檔案」 及 「工作表」，或至少設定一個輸出設定"
        )
      }
    },
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/_variable.scss";

.h1 {
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: bold;
}
.progress {
  height: 30px;
  width: 100%;
  &-report {
    line-height: 1.5;
    text-align: end;
  }
}

.divider {
  padding-top: 30px;
  padding: 50px 20px 20px 20px;
  margin: auto;
  background-color: $sub;
  position: relative;
}

.fixBox {
  position: absolute;
  z-index: 2;
  top: 20px;
  right: 20px;
  display: flex;
  // transform: translateX(100%);

  .download-json {
    margin-right: 10px;
  }
}
.file-loader {
  margin-bottom: 20px;
}
.filters {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  &__list {
    padding: 0;
    margin: 0;
  }
}
.index-filterBoard {
  min-width: 750px;
  width: 60%;
  height: 80%;
}

.d-flex {
  display: flex;
}
</style>
