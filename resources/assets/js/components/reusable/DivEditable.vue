<template>
  <div
    ref="editable"
    :contenteditable="enabled"
    v-on="listeners"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    enabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    listeners() {
      return { ...this.$listeners, input: this.onInput };
    }
  },
  mounted() {
    this.$refs.editable.innerText = this.value;
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.innerText);
    }    
  },
};
</script>