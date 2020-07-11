<template>
<div class="wrapper">
  <div class="sample">
    <transition appear enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" mode="out-in">
    <form @submit.prevent="formSubmited = true" v-if="!formSubmited">
      <div class="progress">
        <div class="progress-bar" :style="progressWidth"></div>
      </div>
      <div>
        <app-input v-for="(item, index) in  info" :name="item.name" :value.sync="item.value" :pattern="item.pattern" :key="index" @changeStatus="onChangeData(index, $event)">
        </app-input>
      </div>
      <button class="btn btn-primary" :disabled="done < info.length">
        Send Data
      </button>
    </form>
    <div v-else>
      <table class="table table-bordered">
        <tbody>
          <tr v-for="(item, index) in  info" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </transition>
  </div>
</div>
</template>
<style >
  .abs {
    position: absolute;
    width: 100%;
  }
  .sample {
    position: relative;
  }
</style>
<script>
import AppInput from './components/Input'

export default {
  components: {
    AppInput
  },
  data() {
    return {
      info: [{
        name: 'Name',
        value: '',
        pattern: /^[a-zA-Z ]{2,30}$/
      }, {
        name: 'Phone',
        value: '',
        pattern: /^[0-9]{7,14}$/
      }, {
        name: 'Email',
        value: '',
        pattern: /.+/
      }, {
        name: 'Some Field 1',
        value: '',
        pattern: /.+/
      }, {
        name: 'Some Field 2',
        value: '',
        pattern: /.+/
      }],
      controls: [],
      done: 0,
      formSubmited: false
    }
  },
  created() {
    for (let i = 0; i < this.info.length; i++) {
      this.controls.push(false);
    }
  },
  methods: {
    onChangeData(index, status) {
      this.controls[index] = status;

      let done = 0;

      for (let i = 0; i < this.controls.length; i++) {
        if (this.controls[i]) {
          done++;
        }
      }

      this.done = done;
    }
  },
  computed: {
    progressWidth() {
      return {
        width: (this.done / this.info.length * 100) + '%'
      }
    }
  }
}
</script>
