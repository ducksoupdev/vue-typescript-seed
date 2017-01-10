import * as Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    template: require('./about.html')
})
export class AboutComponent extends Vue {

    repo: string = 'https://github.com/ducksoupdev/vue-typescript-seed';

    mounted() {
        this.$nextTick(() => console.log('about is ready!'));
    }
}