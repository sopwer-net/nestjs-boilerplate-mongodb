import { MailFactory } from "./mail.factory";

export class MailProviderService {
    static getMailProvider(provider : string) {
        return MailFactory.getProvider(provider)
    }
}
