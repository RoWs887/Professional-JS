Vue.component('search', {
    data() {
      return {
          userSearch: '',
         productsAPI: this.$root.$refs.products,
      };
    },
    methods: {},
       
    template: `
        <div>
             <form action="#" class="search-form" @submit.prevent="productsAPI.filter(this.userSearch)">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
        </div>`
});


