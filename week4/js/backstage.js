import {
  createApp
} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js";
import {
  productModal,
  deleteProductModal
} from "./component-modal.js";
import { pagination } from "./component-pagination.js";

const app = createApp({
  data() {
    return {
      baseUrl: "https://vue3-course-api.hexschool.io",
      apiPath: "sihle",
      productModal: "",
      delProductModal: "",
      state: "", // modal 開啟狀態
      products: [],
      pagination: {},
      temp: {
        imagesUrl: []
      }
    }
  },
  components: {
    productModal,
    deleteProductModal,
    pagination
  },
  methods: {
    check_login_status() {
      axios.post(`${ this.baseUrl }/v2/api/user/check`)
        .then(res => {
          this.get_all_products();
        })
        .catch(err => {
          window.location = "index.html";
        })
    },
    get_all_products(pageNum=1) {
      axios.get(`${ this.baseUrl }/v2/api/${ this.apiPath }/admin/products?page=${ pageNum }`)
        .then(res => {
          const {
            products,
            pagination
          } = res.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch(err => {})
    },
    open_modal(state, item) {
      if (state === "add") {
        this.temp = {
          imagesUrl: []
        };
        this.state = "add"
        this.productModal.show();
      } else if (state === "edit") {
        this.temp = {
          ...item
        };
        this.state = "edit";
        this.productModal.show();
      } else if (state === "delete") {
        this.temp = item;
        this.delProductModal.show();
      }
    },
  },
  mounted() {
    // Modal Object
    this.productModal = new bootstrap.Modal(document.getElementById('productModal'));
    this.delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));

    // Get token, set to axios default
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;

    this.check_login_status();
  },
})

app.mount("#app");