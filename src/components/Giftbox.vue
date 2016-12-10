<template>
  <div class="giftbox">
    <div v-for="gift in giftbox" class="gift-wrapper col-xs-4 mb-2">
      <div class="gift card p-1">
        <h4>{{gift.name}}</h4>
        <p>$ {{gift.currentAmount}} / $ {{gift.totalPrice}}</p>
        <p>{{gift.note}}</p>
        <p><span class="text-muted">Need Rating: </span>{{gift.need}}</p>
        <p><span class="text-muted">Added on: </span>{{gift.timestamp}}</p>
        <p><span class="text-muted">Funded: </span>{{calculatePercentFunded(gift.currentAmount, gift.totalPrice)}}%</p>
        <progress class="progress" :value="gift.percentFunded" max="100"></progress>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'giftbox',
  data () {
    return {
      giftbox: [
        {
          name: 'Monitor',
          // Currency = $
          currentAmount: 200,
          totalPrice: 280,
          note: 'New 144hz monitor for better performance.',
          // Need = 1...5 stars?
          need: 4,
          timestamp: 1481366658,
          // TODO
          // This needs to be reworked away from hardcoded values, computed properties could be the solution
          percentFunded: this.calculatePercentFunded(200, 280)
        },
        {
          name: 'Keyboard',
          // Currency = $
          currentAmount: 20,
          totalPrice: 195,
          note: 'New mechanical keyboard.',
          // Need = 1...5 stars?
          need: 5,
          timestamp: 1481361658,
          percentFunded: this.calculatePercentFunded(20, 195)
        },
        {
          name: 'Doggie',
          // Currency = $
          currentAmount: 0,
          totalPrice: 1200,
          note: 'New doggies for Anton.',
          // Need = 1...5 stars?
          need: 4,
          timestamp: 1481331658,
          percentFunded: this.calculatePercentFunded(0, 1200)
        },
        {
          name: 'BBQ',
          // Currency = $
          currentAmount: 0,
          totalPrice: 395,
          note: 'Need a terrace BBQ for the summer.',
          // Need = 1...5 stars?
          need: 3,
          timestamp: 1481341658,
          percentFunded: this.calculatePercentFunded(0, 395)
        }
      ]
    }
  },
  methods: {
    calculatePercentFunded: function (current, total) {
      // +0.5 for accurate flooring ;)
      return Math.floor((current / total * 100) + 0.5)
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
  color: #4286f4;
}
</style>
