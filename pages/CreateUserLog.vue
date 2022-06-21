<template>
  <el-row :gutter="20">
    <el-col :span="10" :offset="6"
      ><div class="grid-content bg-purple">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="name" prop="name">
            <el-input
              type="text"
              v-model="ruleForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="Email" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="IsSuperUser" prop="is_superuser">
            <el-input v-model="ruleForm.is_superuser"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="CreateUser()">Submit</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </div></el-col
    >
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        email: '',
        password: '',
        // is_superuser: '',
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    async CreateUser() {
      console.log(this.ruleForm.name)
      console.log(this.ruleForm.email)
      console.log(this.ruleForm.password)
      // console.log(this.ruleForm.is_superuser)
      await this.$store.dispatch('createUser', this.ruleForm)
      await this.$router.push({ path: '/all' })
    },
  },
}
</script>

<style scoped>
.grid-content {
  margin-top: 100px;
}
</style>
