import {defineStore} from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore('global',()=>{
   const token = ref('');
   const user = ref({
        name: '',
        username: '',
   });

   var notification = ref({
        type: '',
        message: ''
   });

   var endNotification: ReturnType<typeof setTimeout> | null = null

   const notify = function(type: string, message: string){
        notification.value.type = type
        notification.value.message = message
        if(endNotification) clearTimeout(endNotification);
        endNotification = setTimeout(()=>{
               notification.value.type = ''
               notification.value.message = ''
        },3000);

   }

   return {token, user, notification, notify};
});