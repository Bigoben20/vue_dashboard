<template>
  <button :type="type" :class="baseClass">
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
        color: {
            type: String,
            default: "primary"
        },
        classExpand: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
        }
    },
    setup(props) {
        let baseClass = 'px-8 py-2 rounded appearance-none ' + props.classExpand;
        if (props.color == "primary") {
            baseClass = baseClass + " bg-primary-50/30 text-primary-100 hover:bg-primary-50/40 active:bg-primary-50/50"
        } else if (props.color == "secondary") {
            baseClass = baseClass + " bg-primary-200 text-gray-100 hoverEffect font-bold"
        }

        return {baseClass}
    }

}
</script>

<style>

</style>