// v-for with a range
// https://vuejs.org/v2/guide/list.html#v-for-with-a-Range

export default {
  props: ['pagination'],
  template: `<nav aria-label="Page navigation">
  <ul class="pagination">
    <li v-if="pagination.has_pre" class="page-item"><a class="page-link" href="#">Previous</a></li>
    <template v-for="i in pagination.total_pages">
      <li class="page-item" :class="{active: (pagination.current_page === i)}">
        <a class="page-link" href="#">{{ i }}</a>
      </li>
    </template>
    <li v-if="pagination.has_next" class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>`
};