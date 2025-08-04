<template>
  <el-dialog v-model="show" title="Đăng nhập/Đăng ký" width="350px" @close="$emit('close')">
    <el-form @submit.prevent="onLogin">
      <el-form-item>
        <el-input v-model="username" placeholder="Tên đăng nhập" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="password" type="password" placeholder="Mật khẩu" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Đăng nhập</el-button>
        <el-button @click="onRegister">Đăng ký</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['close'])

const username = ref('')
const password = ref('')
const show = ref(true)

watchEffect(() => { if (!show.value) emit('close') })

async function onLogin() {
  try {
    const { data } = await axios.post('http://localhost:3001/api/auth/login', { username: username.value, password: password.value })
    localStorage.setItem('token', data.token)
    ElMessage.success('Đăng nhập thành công!')
    show.value = false
    window.location.reload()
  } catch (e) {
    ElMessage.error('Sai thông tin đăng nhập')
  }
}
async function onRegister() {
  try {
    await axios.post('http://localhost:3001/api/auth/register', { username: username.value, password: password.value })
    ElMessage.success('Đăng ký thành công! Mời đăng nhập.')
  } catch (e) {
    ElMessage.error('Đăng ký thất bại')
  }
}
</script>