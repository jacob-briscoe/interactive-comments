import { NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { BasicSizeUnit } from "../../model/size.type";

@Component({
  selector: "app-avatar",
  imports: [],
  template: `
    @if (picture) {
      <div [class]="containerClasses">
        <img alt="Avatar" [src]="picture" />
      </div>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() size: BasicSizeUnit = "small";
  @Input({ required: true }) picture: string | null = null;

  get containerClasses() {
    const small = ["h-8", "w-8"];

    switch (this.size) {
      case "large":
        return [...small, "sm:h-10", "sm:w-10"];
      case "small":
      default:
        return small;
    }
  }
}
