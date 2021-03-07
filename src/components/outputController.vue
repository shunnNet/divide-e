<template>
  <div>
    <div>
      <button class="btn--base mr-050" @click="addOutput()">新增設定</button>
      <button
        class="btn--main mr-050"
        @click="processAll()"
        :disabled="outputing"
      >
        全部輸出
      </button>
      <input
        type="text"
        v-model="searchSetting"
        placeholder="篩選要輸出的檔案設定"
      />
    </div>
    <transition-group class="outputs" tag="ul">
      <li
        class="outputs__line pd-050 d-flex f-cross-center f-main-between"
        v-for="(out, key) in outputDisplaying"
        :key="out.id"
      >
        <a
          class="outputs__line__name flex-1"
          href="#"
          @click.prevent="openOutputSetting(out)"
        >
          {{ out.filename }}
        </a>
        <div>
          <button
            class="btn--main mr-050"
            @click="processSingle(out.id)"
            :disabled="outputing"
          >
            輸出
          </button>
          <button class="btn--lightSub" @click="deleteConfirm(out)">
            刪除
          </button>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { filterBoardStore, confirm } from "@/assets/store.js"

export default {
  props: ["outputs", "outputing"],
  computed: {
    outputDisplaying() {
      return this.searchSetting
        ? Object.values(this.outputs).filter((output) =>
            output.filename.includes(this.searchSetting)
          )
        : Object.values(this.outputs)
    },
  },
  data() {
    return {
      outputSetting: this.outputs,
      searchSetting: "",
    }
  },
  created() {
    this.$watch(
      () => filterBoardStore.state.passBack,
      function (newVal, oldVal) {
        if (newVal !== null) {
          this.setOutputSetting(newVal)
        }
      }
    )
    this.outputSetting = this.outputs

  },

  methods: {
    deleteOutput(id) {
      this.searchSetting = ""
      this.$delete(this.outputSetting, id)
      localStorage.setItem("setting", JSON.stringify(this.outputSetting))
      this.$emit("update:outputs", this.outputSetting)
    },
    addOutput() {
      this.searchSetting = ""
      const id = String(Date.now())
      this.openOutputSetting({
        filename: "Output Filename",
        id,
        fields: [],
        filterGroup: [
          [
            {
              field: "",
              funcName: "includes",
              value: "",
            },
          ],
        ],
      })
      return this
    },
    setOutputSetting(newSetting) {
      this.$set(this.outputSetting, newSetting.id, newSetting)
      localStorage.setItem("setting", JSON.stringify(this.outputSetting))
      this.$emit("update:outputs", this.outputSetting)
      return this
    },
    openOutputSetting(fileSetting) {
      filterBoardStore.passDown(fileSetting).show(true)
    },
    processSingle(id) {
      this.$emit("output", [id])
    },
    processAll() {
      confirm
        .show("輸出全部", "確定要輸出畫面上的所有檔案嗎? (這可能會花一點時間)")

        .then(() =>
          this.$emit(
            "output",
            this.outputDisplaying.map((output) => output.id)
          )
        )
        .catch(() => {})
    },
    deleteConfirm(out){
      confirm.show("刪除設定", `您確定要刪除 ${out.filename}?`)
        .then(()=> this.deleteOutput(out.id))
        .catch(() => {})
    }
  },
}
</script>

<style lang="scss">
.outputs {
  &__line {
    border-radius: 10px 10px 0 0;
    transition: box-shadow 0.2s, transform 0.2s;

    border-bottom: 1px solid #000;
    margin-bottom: 10px;
    &:hover {
      transform: translate3d(0, -5%, 0);
      box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2);
      .outputs__line__name {
        text-decoration: underline;
        color: #0075ff;
      }
    }
    &__name {
      user-select: none;
      align-self: stretch;
      display: flex;
      align-items: center;
    }
  }
}
</style>