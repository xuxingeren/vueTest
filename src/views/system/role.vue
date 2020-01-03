<template>
  <div class="role">
    <div id="components-form-demo-advanced-search">
      <a-form
        class="ant-advanced-search-form"
        :form="form"
        @submit="handleSearch"
      >
        <a-row :gutter="24">
          <a-col
            v-for="i in 10"
            :key="i"
            :span="8"
            :style="{ display: i < count ? 'block' : 'none' }"
          >
            <a-form-item :label="`Field ${i}`">
              <a-input
                v-decorator="[
                `field-${i}`,
                {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                }
              ]"
                placeholder="placeholder"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col
            :span="24"
            :style="{ textAlign: 'right' }"
          >
            <a-button
              type="primary"
              html-type="submit"
            >
              搜索
            </a-button>
            <a-button
              :style="{ marginLeft: '8px' }"
              @click="handleReset"
            >
              重置
            </a-button>
            <a
              :style="{ marginLeft: '8px', fontSize: '12px' }"
              @click="toggle"
            >
              {{expand ? '收起' : '展开'}}
              <a-icon :type="expand ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-table
      :columns="columns"
      :dataSource="data"
      :position="'top'"
      :pagination="pagination"
      @change="change"
    >
      <a
        slot="name"
        slot-scope="text"
        href="javascript:;"
      >{{text}}</a>
      <span slot="customTitle">
        <a-icon type="smile-o" /> Name</span>
      <span
        slot="tags"
        slot-scope="tags"
      >
        <a-tag
          v-for="tag in tags"
          color="blue"
          :key="tag"
        >{{tag}}</a-tag>
      </span>
      <span
        slot="action"
        slot-scope="text, record"
      >
        <a href="javascript:;">Invite 一 {{record.name}}</a>
        <a-divider type="vertical" />
        <a href="javascript:;">Delete</a>
        <a-divider type="vertical" />
        <a
          href="javascript:;"
          class="ant-dropdown-link"
        >
          More actions
          <a-icon type="down" />
        </a>
      </span>
    </a-table>
    <router-link to="/system/role_details">222222222</router-link>
    <div
      class="aaa"
      v-exposure
      :data-article="article"
    >aaa</div>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.expand ? 11 : 7;
    }
  },
  data() {
    return {
      expand: false,
      form: this.$form.createForm(this),
      columns: [
        {
          dataIndex: "name",
          key: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" }
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age"
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address"
        },
        {
          title: "Tags",
          key: "tags",
          dataIndex: "tags",
          scopedSlots: { customRender: "tags" }
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "developer"]
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          tags: ["loser"]
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"]
        }
      ],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 100,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条数据`,
        pageSizeOptions: ["10", "20", "30", "40"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      },
      article: JSON.stringify({
        once: false,
        type: 0
      })
    };
  },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log("error", error);
        console.log("Received values of form: ", values);
      });
    },
    change(pagination) {
      this.pagination = pagination;
      console.log(this.pagination);
    },
    handleReset() {
      this.form.resetFields();
    },

    toggle() {
      this.expand = !this.expand;
    }
  }
};
</script>

<style lang="scss" scoped>
.role {
  height: 10000px;
  .aaa {
    margin-top: 800px;
  }
  .ant-advanced-search-form {
    padding: 20px;
    .ant-form-item {
      display: flex;
      ::v-deep .ant-form-item-control-wrapper {
        flex: 1;
      }
    }
  }
}
</style>