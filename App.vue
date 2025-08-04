<template>
  <el-container>
    <el-aside width="220px">
      <StandardSidebar @selectStandard="onSelectStandard" />
    </el-aside>
    <el-container>
      <el-header>
        <el-button v-if="!isLoggedIn" @click="showLogin = true">Đăng nhập</el-button>
        <span v-else>
          Xin chào, {{ username }}
          <el-button @click="logout" size="small">Đăng xuất</el-button>
        </span>
      </el-header>
      <el-main>
        <LoginView v-if="showLogin" @close="showLogin = false" />
        <div v-else>
          <GasketForm
            :defaultParams="selectedStandard"
            @create="onCreate"
          />
          <GasketDesigner :params="params" v-if="params" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import StandardSidebar from './components/StandardSidebar.vue'
import GasketForm from './components/GasketForm.vue'
import GasketDesigner from './components/GasketDesigner.vue'
import LoginView from './views/LoginView.vue'

const params = ref(null)
const selectedStandard = ref(null)
const showLogin = ref(false)
const isLoggedIn = computed(() => !!localStorage.getItem('token'))
const username = computed(() => {
  const token = localStorage.getItem('token')
  if (!token) return ''
  try {
    return JSON.parse(atob(token.split('.')[1])).username
  } catch { return '' }
})

function onSelectStandard(standardParams) {
  selectedStandard.value = standardParams
}
function logout() {
  localStorage.removeItem('token')
  window.location.reload()
}
async function onCreate(val) {
  params.value = val
  // Tạo SVG string
  const svg = generateSVG(val)
  // Gửi lên backend và nhận file G-code
  const axios = (await import('axios')).default
  const res = await axios.post('http://localhost:3001/api/gasket/generate', {
    name: val.name,
    svg,
    params: val
  }, { responseType: 'blob' })
  // Tải file về
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'gasket.nc')
  document.body.appendChild(link)
  link.click()
  link.remove()
}
function generateSVG(p) {
  const center = 200
  let svg = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">`
  svg += `<circle cx="${center}" cy="${center}" r="${p.outerRadius}" fill="none" stroke="black"/>`
  svg += `<circle cx="${center}" cy="${center}" r="${p.innerRadius}" fill="none" stroke="red"/>`
  const holes = []
  const angleStep = (2 * Math.PI) / p.holeCount
  const r = (p.outerRadius + p.innerRadius) / 2
  for (let i = 0; i < p.holeCount; ++i) {
    const angle = i * angleStep
    holes.push(
      `<circle cx="${center + r * Math.cos(angle)}" cy="${center + r * Math.sin(angle)}" r="${p.holeRadius}" fill="blue"/>`
    )
  }
  svg += holes.join('')
  svg += `</svg>`
  return svg
}
</script>