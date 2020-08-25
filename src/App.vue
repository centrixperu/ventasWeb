<template>
  <router-view />
</template>

<script>

export default {
  name: 'LayoutDefault',

  components: { },

  data () {
    return {
      drawer: false,
      miniState: true,
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  }
}
</script>

<style lang="scss">
    //FONT FAMILY
    .fontFamily {
        font-family: 'Roboto', '-apple-system', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    //ESTILOS ELEMENTUI
    .cus-border{
        border: 1px solid #01800b;
        border-radius: 4px;
    }
    .cus-border-tag-1{
        //background-color: #409eff;
        //border-color: #409eff;
        //color: #fff !important;
        border: 1px solid #409eff;
        background-color: #fff;
        border-color: #b3d8ff;
        color: #409eff;
        border-radius: 4px;
    }
    .cus-border-tag-2{
        //background-color: #909399;
        //border-color: #909399;
        //color: #fff !important;
        border: 1px solid #909399;
        background-color: #fff;
        border-color: #d3d4d6;
        color: #909399;
        border-radius: 4px;
    }
    .cus-border-tag-3{
        //background-color: #e6a23c;
        //border-color: #e6a23c;
        //color: #fff !important;
        border: 1px solid #e6a23c;
        background-color: #fff;
        border-color: #f5dab1;
        color: #e6a23c;
        border-radius: 4px;
    }
    .cus-container-border{
        //border: 1px solid #01800b;
        padding: 10px;
        //border-radius: 4px;
        margin: 16px;
    }
    .cus-label-form-left{
        //border-bottom: 1px solid #80ee9b;
        height: 30px;
        display: table;
        overflow: hidden;
        margin-left: 10px;
    }
    .cus-label{
        color: #000;
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        font-size: 14px;
    }
    .cus-sublabel{
        color: #000;
        font-weight: bold;
        //display: table-cell;
        vertical-align: middle;
        width: 100%;
        margin: 5 auto;
        text-align: center;
        padding: 5px;
        font-size: 12px;
    }
    .cus-tag-header-panel{
        width: calc(100%);
        text-align: center;
        margin-bottom: 10px;
        color: #008E00;
        font-weight: bold;
        padding-left: 16px;
        font-size: 16px !important;
    }
    // -- PADDING
    .padding0{
        padding: 0px !important;
    }
    .padding5{
        padding: 5px !important;
    }
    .padding10{
        padding: 10px !important;
    }
    .paddingTop0{
        padding-top: 0px !important;
    }
    .paddingTop5{
        padding-top: 5px !important;
    }
    .paddingTop10{
        padding-top: 10px !important;
    }
    .paddingTop20{
        padding-top: 20px !important;
    }
    .paddingleft0{
        padding-left: 0px !important;
    }
    .paddingLeft5{
        padding-left: 5px !important;
    }
    .paddingleft10{
        padding-left: 10px !important;
    }
    .paddingRight5{
        padding-right: 5px !important;
    }
    .paddingRight10{
        padding-right: 10px !important;
    }
    .paddingRight20{
        padding-right: 20px !important;
    }
    .paddingBottom0{
        padding-bottom: 0px !important;
    }
    .paddingBottom5{
        padding-bottom: 5px !important;
    }
    .paddingBottom10{
        padding-bottom: 10px !important;
    }
    // -- MARGIN
    .margin0 {
        margin: 0px !important;
    }
    .margin5 {
        margin: 5px !important;
    }
    .margin10 {
        margin: 5px !important;
    }
    .marginLeft0{
        margin-left: 0px !important;
    }
    .marginLeft5{
        margin-left: 5px !important;
    }
    .marginLeft10{
        margin-left: 10px !important;
    }
    .marginLeft25{
        margin-left: 25px !important;
    }
    .marginRight0{
        margin-right: 0px !important;
    }
    .marginRight5{
        margin-right: 5px !important;
    }
    .marginRight10{
        margin-right: 10px !important;
    }
    .marginRight15{
        margin-right: 15px !important;
    }
    .marginRight25{
        margin-right: 25px !important;
    }
    .marginTop5 {
        margin-top:5px !important;
    }
    .margintop10{
        margin-top: 10px !important;
    }
    .marginTop15{
        margin-top: 15px !important;
    }
    .marginTop20{
        margin-top: 20px !important;
    }
    .marginTop25{
        margin-top: 25px !important;
    }
    .marginBottom0{
        margin-bottom: 0px !important;
    }
    .marginBottom5{
        margin-bottom: 5px !important;
    }
    .marginBottom10{
        margin-bottom: 10px !important;
    }
    .marginBottom15{
        margin-bottom: 15px !important;
    }
    // -- FONTSIZE
    .fontsize11{
        font-size:11px !important;
    }
    .fontsize12{
        font-size:12px !important;
    }
    .fontsize13{
        font-size:13px !important;
    }
    .fontsize15{
        font-size:15px !important;
    }
    .fontsize17{
        font-size:17px !important;
    }
    .fontsize18{
        font-size:18px !important;
    }
    .fontsize20{
        font-size:20px !important;
    }
    .fontsize10Bold {
        font-size: 10px !important;
        font-weight: bold !important;
    }
    .fontsize12Bold {
        font-size: 12px !important;
        font-weight: bold !important;
    }
    .fontsize13Bold {
        font-size: 13px !important;
        font-weight: bold !important;
    }
    .fontsize14Bold {
        font-size: 13px !important;
        font-weight: bold !important;
    }
    .fontsize15Bold {
        font-size: 15px !important;
        font-weight: bold !important;
    }
    .fontsize17Bold {
        font-size: 17px !important;
        font-weight: bold !important;
    }
    .fontsize20Bold {
        font-size: 20px !important;
        font-weight: bold !important;
    }
    .fontsize25Bold {
        font-size: 25px !important;
        font-weight: bold !important;
    }
    .fontsize30Bold{
        font-size: 30px !important;
        font-weight: bold !important;
    }
    .fontsize35Bold{
        font-size: 35px !important;
        font-weight: bold !important;
    }
    .fontkursiva{
        font-weight: normal !important;
        font-style: italic !important;
    }
    .fontnormal{
        font-weight: normal !important;
        font-style: normal !important;
    }
    .fontbold{
        font-weight: bold !important;
    }
    .backgroundColorT {
        background-color: turquoise !important;
    }
    .backgroundColorX {
        background-color: white !important; // #f0f9eb !important;// rgb(197, 192, 186) !important;
        opacity: 0.95;
    }
    .backgroundColorB {
        background-color: black !important;
    }
    .colorY{
        color: yellow;
    }
    .colorT{
        color: turquoise;
    }
    .colorF{
        color: fuchsia !important;
    }
    .colorW{
        color: white;
    }
    .colorB{
        color: blue;
    }
    .cus-border-tag-Black{
        //background-color: #409eff;
        //border-color: #409eff;
        //color: #fff !important;
        border: 1px solid #409eff;
        background-color: black;
        border-color: #b3d8ff;
        color: #409eff;
        border-radius: 4px;
    }
    .cus-border-tag-Red{
        //background-color: #409eff;
        //border-color: #409eff;
        //color: #fff !important;
        border: 1px solid #409eff;
        background-color: red;
        border-color: #b3d8ff;
        color: #409eff;
        border-radius: 4px;
    }
    .cus-border-tag-Blue{
        //background-color: #409eff;
        //border-color: #409eff;
        //color: #fff !important;
        border: 1px solid #409eff;
        background-color: white;
        border-color: #b3d8ff;
        color: blue;
        border-radius: 4px;
    }
    // -- WIDTH
    .width10{
        width:10% !important;
    }
    .width25P{
        width:25px !important;
    }
    .width40{
        width:40px !important;
    }
    .width10P{
        width: 10% !important;
    }
    .width50{
        width: 50% !important;
    }
    .width80P{
        width: 80% !important;
    }
    .width90{
        width: 90% !important;
    }
    .width95{
        width: 95% !important;
    }
    .width100{
        width: 100% !important;
    }
    .widthAuto{
        width: auto !important;
    }
    .width60P{
        width:60px !important;
    }
    .width75P{
        width:75px !important;
    }
    .width85P{
        width:85px !important;
    }
    .width95P{
        width:95px !important;
    }
    .width100P{
        width:100px !important;
    }
    .width105P{
        width:105px !important;
    }
    .width110{
        width:110px !important;
    }
    .width130P{
        width:130px !important;
    }
    .width150P{
        width:150px !important;
    }
    // -- HEIGHT
    .height100 {
        height: 100% !important;
    }
    .height50 {
        height: 50% !important;
    }
    .height70 {
        height: 70% !important;
    }
    .height100P {
        height: 100px !important;
    }
    .height105P{
        height:105px !important;
    }
    .height90P {
        max-height: 90px;
    }
    .height40P {
        max-height: 40px;
    }
    .height20P {
        max-height: 20px;
    }
    //TEXT
    .textAlignL {
        text-align: left !important;
    }
    .textAlignR {
        text-align: right !important;
    }
    .textAlignC {
        text-align: center !important;
    }
    //COLOR MANTENER SESION
    .colorText1 {
        color: rgba(0,0,0,0.6);
    }
    // -- DARK
    .cus-dark{
        color: #fff;
        background: #424242;
    }
    // -- LINE HEIGHT
    .cus-line1{
        line-height: 1rem !important;
    }
    .cus-line05{
        line-height: 0.5rem !important;
    }
    .borderform{
        border: 2px blue;
    }
    //SORT TABLE
    .colorOrderTop {
        color: #409EFF !important;
        border-top-color: #409EFF !important;
    }
    .colorOrderBottom {
        color: #409EFF !important;
        border-bottom-color: #409EFF !important;
    }
    .style {
        background: url(http://files.centrixperu.com/cliente_7/fondo/fondo2.gif) no-repeat center center fixed;
        //background: url(https://thumbs.gfycat.com/MassiveTepidDegus-mobile.mp4) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
</style>
