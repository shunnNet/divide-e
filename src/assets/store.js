import Vue from "vue"

export const overlay = {
  state: Vue.observable({
    show: false
  })
}

export const confirm = {
  state: Vue.observable({
    show: false,
    resolve: null,
    reject: null,
    title: "Confirm",
    msg: "Please confirm"
  }),
  show(title, msg) {
    return new Promise((resolve, reject) => {
      overlay.state.show = true
      this.state.show = true
      this.state.resolve = resolve
      this.state.reject = reject
      this.state.title = title ? title : this.title
      this.state.msg = msg ? msg : this.msg
    })
  },
  close() {
    overlay.state.show = false
    this.state.show = false
    this.state.resolve = null
    this.state.reject = null
    this.state.title = ""
    this.state.msg = ""
  }
}

export const alert = {
  state: Vue.observable({
    show: false,
    resolve: null,
    reject: null,
    title: "Confirm",
    msg: "Please confirm"
  }),
  show(title, msg) {
    return new Promise((resolve, reject) => {
      overlay.state.show = true
      this.state.show = true
      this.state.resolve = resolve
      this.state.reject = reject
      this.state.title = title ? title : this.title
      this.state.msg = msg ? msg : this.msg
    })
  },
  close() {
    overlay.state.show = false
    this.state.show = false
    this.state.resolve = null
    this.state.reject = null
    this.state.title = ""
    this.state.msg = ""
  }
}

export const generalStore = {
  state: Vue.observable({
    fields: []
  })
}

export const filterBoardStore = {
  state: Vue.observable({
    showFilterBoard: false,
    passDown: {
      filename: "",
      fields: [],
      id: "",
      filterGroup: []
    },
    passBack: {
      filename: "",
      fields: [],
      id: "",
      filterGroup: []
    }
  }),
  passDown(newVal) {
    Vue.set(this.state, "passDown", newVal)
    Vue.set(this.state, "passBack", null)

    return this
  },
  passBack(newVal) {
    Vue.set(this.state, "passDown", null)
    Vue.set(this.state, "passBack", newVal)
    return this
  },

  show(status = false) {
    this.state.showFilterBoard = status
    overlay.state.show = status
    return this
  }
}
