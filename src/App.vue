<template>
<div class="wrapper">
  <div class="sample">
    <transition 
    appear 
    enter-active-class="animate__animated animate__fadeIn" 
    leave-active-class="animate__animated animate__fadeOut" 
    mode="out-in">
      <form @submit.prevent="send" v-if="!formSubmited">
        <div class="progress">
          <div class="progress-bar" :style="progressWidth"></div>
        </div>
        <div>
          <app-input v-for="(item, index) in  info" :name="item.name" :value.sync="item.value" :pattern="item.pattern" :key="index" @changeStatus="changeStatus({index, status: $event})">
          </app-input>
        </div>
        <button class="btn btn-primary" :disabled="btnDisabled" >
         {{buttonText}}
        </button>
      </form>
      <div v-else> 
        <app-table  :info="info"></app-table>
        <div class="alert alert-success"> Hello, {{info[0].value}}!</div>
      </div>
      
    </transition>
  </div>
</div>
</template>

<script>
import AppInput from './components/Input'
import AppTable from './components/Table'

import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex';

export default {
  components: {
    AppInput,
    AppTable
  },
  methods: {
    ...mapMutations(['changeStatus']),
    ...mapActions(['send']),
  },
  computed: {
    ...mapGetters(['info', 'globalStatus']),
    progressWidth() {
      return {
        width: (this.done / this.info.length * 100) + '%'
      }
    },
    btnDisabled(){
      return this.done < this.info.length || this.globalStatus !== null;
    },
    formSubmited() {
      return this.globalStatus == 'done';
    },
    done(){
        let done = 0;
        for (let i = 0; i < this.info.length; i++) {
          if (this.info[i].status) {
            done++;
          }
        }
        return done;
    },
    buttonText(){
      if (this.globalStatus == 'loading') {
        return 'Loading...'
      }
      return 'Send Data';
    }
  }
}
</script>
