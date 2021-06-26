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
          <label for="username">用户名</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-if="menuTab[1].current">
          <label for="passwords">重复密码</label>
          <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label for="code">验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input id="code" v-model="ruleForm.code" minlangth="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="handleGetSms()">
                获取验证码
                <span v-if="true"></span>
                </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" :disabled="loginButtonState" class="block" @click="submitForm('ruleForm')">{{menuTab[0].current ? '登录' : '注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getSms } from '@/api/login.js'
import { stripscript, validateEmail, validatePass, validateVCode } from '@/utils/validate.js'
import { reactive, ref, isRef, toRefs, onMounted } from '@vue/composition-api'
export default {
  name: 'login',
  setup(props, { refs, root }) {
    onMounted(() => {
      
    })
    // 获取验证码
    const handleGetSms = (async () => {
      if (ruleForm.username === '') {
        root.$message.error('用户名不能为空')
        return
      }
      if (!validateEmail(ruleForm.username)) {
        root.$message.error('用户名格式错误，请重新输入')
        return
      }
      // refs.loginButtonState = false
      let requestData = {
        username: ruleForm.username,
        module:"login"
      }
      let data = await getSms(requestData)
      root.$message.success(data.message)
    })
    let validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (!validateVCode(value)) {
        callback(new Error('验证码格式错误'));
      } else {
        callback()
      }
    };
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!validateEmail(value)) {
        callback(new Error('用户名格式错误'));
      } else {
        callback()
      }
    };
    let validatePassword = (rule, value, callback) => {
      // 过滤特殊字符
      value = ruleForm.password = stripscript(value)
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!validatePass(value)) {
        callback(new Error('密码格式错误'));
      } else {
        callback();
      }
    };
    let validatePasswords = (rule, value, callback) => {
      // 过滤特殊字符
      value = ruleForm.passwords = stripscript(value)
      if (value === '') {
        callback(new Error('请再次输入密码'));
      }else if (value !== ruleForm.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    };
    // 这里放置data数据，生命周期，自定义的函数
    const menuTab = reactive([
      {txt: '登录', current: true},
      {txt: '注册', current: false}
    ])
    const ruleForm = reactive({
      username: '',
      password: '',
      passwords: '',
      code: ''
    })
    const rules = reactive({
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
    }) 
    const toggleMenu = ((data) => {
      menuTab.forEach(item => item.current = false)
      data.current = true
    })
    const submitForm = ((formName) => {
      refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    })
    // 登录按钮状态
    const loginButtonState = ref(true)
    return {
      menuTab,
      ruleForm,
      toggleMenu,
      submitForm,
      rules,
      handleGetSms,
      loginButtonState
    }
  },
}
</script>

<style lang="scss" scoped>
  #login {
    height: 100vh;
    background-color: #3445af;
    .login-wrap {
      width: 330px;
      margin: auto;
      overflow: hidden;
      .menu-tab {
        margin-top: 100px;
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