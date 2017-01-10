import * as Vue from 'vue'
import Component from 'vue-class-component'

require('./home.scss');

@Component({
    template: require('./home.html')
})
export class HomeComponent extends Vue {

    package: string = 'vue-typescript';
    repo: string = 'https://github.com/ducksoupdev/vue-typescript-seed';

}