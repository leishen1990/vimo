<template>
  <div class="ion-modal">
    <transition
      name="modal"
      v-on:before-enter="_beforeEnter"
      v-on:after-enter="_afterEnter"
      v-on:before-leave="_beforeLeave"
      v-on:after-leave="_afterLeave">
      <div class="modal-wrapper" v-show="isActive">
        <!--用户自定义的port位置-->
        <div class="modalPageLoadPort"></div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'Modal',
    data(){
      return {
        enabled: false,
        bdDismiss: false,
        isActive: false,

        // promise
        presentCallback: null,
        dismissCallback: null,
      }
    },
    methods: {
      /**
       * Animate Hooks
       * */
      _beforeEnter () {
        this.enabled = false; // 不允许过渡中途操作
        this.$setEnabled(false, 400)
      },
      _afterEnter (el) {
        this.enabled = true;
        this.presentCallback(el);
      },
      _beforeLeave () {
        this.enabled = false;
        this.$setEnabled(false, 400)
      },
      _afterLeave (el) {
        this.enabled = true;
        this.dismissCallback(el);
        // 删除DOM
        this.$el.remove();
      },

      /**
       * 开启关闭值操作当前的组件
       * */
      _present(){
        const _this = this;
        _this.isActive = true;
        _this.$backdrop.present();
        return new Promise((resolve) => {this.presentCallback = resolve})
      },
      _dismiss(){
        this.isActive = false;
        this.$backdrop.dismiss();
        return new Promise((resolve) => {this.dismissCallback = resolve})
      },
    }
  }
</script>
<style lang="scss">
  @import "./modal";
  @import "./modal.ios";
  @import "./modal.md";
  @import "./modal.wp";
  // transition
  @import "../../transitions/modal";
</style>
