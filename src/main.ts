import App from './App.svelte';
import { firebaseConfig } from './config/firebase.config';

import firebase from 'firebase/app';

firebase.initializeApp(firebaseConfig);

const app = new App({
	target: document.body
});

export default app;
