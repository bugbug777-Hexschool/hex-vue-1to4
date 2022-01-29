const pagination = {
  props: ["pages"],
  template: `
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li v-if="pages.has_pre" @click.prevent="$emit('update', pages.current_page-1)" class="page-item"><a class="page-link" href="#">Previous</a></li>
      <li v-for="i in pages.total_pages" :key="i" class="page-item" :class="{ active: pages.current_page === i}">
        <a @click.prevent="$emit('update', i)" class="page-link" href="#">{{ i }}</a>
      </li>
      <li v-if="pages.has_next" @click.prevent="$emit('update', pages.current_page+1)" class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>
  `
};

export {
  pagination
};