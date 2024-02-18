export class ActivePlugin {
  constructor(
    // id of plugin
    public id: string,
    // name of plugin
    public name: string,
    // current state of plugin
    public active: boolean,
  ) {
  }
}
