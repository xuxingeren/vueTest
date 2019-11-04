<template>
  <div>
    <a-button @click="close">close</a-button>
    <a-button @click="notice">通知一下我的父窗口</a-button>
  </div>
</template>

<script>
export default {
  name: "Hello",
  data() {
    return {
      list: [],
      value: ""
    };
  },
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      window.addEventListener("message", function(e) {
        if (e.data.type === "postMessage") {
          console.log(e.data.text);
          console.log(e);
          _this.parent = e.source;
        }
      });
    });
  },
  methods: {
    close() {
      window.close();
    },
    notice() {
      this.parent.postMessage(
        {
          type: "postMessage",
          text: "给我刷新"
        },
        "http://localhost:8081/visibilitychange"
      );
    }
  }
};
</script>
