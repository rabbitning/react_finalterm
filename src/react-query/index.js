import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getArticles, getArticlesByGenre, getArticleById, toggleBookMark, getUserInfo, getUserById, login, register, logout, createArticle } from "../api"

export const useArticles = () => {
    const { data, isLoading } = useQuery([], getArticles)
    return { data, isLoading }
}

export const useArticlesByGenre = (genre) => {
    const { data, isLoading } = useQuery([genre], getArticlesByGenre)
    return { data, isLoading }
}

export const useArticleById = (articleId) => {
    const { data, isLoading } = useQuery([articleId], getArticleById)
    return { data, isLoading }
}

export const useToggleBookMark = () => {
    const queryClient = useQueryClient()
    return useMutation(toggleBookMark, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(["uid"])
        }
    })
}

export const useUserInfo = () => {
    return useQuery({
        queryKey: ["uid"],
        queryFn: getUserInfo,
        initialData: {}
    })
}

export const useUserById = (uid) => {
    const { data, isLoading } = useQuery([uid], getUserById)
    return { data, isLoading }
}

export const useSignInWithEmailPassword = () => {
    const queryClient = useQueryClient()
    return useMutation(login, {
        onSuccess: () => {
            queryClient.invalidateQueries(["uid"])
        }
    })
}

export const useRegisterWithEmailPassword = () => {
    const queryClient = useQueryClient()
    return useMutation(register, {
        onSuccess: () => {
            queryClient.invalidateQueries(["uid"])
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient()
    return useMutation(logout, {
        onSuccess: () => {
            queryClient.invalidateQueries(["uid"])
        }
    })
}

export const useCreateArticle = () => {
    return useMutation(createArticle, {})
}