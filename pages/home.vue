<template>
  <div class="smch2">
    <div class="nav1">
      <div class="s">
        <el-select
          class="filter"
          v-model="queryParams.tag"
          filterable
          @change="getLogs"
          placeholder="Filter By Tags"
        >
          <el-option
            v-for="item in tags"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>

      <div class="block">
        <div>
          <el-date-picker
            v-model="queryParams.from"
            type="date"
            placeholder="From Date"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <br />
        <!-- <p>to</p> -->
        <div>
          <el-date-picker
            v-model="queryParams.to"
            type="date"
            placeholder="To Date"
            :picker-options="pickerOptions"
            @change="getLogs"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-input
          type="search"
          placeholder="Search Logs"
          v-model="queryParams.title"
          @change="getLogs"
        ></el-input>
      </div>
      <!-- <div style="margin-top: 15px">
        <el-input
          placeholder="Please input"
          v-model="input3"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div> -->

      <div>
        <el-button type="submit" @click="addTag"
          ><nuxt-link to="/all">All Users</nuxt-link></el-button
        >
      </div>
      <div>
        <el-button type="submit"
          ><nuxt-link to="/">Logout</nuxt-link></el-button
        >
      </div>
    </div>
    <br />

    <el-button
      type="danger"
      icon="el-icon-delete"
      circle
      @click="deleteLogs"
      v-if="this.selectedLogs.length > 0"
    ></el-button>
    <!-- <el-button size="mini" type="success" icon="el-icon-view"></el-button> -->

    <br />
    <el-table
      ref="selectedData"
      :data="logs"
      @row-click="rowClick"
      style="width: 80%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <!-- <el-table-column
      label="Date"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column> -->
      <el-table-column prop="id" label="Id" width="120"> </el-table-column>
      <el-table-column prop="title" label="Title" width="120">
      </el-table-column>
      <el-table-column prop="description" label="Description" width="120">
      </el-table-column>
      <el-table-column
        prop="stack_trace"
        label="StackTrace"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column>
        <el-button size="mini" icon="el-icon-view" v-if="true" @click="unseen()"
          >Unseen</el-button
        >
        <el-button size="mini" icon="el-icon-view" v-if="false" @click="seen()"
          >Seen</el-button
        >
      </el-table-column>
    </el-table>
  </div>
  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">Toggle selection status of second and third rows</el-button>
    <el-button @click="toggleSelection()">Clear selection</el-button>
  </div> -->
</template>

<script>
// import { title } from 'process'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      selectedLogs: [],
      queryParams: {
        page: 1,
        limit: 20,
        title: '',
        from: '',
        to: '',
        tag: '',
      },
      multipleSelection: [],
      pickerOptions: {
        shortcuts: [
          {
            text: 'Last week',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: 'Last month',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: 'Last 3 months',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
    }
  },

  computed: {
    ...mapState(['logs', 'log', 'tags']),
  },

  // async fetch() {
  //   await this.getAllLogs()
  // },

  async mounted() {
    await this.$store.dispatch('getAllLogs', this.queryParams)
    await this.$store.dispatch('getTags')
    return
  },

  methods: {
    async getLogs() {
      await this.$store.dispatch('getAllLogs')
    },
    async rowClick(row, column, event) {
      alert(row.id)
      await this.$store.dispatch('goToLog', row.id)
      await this.$router.push('/' + row.id)
    },
    async getLogs() {
      console.log(this.queryParams)
      await this.$store.dispatch('getAllLogs', this.queryParams)
    },

    async deleteLogs() {
      this.selectedLogs.forEach((row) =>
        this.$store.dispatch('deleteLog', row.id)
      )
    },
    handleSelectionChange(val) {
      this.selectedLogs = val
    },

    async deleteLog(id, row) {
      console.log(' STOP 1 ' + id)
      await this.$store.dispatch('deleteLog', id)
      // await this.$store.dispatch('getAllLogs')
      this.$router.push('/SuperUserLoghome')
    },
    getTags() {
      alert()
      this.$store.dispatch('getTags')
    },
    async unseen(data) {
      await this.$store.dispatch('unseen', data)
      this.$router.push('/home')
    },

    // async goToLog(id) {
    // console.log(id)
    // await this.$store.dispatch('goToLog', id)
    // await this.$router.push('/SingleLog')
    // },

    // async refreshData(): Promise<void> {
    //   let success = await this.getList()
    //   if (success)
    //     this.$message({
    //       message: 'Data reloaded',
    //       duration: 3000,
    //       showClose: true,
    //     })
    // },
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach((row) => {
    //       this.$refs.multipleTable.toggleRowSelection(row)
    //     })
    //   } else {
    //     this.$refs.multipleTable.clearSelection()
    //   }
    // },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val
    // },
  },
}
</script>
<style scoped>
.smch2 {
  margin: 30px;
}
.s {
  display: flex;
}
.nav1 {
  display: flex;
  justify-content: space-between;
}
.block {
  display: flex;
}
.b {
  display: flex;
}
.s {
  margin-left: -20px;
}
</style>
