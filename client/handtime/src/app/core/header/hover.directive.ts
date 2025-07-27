import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class hoverDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @HostBinding('style.backgroundColor') backgroundColor: string = '#f0f0f0';
  @HostBinding('style.padding') padding: string = '3px';

  @HostListener('mouseenter') onMouseOver() {
    this.renderer.setStyle(this.element.nativeElement, 'padding', '15px');
    this.renderer.setStyle(this.element.nativeElement, 'transition', '0.5s');
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', '#8019c8');
    this.renderer.setStyle(this.element.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('mouseleave') onMouseOut() {
    this.renderer.setStyle(this.element.nativeElement, 'padding', '3px');
    this.renderer.setStyle(this.element.nativeElement, 'transition', '0.5s');
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', '#f0f0f0');
    this.renderer.setStyle(this.element.nativeElement, 'color', 'initial');
  }
}
