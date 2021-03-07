<script>
import inputRange from "@/components/libs/inputRange.vue"
import inputDatetime from "@/components/libs/inputDatetime.vue"
import inputDate from "@/components/libs/inputDate.vue"

export default {
  name: "inputFilter",
  props: {
    tag: {
      type: String,
      default: () => "div",
    },
    func: {
      type: String,
      default: () => "includes",
    },
    value: null,
  },
  components: {
    inputRange,
    inputDatetime,
    inputDate,
  },
  data() {
    return {
      filterActions: [
        { value: "includes", label: "包含" },
        { value: "startsWith", label: "開頭" },
        { value: "endsWith", label: "結尾" },
        { value: "moreThan", label: "多於" },
        { value: "moreThanOrEqual", label: "多於(含)" },
        { value: "lessThan", label: "少於" },
        { value: "lessThanOrEqual", label: "少於(含)" },
        // { value: "inNumRange", label: "介於" },
        { value: "laterThan", label: "晚於(日期)" },
        { value: "earlierThan", label: "早於(日期)" },
        { value: "isCertainDay", label: "特定日期" },
        // { value: "inDateRange", label: "日期區間" },
      ],
    }
  },
  computed: {
    type: {
      get() {
        return this.func
      },
      set(value) {
        this.$emit("update:func", value)
      },
    },
    v: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("update:value", value)
      },
    },
  },
  render(h) {
    let filterUnit

    switch (this.type) {
      case "includes":
      case "startsWith":
      case "endsWith":
        filterUnit = h("input", {
          directives: [{ name: "validity" }],
          attrs: {
            type: "text",
            value: this.v,
            placeholder: "請輸入文字",
            required: true,
          },
          on: { input: (e) => (this.v = e.target.value) },
          key: `${this._uid}-${this.type}`
        })
        break
      case "moreThan":
      case "moreThanOrEqual":
      case "lessThanOrEqual":
      case "lessThan":
        filterUnit = h("input", {
          directives: [{ name: "validity" }],
          attrs: {
            type: "number",
            value: this.v,
            placeholder: "請輸入數字",
            required: true,
          },
          on: { input: (e) => (this.v = parseFloat(e.target.value, 10)) },
          key: `${this._uid}-${this.type}`
        })
        break
      case "laterThan":
      case "earlierThan":
      case "isCertainDay":
        filterUnit = h("inputDate", {
          directives: [{ name: "validity", modifiers: { lazy: true } }],
          attrs: { value: this.v, required: true },
          on: { change: (e) => (this.v = e) },
          key: `${this._uid}-${this.type}`
        })
        break
      case "laterThanDateTime":
      case "earlierThanDateTime":
      case "isCertainDateTime":
        filterUnit = h("inputDatetime", {
          directives: [{ name: "validity", modifiers: { lazy: true } }],
          attrs: { value: this.v, required: true },
          on: { change: (e) => (this.v = e) },
          key: `${this._uid}-${this.type}`
        })
        break

      // case "inNumRange":
      //   filterUnit = h("inputRange", {
      //     attrs: { key: "inNumRange" },
      //     props: { type: "number", value: this.v },
      //     on: { input: (e) => (this.v = e) },
      //   })
      //   break
      // case "inDateRange":
      //   filterUnit = h("inputRange", {
      //     attrs: { key: "inDateRange" },
      //     props: { type: "date", value: this.v },
      //     on: { input: (e) => (this.v = e) },
      //   })
      //   break
    }
    let options = this.filterActions.map((action) => {
      return h("option", { attrs: { value: action.value } }, action.label)
    })

    let select = h(
      "select",
      {
        class: { "mr-5": true },
        domProps: { value: this.type },
        on: {
          change: (e) => {
            const v = ["inDateRange", "inNumRange"].includes(e.target.value)
              ? ["", ""]
              : ""

            this.$set(this, "v", v)
            this.type = e.target.value
          },
        },
      },
      options
    )
    return h(this.tag, [select, filterUnit])
  },
}
</script>