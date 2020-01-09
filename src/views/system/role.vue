<template>
  <div class="role">
    <div class="search-box">
      <a-input-group compact>
        <a-select
          @change="keyChange"
          v-model="activeKey"
          style="width:100px;"
        >
          <a-select-option value="uid">uid</a-select-option>
          <a-select-option value="name">用户名</a-select-option>
          <a-select-option value="phone">手机号</a-select-option>
        </a-select>
        <a-input
          @pressEnter="handleSearch"
          style="width: 300px;"
          v-model="form[activeKey]"
          allowClear
        />
      </a-input-group>
    </div>

    <div class="table">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        @change="change"
      >
        <span
          slot="name"
          slot-scope="text, record"
        >
          <router-link :to="`/system/role_details?uid=${record.uid}`">
            {{text}}
          </router-link>
        </span>
        <span
          slot="role"
          slot-scope="role"
        >
          <a-tag color="blue">{{role}}</a-tag>
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
    </div>
    <div
      class="aaa"
      v-exposure
      :data-article="article"
    >aaa</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expand: false,
      activeKey: "uid",
      form: {
        uid: "",
        name: "",
        phone: "",
        pageSize: 10,
        current: 1
      },
      columns: [
        {
          title: "uid",
          dataIndex: "uid",
          key: "uid"
        },
        {
          title: "用户名",
          dataIndex: "name",
          key: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "手机号",
          dataIndex: "phone",
          key: "phone"
        },
        {
          title: "昵称",
          dataIndex: "nickName",
          key: "nickName"
        },
        {
          title: "角色",
          dataIndex: "role",
          key: "role",
          scopedSlots: { customRender: "role" }
        }
      ],
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          role: "role"
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          role: "role"
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          role: "role"
        }
      ],
      pagination: {
        // style: { color: "red" },
        current: 1,
        pageSize: 10,
        total: 100,
        showSizeChanger: true,
        showQuickJumper: true,
        position: "bottom",
        showTotal: total => `共 ${total} 条数据`,
        pageSizeOptions: ["10", "20", "30", "40"],
        onShowSizeChange: (current, pageSize) => {
          this.pagination.current = 1;
          this.pagination.pageSize = pageSize;
        },
        onChange: (current, pageSize) => {
          this.pagination.current = current;
          this.pagination.pageSize = pageSize;
        }
      },
      article: JSON.stringify({
        once: false,
        type: 0
      })
    };
  },
  methods: {
    handleSearch() {
      console.log(this.form);
    },
    change() {
      this.form = {
        ...this.form,
        current: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      this.handleSearch();
    },
    keyChange() {
      this.form = {
        uid: "",
        name: "",
        phone: "",
        pageSize: 10,
        current: 1
      };
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
  .search-box {
    padding: 20px;
  }
  .table {
    padding: 0px 20px;
  }
}
</style>