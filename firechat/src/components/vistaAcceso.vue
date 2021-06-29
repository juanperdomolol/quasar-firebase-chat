<template>
  <div class="q-px-xl">
    <h5>Formulario {{ acceder ? "Login" : "Registro" }}</h5>
    <q-form class="q-gutter-md" @submit="procesarFormulario">
      <q-input
        label="Email"
        type="email"
        v-model="email"
        :rules="[
          (val) => (val && val.length > 0) || 'escribe un correo valido',
          invalidEmail,
        ]"
      />
      <q-input
        label="Password"
        v-model="password"
        type="password"
        :rules="[
          (val) => (val && val.length > 6) || 'ingresa  6 caracteres',
          (val) => (val && val.length < 8) || 'solo 7 caracteres',
        ]"
      />
      <q-btn
        :label="acceder ? 'login' : 'registro'"
        color="primary"
        type="submit"
      />
      <q-btn color="primary" outline v-if="!acceder" @click="acceder = true"
        >¿ya tienes cuenta?</q-btn
      >
      <q-btn color="negative" outline v-else @click="acceder = false"
        >¿no tienes cuenta?</q-btn
      >
    </q-form>
  </div>
</template>
<script>
import { ref } from "vue";
import { auth } from "boot/firebase";
import firebase from 'firebase'
import { useQuasar } from "quasar";
import { useAuth } from "@vueuse/firebase/useAuth";
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const acceder = ref(true);
    const $q = useQuasar();
    const { isAuthenticated, user } = useAuth(firebase.auth);

    const invalidEmail = (val) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Email invalido";
    };
    const procesarFormulario = async () => {
      if (!email.value.trim() || !password.value.trim()) {
        return alert("campos vacios!!");
      }
      try {
        if (!acceder.value) {
          //registrar
          const usuario = await auth.createUserWithEmailAndPassword(
            email.value,
            password.value
          );
          console.log(usuario.user);
          // .then((userCredential)=>{
          //   var user = userCredential.user
          // })
        } else {
          //login
          // juan@juan.com
          // 1231231
          const usuario = await auth.signInWithEmailAndPassword(
            email.value,
            password.value
          );
          console.log(usuario.user);
        }
        email.value = "";
        password.value = "";
      } catch (error) {
        console.log(error);
        $q.notify({
          message: "Correo ya esta registrado.",
          icon: "report_problem",
          color: "red",
          progress: true,
          classes: "glossy",
        });
      }
    };

    return {
      email,
      password,
      procesarFormulario,
      acceder,
      invalidEmail,
      isAuthenticated,
      user,
    };
  },
};
</script>