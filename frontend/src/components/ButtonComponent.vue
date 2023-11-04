<template>
  <button :type="type" :class="'px-8 py-2 rounded hoverEffect appearance-none bg-blue-200 text-blue-800'">
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