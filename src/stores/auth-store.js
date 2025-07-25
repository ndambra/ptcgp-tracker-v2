import { defineStore } from 'pinia';
import { auth } from 'src/js/firebase';
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { reactive } from 'vue';
import { useCardsStore } from './cards-store';

export const useAuthStore = defineStore('auth', () => {
  /* state */
  const user = reactive({
    id: null,
    email: ''
  })

  /* getters */

  /* actions */
  function init() {
    const cardsStore = useCardsStore();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user.id = user.uid;
        this.user.email = user.email;
        this.router.push('/');
        cardsStore.init();
      } else {
        this.user.id = null;
        this.user.email = '';
        this.router.replace('/login');
        cardsStore.clearUsersCards();
      }
    });
  }
  function registerUser(credentials) {
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password,
    )
      .then((userCredential) => {
        // Signed up
        setupUser(userCredential);
      })
      .catch((error) => {
        console.log('registerUser::error:', error.message);
      });
  }

  function logoutUser() {
    signOut(auth);
  }

  function loginUser(credentials) {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  }

  // helper functions
  function setupUser(userCredential) {
    console.log(userCredential);
    // add all cards with 0 quantity
  }

  return {
    // state
    user,
    // getters,
    //actions
    init,
    registerUser,
    logoutUser,
    loginUser,
  };
});
