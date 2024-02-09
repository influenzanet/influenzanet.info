import { Component, OnInit, signal, WritableSignal } from "@angular/core";

@Component({
  selector: 'main-footer',
  standalone: true,
  styleUrls: ['./main-footer.component.scss'],
  template: `
  <div class="top">
    <img class="logo" src="/assets/img/logo/influenzaNet/influenzanet_logo_white.png" alt="influenzaNet Logo">
    <div class="top-content">
      <div class="influenza-net">
          <span>
            <span>Influenzanet is a scientific collaboration coordinated by</span>
            <span>&nbsp;</span>
            <a href="https://isi.it/" target="_blank" class="link">ISI Foundation</a>
            <span>, via Chisola 5 Torino.</span>
          </span>
      </div>

      <div class="top-right">
        <div class="contact">
          <span class="top-title">Contact</span>
          <span class="t-0"><a href="Mailto:isi@isi.it ">isi<span>&#64;</span>isi.it</a></span>
        </div>

        <div class="social">
          <span class="top-title">Social</span>
          <span class="t-0 social-list">
            <a href="https://twitter.com/_InfluenzaNet_" target="_blank"><i class="fa-brands fa-twitter"></i></a>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom">
    <span>©{{currentYear()}} Privacy Policy</span>
  </div>
  `
})
export class MainFooterComponent{
  public currentYear: WritableSignal<number> = signal(new Date().getFullYear())
}
