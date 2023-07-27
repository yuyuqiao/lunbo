<script setup lang="ts">
 
interface ITable {
    date: String,
    name: String,
    address: String,
    phone?: Number,
}
interface IColumns {
    prop: String,
    label: String,
    type?: String,
    width?: String | Number,
}
defineProps<{ columnData: IColumns[], tableData: ITable[] }>()
 
</script>