<template>
  <div>
    <transition name="fade">
      <router-view>
      </router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // msgDate: 0, // 消息时间
      msgDate: new Date().getTime() - 1000 * 60 * 5, // 消息时间
      idGt: "",

      audioUrl: require("./assets/sound/prompt.wav"),
      signSucc: '',
    }
  },
  mounted() {
    let _self = this;

    _self.$alert(
      "欢迎使用！"
    );

    setInterval(function () {
      _self.getMsg();
    }, 30 * 1000);
  },
  methods: {
    getMsg() {
      let _self = this;

      let createTimeGe = _self.msgDate - 10 * 1000;
      _self.msgDate = new Date().getTime();
      this.$http({
        url: this.$http.adornUrl('/app/msg/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 100,
          'createTimeGe': _self.idGt == "" ? createTimeGe : undefined,
          'idGt': _self.idGt == "" ? undefined : _self.idGt,
          // 'type': 1
          // 'remark': _self.$store.state.user.id
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          if (data.page.list.length > 0) {
            _self.idGt = data.page.list[0].id;

            for (let i = 0; i < data.page.list.length; i++) {
              this.$notify({
                title: data.page.list[i].title,
                message: data.page.list[i].content,
                type: 'warning',
                duration: 0
              });

              _self.play();
            }
          }

        }
      });


    },

    play() {
      this.signSucc = new Audio();
      this.signSucc.src = this.audioUrl;
      this.signSucc.play();
    }
  },
}
</script>
