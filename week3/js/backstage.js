import {
  createApp
} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
const baseUrl = 'https://vue3-course-api.hexschool.io';
const apiPath = "sihle";

const app = createApp({
  data() {
    return {
      products: {},
      temp: {}
    }
  },
  methods: {
    check_login_status() {
      // Cookie Start
      // 取得 cookie 中的 token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      // console.log(`I get the token, ${ token }`);
      // 將 token 寫入預設
      axios.defaults.headers.common['Authorization'] = token;
      // Cookie End

      axios.post(`${ baseUrl }/v2/api/user/check`)
        .then(res => {
          this.get_all_products();
        })
        .catch(err => {
          alert("api_path 禁止非本人使用！")
          window.location = "index.html";
        })
    },
    get_all_products() {
      axios.get(`${ baseUrl }/v2/api/${ apiPath }/admin/products/all`)
        .then(res => {
          this.products = res.data.products;
        })
        .catch(err => {
          console.log(err.response);
        })
    },
    delete_product(e) {
      const id = e.target.dataset.id;
      axios.delete(`${ baseUrl }/v2/api/${ apiPath }/admin/product/${ id }`)
        .then(res => {
          delete this.products[id];
          this.temp = {};
        })
        .catch(err => {
          console.log(err.response);
        })
    }

  },
  mounted() {
    this.check_login_status()
  },
});

app.mount('#app');