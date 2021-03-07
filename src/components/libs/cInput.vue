<template>
  <div class="cInput" :class="{ 'cInput--focus': focus }">
    <label class="cInput__label" :for="`input-${_uid}`"> {{ label }} </label>
    <div class="cInput__wrap">
      <img
        class="cInput__pre-icon"
        v-for="(preIcon, i) in prependIcons"
        :key="preIcon"
        :src="preIcon"
        @click="$emit('click:prepend', 'prepend' + i)"
      />
      <input
        :name="name"
        class="cInput__input"
        type="text"
        :id="`input-${_uid}`"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="focus = true"
        @blur="focus = false"
        v-bind="$attrs"
      />

      <img
        class="cInput__append-icon"
        v-for="(appendIcon, i) in appendIcons"
        :key="appendIcon"
        :src="appendIcon"
        @click="$emit('click:append', 'append' + i)"
      />
    </div>
    <div class="cInput__error" v-show="error">{{ error }}</div>
  </div>
</template>

<script>
// import { validationProvider } from "vee-validate"

export default {
  inheritAttrs: false,
  $_veeValidate: {
    value() {
      console.log(1234);
      return this.value
    },
    name() {

      console.log(this.name);
      return this.name
    },
  },
  data() {
    return {
      focus: false,
    }
  },
  // components: {
  //   ValidationProvider,
  // },
  props: {
    value: {},
    name: {},
    error: {},
    label: {
      type: String,
    },
    prependIcons: {},
    appendIcons: {},
  },
}
</script>

<style lang="scss">
.cInput {
  display: flex;
  flex-wrap: wrap;
  line-height: 2;
  width: 100%;
  font-size: 20px;
  &__label {
    padding: 5px;
    width: 100px;
  }
  &__wrap {
    flex: 1;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    padding: 5px;
  }
  &__input {
    border: none;
    background: none;
    outline: none;
    font-size: 100%;
    font-family: inherit;
    line-height: inherit;
    flex: 1;
    padding: 0;
    width: 100%;
    padding: 0 8px;
  }
  &__error {
    width: 100%;
  }
  &__pre-icon,
  &__append-icon {
    height: 1.5em;
    cursor: pointer;
  }
}

.cInput--focus {
  .cInput__wrap {
    border: 1px solid green;
  }
}
</style>