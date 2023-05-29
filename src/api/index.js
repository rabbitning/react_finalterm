import { getApps, getApp, initializeApp } from "firebase/app"
import { getFirestore, collection, doc, setDoc, getDoc, addDoc, getDocs, updateDoc, deleteDoc, query, where } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, initializeAuth } from 'firebase/auth'
import _ from "lodash"

const firebaseConfig = {
    apiKey: "AIzaSyCv9Qi--92e-I_9npBGZdCex9bO2ggS7jU",
    authDomain: "react-finalterm-4a5ed.firebaseapp.com",
    projectId: "react-finalterm-4a5ed",
    storageBucket: "react-finalterm-4a5ed.appspot.com",
    messagingSenderId: "824817652271",
    appId: "1:824817652271:web:cda1a14106a152aa656cda"
}

const app_length = getApps().length > 0

// Initialize Firebase
const app = app_length ? getApp() : initializeApp(firebaseConfig)

// REFERENCE DB
const db = getFirestore(app)

const auth = app_length ? getAuth(app) : initializeAuth(app);

// REFERENCE COLLECTION
const articlesCollection = collection(db, "articles")

export const feedArticles = async () => {
    // DELETE ALL EXISTING DOCS
    // const querySnapshot = await getDocs(articlesCollection)
    // querySnapshot.forEach(async (article) => {
    //     await deleteDoc(doc(db, "articles", article.id))
    // })
    // ADD NEW DOCS
    //console.log(articles)
    articles.forEach(async (article) => {
        const docRef = await doc(articlesCollection)
        await setDoc(docRef, { ...article, id: docRef.id })
    })
}

export const getArticles = async () => {
    let querySnapshot = await getDocs(articlesCollection)
    let result = []
    querySnapshot.forEach(async (article) => {
        await result.push(article.data())
    })
    return result
}

export const getArticleById = async ({ queryKey }) => {
    const [id] = queryKey
    const docRef = await doc(db, "articles", id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
}

export const getArticlesByGenre = async ({ queryKey }) => {
    const [genre] = queryKey
    const q = await query(
        articlesCollection,
        where("genre", "==", genre)
    )
    let querySnapshot = await getDocs(q)
    let result = []
    querySnapshot.forEach(async (article) => {
        await result.push(article.data())
    })
    return result
}

export const getUserInfo = async () => {
    const storedUser = localStorage.getItem("user")
    const user = auth?.currentUser || JSON.parse(storedUser) || null

    if (user) {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        const userDoc = docSnap.data()
        return {
            uid: user.uid,
            email: user.email,
            ...userDoc
        }
    } else {
        return {}
    }
}

export const getUserById = async ({ queryKey }) => {
    const [uid] = queryKey
    const docRef = await doc(db, "users", uid)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
}

export const toggleBookMark = async (articleId, uid) => {
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)
    const userDoc = docSnap.data()
    const markedList = userDoc?.markedList || []
    if (markedList.length === _.pull(markedList, articleId).length) {
        markedList.push(articleId)
    }
    await updateDoc(docRef, { markedList })
    return markedList
}

export const login = async ({ email, password }) => {
    await signInWithEmailAndPassword(
        auth,
        email,
        password
    )
    const user = auth.currentUser
    localStorage.setItem("user", JSON.stringify(user))
}

export const register = async ({ name, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
    )
    const user = userCredential?.user
    localStorage.setItem("user", JSON.stringify(user))
    const docRef = doc(db, "users", user.uid)
    await setDoc(docRef, {
        id: user.uid,
        name,
        email,
        profile: ""
    })
}

export const logout = async () => {
    await auth.signOut()
    localStorage.removeItem("user")
}

export const createArticle = async ({ author, articletitle, genre, contentNew }) => {
    const docRef = await addDoc(articlesCollection, {
        author,
        articletitle,
        contentNew,
        genre
    })
    const id = docRef.id
    await updateDoc(doc(articlesCollection, id), { id })
}