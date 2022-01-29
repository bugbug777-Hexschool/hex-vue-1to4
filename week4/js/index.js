import {
  createApp
} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const baseUrl = "https://vue3-course-api.hexschool.io";

const app = createApp({
  data() {
    return {
      user: {
        "username": "",
        "password": ""
      }
    }
  },
  methods: {
    login() {
      axios.post(`${ baseUrl }/v2/admin/signin`, this.user)
        .then(res => {
          // Get token, and set token
          const {
            token,
            expired
          } = res.data
          document.cookie = `hexToken=${ token }; expires=${ new Date(expired) }; path=/`;
          window.location = "backstage.html";
        })
        .catch(err => {})
    }
  },
})

app.mount("#app");