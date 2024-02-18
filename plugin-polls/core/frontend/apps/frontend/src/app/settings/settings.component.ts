import {AfterViewInit, Component} from "@angular/core";
import type {AccordionInterface, AccordionItem, AccordionOptions} from "flowbite";
import {Accordion} from "flowbite";
import {MainframeService} from "../../../../auth/src/app/mainframe.service";
import {CredService} from "../../../../auth/src/app/core/cred.service";
import {OnboardingService} from "../../../../auth/src/app/onboarding.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})

export class SettingsComponent implements AfterViewInit {

  accordionItems: AccordionItem[] = [];
  options: AccordionOptions = null!;
  accordion: AccordionInterface = null!;

  checked: boolean = true;
  credentials: string[] = ["Eduvidual"];
  selectedItem: AccordionItem | null = null;
  username?: string = "";
  password?: string = "";
  token: string = "";
  changeAnswer: string = "";

  constructor(private credService: CredService,
              private mainframe: MainframeService,
              private onboarding: OnboardingService) {
  }

  async click(credentials: string) {
    this.changeAnswer = "";
    if (this.isValid()) {
      switch (credentials) {
        case "Eduvidual":
          await this.onboarding.setEduvidualToken(this.token).then(_ => {
          }).catch(_ => {
            this.changeAnswer = "Token konnte nicht gespeichert werden!";
            return;
          });
          break;
        default:
          break;
      }
    } else this.changeAnswer = "Geben Sie valide Daten ein!";
    if (this.changeAnswer.length === 0) this.changeAnswer = "!Error! Leider konnten wir Sie nicht anmelden. Versuchen Sie es bitte erneut!";
  }

  private isValid(): boolean {
    return (this.token !== undefined && this.token.length > 0) || (this.username !== undefined && this.username?.length > 0 && this.password !== undefined && this.password?.length > 0);
  }

  ngAfterViewInit(): void {
    if (this.accordionItems.length > 1) return;
    for (const credential of this.credentials) {
      this.accordionItems.push({
        id: `accordion-${credential}-heading`,
        triggerEl: document.querySelector(`#accordion-${credential}-heading`)!,
        targetEl: document.querySelector(`#accordion-${credential}-body`)!,
        active: false
      })
    }
    this.options = {
      alwaysOpen: false,
      activeClasses: "text-gray-500",
      inactiveClasses: "text-gray-500",
      onOpen: (_) => {
        this.changeAnswer = "";
      },
      onClose: (_) => {
      },
      onToggle: (_) => {
      },
    }

    this.accordion = new Accordion(this.accordionItems, this.options)
    this.accordion.open(`accordion-${(this.credentials)[1]}-header`)
  }

  clicked(credential: string) {
    let clickedItem = this.accordion.getItem(`accordion-${credential}-heading`)
    if (clickedItem?.active) {
      this.selectedItem = null
      this.accordion.close(`accordion-${credential}-heading`)
    } else if (clickedItem != null) {
      this.selectedItem = clickedItem
      this.accordion.open(`accordion-${credential}-heading`)
    }
  }
}
