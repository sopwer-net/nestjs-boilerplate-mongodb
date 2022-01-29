const path = require("path")
const handlebars = require("handlebars")
const fs = require("fs")

export interface EmailOptions {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    template?: string;
    attachment?;
    'h:X-Mailgun-Variables'?: string;
  }


const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8")

const template = handlebars.compile(emailTemplateSource)