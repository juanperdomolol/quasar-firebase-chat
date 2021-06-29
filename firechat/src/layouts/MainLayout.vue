<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>{{isAuthenticated ? user.email : 'Chat'}}</q-toolbar-title>

        <div>
          <q-btn
            v-if="isAuthenticated"
            @click="salir"
            color="red"
            unelevated
            rounded
            icon-right="logout"
            class="glossy"
            >salir</q-btn
          >
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase";
import {auth} from 'boot/firebase'
import { ref } from "vue";

export default {
  name: "MainLayout",

  components: {},

  setup() {
    const { isAuthenticated, user } = useAuth(firebase.auth);

    const salir = async () =>{
      try {
        await auth.signOut()
      } catch (error){
        console.log(error)
      }
    }
    return { isAuthenticated, user, salir };
  },
};
</script>
