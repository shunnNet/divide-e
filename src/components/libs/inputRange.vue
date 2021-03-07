<template>
<!-- 不夠用 改用 slot 可能比較好 -->
  <div>
    <input
      :type="type"
      v-bind="{...inputAttrs, ...input1Attrs}"
      v-on="{...inputEvent, ...input1Event}"
      v-model="min"
      @input="$emit('input', [min, max])"
    />
    ~
    <input
      :type="type"
      v-bind="{...inputAttrs, ...input2Attrs}"
      v-on="{...inputEvent, ...input2Event}"
      v-model="max"
      @input="$emit('input', [min, max])"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: () => "text",
    },
    value: {
      type: Array,
      default: () => ["", ""],
    },
    inputAttrs: {
      type: Object,
      default:() => ({})
    },
    inputEvent: {
      type: Object,
      default:() => ({})
    },
    input1Attrs: {
      type: Object,
      default:() => ({})
    },
    input1Event: {
      type: Object,
      default:() => ({})
    },
    input2Attrs: {
      type: Object,
      default:() => ({})
    },
    input2Event: {
      type: Object,
      default:() => ({})
    }
  },
  data() {
    return {
      min: this.value[0],
      max: this.value[1],
    };
  },
};
</script>
