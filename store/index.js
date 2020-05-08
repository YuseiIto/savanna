export const state = () => ({
    accessToken: "",
    user: null
});

export const mutations = {
    setAccessToken(token) {
        state.accessToken = token;
    },
    setUser(user) {
        state.user = user;
    }
};