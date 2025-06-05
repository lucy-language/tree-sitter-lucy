"return" @keyword.return
"use" 	 @keyword.import
"def"    @keyword.function
"pkg"	 @keyword.type
"as" 	 @keyword

[
 "if"
 "else"
] @keyword.conditional

[
 "global"
 "const"
 "ext"
 "var"
] @keyword.modifier

(string)  @string
(escape_sequence) @string.escape

(char) 	  @character
(integer) @number
(boolean) @boolean

[
 (float)
 (double)
] @number.float

(comment) @comment

(type
  "{"
  (identifier) @type.builtin
  .
  (identifier) @type.builtin
  "}"
)

(type
  (identifier) @type.builtin
)

[
 "("
 ")"
 "{"
 "}"
 "["
 "]"
] @punctuation.bracket

(def
  .
  (def_name) @function
  .
)

(pkg
  .
  (path) @module
  .
)

(call
  (def_name) @function.call
  .
)
