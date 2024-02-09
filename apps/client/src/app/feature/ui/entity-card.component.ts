import { Component, computed, inject, input, Input, InputSignal, Signal, signal, WritableSignal } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Platform } from "@models/Platform";
import { Partner } from "@models/Partner";
import { UploadedFile } from "@models/UploadedFile";
import { Router } from "@angular/router";


@Component({
  selector: "entity-card",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
      <div (click)="goToItem(item())" class="link">
        <div class="item-logo-container">
            <div class="item-logo-ratio">
                <div>
                    <span class="item-logo">
                        @switch (!!logo() && !!hasLogo()) {
                            @case (true) {
                                <img
                                   [alt]="title()"
                                   (error)="hasLogo.set(false)"
                                   [ngSrc]="'/assets/upload/' + logo()"
                                   fill="true"
                                />
                            }
                            @default {
                                <span class="font-xxl">{{ title() }}</span>
                            }
                        }
                    </span>
                </div>
            </div>
        </div>

        @if(!compact()){
            @if(!!title()){
                <h3 class="item-title"><span>{{ title() }}</span></h3>
            }
            @if(!!shortDescription()){
                <p class="item-description">{{ shortDescription() }}</p>
            }
            @if(!!footer()){
                <h3 class="item-footer">{{ footer() }}</h3>
            }
        }
      </div>
  `,
  styles: [// Language=SCSS
  `
    @import "theme-variables";
    @import "global";
    :host {
      @extend .b-2;
      display:flex;
      flex-direction: column;

      .item-logo-container{
        width: 100%;

        .item-logo-ratio{
          background-color: darken($color-base-accent, 2%);
          width: 100%;
          position:relative;
          padding-bottom: 60%;

          & > *{
            position: absolute;
            top:0; right:0; bottom:0; left:0;
            width: 100%;
            height: 100%;
            display:flex;
            justify-content: center;
            align-items: center;

            .item-logo{
              display:flex;
              justify-content: center;
              align-items: center;
              position: relative;
              width: 100%;
              height: 100%;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              cursor: pointer;

              img{
                width: 100%;
                height: auto;
                object-fit: contain;
              }
            }
          }
        }
      }
      .item-title{
        @extend .font-l;
        @extend .t-1;
        font-weight:400;
        text-decoration: underline;
      }
      .item-footer{
        @extend .color-base-accent-dark;
        @extend .font-xs;
        font-weight:400;
        word-wrap: break-word;
      }
      .item-description{
        @extend .b-1;
        @extend .font-xs;
        word-wrap: break-word;
        white-space: nowrap;
        font-weight:400;
        overflow-x: hidden;
        text-overflow: ellipsis;
      }
    }
  `],
})
export class EntityCardComponent {
  // Dependency Injection
  private router: Router = inject(Router)

  // Inputs
  public entity: InputSignal<any> = input();
  public compact: InputSignal<boolean> = input();

  // Properties
  public hasLogo: WritableSignal<boolean> = signal(true)
  public shortDescription: Signal<string> = computed(()=> this.item()?.description?.replace(/<[^>]*>/g, ''))
  public logo: Signal<string> = computed(()=> this.item()?.logo?.key)
  public title: Signal<string> = computed(()=> this.item()?.title)
  public website: Signal<string> = computed(()=> this.item()?.website)
  public footer: Signal<string> = computed(()=> this.item()?.footer)
  public item: Signal<CardEntity> = computed(() => {
    return this.entity() instanceof Platform
      ? CardEntity.fromPlatform(this.entity())
      : this.entity() instanceof Partner
        ? CardEntity.fromPartner(this.entity())
        : CardEntity.fromEntity(this.entity())
  });

  // Methods
  public goToItem(item: CardEntity){
    if(this.compact()) {
      window.open(item.website, '_blank')
    }
    else if(item.type === 'Partner'){
      this.router.navigate([`/team`], {fragment: item.entity.platform.country.name})
    }
    else if(item.type === 'Platform'){
      this.router.navigate(['/team'], {fragment: item.entity.country.name})
    }
    else{
      window.open(item.website, '_blank')
    }
  }
}


export class CardEntity{
  constructor(props: Partial<CardEntity>) {
    Object.assign(this, props)
  }
  title?: string
  description?: string
  footer?: string
  logo?: UploadedFile
  website?: string
  type?: string
  entity?: any

  public get filePath(){
    return this.logo ? `/public/upload/${this.logo?.key}` : ''
  }

  static fromPlatform(platform: Platform){
    return new CardEntity({
      title: platform.name,
      // description: platform.description,
      footer: platform.country.name,
      website: platform.website,
      logo: platform.logo,
      type: 'Platform',
      entity: platform
    })
  }

  static fromPartner(partner: Partner){
    return new CardEntity({
      title: partner.name,
      description: partner.description,
      footer: partner.platform.name,
      website: partner.website,
      logo: partner.logo,
      type: 'Partner',
      entity: partner
    })
  }

  static fromEntity(entity: any){
    return new CardEntity({
      ...entity,
      title: entity.name,
      website: entity.website,
      footer: entity.website,
      logo: entity.logo,
      type: 'Entity',
      entity: entity
    })
  }
}
