<template>
  <q-page padding>
    <vistaAcceso v-if="!isAuthenticated" />
  </q-page>
</template>

<script>
import vistaAcceso from "../components/vistaAcceso.vue";
import firebase  from "firebase";
import { useAuth } from "@vueuse/firebase";
import {auth} from "../boot/firebase"
export default {
  components: { vistaAcceso },
  setup() {
    const { isAuthenticated,user } = useAuth(firebase.auth);
    return {
      isAuthenticated, user
    };
  },
};
</script>
