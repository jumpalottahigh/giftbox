<template>
  <div class="giftbox">
    <div v-for="gift in giftbox" class="gift-wrapper col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-2">
      <div class="gift text-primary card p-1">
        <h4>{{gift.name}}</h4>
        <p>$ {{gift.currentAmount}} / $ {{gift.totalPrice}}</p>
        <p class="text-muted">{{gift.note}}</p>
        <p><span class="text-muted">Need Rating: </span>{{gift.need}}</p>
        <p>
          <span class="text-muted">Added on: </span>
          <time :datetime=formatDate(gift.timestamp)>{{formatDate(gift.timestamp)}}</time>
        </p>
        <p><span class="text-muted">Funded: </span>{{calculatePercentFunded(gift.currentAmount, gift.totalPrice)}}%</p>
        <progress class="progress" :value="gift.percentFunded" max="100"></progress>
        <div class="col-xs-12">
          <button class="btn btn-success" id="editGift"><i class="fa fa-pencil"></i></button>
          <button class="btn btn-danger" id="deleteGift" v-on:click="deleteGift(gift)"><i class="fa fa-trash-o"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'giftbox',
  data () {
    return {
      giftbox: [
        {
          id: 1,
          name: 'Monitor',
          // Currency = $
          currentAmount: 200,
          totalPrice: 280,
          note: 'New 144hz monitor for better performance.',
          // Need = 1...5 stars?
          need: 4,
          timestamp: 1421336158000,
          // TODO
          // This needs to be reworked away from hardcoded values, computed properties could be the solution
          percentFunded: this.calculatePercentFunded(200, 280)
        },
        {
          id: 2,
          name: 'Keyboard',
          // Currency = $
          currentAmount: 20,
          totalPrice: 195,
          note: 'New mechanical keyboard.',
          // Need = 1...5 stars?
          need: 5,
          timestamp: 1461361658000,
          percentFunded: this.calculatePercentFunded(20, 195)
        },
        {
          id: 3,
          name: 'Doggie',
          // Currency = $
          currentAmount: 0,
          totalPrice: 1200,
          note: 'New doggies for Anton.',
          // Need = 1...5 stars?
          need: 4,
          timestamp: 1471331658000,
          percentFunded: this.calculatePercentFunded(0, 1200)
        },
        {
          id: 4,
          name: 'BBQ',
          // Currency = $
          currentAmount: 0,
          totalPrice: 395,
          note: 'Need a terrace BBQ for the summer.',
          // Need = 1...5 stars?
          need: 3,
          timestamp: 1479341658000,
          percentFunded: this.calculatePercentFunded(0, 395)
        }
      ]
    }
  },
  methods: {
    calculatePercentFunded: function (current, total) {
      // +0.5 for accurate flooring ;)
      return Math.floor((current / total * 100) + 0.5)
    },
    formatDate: function (ts) {
      return moment(ts).format('Do MMM YYYY')
    },
    deleteGift: function (gift) {
      let index = this.giftbox.indexOf(gift)
      this.giftbox.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.giftbox {
  display: flex;
  flex-wrap: wrap;
}
.gift {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: #dfdfdf;
}
</style>
