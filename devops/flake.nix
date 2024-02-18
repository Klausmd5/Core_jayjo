{
  inputs.nixpkgs-unstable.url = "nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs-unstable }: {

    devShells.x86_64-linux.default =
      let pkgs = nixpkgs-unstable.legacyPackages.x86_64-linux;
      in with pkgs; mkShell { buildInputs = [ packer ]; };

  };
}
