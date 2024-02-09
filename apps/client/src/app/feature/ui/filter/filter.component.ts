import {
  Component,
  computed, effect,
  EventEmitter,
  input,
  InputSignal,
  Output,
  signal,
  Signal,
  WritableSignal
} from "@angular/core";
import { CommonModule, NgClass } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { ExpandableComponent } from "@app/feature/ui/expandable";
import { intersection, xor } from "lodash";


@Component({
  selector: "filter",
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, ExpandableComponent],
  styleUrls: ['./filter.component.scss'],
  template: `
    <!-- Desktop -->
    <expandable class="hide-on-mobile">
      <span class="panel-title" title>Select {{ name() }}</span>
      <div class="mat-panel-content" content>
        <div class="checkbox-list">
          <mat-checkbox [checked]="areAllSelected()" (change)="toggleValue(undefined)">All {{ name() }}</mat-checkbox>
          @for(item of selectedValuesIndexed(); track item[0]) {
            <mat-checkbox [checked]="item[1]" (change)="toggleValue(item[0])">{{ item[0] }}</mat-checkbox>
          }
        </div>
      </div>
    </expandable>

    <!-- Mobile -->
    @if(isFilterExpanded()) {
      <div class="hide-on-desktop">
        <span class="panel-title">Select {{ name() }}</span>
        <div class="mat-panel-content">
          <div class="button-container">
            <button class="filter-button" [class.selected]="areAllSelected()" (click)="toggleValue(undefined)">All {{ name() }}</button>
            @for(item of selectedValuesIndexed(); track item[0]) {
              <button class="filter-button" [class.selected]="item[1]" (click)="toggleValue(item[0])">{{ item[0] }}</button>
            }
          </div>
        </div>
      </div>
    }
  `
})

export class FilterComponent<T>{
  constructor() {
    // Change Output when selectedValues change
    // TODO: try to avoid the usage of allowSignalWrites
    effect(() => this.onChange.emit(this.selectedValues()), {allowSignalWrites: true})
  }

  /* Inputs/Outputs */
  public availableValues: InputSignal<T[]> = input([], {alias: 'values'})
  public name: InputSignal<string> = input('')
  @Output() onChange = new EventEmitter<T[]>()

  /* Properties */
  protected selectedValuesWritable: WritableSignal<T[]> = signal(undefined)
  protected selectedValues: Signal<T[]> = computed(() => {
    if (!this.selectedValuesWritable()) return this.availableValues()
    return intersection(this.selectedValuesWritable(), this.availableValues())
  })
  // Map of available values -> boolean (indicating if the value is selected)
  public selectedValuesIndexed: Signal<Map<T, boolean>> = computed(() => {
   return this.availableValues().reduce((map, value) => map.set(value, this.isValueSelected(value)), new Map())
  })

  // True if all values are selected
  public areAllSelected: Signal<boolean> = computed(() => {
    return intersection(this.selectedValues(), this.availableValues()).length === this.availableValues().length
  })

  public isFilterExpanded: WritableSignal<boolean> = signal(true)

  /* Methods */
  // Selection method that compute the selected values based on current state and given value
  public toggleValue(value: T): void {
    this.selectedValuesWritable.set(value === undefined ? this.allValueToggled() : this.singleValueToggled(value))
  }

  /* Helper methods */
  // Return an array base on current state: if all values are selected return an empty array, otherwise return all available values
  protected allValueToggled(): T[] { return this.areAllSelected() ? [] : this.availableValues() }
  // Return an array base on current state: if the value is selected return an array without it, otherwise return an array with it
  protected singleValueToggled(value: T): T[] { return xor(this.selectedValues(), [value]) }
  // Return true if the value is selected
  protected isValueSelected(value: T): boolean { return this.selectedValues()?.includes(value) }
}
