import {Component, OnInit} from "@angular/core";
import {SearchService} from "../../core/search.service";
import {Plugin, PluginListService} from "mainframe-connector";
import {SelectOption} from "../../../../../../libs/core-ui/src/lib/syno-select-multiple/syno-select-multiple.component";
import {setTagColors} from "core-ui";
import {UserService} from "../../core/user.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService,
              private pluginService: PluginListService,
              private userService: UserService,) {
  }

  public searchterm: string = "";

  public results: Plugin[] = [];
  private plugins: Plugin[] = [];
  private tags: string[] = [];
  public selectOptions: SelectOption[] = [];

  ngOnInit(): void {
    this.pluginService.getPluginList().then((plugins: Plugin[]) => {
      this.plugins = plugins.sort((a, b) => a.name.localeCompare(b.name));
      this.tags = [...new Set(this.plugins.flatMap((x) => x.tags))];
      this.tags.forEach(x => this.selectOptions.push({title: x, checked: false}));

      this.userService.getFavorites();
    });

    this.userService.favorites.subscribe(x => {
        x.forEach(fav => {
          this.plugins.find(p => p.id === fav.pluginID)!.isFavourite = true;
        });
        this.results = this.plugins;
    });
  }

  search() {
    this.searchTitle();
    this.searchTags();
  }

  searchTitle() {
    if (this.searchterm === "") this.results = this.plugins;
    else this.results = this.plugins.filter(x => x.name.toUpperCase().includes(this.searchterm.toUpperCase()));
  }

  searchTags() {
    let selected: string[] = this.selectOptions.filter(x => x.checked).map(x => x.title);
    if (selected.length === 0 && this.searchterm === "") this.results = this.plugins;
    else if (selected.length !== 0) this.results = this.results.filter(x => selected.every(t => x.tags.includes(t)));
  }

  close() {
    this.searchService.isSearchShown.next(false);
  }
}
