<template>
  <div>
    <a-button @click="openTargt">open visibilitychange</a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    let _this = this;
    document.addEventListener("visibilitychange", function() {
      if (document.visibilityState === "hidden") {
        // 页面不可见;
        console.log("hidden");
      }
      if (document.visibilityState === "visible") {
        // 页面可见;
        console.log("visible");
        setTimeout(() => {
          if (_this.openWindow && _this.openWindow.closed) {
            alert("关闭啦");
            _this.openWindow = null;
          }
        }, 2000);
      }
    });
    this.$nextTick(() => {
      window.addEventListener("message", function(e) {
        if (e.data.type === "postMessage") {
          console.log(e.data.text);
        }
      });
    });
  },
  methods: {
    openTargt() {
      this.openWindow = window.open("/Hello");
      setTimeout(() => {
        this.openWindow.postMessage(
          {
            type: "postMessage",
            text: "asdfasdfasdfasdfasdzvzx"
          },
          "http://localhost:8081/Hello"
        );
      }, 4000);
    }
  }
};
</script>
