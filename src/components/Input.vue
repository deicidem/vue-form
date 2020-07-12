<template>
<div class="form-group" :class="isWrong">
  <label>{{ name }}</label>
  <span class="fa" :class="validClass" v-if="activated">
  </span>
  <input type="text" class="form-control" :value="value" @input="onInput">
</div>
</template>

<script>
export default {
  props: 
  {
    name: String,
    value: null,
    pattern: RegExp
  },
  data() {
    return {
      activated: this.value != ''
    }
  },
  computed: {
    isWrong(){
      return !this.isValid && this.activated ? 'animate__animated animate__headShake': '';
    },

    isValid() {
      return this.pattern.test(this.value);
    },
    validClass() {
      return this.isValid ?
        'fa-check-circle text-success' :
        'fa-exclamation-circle text-danger';
    }
  },
  mounted() {
    this.$emit('changeStatus', this.isValid);
  },
  methods: {
    onInput(e) {
      this.activated = true;

      this.$emit('update:value', e.target.value);
    }
  },
  watch: {
    isValid(){
      this.$emit('changeStatus', this.isValid);
    }
  }
}
</script>
