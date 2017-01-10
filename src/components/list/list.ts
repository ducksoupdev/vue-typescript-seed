import * as Vue from 'vue'
import Component from 'vue-class-component'
import * as axios from 'axios'

interface UserResponse {
    id: string;
    name: string;
}

@Component({
    template: require('./list.html')
})
export class ListComponent extends Vue {

    items: UserResponse[] = [];

    mounted() {
        this.$nextTick(() => { 
            console.log('list is ready!');
            this.loadItems();
        });
    }

    private loadItems() {
        let url = 'https://jsonplaceholder.typicode.com/users';

        // GET request
        axios.get(url).then((response: Axios.AxiosXHR<UserResponse[]>) => {
            this.items = response.data;
        }, (error) => {
            // handle error
            console.error(error);
        });
        
        // this.items = [
        //     'One',
        //     'Two',
        //     'Three'
        // ];
    }
}