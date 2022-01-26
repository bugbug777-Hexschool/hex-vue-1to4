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
      temp: {
        imagesUrl: [],
      },
      status: "",
      imgUrl: ""
    }
  },
  methods: {
    check_login_status() {
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
    open_modal(status, product) {
      console.log('茲麻開門');
      if (status === "add") {
        this.status = status; // this.status == 'add'
        productModal.show();
      } else if (status === "edit") {
        this.status = status; // this.status == 'edit'
        productModal.show();
      } else if (status === "delete") {
        this.temp = product;
        delProductModal.show();
      }
    },
    add_product() {
      axios.post(`${ baseUrl }/v2/api/${ apiPath }/admin/product`, {data: this.temp})
        .then(res => {
          console.log(res);
          // 清除資料
          this.temp = {
            imagesUrl: []
          }
          this.get_all_products();
          productModal.hide();
        })
        .catch(err => {
          console.dir(err);
        })

    },
    edit_product() {
      console.log('Modified a product!!');
    },
    delete_product() {
      axios.delete(`${baseUrl}/v2/api/${apiPath}/admin/product/${this.temp.id}`)
        .then(res => {
          console.log(res);
          alert(`已成功刪除 ${this.temp.title}！`);

          // 清除不需要的資料
          delete this.products[this.temp.id];
          this.temp = {};
        })
        .catch(err => {
          alert("不是這樣搞的吧！？")
          console.log(err.response);
        })

      delProductModal.hide();
    },
    add_image() {
      // 將第一個加入的圖片設定成主要圖片
      if (!this.temp.imageUrl) {
        this.temp.imageUrl = this.imgUrl
      }
      this.temp.imagesUrl.push(this.imgUrl);
      this.imgUrl = "";
    }
  },
  mounted() {
    // Add, new Modal Obj
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    })
    // Delete Modal Obj
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    })

    // Get token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;

    this.check_login_status();
  },
});

app.mount('#app');