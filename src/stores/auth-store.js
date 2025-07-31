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
    email: '',
  });

  /* getters */

  /* actions */
  function init() {
    const cardsStore = useCardsStore();
    cardsStore.fetchAllCards();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user.id = user.uid;
        this.user.email = user.email;
      } else {
        this.user.id = null;
        this.user.email = '';
        cardsStore.clearUsersCards();
      }
      this.router.push('/');
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
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(() => {
        const cardsStore = useCardsStore();
        cardsStore.fetchAllUsersCards();
      })
      .catch((error) => {
        console.log('login error', error.message);
      });
  }

  // helper functions
  function setupUser(userCredential) {
    const cardsStore = useCardsStore();
    if (userCredential && userCredential.user) {
      cardsStore.setupNewUser();
    }
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
