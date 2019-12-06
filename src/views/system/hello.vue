<template>
  <div>
    <a-button>close</a-button>
    <a-button>通知一下我的父窗口</a-button>
  </div>
</template>

<script>
import Worker from "@/utils/test.worker.js";
export default {
  name: "Hello",
  data() {
    return {
      list: [],
      value: ""
    };
  },
  mounted() {
    var worker = new Worker();
    worker.addEventListener("message", function(event) {
      console.log(event);
    });
    worker.postMessage({ a: 1 });
  },
  methods: {}
};
</script>
