//有关权限的 混入对象
export const roleMixin = {
    computed: {
        userRole() {
            return this.$store.getters.userRole;
        }
    }
};
