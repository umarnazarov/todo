<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props(){
        return {
            isError: {
                type: boolean
            }
        }
    }
}
</script>
<style lang="">
    
</style>