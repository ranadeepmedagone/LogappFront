<template>
  <div class="smch">
    <div class="nav">
      <el-button @click="$router.back()" icon="el-icon-back" plain></el-button>

      <el-button type="submit" @click="goToCreate()">Create</el-button>
    </div>
    <br />
    <br />

    <el-table ref="multipleTable" :data="users" style="width: 100%">
      <el-table-column label="Icon">
        <i class="el-icon-user-solid"></i>
      </el-table-column>
      <el-table-column prop="id" label="UserId" width="120"> </el-table-column>

      <el-table-column prop="name" label="Name" width="120"> </el-table-column>

      <el-table-column prop="email" label="Email" show-overflow-tooltip>
      </el-table-column>
      <template v-if="update">
        <el-table-column
          v-if="isVisible"
          prop="status"
          label="Status"
          v-bind="status"
        >
          <template slot-scope="scope" v-bind="status">
            <el-input-number :min="0" size="small" controls-position="right" />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          prop="status"
          label="Status"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column v-if="!isVisible" label="Edit">
          <el-button @click="Visible" icon="el-icon-edit"> </el-button>
        </el-table-column>
        <el-table-column v-else>
          <el-button type="success" @click="update" icon="el-icon-check">
          </el-button>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
// import { title } from 'process'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      search: '',
      isVisible: false,
      name: '',
      email: '',
      status: '',
    }
  },

  computed: {
    ...mapState(['users', 'user']),
  },

  async mounted() {
    await this.$store.dispatch('getAllUsers')

    return
  },

  methods: {
    Visible() {
      this.isVisible = !this.isVisible
      this.status = this.user.status
    },
    async update() {
      // this.isVisible = false
      console.log(this.status)
      await this.$store.dispatch('updateUser', {
        status: this.status,
        id: this.$route.params.id,
      })
      this.$store.dispatch('goToUser', this.$route.params.id)
    },
    // async goToUpdate() {
    //   await this.$router.push('/UpdateUser')
    // },
    async goToCreate() {
      await this.$router.push('/CreateUserLog')
    },
    // async deleteUser(id, row) {
    //   console.log('reached')
    //   await this.$store.dispatch('deleteUser', id)
    //   console.log('reached1')
    //   this.$router.push('/AllUsers')
    //   console.log('reached3')
    //   await this.$store.dispatch('getAllUsers')
    // },
  },
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
}
.select {
  display: flex;
  justify-content: space-between;
}
.smch {
  margin: 30px;
}
.btn {
  display: flex;
}
/* .title{
 font-weight: bold;
} */
</style>
