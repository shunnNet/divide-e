<template>
  <input type="text" :value="inputValue" @input="process($event)" />
</template>

<script>
export default {
  props: {
    value: {
      default: () => new Date(),
    },
    lazy: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      inputValue: "",
      realValue: new Date(),
    }
  },
  computed: {
    event() {
      return this.lazy ? "change" : "input"
    },
  },
  created() {
    if (this.isValidDate(this.value)) {
      this.realValue = new Date(this.value)
      this.inputValue = this.toViewFormat(this.realValue)
    }
  },
  methods: {
    toViewFormat(date) {
      return date.toLocaleString("zh-TW", {
        hour12: false,
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        month: "2-digit",
        year: "numeric",
      })
    },
    setTimeIfValidDate(t, v) {
      const parseResult = Date.parse(v)
      const isValieDate = !isNaN(parseResult)
      if (isValieDate) {
        t.setTime(v)
      }
      return isValieDate
    },
    isValidDate(value) {
      return !isNaN(Date.parse(value))
    },

    process(e) {
      if (this.isValidDate(e.target.value)) {
        this.realValue.setTime(Date.parse(e.target.value))
        e.target.setCustomValidity("")
        this.$emit(this.event, this.realValue)
      } else {
        e.target.setCustomValidity("請輸入日期，格式: YYYY/MM/DD hh:mm:ss")
      }
    },

    // getCustomString(date, dateSplit = "-", timeSplit = ":") {
    //   let dateObj
    //   if (!date) dateObj = new Date()

    //   const y = dateObj.getFullYear()
    //   const m = dateObj.getMonth() + 1
    //   const d = dateObj.getDate()
    //   const hh = dateObj.getHours()
    //   const mm = dateObj.getMinutes()
    //   const ss = dateObj.getSeconds()

    //   return `${y}${dateSplit}${m}${dateSplit}${d} ${hh}${timeSplit}${mm}${timeSplit}${ss}`
    // },
  },
}
</script>
