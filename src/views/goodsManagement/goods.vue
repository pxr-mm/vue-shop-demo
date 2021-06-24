<template>
  <div>
    <div class="tree_ul">
      <div class="tree_li" v-for="(item1, index1) in treeList" :key="index1">
        <!-- 主席 -->
        <div class="chairman item_style long_line">
          {{ item1.chairman }}
        </div>
        <div>
          <!-- 秘书长 -->
          <div
            class="secretary_general"
            v-for="(item2, index2) in item1.children"
            :key="index2"
          >
            <div
              class="item_style"
              :class="{
                link_line1: item1.children.length > 1 && index2 >= 1,short_line:item1.children.length > 1 && item2.children.length > 1
              }"
            >
              <div
                class="short_line222"
                v-show="item2.children.length < 2"
              ></div>
              {{ item2.secretary_general }}
            </div>
            <div>
              <!-- 秘书 -->
              <div
                class="secretary"
                v-for="(item3, index3) in item2.children"
                :key="index3"
              >
                <div
                  class="item_style long_line"
                  :class="{
                    link_line1: item2.children.length > 1 && index3 >= 1
                  }"
                >
                  {{ item3.secretary }}
                  <div
                    class="short_line222"
                    v-show="item3.children.length < 2"
                  ></div>
                </div>
                <!-- 处事 -->
                <div>
                  <div
                    class="offic"
                    v-for="(item4, index4) in item3.children"
                    :key="index4"
                  >
                    <div class="item_style">{{ item4.Office }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeList: [
        {
          chairman: '主席',
          children: [
            {
              secretary_general: '将秘书长',
              children: [
                {
                  secretary: '周秘书',
                  children: [{ Office: '办事厅' }]
                }
              ]
            },
            {
              secretary_general: '秘书长3',
              children: [
                {
                  secretary: '秘书3',
                  children: [{ Office: '办事厅3' },
                //   { Office: '办事厅3-2' }
                  ]
                }
              ]
            },
            {
              secretary_general: '姚秘书长',
              children: [
                {
                  secretary: '秘书1',
                  children: [
                    {
                      Office: '处事1'
                    }
                  ]
                },
                {
                  secretary: '秘书2',
                  children: [
                    {
                      Office: '处事2'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.tree_li {
  display: flex;
  //   justify-content: space-around;
  padding: 20px;
}
.chairman,
.item_style,
.link_line1,
.short_line,
.long_line {
  height: 50px;
  width: 120px;
  text-align: center;
  background-color: cadetblue;
  margin: 20px 30px;
  position: relative;
}

.chairman {
  margin-top: 50px;
}
.secretary_general {
  display: flex;
}
.secretary {
  display: flex;
}
.link_line1,
.short_line,
.short_line,
.long_line {
  position: relative;
}

.link_line1::before {
  content: '';
  height: 90px;
  width: 40px;
  position: absolute;
  left: -42px;
  top: -65px;
  border: 1px solid #ccc;
  border-right: none;
}
.short_line::after {
    display: none;
  position: absolute;
  z-index: 999;
  top: 50%;
  right: -15px;
  margin-top: -4px;
  content: ' ';
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #c8c8cd;
  border-style: solid;
  z-index: 2;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
}

.short_line222 {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.short_line222::after {
  position: absolute;
  z-index: 999;
  top: 50%;
  right: -55px;
  margin-top: -4px;
  content: ' ';
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #c8c8cd;
  border-style: solid;
  z-index: 2;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
}
.short_line222::before {
  content: ' ';
  position: absolute;
  right: -48px;
  top: 50%;
  width: 38px;
  height: 2px;
  background-color: #ccc;
}
</style>
