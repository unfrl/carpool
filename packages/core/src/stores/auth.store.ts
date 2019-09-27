import { observable, action } from "mobx";

export class AuthStore {
    // TODO: move this to observable based on `user` prop
    @observable
    public isAuthenticated: boolean = false;

    @action
    public signIn = (email: string, password: string) => {
        // TODO: post to sign in endpoint here
        this.isAuthenticated = true;
    };

    @action
    public signOut = () => {
        this.isAuthenticated = false;
    };
}
