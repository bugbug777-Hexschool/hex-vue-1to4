import {
  createApp
} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.28/vue.esm-browser.min.js';
const baseUrl = 'https://vue3-course-api.hexschool.io';

const app = createApp({
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      axios.post(`${ baseUrl }/v2/admin/signin`, this.user)
        .then(res => {
          // 解構回傳資料取得 token, 時間
          const {
            token,
            expired
          } = res.data;
          // 寫入 cookie
          document.cookie = `hexToken=${ token }; expires=${ new Date(expired) }`;
          window.location = "backstage.html";
        })
        .catch(err => {
          console.log("人品有待加強～");
        })
    }
  }
});

app.mount('#app');