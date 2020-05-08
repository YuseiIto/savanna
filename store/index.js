export const state = () => ({
    authInfo: {},
    dbUid: ""
});

export const actions = {
    login({ commit }, object) {
        commit("setAuthInfo", object);
    },
    setDbUid({ commit }, id) {
        commit("setDbUid", id);
    }
};

export const mutations = {
    setAuthInfo(state, authInfo) {
        state.authInfo = authInfo;
    },
    setDbUid(state, id) {
        state.dbUid = id;
    }
};