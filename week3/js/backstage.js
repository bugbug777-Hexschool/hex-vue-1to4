import {
  createApp
} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
const baseUrl = 'https://vue3-course-api.hexschool.io';
const apiPath = "sihle";

let productModal = null;
let delProductModal = null;

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
    open_modal(status) {
      console.log('茲麻開門');
      if (status === "add") {
        productModal.show();
      } else if (status === "edit") {
        productModal.show();
      } else if (status === "delete") {
        delProductModal.show();
      }
    }
  },
  mounted() {
    // 新增、編輯 Modal
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    })
    // 刪除 Modal
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    })
    this.check_login_status()
  },
});

app.mount('#app');