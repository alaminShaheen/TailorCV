export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PASSWORD_RESET: '/passwordReset',
    ALL_RESUMES: '/resumes',
    RESUME: (id: string) => `/resumes/${id}`,

}