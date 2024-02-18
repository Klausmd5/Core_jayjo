import {HttpClient} from "@angular/common/http";
import {Component, Input, OnInit} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.css"],
})
export class CardsComponent implements OnInit {

  @Input() title: string = "Synopsis Core";
  @Input() repoOwner: string = "htl-grieskirchen-core";
  @Input() repoName: string = "core";
  @Input() yearFinished: string = "2023";


  constructor(private http: HttpClient) {
  }

  contributors: any[] = [];
  lastContribute: any[] = [];

  configUrl = "https://api.github.com/repos/" + this.repoOwner + "/" + this.repoName + "/contributors";
  commitUrl = "https://api.github.com/repos/" + this.repoOwner + "/" + this.repoName + "/commits?per_page=1&author=";
  year : string = this.yearFinished ?? new Date().getFullYear().toString();

  getContributors() {
    return this.http.get<any>(this.configUrl);
  }

  getCommitCount(username: string) {
    return this.http.get<any>(this.commitUrl+username);
  }

  getCommitCountStr(user: any): string {
    return this.to2Digits(user.contributions);
  }

  to2Digits(nr: number): string {
    return nr.toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping:false}).toString();
  }

  toNr(str: string) {
    return parseInt(str);
  }

  ngOnInit(): void {
    this.configUrl = "https://api.github.com/repos/"+this.repoOwner+"/"+this.repoName+"/contributors";
    this.commitUrl = "https://api.github.com/repos/" + this.repoOwner + "/" + this.repoName + "/commits?per_page=1&author=";

    this.getContributors()
      .subscribe(data => {
        console.log(data);
        this.contributors = data;

        this.contributors.forEach(x=> {
          this.getCommitCount(x.login).subscribe(count => {

            const frst = this.to2Digits(new Date(count[0].commit.author.date).getMonth()+1).toString();
            const scnd = new Date(count[0].commit.author.date).getFullYear().toString().substr(2,4);

            this.lastContribute[x.login] = frst + scnd;
          });
        })
      });
  }
}
