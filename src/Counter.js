
export default{
    data(){
        return {
            count : 0
        }
    },

    template : `
        <button class="btn" @click="count++">
            Cliked {{ count }} times.
        </button>
    `
}