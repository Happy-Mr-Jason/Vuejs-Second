app.component('product-display',{
  props:{
    premium : {
      type: Boolean,
      required: true
    }
  },
  template : 
  `
  <div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <a :href="link" target="_black">
            <img :src="image" :class="{'out-of-stock-img' : !inStock}">
          </a>
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>

          <p>Shipping : {{ shipping }} </p>
          <ul>
            <li v-for="detail in details">{{detail}}</li>
          </ul>
          <div class="color-circle"
          :style="{backgroundColor: variant.color}"
           @mouseover="updateVariant(index)"
            v-for="(variant, index) in variants" :key="variant.id"></div>
          <button :class="{ disabledButton : !inStock}" :disabled="!inStock" @click="addToCart" class="button">Add to Cart</button>
        </div>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data() {
      return {
        cart: 0,
        product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant : 0,
        link: 'https://www.vuemastery.com/courses/intro-to-vue-3/attribute-binding-vue3',
        details: [
          '50% Cotton',
          '30% wool',
          '20% Polyester'
        ],
        variants: [{
            id: 2234,
            color: 'green',
            image: './assets/images/socks_green.jpg',
            quantity: 50
          },
          {
            id: 2235,
            color: 'blue',
            image: './assets/images/socks_blue.jpg',
            quantity: 0
          }
        ],
        reviews: []
      }
    },
    methods: {
      addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id )
      },
      updateVariant(index){
        this.selectedVariant = index
      },
      addReview(review){
        this.reviews.push(review)
      }
    },
    computed: {
      title (){
        return this.brand + " " + this.product
      },
      image () {
        return this.variants[this.selectedVariant].image
      },
      inStock () {
        return this.variants[this.selectedVariant].quantity
      },
      shipping(){
        if(this.premium){
          return 'Free'
        } else {
          return 2.99
        }
      }
    }
})