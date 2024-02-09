import { Component, computed, inject, Input, signal, Signal, WritableSignal } from "@angular/core";
import { PlatformDataProvider } from "../platform-data.provider";
import { CommonModule } from "@angular/common";
import { EntityCardComponent } from "@app/feature/ui/entity-card.component";
import { toSignal } from "@angular/core/rxjs-interop";


@Component({
  selector: 'platform-card-grid',
  standalone: true,
  imports: [CommonModule, EntityCardComponent],
  template: `<entity-card *ngFor="let item of dataList()" [entity]="item"/>`,
  styles: // Language=SCSS
    `
      @import "global";
      :host { @extend .card-grid; }
    `
})
export class PlatformCardGridComponent<T>{
  private platformDataProvider: PlatformDataProvider = inject(PlatformDataProvider)

  public dataOverride: WritableSignal<T[]> = signal(undefined)
  public dataDefault: Signal<any[]> = toSignal(this.platformDataProvider.platformList$)
  public dataList: Signal<T[]> = computed(()=>this.dataOverride() ? this.dataOverride() : this.dataDefault())

  @Input()
  set data(data: any[]){this.dataOverride.set(data)}
}
