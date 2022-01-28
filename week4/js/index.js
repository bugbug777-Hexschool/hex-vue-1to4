import {
  createApp
} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js"

const baseUrl = "https://vue3-course-api.hexschool.io"
const apiPath = "sihle"

let productModal = null;
let delProductModal = null;

const app = createApp({
  data() {
    return {
      products: [],
      temp: {},
      state: "", // Modal 開啟狀態
    }
  },
  methods: {
    check_login_status() {
      axios.post(`${ baseUrl }/v2/api/user/check`)
        .then(res => {
          this.get_all_products();
        })
        .catch(err => {
          window.location = "login.html"
        })
    },
    get_all_products() {
      axios.get(`${ baseUrl }/v2/api/${ apiPath }/admin/products`)
        .then(res => {
          this.products = res.data.products;
        })
        .catch(err => {
          console.dir(err);
        })
    },
    open_modal(status, item) {
      if (status === "add") {
        this.state = "add"
        this.temp = {};
        productModal.show();
      } else if (status === "edit") {
        this.state = "edit";
        this.temp = {
          ...item
        };
        productModal.show();
      } else if (status === "delete") {
        this.temp = item;
        delProductModal.show();
      }
    },
    add_product() {
      // 將第一個圖片設為主要圖片
      this.temp.imageUrl = this.temp.imagesUrl[0];
      const data = {
        data: this.temp
      };

      axios.post(`${ baseUrl }/v2/api/${ apiPath }/admin/product`, data)
        .then(res => {
          this.get_all_products();
          productModal.hide();
        })
        .catch(err => {})
    },
    edit_product() {
      const data = {
        data: this.temp
      };

      axios.put(`${ baseUrl }/v2/api/${ apiPath }/admin/product/${ this.temp.id }`, data)
        .then(res => {
          console.log(res);
          this.get_all_products();
          productModal.hide();
        })
        .catch(err => {
          console.dir(err);
        })
    },
    delete_product() {
      axios.delete(`${ baseUrl }/v2/api/${ apiPath }/admin/product/${ this.temp.id }`)
        .then(res => {
          this.get_all_products();
          delProductModal.hide();
        })
        .catch(err => {
          console.dir(err);
        })
    },
    add_image() {
      if (!this.temp.imagesUrl) {
        this.temp.imagesUrl = []
      }
      if (!this.temp.imageUrl) {
        alert("圖片網址不能為空！");
        return;
      }
      this.temp.imagesUrl.push(this.temp.imageUrl);
      this.temp.imageUrl = "";
    },
    remove_image(e) {
      const id = parseInt(e.target.dataset.id)

      // 如果要刪除的剛好是主要圖片，那麼就取用陣列中的第二張為主要圖片
      if (id === 0) {
        this.temp.imageUrl = this.temp.imagesUrl[1] || "";
      }

      this.temp.imagesUrl = this.temp.imagesUrl.filter((item, index) => index !== id)
    }
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));

    // Get token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;

    this.check_login_status();
  },
})

app.mount("#app");