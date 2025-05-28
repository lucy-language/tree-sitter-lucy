<div align="center">
    <img alt="logo" src="res/logo.png" width="200" height="200" />
</div>

# Lucy Tree-sitter

## Installation

### Neovim

1. Install the [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) plugin
2. Add this to your init.lua file
```lua
require "nvim-treesitter.parsers".get_parser_configs().lucy = {
  install_info = {
    url = "https://github.com/lucy-language/tree-sitter-lucy",
    files = { "src/parser.c" },
    branch = "master"
  },
  filetype = "lc"
}
```
If you use an init.vim file add this
```lua
lua << EOF
require "nvim-treesitter.parsers".get_parser_configs().lucy = {
  install_info = {
    url = "https://github.com/lucy-language/tree-sitter-lucy",
    files = { "src/parser.c" },
    branch = "master"
  },
  filetype = "lc"
}
EOF
```
3. Open neovim and run `:TSInstall lucy`
4. To add highlighting follow [these steps](https://github.com/nvim-treesitter/nvim-treesitter?tab=readme-ov-file#adding-queries) with the files found [here](https://github.com/lucy-language/tree-sitter-lucy/tree/master/queries)