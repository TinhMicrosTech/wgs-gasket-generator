<template>
  <el-menu @select="onSelectStandard" style="height:100vh;">
    <el-menu-item
      v-for="std in standards"
      :key="std.code"
      :index="std.code"
    >{{ std.name }}</el-menu-item>
    <el-menu-item index="custom">Tùy chọn tự do</el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const emit = defineEmits(['selectStandard'])
const standards = ref([])

onMounted(async () => {
  const { data } = await axios.get('http://localhost:3001/api/standards')
  standards.value = data
})

function onSelectStandard(code) {
  const std = standards.value.find(s => s.code === code)
  emit('selectStandard', std ? std.params : null)
}
</script>