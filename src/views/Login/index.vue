<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{'current': item.current}"
            v-for="(item,index) of menuTab"
            :key="index"
            @click="toggleMenu(item)"
            >{{ item.txt }}</li>
      </ul>
      <!-- 表单验证 -->
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               class="login-form"
               size="medium">
        <el-form-item prop="username" class="item-form">
          <label for="">用户名</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="">密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-if="menuTab[1].current">
          <label for="">重复密码</label>
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label for="">验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" minlangth="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="block" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { stripscript, validateEmail, validatePass, validateVCode } from '@/utils/validate.js'
export default {
  name: 'login',
  data() {
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (!validateVCode(value)) {
        callback(new Error('验证码格式错误'));
      } else {
        callback()
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!validateEmail(value)) {
        callback(new Error('用户名格式错误'));
      } else {
        callback()
      }
    };
    var validatePassword = (rule, value, callback) => {
      // 过滤特殊字符
      value = this.ruleForm.password = stripscript(value)
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!validatePass(value)) {
        callback(new Error('密码格式错误'));
      } else {
        callback();
      }
    };
    var validatePasswords = (rule, value, callback) => {
      // 过滤特殊字符
      value = this.ruleForm.passwords = stripscript(value)
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
      if (value === '') {
        callback(new Error('请再次输入密码'));
      }else if (value !== this.ruleForm.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    };
    return {
      menuTab: [
        {txt: '登录', current: true},
        {txt: '注册', current: false}
      ],
      ruleForm: {
        username: '',
        password: '',
        passwords: '',
        code: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwords: [
          { validator: validatePasswords, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach(item => item.current = false)
      data.current = true
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  #login {
    height: 100vh;
    background-color: #3445af;
    .login-wrap {
      width: 330px;
      margin: auto;
      padding: 100px;
      .menu-tab {
        text-align: center;
        li {
          display: inline-block;
          width: 88px;
          line-height: 36px;
          color: white;
          font-size: 14px;
          border-radius: 2px;
          cursor: pointer;
        }
        .current {
          background-color: rgba(0,0,0,.1);
        }
      }
      .login-form {
        margin-top: 29px;
        label {
          display: block;
          font-size: 14px;
          color: white;
        }
        .block {
          width: 100%;
          display: block;
        }
      }
    }
  }
</style>