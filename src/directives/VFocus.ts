export default {
    mounted(el: HTMLElement, binding: any) {
        if (binding.value) {
            el.focus()
        }
        if (binding.value === 'true') {
            console.log(binding.value)
            el.focus()
            el.style.border = '1px solid red'
        }
    },
    name: 'focus'
}
