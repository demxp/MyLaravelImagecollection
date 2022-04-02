<script>
    export default {
      props: {
        options: {
          type: Array,
          required: false,      
          default: () => []
        },
        value: {
          required: false
        },
        dataUrl: {
          type: String,
          required:false,
          default: null
        },
        dataField: {
          type: String,
          required: false,
          default: 'text'
        },
        placeholder: {
          type: String,
          required: false
        },
        multiple: {
          type: Boolean,
          required: false,
          default: false
        },
      },
      template: '<select v-bind:multiple="multiple"><slot></slot></select>',
      data(){
        return{

        }
      },      
      mounted: function () {
        this.opts = [];

        if(!!this.dataUrl){
          if(!!window.localCache){
            window.localCache.get(this.dataUrl, this.fillData);
          }else{
            ajaxfun(this.dataUrl, 'get', null, (req) => {
              this.fillData(req);
            });
          }
        }else{
          this.fillData(this.options);
        }
        var vm = this;
        $(this.$el).select2().trigger('change').on('select2:select', this.fireSelect).on('select2:unselect', this.fireSelect);

      },
     watch: {
       value: function (value) {
         $(this.$el).val(value).trigger('change');
       },
     },
      methods:{
        fillData: function(data){
          for(let i in data){
            this.opts.push({
              id: data[i].id,
              text: data[i][this.dataField]
            });
          }
          var vm = this;
          $(this.$el).empty().select2({
            data: this.opts,
            placeholder: this.placeholder
          });
          debugger
          $(this.$el).val(this.value).trigger('change');
        },
        fireSelect(ev){
          if(!this.multiple) return this.$emit('input', ev.target.value);

          let options = ev.target && ev.target.options;
          let result = [];
          let opt;

          for (var i=0, iLen=options.length; i<iLen; i++) {
            if (options[i].selected) {
              result.push(options[i].value || options[i].text);
            }
          }

          return this.$emit('input', result);
        }
      },
      destroyed: function () {
        $(this.$el).select2('destroy')
      }
    }
</script>