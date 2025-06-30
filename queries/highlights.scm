"return" @keyword.return
"use" 	 @keyword.import
"pkg"	   @keyword.type

[
    "def"
	  "macro"
] @keyword.function

[
    "as"
	  "struct"
] @keyword

[
    "if"
    "else"
	  "while"
	  "switch"
	  "case"
    "for"
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
    "("
    (identifier) @type.builtin
    .
    (identifier) @type.builtin
    ")"
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
    (def_name (identifier) @function.call)
    .
)

(access
    (path (identifier) @keyword)
)
