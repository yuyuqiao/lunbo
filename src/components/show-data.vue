<template>
    <div class="flex fw js as">
        <div class="item-flex" v-for="(item, i) in data" :key="i">
            <div class="item_title">{{ item?.title }}</div>
            <span
                :class="!item.isPercent ? '' : !item.number ? '' : Number(item.number) > (item.isHundred ? 100 : 0) ? 'rise' : 'decline'">{{
                    !item.number
                    ?
                    '-' : item.isPercent ? item.number + '%' : item.number
                }}</span>
                <div class="tip_number" v-show="item.isShow">
                    <slot name="two" :user='item'></slot>
                </div>
               
            <!-- <a-divider /> -->
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    data: {
        type: Array<any>,
        default: []
    }
})
</script>
<style scoped lang="less">
.rise {
    color: green;
}

.decline {
    color: red;
}
.tip_number {
    height: 50px;
    line-height: 20px;
    margin: 10px 0 0 10px;
    font-size: 14px;
}
.item-flex {
    width: calc(calc(100% - 200px) / 5);
    // min-width: 300px;
    // height: 100px;
    font-size: 18px;
    padding: 0 20px;
    margin-bottom: 10px;

    span {
        display: inline-block;
        margin: 10px 0 0 10px;
        font-size: 26px;
        font-weight: bolder;
    }

    :deep(.arco-divider-horizontal) {
        margin-top: 5px;
    }
}</style>