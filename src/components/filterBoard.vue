<template>
  <form class="board" @submit.prevent="submit($event)">
    <header class="board__header">
      <input
        class="board__header__filename editableInput"
        type="text"
        placeholder="輸入檔案名稱"
        v-model="setting.filename"
        ref="fileInput"
        required
      />
      <div>
        <button class="btn--contrast mr-5" type="button" @click="addGroup()">
          新增群組
        </button>
      </div>
      <div class="board__header__insert-group">
        <button
          type="button"
          class="btn--main"
          @click="insertFileFormat('[昨天日期]')"
        >
          昨天日期
        </button>
        <button
          type="button"
          class="btn--main"
          @click="insertFileFormat('[當天日期]')"
        >
          當天日期
        </button>
        <button
          type="button"
          class="btn--main"
          @click="insertFileFormat('[明天日期]')"
        >
          明天日期
        </button>
        <button
          type="button"
          class="btn--main"
          @click="insertFileFormat('[後天日期]')"
        >
          後天日期
        </button>
      </div>
    </header>
    <div class="board__body">
      <FieldSeletor v-model="setting.fields"/>
      <section class="group" v-for="(group, i) in setting.filterGroup" :key="i">
        <button
          type="button"
          class="btn--lightSub mb-10 mr-10"
          @click="removeGroup(i)"
          :disabled="!(setting.filterGroup.length > 1)"
        >
          移除群組
        </button>
        <button class="btn--main" type="button" @click="addFilter(group)">
          新增篩選器
        </button>

        <div class="filter" v-for="(filter, i) in group" :key="i">
          <input
            type="text"
            placeholder="請輸入表頭名稱"
            :value="filter.field"
            @input="filter.field = $event.target.value"
            class="mr-10"
            required
          />
          <input-filter
            :func.sync="filter.funcName"
            :value.sync="filter.value"
            class="d-flex mr-10"
          ></input-filter>
          <button
            class="btn--lightSub"
            type="button"
            @click="removeFilter(group, i)"
            :disabled="!(group.length > 1)"
          >
            移除
          </button>
        </div>
      </section>
    </div>
    <footer class="board__footer">
      <button class="btn--lightSub mr-5" @click="close()" type="button">
        取消
      </button>
      <button class="btn--main" type="submit">提交</button>
    </footer>
  </form>
</template>

<script>
import inputFilter from "@/components/filter.vue"
import { filterBoardStore, generalStore } from "@/assets/store.js"
import FieldSeletor from "./fieldSelector.vue"

export default {
  components: {
    inputFilter,
    FieldSeletor,
  },
  data() {
    return {
      setting: {},
      showInsertBtn: false,
      options: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
      ],
    }
  },
  computed: {
    fields() {
      return generalStore.state.fields
    },
  },
  created() {
    this.$watch(
      () => filterBoardStore.state.passDown,
      function (newVal, oldVal) {
        this.setFileSetting(newVal)
      }
    )
    this.setFileSetting(filterBoardStore.state.passDown)
  },
  methods: {
    setFileSetting(newSetting) {
      this.setting = JSON.parse(JSON.stringify(newSetting))
      return this
    },
    close() {
      filterBoardStore.show(false)
    },
    submit() {
      filterBoardStore.passBack(this.setting).show(false)
    },
    addGroup() {
      this.setting.filterGroup.push([
        {
          field: this.fields[0],
          funcName: "includes",
          value: "",
        },
      ])
    },
    removeGroup(index) {
      console.log("removeGroup")
      this.setting.filterGroup.splice(index, 1)
    },
    addFilter(group) {
      group.push({
        field: this.fields[0],
        funcName: "includes",
        value: "",
      })
    },
    removeFilter(group, index) {
      console.log("removeFilter")
      group.splice(index, 1)
    },
    insertFileFormat(insertValue) {
      if (insertValue) {
        const input = this.$refs.fileInput
        const prepend = input.value.substring(0, input.selectionStart)
        const append = input.value.substring(input.selectionEnd)
        this.setting.filename = `${prepend}${insertValue}${append}`
      }
    },
  },
}
</script>

<style lang="scss">
.group {
  margin-bottom: 20px;

  border-bottom: 1px solid #000;
  padding: 10px;
}
.filter {
  display: flex;
  margin-bottom: 10px;
}
.board {
  background: #d7d7d7;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  &__header {
    width: 100%;
    // background-color: #14213d;
    border-radius: 20px 20px 0 0;
    padding: 20px;
    // margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;

    &__filename {
      flex: 1;
      margin-right: 10px;
      font-size: 20px;
    }
    &__btns {
    }
    &__insert-group {
      width: 100%;
      margin-top: 10px;
      .btn--main {
        margin-right: 10px;
      }
    }
  }
  &__body {
    width: 100%;

    border-radius: 20px;
    padding: 20px;
    flex: 1;
    overflow-y: auto;
    margin-bottom: 10px;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>