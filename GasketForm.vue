<template>
  <el-form @submit.prevent="onSubmit" :model="form" label-width="130px">
    <el-form-item label="Tên gasket:">
      <el-input v-model="form.name" required />
    </el-form-item>
    <el-form-item label="Đường kính ngoài:">
      <el-input-number v-model="form.outerRadius" min="1" required />
    </el-form-item>
    <el-form-item label="Đường kính trong:">
      <el-input-number v-model="form.innerRadius" min="1" required />
    </el-form-item>
    <el-form-item label="Số lỗ:">
      <el-input-number v-model="form.holeCount" min="0" required />
    </el-form-item>
    <el-form-item label="Bán kính lỗ:">
      <el-input-number v-model="form.holeRadius" min="1" required />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">Tạo & Xuất G-code</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, watch } from 'vue'
const emit = defineEmits(['create'])
const props = defineProps({ defaultParams: Object })
const form = reactive({
  name: '',
  outerRadius: 100,
  innerRadius: 50,
  holeCount: 4,
  holeRadius: 5
})

watch(
  () => props.defaultParams,
  (val) => {
    if (val) Object.assign(form, val)
  },
  { immediate: true }
)

function onSubmit() {
  emit('create', { ...form })
}
</script>