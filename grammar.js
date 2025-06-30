module.exports = grammar({
    name: "lucy",
    rules: {
        source_file: $ => seq(
            repeat($.linker_option),
            $.pkg,
            repeat($.use),
            repeat($.statement)
        ),
        linker_option: $ => seq(
            "%",
            $.string,
            repeat($.platform),
            ";"
        ),
        pkg: $ => seq(
            "pkg",
            $.path,
            ";"
        ),
        path: $ => prec.left(1, seq(
            $.identifier,
            repeat(seq(
                ".",
                $.identifier
            ))
        )),
        use: $ => seq(
            "use",
            $.string,
            optional(seq(
                "as",
                $.identifier
            )),
            ";"
        ),
        statement: $ => choice(
            $.comment,
            $.def,
            $.global,
            $.ext,
            $.const,
            $.struct,
            $.macro
        ),
        def: $ => seq(
            "def",
            $.type,
            $.def_name,
            $.def_parameters,
            $.body
        ),
        def_name: $ => seq(
            $.identifier,
            optional(seq(
                ".",
                $.identifier
            ))
        ),
        def_parameters: $ => seq(
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
            $.type,
            $.identifier
        ),
        type: $ => choice(
            seq(
                "(",
                $.identifier,
                repeat(seq(
                    ",",
                    $.identifier
                )),
                ")"
            ),
            seq(
                $.identifier,
                optional(seq(
                    "[",
                    "]"
                ))
            )
        ),
        body: $ => seq(
            "{",
            repeat($.def_statement),
            "}"
        ),
        def_statement: $ => choice(
            $.comment,
            $.return,
            seq(
                $.call,
                ";"
            ),
            $.inc,
            $.var,
            $.reassign,
            $.if,
            $.while,
            $.switch,
            $.for
        ),
        inc: $ => seq(
            $.identifier,
            choice(
                "++",
                "--",
                "!!"
            )
        ),
        for: $ => seq(
            "for",
            "(",
            $.type,
            $.identifier,
            "=",
            $.condition,
            ";",
            $.condition,
            ";",
            $.expr,
            ")",
            $.body
        ),
        return: $ => seq(
            "return",
            optional(seq(
                $.expr,
                repeat(seq(
                    ",",
                    $.expr
                ))
            )),
            ";"
        ),
        expr: $ => choice(
            $.unary,
            $.binary,
            $.term
        ),
        unary: $ => seq(
            choice(
                "!",
                "+",
                "-",
                "*",
                "/"
            ),
            $.term
        ),
        binary: $ => seq(
            $.term,
            choice(
                "==",
                "!=",
                "+",
                "-",
                "*",
                "/",
                "<",
                ">",
                "<=",
                ">="
            ),
            $.term
        ),
        term: $ => choice(
            $.integer,
            $.float,
            $.double,
            $.string,
            $.char,
            $.boolean,
            $.call,
            $.identifier,
            $.init,
            $.access,
            seq(
                "(",
                $.expr,
                ")"
            )
        ),
        call: $ => seq(
            $.def_name,
            $.call_arguments
        ),
        call_arguments: $ => seq(
            "(",
            optional(seq(
                $.argument,
                repeat(seq(
                    ",",
                    $.argument
                ))
            )),
            ")"
        ),
        argument: $ => $.expr,
        access: $ => seq(
            $.identifier,
            $.path,
            seq(
                ".",
                choice(
                    $.identifier,
                    $.call
                )
            ),
        ),
        init: $ => seq(
            "{",
            optional($.expr),
            repeat(seq(
                ",",
                $.expr
            )),
            "}"
        ),
        var: $ => seq(
            "var",
            $.type,
            $.identifier,
            repeat(seq(
                ",",
                $.identifier
            )),
            optional(seq(
                "=",
                $.expr
            )),
            ";"
        ),
        global: $ => seq(
            "global",
            choice(
                $.ext,
                $.const,
                $.def
            )
        ),
        ext: $ => seq(
            "ext",
            $.method,
            optional(seq(
                "as",
                $.identifier
            )),
            ";"
        ),
        method: $ => seq(
            $.type,
            $.identifier,
            $.def_parameters
        ),
        const: $ => seq(
            "const",
            $.type,
            $.identifier,
            "=",
            $.expr,
            ";"
        ),
        struct: $ => seq(
            "struct",
            $.identifier,
            "{",
            repeat(seq(
                $.type,
                $.identifier,
                ";"
            )),
            "}"
        ),
        macro: $ => seq(
            "macro",
            optional($.type),
            $.def_name,
            $.macro_parameters,
            $.body
        ),
        macro_parameters: $ => seq(
            "(",
            optional(seq(
                $.macro_parameter,
                repeat(seq(
                    ",",
                    $.parameter
                ))
            )),
            ")",
        ),
        macro_parameter: $ => seq(
            optional("var"),
            optional($.type),
            $.identifier
        ),
        platform: $ => seq(
            "@",
            $.identifier
        ),
        reassign: $ => seq(
            $.identifier,
            "=",
            $.expr,
            ";"
        ),
        if: $ => seq(
            "if",
            "(",
            $.condition,
            ")",
            $.body,
            optional($.else)
        ),
        condition: $ => seq(
            $.expr,
            repeat(seq(
                choice(
                    "||",
                    "&&"
                ),
                $.expr
            ))
        ),
        else: $ => seq(
            "else",
            choice(
                $.if,
                $.body
            )
        ),
        while: $ => seq(
            "while",
            "(",
            $.condition,
            ")"
        ),
        switch: $ => seq(
            "switch",
            "(",
            $.expr,
            ")",
            "{",
            repeat($.case),
            "}"
        ),
        case: $ => seq(
            "case",
            ":",
            repeat($.def_statement)
        ),
        string: $ => seq(
            '"',
            repeat(choice(
                $.string_content,
                $.escape_sequence
            )),
            '"'
        ),
        char: $ => seq(
            "'",
            choice(
                /[^'\\]/,
                $.escape_sequence
            ),
            "'"
        ),
        string_content: $ => /[^"\\]+/,
        escape_sequence: $ => token(choice(
            /\\[\\"nrtbfv]/,
            /\\x[\da-fA-F]{2}/,
            /\\u[\da-fA-F]{4}/,
            /\\[0-7]{1,3}/
        )),
        comment: $ => token(seq(
            "#",
            /[^\n\r]*/
        )),
        identifier: $ => /[A-Za-z][A-Za-z\d_]*/,
        integer: $ => /0[xX][\da-fA-F]+|\d+([eE][+-]?\d+)?/,
        float: $ => /(\d+\.\d*|\.\d+)([eE][+-]?\d+)?[fF]/,
        double: $ => /(\d+\.\d*|\.\d+)([eE][+-]?\d+)?/,
        boolean: $ => /true|false/,
    }
});
