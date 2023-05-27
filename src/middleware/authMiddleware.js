import { useAuthStore } from '@/./store/auth/authStore';
import {decrypt} from "@/utils/utils";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const authMiddleware = (to, from, next) => {

    const email = decrypt(sessionStorage.getItem('email'), process.env.VUE_APP_ENCRYPT_KEY);
console.log(email);
    if ( !email ) {
        // Se o usuário não estiver autenticado ou estiver inativo, redirecione para a página de login
        next({ name: 'login' });
    } else {
        // Se o usuário estiver autenticado, permita o acesso à rota
        next();
    }
};

export default authMiddleware;