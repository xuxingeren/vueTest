<template>
  <div class="login">
    <a-card
      :hoverable="true"
      :tabList="tabListNoTitle"
      :activeTabKey="activeTitleKey"
      @tabChange="key => onTabChange(key)"
    >
      <div class="loginBox">
        <a-form
          :form="form"
          v-if="activeTitleKey === 'login'"
        >
          <a-form-item>
            <a-input
              placeholder="请输入手机号"
              type="text"
              allowClear
              ref="userInput"
              v-decorator="[
                  'user',
                  options.user
                ]"
              size="large"
            >
              <a-icon
                slot="prefix"
                type="user"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password
              v-decorator="[
                  'password',
                  options.password
                ]"
              allowClear
              size="large"
              placeholder="请输入密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
              />
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-checkbox
              :checked="remember"
              @change="onChange"
            >
              记住密码
            </a-checkbox>
            <!-- <a
              class="login-forgot"
              href=""
            >
              忘记密码
            </a> -->
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="login-button"
              size="large"
              @click="sub"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
        <a-form
          :form="form"
          v-else
        >
          <a-form-item>
            <a-input
              placeholder="请输入账号"
              type="text"
              ref="userInput"
              v-decorator="[
                  'user',
                  options.user
                ]"
              allowClear
              size="large"
            >
              <a-icon
                slot="prefix"
                type="user"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password
              v-decorator="[
                  'password',
                  options.password
                ]"
              allowClear
              size="large"
              placeholder="请输入密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
              />
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-input-password
              v-decorator="[
                  'againpass',
                  options.againpass
                ]"
              allowClear
              size="large"
              placeholder="请再次输入密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
              />
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="login-button"
              size="large"
              @click="register"
            >
              注册
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script>
import api from "@/api";
import { encryptByDES, decryptByDES } from "@/utils/encryption";
import { setCookie, getCookit, removeCookit } from "@/utils/cookie";

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      remember: false,
      isShowPass: false,
      tabListNoTitle: [
        {
          key: "login",
          tab: "登录"
        },
        {
          key: "register",
          tab: "注册"
        }
      ],
      activeTitleKey: "login",
      options: {
        user: {
          validateTrigger: ["blur"],
          rules: [
            {
              required: true,
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error("请输入手机号"));
                }
                if (!/^1(3|4|5|6|7|8|9)\d{9}$/.exec(value)) {
                  callback(new Error("请输入正确手机号"));
                }
                callback();
              }
            }
          ]
        },
        password: {
          validateTrigger: ["blur"],
          rules: [
            {
              required: true,
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error("请输入密码"));
                }
                if (
                  !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.exec(value)
                ) {
                  callback(
                    new Error("密码同时含有数字和字母，且长度要在8-16位之间")
                  );
                }
                callback();
              }
            }
          ]
        },
        againpass: {
          validateTrigger: ["blur"],
          rules: [
            {
              required: true,
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error("请输入密码"));
                }
                if (
                  value !== this.form.getFieldValue("password") &&
                  this.form.getFieldValue("password")
                ) {
                  callback(new Error("两次密码不一致"));
                }
                callback();
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.$store.dispatch("logOut");
    if (getCookit("rememberUser")) {
      this.form.setFieldsValue({
        user: decryptByDES(getCookit("rememberUser")) || "",
        password: decryptByDES(getCookit("rememberPassword")) || ""
      });
      this.remember = true;
    } else {
      this.remember = false;
    }
  },
  methods: {
    onTabChange(key) {
      this.activeTitleKey = key;
    },
    onChange(e) {
      this.remember = e.target.checked;
    },
    register() {
      this.form.validateFields(
        ["user", "password", "againpass"],
        { force: true },
        (err, values) => {
          if (!err) {
            api("register", {
              user: values.user,
              password: encryptByDES(values.password)
            }).then(res => {
              this.$message.success("注册成功");
              this.onTabChange("login");
              console.log(res);
            });
          }
        }
      );
    },
    sub() {
      this.form.validateFields(
        ["user", "password"],
        { force: true },
        (err, values) => {
          if (!err) {
            api("login", {
              user: values.user,
              password: encryptByDES(values.password)
            }).then(res => {
              if (this.remember) {
                setCookie(
                  "rememberUser",
                  encryptByDES(values.user),
                  Date.now() + 24 * 7 * 60 * 60 * 1000
                );
                setCookie(
                  "rememberPassword",
                  encryptByDES(values.password),
                  Date.now() + 24 * 7 * 60 * 60 * 1000
                );
              } else {
                removeCookit("rememberUser");
                removeCookit("rememberPassword");
              }
              this.$message.success("登录成功");
              this.$router.push({
                path: "/"
              });
              console.log(res);
            });
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;
  .login-button {
    width: 100%;
  }
  .login-forgot {
    float: right;
  }
}
</style>
