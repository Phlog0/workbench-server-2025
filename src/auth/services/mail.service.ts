import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendActivationLink(to: string, link: string) {
    try {
      // const result = await this.mailerService.sendMail({
      //   from: process.env.EMAIL_USER,
      //   to,
      //   subject: `Активация аккаунта на сайте ${process.env.SERVER_URL}`,
      //   html: `
      // <div>
      // <h1>Для активации перейдите по ссылке:</h1>
      // <a href=${link}>${link}</a>
      // </div>
      // `,
      // });
      console.log("Посылаем на почту...");
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }
}
