<template>
  <div class="smch3">
    <!-- ------- Action Buttons ------- -->
    <div class="nav">
      <el-button @click="$router.back()" icon="el-icon-back" plain></el-button>
      <p class="title">Title :{{ log.title }}</p>

      <div>
        <el-row>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="setEditMode"
            v-if="!editMode"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-check"
            v-if="editMode"
            @click="updateLog"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-delete"
            @click="logDelete"
          ></el-button>
        </el-row>
        <!-- <el-button
          v-if="log.partiallly_deleted == true"
          size="mini"
          @click="restoreUser()"
          >Deleted</el-button
        > -->
      </div>
    </div>
    <br />
    <br />
    <div class="createPost-container container">
      <div>
        <h1>Description:</h1>
        <el-input
          v-if="editMode"
          v-model="description"
          type="textarea"
          :rows="2"
          placeholder="Please input"
        ></el-input>
        <el-p v-else>{{ log.description }}</el-p>
        <br />
        <br />
        <!-- <el-button type="primary" v-if="!isVisible" @click="Visible"
          >Update</el-button
        >
        <el-button type="primary" v-else @click="update">Submit</el-button> -->
      </div>
      <br />
      <h1>StackTrace:</h1>
      <p>{{ log.stack_trace }}</p>
      <br />
      <br />
      <h1>Tags:</h1>
      <p>
        Tag :<span>{{ log.tag_name }} </span>
      </p>
      <p>
        Tag Type :<span>{{ log.tag_type }} </span>
      </p>
    </div>
    <br />

    <div class="fill">
      <div class="add-tag">
        <el-select v-model="tag" placeholder="Select Tags">
          <el-option
            v-for="item in tags"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="type">
        <el-select
          v-model="types"
          filterable
          allow-create
          default-first-option
          placeholder="Choose tag types"
        >
          <el-option
            v-for="item in tagTypes"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
// import Sticky from '@/components/UI/Sticky'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      editMode: false,
      textarea: '',
      description: '',
      // isVisible: false,
      tag: '',
      types: [],
      options: [],
      value1: [],
      value2: [],
    }
  },
  async mounted() {
    await this.$store.dispatch('getTagTypes')
    // await this.$store.dispatch('getTags')
    return
  },

  methods: {
    created() {
      this.$store.dispatch('goToLog')
    },
    setEditMode() {
      this.editMode = true
      this.description = this.log.description
    },
    async updateLog() {
      this.isVisible = false
      console.log(this.description)
      await this.$store.dispatch('updateDescription', {
        description: this.description,
        id: this.$route.params.id,
      })
      //   this.$router.push('/_id')
      this.$store.commit('updateDescription', this.description)
    },

    logDelete() {
      this.$store.dispatch('deleteLog', this.$route.params.id)
      this.$router.push('/SuperUserLoghome')
    },
  },
  computed: {
    ...mapState(['log', 'tags', 'tagTypes']),
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
.title {
  font-weight: bold;
}
.smch3 {
  margin: 30px;
}
.tag {
  display: flex;
}
.fill {
  display: flex;
}
</style>
