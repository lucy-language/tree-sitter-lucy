module.exports = grammar({
    name: "lucy",
    rules: {
        source_file: $ => seq(
            optional(repeat($.COMMENT)),
            repeat($.link),
            $.pkg,
            repeat($.statement)
        ),
        link: $ => seq(
            "link",
            "<",
            $.IDENTIFIER,
            ">",
            ";",
        ),
        pkg: $ => seq(
            "pkg",
            $.path,
            ";"
        ),
        path: $ => prec.left(1, seq(
            $.IDENTIFIER,
            repeat(seq(
                ".",
                $.IDENTIFIER
            ))
        )),
        statement: $ => choice(
            $.use,
            $.def,
            $.ext,
            $.const,
            $.macro,
            $.struct,
            $.COMMENT
        ),
        use: $ => seq(
            "use",
            $.path,
            ";"
        ),
        def: $ => seq(
            "def",
            $.type,
            $.IDENTIFIER,
            $.parameters,
            $.body
        ),
        type: $ => choice(
            $.tuple_type,
            $.IDENTIFIER
        ),
        parameters: $ => seq(
            "(",
            optional(seq(
                $.parameter,
                repeat(seq(
                    ",",
                    $.parameter
                ))
            )),
            ")",
        ),
        parameter: $ => seq(
            optional("var"),
            optional($.type),
            $.IDENTIFIER
        ),
        body: $ => seq(
            "{",
            repeat($.body_statement),
            "}"
        ),
        body_statement: $ => choice(
            $.if,
            $.var,
            $.for,
            $.while,
            $.return,
            $.switch,
            seq(
                $.identifier,
                ";"
            ),
            $.COMMENT
        ),
        identifier: $ => choice(
            $.call,
            $.access,
            $.reassign,
            $.inc,
            $.IDENTIFIER
        ),
        ext: $ => seq(
            "ext",
            $.type,
            $.IDENTIFIER,
            $.parameters,
            optional(seq(
                "as",
                $.IDENTIFIER
            )),
            ";"
        ),
        struct: $ => seq(
            "struct",
            $.IDENTIFIER,
            $.struct_fields
        ),
        struct_fields: $ => seq(
            "{",
            repeat(choice(
                $.struct_field,
                $.COMMENT
            )),
            "}"
        ),
        struct_field: $ => seq(
            $.type,
            $.IDENTIFIER,
            ";"
        ),
        var: $ => seq(
            "var",
            $.type,
            $.IDENTIFIER,
            repeat(seq(
                ",",
                $.IDENTIFIER
            )),
            "=",
            $.expression,
            ";"
        ),
        expression: $ => choice(
            prec.left(1, seq(
                $.expression,
                choice(
                    "+",
                    "-",
                    "*",
                    "/",
                    "==",
                    "!=",
                    ">=",
                    "<=",
                    ">",
                    "<",
                    "&&",
                    "||"
                ),
                $.expression
            )),
            $.term
        ),
        term: $ => choice(
            $.CHAR,
            $.FLOAT,
            $.init,
            $.DOUBLE,
            $.STRING,
            seq(
                "(",
                $.expression,
                ")"
            ),
            $.BOOLEAN,
            $.INTEGER,
            $.identifier,
            $.BUILTIN_VAR
        ),
        init: $ => seq(
            "{",
            repeat(seq(
                $.init_value,
                repeat(seq(
                    ",",
                    $.init_value
                ))
            )),
            "}"
        ),
        init_value: $ => seq(
            optional(seq(
                ".",
                $.IDENTIFIER,
                "="
            )),
            $.expression
        ),
        tuple_type: $ => seq(
            "(",
            $.type,
            repeat(seq(
                ",",
                $.type
            )),
            ")"
        ),
        call: $ => prec(3, seq(
            $.IDENTIFIER,
            $.arguments
        )),
        arguments: $ => seq(
            "(",
            repeat(seq(
                $.expression,
                repeat(seq(
                    ",",
                    $.expression
                ))
            )),
            ")"
        ),
        access: $ => prec(2, seq(
            $.IDENTIFIER,
            ".",
            choice(
                $.BUILTIN_FIELD,
                $.identifier
            )
        )),
        while: $ => seq(
            "while",
            "(",
            $.expression,
            ")",
            $.body
        ),
        reassign: $ => seq(
            $.IDENTIFIER,
            "=",
            $.expression
        ),
        for: $ => seq(
            "for",
            "(",
            $.var,
            $.expression,
            ";",
            $.expression,
            ")",
            $.body
        ),
        inc: $ => seq(
            $.IDENTIFIER,
            choice(
                "++",
                "--",
                "!!"
            )
        ),
        return: $ => seq(
            "return",
            optional(seq(
                $.expression,
                repeat(seq(
                    ",",
                    $.expression
                ))
            )),
            ";"
        ),
        if: $ => seq(
            "if",
            "(",
            $.expression,
            ")",
            $.body,
            optional(seq(
                "else",
                choice(
                    $.if,
                    $.body
                )
            ))
        ),
        switch: $ => seq(
            "switch",
            "(",
            $.expression,
            ")",
            "{",
            repeat($.case),
            "}"
        ),
        case: $ => seq(
            "case",
            $.expression,
            ":",
            repeat($.body_statement)
        ),
        const: $ => seq(
            "const",
            $.type,
            $.IDENTIFIER,
            "=",
            $.expression,
            ";"
        ),
        macro: $ => seq(
            "macro",
            $.type,
            $.IDENTIFIER,
            $.parameters,
            $.body
        ),
        BUILTIN_VAR: $ => /\$[A-Z][A-Z_]*/,
        BUILTIN_FIELD: $ => /\$[a-z][a-z_]*/,
        BOOLEAN: $ => choice(
            "true",
            "false"
        ),
        STRING: $ => seq(
            '"',
            repeat(choice(
                $.string_content,
                $.escape_sequence
            )),
            '"'
        ),
        CHAR: $ => seq(
            "'",
            choice(
                $.char_content,
                $.escape_sequence
            ),
            "'"
        ),
        string_content: $ => /[^"\\]+/,
        char_content:   $ => /[^'\\]/,
        escape_sequence: $ => token(choice(
            /\\[\\"nrtbfv]/,
            /\\x[\da-fA-F]{2}/,
            /\\u[\da-fA-F]{4}/,
            /\\[0-7]{1,3}/
        )),
        COMMENT: $ => seq(
            "#",
            /[^\n\r]*/
        ),
        IDENTIFIER: $ => /[A-Za-z][A-Za-z\d_]*/,
        INTEGER:    $ => /0[xX][\da-fA-F]+|\d+([eE][+-]?\d+)?/,
        FLOAT:      $ => /(\d+\.\d*|\.\d+)([eE][+-]?\d+)?[fF]/,
        DOUBLE:     $ => /(\d+\.\d*|\.\d+)([eE][+-]?\d+)?/,
    }
});
