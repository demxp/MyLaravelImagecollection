<script>
	export default {
	  props: ['options', 'value'],
	  template: '<select><slot></slot></select>',
	  mounted: function () {
	    var vm = this
	    $(this.$el)
	      // init select2
	      .select2({ data: this.options, placeholder: "Нет категории" })
	      .val(this.value)
	      .trigger('change')
	      .on('select2:select', function (e) {
	        vm.$emit('input', this.value)
	      });      
	  },
	  watch: {
	    value: function (value) {
	      // update value
	      $(this.$el)
	        .val(value)
	        .trigger('change')
	    },
	    options: function (options) {
	      // update options
	      $(this.$el).empty().select2({ data: options })
	    }
	  },
	  destroyed: function () {
	    $(this.$el).select2('destroy')
	  }
	}
</script>