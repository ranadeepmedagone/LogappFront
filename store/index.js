const state = () => ({
    token: null,
    id: null,
    is_superuser: null,
    email: null,
    name:null,
    logs: [],
    tags:[],
    tagTypes:[],
    users:[],
    status:[],
    // current_tags: [],
    log: [],
    // tag:[],
    user:[],
    status:[],
    errorMsg: null,
    
    title: null,
    description:null,
    stack_trace: null,
    is_seen: null,
    

})

const getters = {}

const mutations = {
    Login(state, data) {
        state.token = data.token
    state.id = data.id
    state.name = data.name
    state.email = data.email
    state.issuperuser = data.is_superuser
    },
    allLogs(state, data) {
        state.logs = data;
        console.log(state.Logs);
    },
    allUsers(state, data) {
        state.users = data;
        console.log(state.users);
    },
    setLog(state, data) {
        state.log = data;
        state.description = data.description,
        state.title = data.title,
        state.stack_trace = data.stack_trace

    },
    setUser(state, data) {
        state.user = data;
    },
    
    CreateUser(state, data) {
           state.CreateUser = data;
    },
    
    // updatePost(state, data) {
    //     state.post.title = data;
    // },
    
    setError(state, data) {
        state.errorMsg = data
    },
    updateDes(state, data) {
        state.Description = data
      },

    updateDescription(state, data) {
        state.description = data;
        console.log(state.description)

    },
    updateLog(state, data) {
        console.log(data.description)
        state.description = data.description
      },
      updateUser(state, data) {
        console.log(data.status)
        state.status = data.status
      },

      unseen(state, id) {
        console.log(data.status)
        state.is_seen = data.is_seen
      },
    //   updateUser(state, data) {
    //     const index = state.users.findIndex((user) => user.id === user.id)
    //     state.users[index].title = data.title
    //   },
    // updateUser(state,data) {
    //     const index = state.users.findIndex((user) => user.id === user.id)
    //     state.users[index].status = data.status
    // },
    deleteLog(state, id){
        if (!state.list) return 
        let index = state.list.findIndex((x) => x.id ==id)
        if (index != -1) state.list.splice(index, 1)
    },
    deleteUser(state, id){
        if (!state.list) return 
        let index = state.list.findIndex((x) => x.id ==id)
        if (index != -1) state.list.splice(index, 1)
    },
    
    


    
    // allTags(state, data) {
    //     state.tags = data;
    //     console.log(state.Logs);
    // },
    setTags(state, data) {
        state.tags = data;
    },
    setTagTypes(state, data) {
        state.tagTypes = data
      },
    // byIdTags(state, data) {
    //     state.tags = data;
    //     console.log(state.tags);
    // },

    


}

const actions = {

    async login({ commit }, data) {
        // try {
            const res = await this.$axios.post('http://localhost:5000/api/user/login', data)
            console.log(res.data)
            if(res.data.is_superuser==true){
                this.$axios.setHeader('Authorization', 'Bearer ' + res.data.token)
                this.$router.push({ path: '/home' })
            }else{
                this.$axios.setHeader('Authorization', 'Bearer ' + res.data.token)
                this.$router.push({ path: '/Loghome' })
            }
            commit('Login', res.data)
        // }
        // catch (error) {
        //     if (error.response.data) {
        //         commit('setError', error.response.data);
        //     }

        // }
    },
    
    
    async updateLog({}, data) {
        await this.$axios.put('http://localhost:5000/api/log/' + data.id, {description: data.description, tag: data.tag, type: data.type})
    },
    async updateUser({}, data) {
        await this.$axios.put('http://localhost:5000/api/user/' + data.id, {status: data.status})
    },
    async getAllLogs({ commit, state }, data) {
        await this.$axios.get('http://localhost:5000/api/Log', {
            params: {
                page: data.page,
                limit: data.limit,
                title: data.title,
                from: data.from,
                to: data.to,
                tag: data.tag
            }
            
        }).then((res) => {
            console.log(res.data);
            
            commit('allLogs', res.data);
        })
    },
    
    async goToLog({ commit,state }, id) {
        // console.log(data)
        const res = await this.$axios.get('http://localhost:5000/api/log/' + id);
        console.log("log")
        console.log(res.data)
        commit('setLog', res.data)
    },
    // async updateDescription({ commit }, data) {
    //     // console.log(data)
    //     const res = await this.$axios.put('log/' + id, data)
    //     console.log(res, 'Updated')
    //     commit('updateDes', data.Description)
    //   },
      async updateDescription({ commit }, data) {
        console.log(data)
        const res = await this.$axios.put('http://localhost:5000/api/log/'+data.id ,{description: data.description})
        console.log(res, 'Updated')
        commit('updateDes', data.description)
    },
    async getAllUsers({ commit, state }, data) {
        await this.$axios.get('http://localhost:5000/api/user', {
            
        }).then((res) => {
            console.log(res.data);
            
            commit('allUsers', res.data);
        })
    },
    async goToUser({ commit }, data) {
        console.log(data)
        const res = await this.$axios.get('http://localhost:5000/api/user/' + data);
        console.log("log")
        console.log(res.data)
        commit('setUser', res.data)
    },

    // async updateUser({ commit }, data) {
    //     await this.$axios
    //       .put('http://localhost:5000/api/user/' + data.id, {
    //         headers: {
    //           Authorization: 'Bearer ' + this.state.token,
    //         },
    //       })
    //       .then((res) => {
    //         console.user(res)
    //         console.user('called')
    //         commit('updateUser', data)
    //       })
    //   },
    
    
    
   
    async createUser({ commit, state }, data) {
        const res = await this.$axios.post('http://localhost:5000/api/user', data)
      },
    async deleteUser({ }, data) {
        const res = await this.$axios.delete('http://localhost:5000/api/user/' + data);
        //console.log(res.data); 
        console.log('at least reaching this point');
    },
    // async updateUser({ state }, data) {
    //     const res = await this.$axios.put('http://localhost:5000/api/user/', +state.user.user_id, { name: data.name,hash_password:data.hash_password });
    // },

    
    
    async deleteLog({ commit }, id) {
         await this.$axios.delete('http://localhost:5000/api/log/' + id)
    },
    async getTags({ commit, state }) {
        const res = await this.$axios.get('http://localhost:5000/api/tag')
        commit('setTags', res.data)
      },
    async getTagTypes({ commit, state }) {
        const res = await this.$axios.get('http://localhost:5000/api/tag/types')
        commit('setTagTypes', res.data)
      },
    
    

      async addTag({ commit, state }, data) {
        const res = await this.$axios.post('tag/', {
          text: data.text,
          log_id: state.Log_id,
        })
      },

      
    // async getAllTags({ commit, state }, data) {
    //     await this.$axios.get('http://localhost:5000/api/Tag', {
            
    //     }).then((res) => {
    //         console.log(res.data);
            
    //         commit('allTags', res.data);
    //     })
    // },
    
    
    // async goToTag({ commit }, data) {
    //     console.log(data)
    //     const res = await this.$axios.get('http://localhost:5000/api/Tag/' + data);
    //     console.log("log")
    //     console.log(res.data)
    //     commit('setTag', res.data)
    // },

    async unseen({commit}, id) {
        // await this.$axios.put('http://localhost:5000/api/log/seen' + is_seen)
        const res = await this.$axios.put('http://localhost:5000/api/log/seen', id)
         console.log('at least reaching this point');
         commit('unseen', id)
   },


}

export default {
    state,
    mutations,
    actions,
    getters,

}