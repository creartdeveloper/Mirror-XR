
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
    import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
    import { getFirestore, collection, addDoc, getDocs,setDoc,doc,query,where} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

    // Your Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDiCIatzcDsnHdX_t-m15S1a8pNlrB2egs",
        authDomain: "mira-7360b.firebaseapp.com",
        projectId: "mira-7360b",
        storageBucket: "mira-7360b.appspot.com",
        messagingSenderId: "76074103771",
        appId: "1:76074103771:web:1a2d4ca7e8b5df27a82dfe",
        measurementId: "G-9YL8FHBDRX"
    };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const CHAT_MESSAGE_COLLECTION = "chat_message";


        // Keep track of current texts
        let currentTexts = {
            text1: '',
            text2: '',
            text3: '',
            text4: ''
        };

           // Sanitize the user input
    function sanitizeInput(input) {
        const element = document.createElement('div');
        if (input) {
            element.innerText = input;
            return element.innerHTML;
        }
        return input;
    }

    // Update text if different
    function updateTextIfDifferent(id, newText) {
        const element = document.getElementById(id);
        
        if (element && (!element.textContent || element.textContent !== newText)) {
            console.log(element.textContent);
            element.textContent = newText;
        }
    }

    // Main function to load messages
    async function loadMessagesFromFirestore() {
        try {
            const q = query(collection(db, CHAT_MESSAGE_COLLECTION));
            const querySnapshot = await getDocs(q);
            
            let messages = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const sanitizedText = sanitizeInput(data.text);
                updateTextIfDifferent(data.id, sanitizedText);
            });

        } catch (error) {
            console.error("Error loading messages:", error);
        }
    }

        // Set up interval to fetch messages
        setInterval(loadMessagesFromFirestore, 3000);

        // Initial load
        loadMessagesFromFirestore();

    