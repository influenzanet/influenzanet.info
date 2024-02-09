import { DomSanitizer } from "@angular/platform-browser";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "TrustHtml", standalone: true, pure: true})
export class TrustHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}

  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
