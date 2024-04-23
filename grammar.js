module.exports = grammar({
  name: "psych",
  rules: {
    source_file: ($) => repeat($.statement),

    function_definition: ($) =>
      seq(
        optional(seq($.identifier, "::")),
        $.parameter_list,
        "->",
        // choice(
        seq($.type, $.block),
        // $.expression),
      ),

    parameter_list: ($) =>
      seq(
        "(",
        optional(
          seq(
            seq($.identifier, optional(seq(":", $.type))),
            repeat(seq(",", $.identifier, ":", $.type)),
            optional(","),
          ),
        ),
        ")",
      ),

    import_declaration: ($) => seq("import", field("alias", $.identifier)),

    declaration: ($) => choice($.function_definition, $.import_declaration),

    base_type: ($) =>
      prec(
        6,
        choice(
          "empty",
          "bool",
          "char",
          "string",
          seq("i", /\d+/),
          seq("u", /\d+/),
          "f16",
          "f32",
          seq(/t|T/, $.identifier), // Generic
        ),
      ),

    type: ($) =>
      prec(
        5,
        choice(
          // non-function
          seq(
            // address
            optional("&"),

            //array
            optional(
              seq(
                "[",
                optional(seq(/\d+/, repeat(seq(",", /\d+/)), optional(","))),
                "]",
              ),
            ),
            $.base_type,
          ),

          // function
          seq(
            "(",
            optional(seq($.type, repeat(seq(",", $.type)), optional(","))),
            ")",
            "->",
            $.type,
          ),
        ),
      ),

    block: ($) => seq("{", repeat($.statement), "}"),

    statement: ($) =>
      choice(
        $.declaration,
        $.expression_statement,
        $.return_statement,
        $.for_statement,
        $.defer_statement,
      ),

    defer_statement: ($) => seq("defer", $.statement),

    expression_statement: ($) =>
      choice(
        $.variable_declaration,
        $.constant_declaration,
        $.assignment_expression,
      ),

    return_statement: ($) => seq("return", $.expression),

    constant_declaration: ($) =>
      seq($.identifier, choice(seq(":", $.type, ":"), "::"), $.expression),

    variable_declaration: ($) =>
      seq($.identifier, ":", optional($.type), "=", $.expression),

    assignment_expression: ($) => seq($.expression, "=", $.expression),

    range_expression: ($) =>
      prec.left(
        4,
        choice(
          seq("...", $.expression),
          seq("..<", $.expression),
          seq($.expression, "...", $.expression),
          seq($.expression, "..<", $.expression),
          seq($.expression, "..."),
          seq($.expression, "..<"),
        ),
      ),

    pipe_expression: ($) => seq($.expression, "|>", $.identifier),

    unary_expression: ($) =>
      prec(
        3,
        choice(
          seq("&", $.expression),
          seq("-", $.expression),
          seq("!", $.expression),
        ),
      ),

    binary_expression: ($) =>
      choice(
        prec.left(0, seq($.expression, "<", $.expression)),
        prec.left(0, seq($.expression, ">", $.expression)),
        prec.left(0, seq($.expression, "<=", $.expression)),
        prec.left(0, seq($.expression, ">=", $.expression)),
        prec.left(0, seq($.expression, "==", $.expression)),

        prec.left(1, seq($.expression, "+", $.expression)),
        prec.left(1, seq($.expression, "-", $.expression)),
        prec.left(2, seq($.expression, "*", $.expression)),
        prec.left(2, seq($.expression, "/", $.expression)),
      ),

    dereference_expression: ($) => seq($.expression, ".*"),

    grouped_expression: ($) => seq("(", $.expression, ")"),

    match_expression: ($) =>
      seq(
        "match",
        $.expression,
        "{",
        repeat(seq($.expression, "->", $.expression, ",")),
        "}",
      ),

    for_statement: ($) => seq("for", $.identifier, "in", $.expression, $.block),

    if_expression: ($) =>
      seq(
        "if",
        $.expression,
        $.block,
        optional(repeat(seq("else if", $.expression, $.block))),
        optional(seq("else", $.block)),
      ),

    expression: ($) =>
      prec(
        1,
        choice(
          $.literal,
          $.identifier,
          $.range_expression,
          $.unary_expression,
          $.binary_expression,
          $.dereference_expression,
          $.grouped_expression,
          $.match_expression,
          $.if_expression,
          $.pipe_expression,
        ),
      ),

    identifier: (_) => /[_a-zA-Z][_a-zA-Z0-9]*/,

    literal: ($) =>
      choice($.number, $.float, $.char, $.string, $.bool, $.array),

    number: (_) => /\d+/,

    float: (_) => /(\d+[.]\d+)/,

    char: (_) => seq("'", /([^'\\]|\\.)/, "'"),

    string: (_) => seq('"', /([^"\\]|\\.)*/, '"'),

    bool: (_) => choice("true", "false"),

    array: ($) =>
      seq(
        "[",
        optional(seq($.literal, repeat(seq(",", $.literal)), optional(","))),
        "]",
      ),

    comment: (_) =>
      token(
        choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
      ),
  },
  extras: ($) => [/\s/, $.comment],
});
