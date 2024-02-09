import { Directive, TemplateRef } from "@angular/core";

@Directive({
  selector: '[template]',
  standalone: true,
})
export class TemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}
