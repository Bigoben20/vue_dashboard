<template>
  <button :type="type" class='px-8 py-2 rounded appearance-none bg-primary-50/30 text-primary-100 hover:bg-primary-50/40 active:bg-primary-50/50'>
    <slot></slot>
  </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: "button"
        },
        class: {
            type: String,
            default: ""
        },
        color: {
            type: String,
            default: "blue"
        }
    },
    data() {
        return {
        }
    },
    setup(props) {

    }

}
</script>

<style>

</style>