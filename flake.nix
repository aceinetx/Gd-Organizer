{
  description = "gdorganizer";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            wails
            stdenv.cc.cc
            stdenv.cc.cc.lib
            libx11
            libxrandr
            libxinerama
            libxcursor
            libxi
            libGL
            pkg-config
            webkitgtk_4_1
            libsoup_3
          ];

          env.LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
            pkgs.libglvnd
            pkgs.alsa-lib
          ];
        };
      }
    );
}
