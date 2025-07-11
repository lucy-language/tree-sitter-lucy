"return" @keyword.return
"use"    @keyword.import
"pkg"    @keyword.type

[
    "def"
    "macro"
] @keyword.function

[
    "as"
    "struct"
    "link"
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
    "const"
    "ext"
    "var"
] @keyword.modifier

[
    "true"
    "false"
] @boolean

"." @punctuation.delimiter

[
    "=="
	"!="
	"&&"
	"||"
	">="
	"<="
	">"
	"<"
	"+"
	"-"
	"*"
	"/"
] @operator

(STRING) @string
(escape_sequence) @string.escape

(CHAR) @character
(INTEGER) @number
(BOOLEAN) @boolean

[
   (FLOAT)
   (DOUBLE)
] @number.float

(type
    (IDENTIFIER) @type.builtin
)

[
   "("
   ")"
   "{"
   "}"
;    "["
;    "]"
] @punctuation.bracket

(def
    (IDENTIFIER) @function
)

(macro
    (IDENTIFIER) @function
)

(pkg
    (path) @namespace
)

(use
    (path) @namespace
)

(call
    (IDENTIFIER) @function.call
)

(link
    (IDENTIFIER) @namespace
)

(struct
    (IDENTIFIER) @type
)

(struct_field
    (IDENTIFIER) @property
)

(parameter
    (IDENTIFIER) @parameter
)

(var
    (IDENTIFIER) @variable
)

(const
    (IDENTIFIER) @constant
)

(inc
    (IDENTIFIER) @variable
)

(reassign
    (IDENTIFIER) @variable
)

(
    (IDENTIFIER) @constant
    (#match? @constant "^[A-Z][A-Z0-9_]*$")
)

(access
    (IDENTIFIER) @property
    "." @punctuation.delimiter
    (identifier) @identifier
)

(access
    (IDENTIFIER) @property
    "." @punctuation.delimiter
    (identifier) @constant
    (#match? @constant "^[A-Z][A-Z0-9_]*$")
)

(ext
    (IDENTIFIER) @function
    (parameters)
    "as" @keyword
    (IDENTIFIER) @property
)

(ext
    (IDENTIFIER) @function
    (parameters)
    .
)
